from django.contrib import admin
from django.urls import path
from todoapp import views

urlpatterns = [
    path('tododata/<int:pk>', views.SaveTodos.as_view()),
    path('tododata/', views.SaveTodos.as_view()),
    path('signupUser/', views.Signup.as_view()),
    path('login/', views.Login.as_view()),]