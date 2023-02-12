from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *
class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model=MyTodos
        fields=('id','data')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields='__all__'
    
   

class SignupSerializer(serializers.ModelSerializer):
    passwordconfirm=serializers.CharField(max_length=100)
    class Meta:
        model=User
        fields=['username','password','email','passwordconfirm']
    
    def validate_password(self,value):
        if len(value)<8:
            raise serializers.ValidationError("password must be at least 8 characters long")
        return value
    def validate(self,data):
        if data["password"]!=data["passwordconfirm"]:
            raise serializers.ValidationError("Passwords don't match")
        return data