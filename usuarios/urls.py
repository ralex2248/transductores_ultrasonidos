from django.urls import path
from django.contrib import admin
from . import views
urlpatterns = [
    #path('', views.login_inicio, name='login_inicio'),
    path('home/', views.home_view, name='home'),
    path('register/', views.register, name='register'),
    path('login/', views.login_view, name='login'),
    path ('register',views.register,name='register'),
    path ('create_user_datos',views.create_user_datos,name='create_user_datos'),
    path ('forgot_password',views.forgot_password,name='forgot_password'),
    path ('change_password',views.change_password,name='change_password'),
    path('', views.login_view, name='login'),

]