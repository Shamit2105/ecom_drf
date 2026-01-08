from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from .models import CustomUser

class UserUpsertSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields= '__all__'

    



    

    
    