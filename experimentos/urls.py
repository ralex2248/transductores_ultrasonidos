from experimentos import views
from django.urls import path
from django.contrib import admin
experimentos_urlpatterns = [
    path('insertar-datos-azar/', views.insertar_datos_al_azar, name='insertar_datos_azar'),
    path('imprimir_experimento/',views.imprimir_experimento,name='imprimir_experimento'),
    path('experimento_con_tiempo/', views.experimento_con_tiempo, name='experimento_con_tiempo'),
    path('crear_experimento/', views.crear_experimento, name='crear_experimento'),
    path('cargar_voltaje_pausado/', views.upload_file_pausado, name='cargar_voltaje_pausado'),
    path('cargar_voltaje_con_tiempo/', views.upload_file_con_tiempo, name='cargar_voltaje_con_tiempo'),
    path('historial/', views.historial, name='historial'),
    path('fluidos/', views.fluidos, name='fluidos'),
    path('agregar_fluido/', views.agregar_fluido, name='agregar_fluido'),
    path('crear_fluido/', views.crear_fluido, name='crear_fluido'),
    path('eliminar_fluidos/', views.eliminar_fluidos, name='eliminar_fluidos'),
    path('editar_fluido/<int:fluido_id>/', views.editar_fluido, name='editar_fluido'),    
]