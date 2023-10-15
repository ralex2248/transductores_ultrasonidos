import random
from django.shortcuts import redirect, render
import json
from experimentos.models import Experimentos, Fluido
from pymongo import MongoClient
from django.http import HttpResponse
from .models import Experimentos, Fluido
from django.contrib.auth.decorators import login_required
from datetime import datetime
import os
import matplotlib.pyplot as plt
from django.conf import settings
from django.urls import path

from django.conf.urls.static import static
from . import views

# Create your views here.
def insertar_datos_al_azar(request):
    client = MongoClient('mongodb://localhost:27017/')
    db = client.transductores_ultrasonicos
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
    documento = {
        "id_experimento":experimento.id,
        "sensor": [25, 30, 22]
    }
    mi_coleccion = db.sensores
    mi_coleccion.insert_one(documento)
    client.close()
    return print('exito')

def imprimir_experimento(request, format=None):
    client = MongoClient('mongodb://localhost:27017/')
    db = client.transductores_ultrasonicos
    mi_coleccion = db.sensores
    exp_list = Experimentos.objects.all()
    exp_json = []
    for es in exp_list:
        resultado = mi_coleccion.find_one({"id_experimento": es.id})
        exp_json.append({'id':es.id,'nombre':es.nombre_experimento,'resultado':resultado})
    client.close()
    print(exp_json)
    return print('exito')

@login_required
def crear_experimento(request):
    if request.method == 'POST':
        # Datos del formulario
        nombre_fluido = request.POST.get('nombre_fluido')
        descripcion = request.POST.get('descripcion')
        nombre_experimento = request.POST.get('nombre_experimento')
        electricidad = request.POST.get('electricidad')
        voltaje = request.POST.get('voltaje')
        pdf_experimento = request.FILES.get('pdf_experimento')

        # Crear un objeto Fluido
        fluido = Fluido(
            nombre_fluido=nombre_fluido,
            descripcion=descripcion,
            fecha_fluido=datetime.now().date(),
        )
        fluido.save()

        # Crear un objeto Experimentos relacionado con el Fluido
        experimento = Experimentos(
            user=request.user,  # Usuario actual
            fluido=fluido,  # Usar el Fluido recién creado
            nombre_experimento=nombre_experimento,
            electricidad=electricidad,
            voltaje=voltaje,
            fecha_experimento=datetime.now().date(),
            pdf_experimento=pdf_experimento,
        )
        experimento.save()

        # Realiza cualquier redirección o acción adicional después de guardar el experimento

    return HttpResponse("Experimento guardado exitosamente")
@login_required
def experimento(request):
    return render(request, 'experimento.html')
@login_required
def upload_file(request):
    plot_path = None

    if request.method == 'POST':
        uploaded_file = request.FILES['txt_file']
        if uploaded_file.name.endswith('.txt'):
            file_path = os.path.join(settings.MEDIA_ROOT, uploaded_file.name)
            with open(file_path, 'wb') as destination:
                for chunk in uploaded_file.chunks():
                    destination.write(chunk)

            with open(file_path, 'r') as file:
                time = []
                voltage = []
                for line in file:
                    data = line.split()
                    if len(data) == 2:
                        time.append(float(data[0]))
                        voltage.append(float(data[1]))

            plt.plot(time, voltage)
            plt.xlabel('Tiempo')
            plt.ylabel('Voltaje')
            plt.title('grafico tiempo voltaje ')
            plot_path = os.path.join(settings.MEDIA_URL, 'plot.png')
            plt.savefig(os.path.join(settings.MEDIA_ROOT, 'plot.png'))
            plt.close()

    return render(request, 'experimento.html', {'plot_path': plot_path})

