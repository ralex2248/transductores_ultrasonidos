from django.urls import path
from django.contrib import admin
from . import views

usuarios_urlpatterns = [
    path('', views.login_inicio, name='login_inicio'),
    path('create_user_view/', views.create_user_view, name='create_user_view'),
]