import random
from django.shortcuts import redirect, render

from experimentos.models import Experimentos, Fluido, Sensor

# Create your views here.
def insertar_datos_al_azar(request):
    fluido=Fluido.objects.create(
        nombre_fluido='prueba',
        descripcion='test',
        
    )
    experimento = Experimentos.objects.create(
        user=request.user,
        nombre_experimento='Experimento Aleatorio',
        electricidad=random.uniform(0, 10),
        voltaje=random.uniform(0, 5), 
        tiempo=None,
        pdf_experimento=None,
        fluido=fluido,
    )

    # Generar 5 datos aleatorios para el sensor y almacenarlos en un array
    datos_sensor = []
    for _ in range(5):
        dato_aleatorio = random.randint(1, 100) 
        datos_sensor.append(dato_aleatorio)

    # Crear un sensor en MongoDB y almacenar los datos en el formato deseado
    sensor = Sensor.objects.using('mongodb').create( #deben usar el using para referirse a que lo crearan en la bd de mongo
        experimento_id=experimento.id,
        datos_sensor=datos_sensor
    )
    return print('exito')