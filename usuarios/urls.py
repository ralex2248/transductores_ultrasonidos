from django.urls import path
from django.contrib import admin
from . import views

usuarios_urlpatterns = [
    path('', views.login_inicio, name='login_inicio'),
    path ('create_user',views.create_user,name='create_user'),
    path ('create_user_datos',views.create_user_datos,name='create_user_datos'),
    path ('forgot_password',views.forgot_password,name='forgot_password'),
    path ('change_password',views.change_password,name='change_password'),

]