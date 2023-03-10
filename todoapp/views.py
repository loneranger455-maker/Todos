from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate,login
from rest_framework.permissions import AllowAny,IsAuthenticated
from .models import *
from rest_framework_simplejwt.tokens import RefreshToken
from .public_functions import dictfetchall
from .serializers import *
from .renderers import  *
from django.db import  connection
from django.http import JsonResponse
from django.middleware.csrf import get_token

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }



class Signup(APIView):
    permission_classes=[AllowAny]
    renderer_classes=[TodoRenderer]
    def post(self,request):
        serializeddata=SignupSerializer(data=request.data)
        
        if serializeddata.is_valid(raise_exception=True):
            connection.cursor().execute("INSERT INTO todoapp_user (username,password,email) values(%s,%s,%s)",[request.data["username"],request.data["password"],request.data["email"]])
            user=User.objects.get(email=request.data["email"])

            response={"token":get_tokens_for_user(user),"msg":"Account created sucessfully"}
        else :
            response={"nonfielderrors":"provided credentials are invalid"}
        return JsonResponse(response)

class Login(APIView):
    permission_classes=[AllowAny]
    renderer_classes=[TodoRenderer]
    def post(self,request):
        with connection.cursor() as cursor:
            cursor.execute("SELECT email,password FROM todoapp_user WHERE email=%s AND password=%s",[request.data["email"],request.data["password"]])
            data=dictfetchall(cursor)
            if data:
                user=User.objects.get(email=request.data["email"])
                response={"token":get_tokens_for_user(user),"msg":"Account created sucessfully"}
                return JsonResponse(response)

        return JsonResponse({"errors":{"nonfielderrors":"Email or password is incorrect"}})
        
        


class SaveTodos(APIView):
    permission_classes=[IsAuthenticated]
    renderer_classes=[TodoRenderer]
    def get(self,request,pk=None):
        username=request.user.username
        with connection.cursor() as cursor:
            cursor.execute("SELECT id,data,completed FROM todoapp_mytodos WHERE username=%s ORDER BY completed ASC",[request.user.username])
            response=dictfetchall(cursor)
            response={"data":response,"username":username}
        return Response(response)
    def post(self,request,pk=None):       

        serializeddata=TodoSerializer(data=request.data)
        if serializeddata.is_valid(raise_exception=True):
            with connection.cursor() as cursor:
                cursor.execute("INSERT INTO todoapp_mytodos (username,data) values(%s,%s)",[request.user.username,request.data["data"]])
                cursor.execute("SELECT id,data,completed FROM todoapp_mytodos WHERE username=%s ORDER BY completed ASC",[request.user.username])
                response=dictfetchall(cursor)
            return Response(response)
    def delete(self,request,pk=None):
        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM todoapp_mytodos WHERE id=%s",[pk])
            cursor.execute("SELECT id,data,completed FROM todoapp_mytodos WHERE username=%s ORDER BY completed ASC",[request.user.username])
            response=dictfetchall(cursor)
        
        return Response(response)
    # def put(self,request,pk=None):
    #     print(pk)
    #     with connection.cursor() as cursor:
    #         cursor.execute("UPDATE todoapp_mytodos SET completed=%s WHERE id=%s",[False,pk])
    #         cursor.execute("SELECT id,data FROM todoapp_mytodos WHERE username=%s ORDER BY completed DESC",[request.user.username])
    #         response=dictfetchall(cursor)
        
    #     return Response(response)


class markdone(APIView):
    permission_classes=[IsAuthenticated]
    renderer_classes=[TodoRenderer]
    def post(self,request,pk):
        print(pk)
        with connection.cursor() as cursor:
            cursor.execute("UPDATE todoapp_mytodos SET completed=%s WHERE id=%s",[True,pk])
            cursor.execute("SELECT id,data,completed FROM todoapp_mytodos WHERE username=%s ORDER BY completed ASC",[request.user.username])
            response=dictfetchall(cursor)
            print(response)
        
        return Response(response)

        
        
