from experimentos import views
from django.urls import path
from django.contrib import admin
experimentos_urlpatterns = [
    path('insertar-datos-azar/', views.insertar_datos_al_azar, name='insertar_datos_azar'),
    path('imprimir_experimento/',views.imprimir_experimento,name='imprimir_experimento')
]