from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError
from rest_framework import generics,permissions,status
from rest_framework.response import Response

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .serializers import UserUpsertSerializer
from .models import CustomUser

class UserSignUpView(generics.CreateAPIView):
    serializer_class = UserUpsertSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            instance = serializer.save()

            refresh = RefreshToken.for_user(instance.user)

            response_data = {
                'data':{
                    'user':{
                        'id':instance.id,
                        'username':instance.username,
                        'first_name':instance.first_name,
                        'last_name':instance.last_name,
                    },
                    'tokens':{
                        'access':str(refresh.access_token),
                        'refresh':str(refresh),
                    }
                }
            }
            return Response(response_data,status=status.HTTP_201_CREATED)
        
        except ValidationError as e:
            return Response(
                {
                    'error':str(e)
                },status=status.HTTP_400_BAD_REQUEST
            )
        
        except Exception as e:
            return Response(
                {
                    'error':str(e)
                },status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        

class UserLoginView(TokenObtainPairView):
    permission_classes=[permissions.AllowAny]
    serializer_class = TokenObtainPairSerializer

class SecurityQuestionsView(viewsets.ViewSet):
    permission_classes=[permissions.AllowAny]
    def get(self,request):
        return Response([
            {"key":k,"label":l} for k,l in CustomUser.questions
        ])

class UserTypeView(viewsets.ViewSet):
    permission_classes=[permissions.AllowAny]
    def get(self,request):
        return Response([
            {"key":k,"label":l} for k,l in CustomUser.user_type
        ])



