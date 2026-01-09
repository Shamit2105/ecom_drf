from django.urls import path,include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenVerifyView,TokenRefreshView

from .views import UserTypeView,SecurityQuestionsView,UserLoginView,UserSignUpView

router=DefaultRouter()

router.register("security_questions",SecurityQuestionsView,basename='security_questions')
router.register("user_type",UserTypeView,basename='user_type')

urlpatterns=[
    path('signup/',UserSignUpView.as_view(),name='user_signup'),
    path('login/',UserLoginView.as_view(),name='user_login'),
    path('token_verify/',TokenVerifyView.as_view(),name='token_verify'),
    path('token_refresh/',TokenRefreshView.as_view(),name='token_refresh'),
    path('users/',include(router.urls))
]