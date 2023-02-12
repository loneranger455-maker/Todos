from django.contrib import admin
from .models import *
# Register your models here.
@admin.register(MyTodos)
class adminModel(admin.ModelAdmin):
    list=['date','data']
