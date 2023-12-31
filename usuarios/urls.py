from django.urls import path
from django.conf.urls import url, include
from django.contrib import admin
from . import views
from .views import forgot_password, enter_code, forgot_rut
from experimentos.urls import experimentos_urlpatterns

urlpatterns = [
    #path('', views.login_inicio, name='login_inicio'),
    path('home/', views.home_view, name='home'),
    path('login/', views.login_view, name='login'),
    path ('register',views.register,name='register'),
    path ('create_user_datos',views.create_user_datos,name='create_user_datos'),
    path ('forgot_password',views.forgot_password,name='forgot_password'),
    path ('change_password',views.change_password,name='change_password'),
    path('', views.login_view, name='login'),
    path('forgot-password/', forgot_password, name='forgot_password'),
    path('forgot-rut/', forgot_rut, name='forgot_rut'),
    path('enter-code/', enter_code, name='enter_code'),
    path('experimentos/', include(experimentos_urlpatterns)),
    path('logout/', views.logout_view, name='logout'),
    path('ajustes/', views.ajustes, name='ajustes'),
    path('api/user_activity/', views.get_user_activity, name='user_activity_api'),
    path('t_usuarios/', views.t_usuarios, name='t_usuarios'),
    path('error/', views.error, name='error'),
    path('loading/', views.loading, name='loading'),
    path('eliminar_usuario/<int:user_id>/', views.eliminar_usuario, name='eliminar_usuario'),
    path('editar-usuario/<int:user_id>/', views.editar_usuario, name='editar_usuario'),




]           