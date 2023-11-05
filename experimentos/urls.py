from experimentos import views
from django.urls import path
from django.contrib import admin

experimentos_urlpatterns = [
    path('experimento_con_tiempo/', views.experimento_con_tiempo, name='experimento_con_tiempo'),
    path('crear_experimento/', views.crear_experimento, name='crear_experimento'),
    path('historial/', views.historial, name='historial'),
    path('fluidos/', views.fluidos, name='fluidos'),
    path('agregar_fluido/', views.agregar_fluido, name='agregar_fluido'),
    path('crear_fluido/', views.crear_fluido, name='crear_fluido'),
    path('eliminar_fluidos/', views.eliminar_fluidos, name='eliminar_fluidos'),
    path('editar_fluido/<int:fluido_id>/', views.editar_fluido, name='editar_fluido'),  
    path('editar_experimento/<int:experimento_id>/', views.editar_experimento, name='editar_experimento'),      
    path('eliminar_experimentos/', views.eliminar_experimentos, name='eliminar_experimentos'),
    path('ver_experimento/<str:nombre_experimento>/', views.ver_experimento, name='ver_experimento'),
    path('actualizar_favorito/<int:experimento_id>/', views.actualizar_favorito, name='actualizar_favorito'),
    path('comparar_experimentos/', views.comparar_experimentos, name='comparar_experimentos'),
    
]