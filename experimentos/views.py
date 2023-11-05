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
import mpld3
from io import BytesIO
from django.core.paginator import Paginator
from django.contrib import messages
from django.shortcuts import render, get_object_or_404, redirect
from .models import Fluido
import pyvisa.highlevel as hl
from usuarios.models import UserActivity
from django.urls import reverse

import matlab.engine
import time
import pyvisa.highlevel as hl
import numpy as np
import matplotlib.pyplot as plt
import time

from django.core.paginator import Paginator, EmptyPage
from django.shortcuts import render
from .models import Experimentos
import json
from django.http import JsonResponse
from .models import ExperimentoMongo
import mongoengine



def crear_fluido(request):
    nombre_fluido = request.POST.get('nombre_fluido')
    descripcion = request.POST.get('descripcion_fluido')

    fluido = Fluido(
        nombre_fluido=nombre_fluido.capitalize(),
        descripcion=descripcion.capitalize(),
        fecha_fluido=datetime.now().date()
    )
    fluido.save()

    # Registrar la actividad de crear un fluido
    activity_detail = f"Has creado un fluido llamado '{nombre_fluido.capitalize()}'"
    UserActivity.objects.create(user=request.user, activity_type="created_fluid", detail=activity_detail)

    return redirect(reverse('fluidos'))


def editar_fluido(request, fluido_id):
    # Obtener el objeto Fluido que se va a editar o mostrar un error 404 si no existe
    fluido = get_object_or_404(Fluido, pk=fluido_id)

    if request.method == 'POST':
        # Si se ha enviado un formulario POST, procesar los datos del formulario aquí

        # Obtener los datos del formulario
        nombre_fluido = request.POST.get('nombre_fluido')
        descripcion = request.POST.get('descripcion')

        # Actualizar el objeto Fluido con los nuevos datos
        fluido.nombre_fluido = nombre_fluido
        fluido.descripcion = descripcion
        fluido.save()

        # Redirigir a la página de lista de fluidos (fluidos.html)
        return redirect('fluidos')  # Cambia 'fluidos' por el nombre de la URL correcta

    # Si la solicitud es GET, renderizar la plantilla de edición del fluido
    return render(request, 'editar_fluido.html', {'fluido': fluido})


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



def data_acquisition(frecuencies, generador, values_ch1, values_ch2, max_ch1, max_ch2, engine, actual_frecuency, steps, sensivity):
    
    e_sensivity = sensivity
    e_actual_frecuency = actual_frecuency
    e_final_frecuency = actual_frecuency
    ti = 1/e_final_frecuency

        
    timee = (1 / 500000)
    for _ in range(steps):
        round_frequency = round(e_final_frecuency, 1)
        frecuencies.append(round_frequency)
        generador.write('FREQ '+ str(e_final_frecuency))
        max_val = engine.acquireData_channel_1()
        for i in max_val:
            values_ch1.append(i[0])
            values_ch2.append(i[1])

        max_ch1.append(np.max(values_ch1))
        max_ch2.append(np.max(values_ch2))
        # SHIFT PHASE

        
        # Calcular la correlación cruzada entre las dos señales
        cross_corr = np.correlate(values_ch1, values_ch2, mode='full')

        # Encontrar el desplazamiento de fase que maximiza la correlación
        max_corr_idx = np.argmax(cross_corr)
        shift_phase_time = (max_corr_idx - len(values_ch1) + 1) * timee
        shift_phase_value=2*np.pi*shift_phase_time/ti
        shift_phase.append(shift_phase_value)
        
        values_ch1.clear()
        values_ch2.clear()
        
        e_final_frecuency += sensivity

frecuencies = []
times = []
values_channel_1 = []
values_channel_2 = []
max_values_1 = []
shift_phase = []

@login_required
def crear_experimento(request):
    fluidos = Fluido.objects.all()
    if request.method == 'POST':
        global final_values
        global max_values_2
        max_values_2 = []
        final_values = []
        final_values.clear()
        frecuencies.clear()

        values_channel_1.clear()
        values_channel_2.clear()
        max_values_1.clear()
        max_values_2.clear()
        shift_phase.clear()
        # Datos del formulario
        nombre_fluido = request.POST.get('nombre_fluido')
        descripcion = request.POST.get('descripcionInput')
        nombre_experimento = request.POST.get('nombre_experimento')
        sensibilidad = request.POST.get('sensibilidadInput')
        frecuencia_inicial = request.POST.get('frecuenciaInput')
        pausa = request.POST.get('pausa')
        pasos = request.POST.get('pasosInput')
        pre_voltaje = request.POST.get('voltajeInput')
        pdf_experimento = request.FILES.get('pdf_experimento')
        comentario = request.POST.get('comentario')

        message = ''

        if Experimentos.objects.filter(nombre_experimento=nombre_experimento).exists():
            message = 'Este nombre de experimento ya está registrado, intenta con uno nuevo.'

        else:
            
            fluido = Fluido.objects.get(nombre_fluido=nombre_fluido)

            e_sensibilidad = float(sensibilidad)
            e_pasos = int(pasos)
            e_voltaje = float(pre_voltaje)
            e_frecuencia_inicial = float(frecuencia_inicial)

            start_time = time.time()

            eng = matlab.engine.start_matlab()
            rm = hl.ResourceManager()

            generador = rm.open_resource('USB0::0x0957::0x0407::MY44017234::INSTR')

            generador.write('VOLT '+ pre_voltaje)

            if pausa:
                tiempo_pausa = pausa
            else:
                time.sleep(3)
                eng.initializeStream_channel_1(nargout=0)  
                time.sleep(2)
                data_acquisition(frecuencies, generador, values_channel_1, values_channel_2, max_values_1, max_values_2, eng, e_frecuencia_inicial, e_pasos, e_sensibilidad)
                final_values = [c0/c1 for c0, c1 in zip(max_values_1, max_values_2)]
                end_time = time.time()
                total_time = round(end_time - start_time)
                hours, rem = divmod(total_time, 3600)
                minutes, seconds = divmod(rem, 60)
                formatted_time = "{:02}:{:02}:{:02}".format(int(hours), int(minutes), int(seconds))
                print(f"Tiempo transcurrido: {formatted_time}")
                freq_final = frecuencies[-1]
                
                
                # GUARDADO EN LA BASE DE DATOS POSTGRES

                experimento = Experimentos(
                user=request.user,  # Usuario actual
                fluido=fluido,  # Usar el Fluido recién creado
                sensibilidad = sensibilidad,
                pasos = pasos,
                comentario = comentario,
                nombre_experimento=nombre_experimento,
                frecuencia_inicial=frecuencia_inicial,
                voltaje=pre_voltaje,
                fecha_experimento=datetime.now().date(),
                pdf_experimento=pdf_experimento,
                tiempo = str(formatted_time),
                final_frecuency = freq_final
                )
                experimento.save()

                experimento_Mongo = ExperimentoMongo(
                nombre_experimento=nombre_experimento,
                comentario=comentario,
                max_values2=final_values,
                frecuencia=frecuencies,
                shift_phase=shift_phase
                )
                experimento_Mongo.save()

                

            return redirect('ver_experimento', nombre_experimento=nombre_experimento)
        
        
        
        
    return render(request, 'experimento_con_tiempo.html', {'message': message, 'fluidos': fluidos})
        # Realiza cualquier redirección o acción adicional después de guardar el experimento

def resultados(request):
    
    context = {
        'final_values': json.dumps(final_values),
        'frecuencies': json.dumps(frecuencies),
        'shift_phase': json.dumps(shift_phase),

    }
    return render(request, 'resultados.html', context)

def ver_experimento(request, nombre_experimento):
    #esto es para visualizar uno solo
    experimento_postgres = Experimentos.objects.get(nombre_experimento=nombre_experimento)
    experimento_mongo = ExperimentoMongo.objects.get(nombre_experimento=nombre_experimento)

    max_values2_mongo = experimento_mongo.max_values2
    frecuencias_mongo = experimento_mongo.frecuencia 
    shift_phase_mongo = experimento_mongo.shift_phase 
    tiempo_formateado = experimento_postgres.tiempo.strftime('%H:%M:%S')
    

    context = {
        'final_values': json.dumps(max_values2_mongo),
        'frecuencies': json.dumps(frecuencias_mongo),
        'shift_phase': json.dumps(shift_phase_mongo),
        'experimento': experimento_postgres,
        'tiempo_formateado':tiempo_formateado,
    }
    return render(request, 'resultados.html', context)

def comparar_Experimentos():
    # esta compara
    pass

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
def experimento_pausado(request):
    fluidos = Fluido.objects.all()
    return render(request, 'experimento_pausado.html', {'fluidos': fluidos})

@login_required
def experimento_con_tiempo(request):
    fluidos = Fluido.objects.all()    
    return render(request, 'experimento_con_tiempo.html', {'fluidos': fluidos})

@login_required
def upload_file_pausado(request):
    plot_html = None

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
                    data = line.strip().split(',')
                    if len(data) == 2:
                        time.append(float(data[0]))
                        voltage.append(float(data[1]))

            plt.plot(time, voltage)
            plt.xlabel('Tiempo')
            plt.ylabel('Voltaje')
            plt.title('Gráfico Tiempo-Voltaje')

            # Renderiza el gráfico en formato HTML
            plot_html = mpld3.fig_to_html(plt.gcf())
            plt.close()

    return render(request, 'experimento_pausado.html', {'plot_html': plot_html})

@login_required
def upload_file_con_tiempo(request):
    plot_html = None

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
                    data = line.strip().split(',')
                    if len(data) == 2:
                        time.append(float(data[0]))
                        voltage.append(float(data[1]))

            plt.plot(time, voltage)
            plt.xlabel('Tiempo')
            plt.ylabel('Voltaje')
            plt.title('Gráfico Tiempo-Voltaje')

            # Renderiza el gráfico en formato HTML
            plot_html = mpld3.fig_to_html(plt.gcf())
            plt.close()

    return render(request, 'experimento_con_tiempo.html', {'plot_html': plot_html})


@login_required
def historial(request):
    page = request.GET.get('page', 1)
    search = request.GET.get('search', '')

    # Consulta de fluidos
    if search and search != "None":
        experimentos = Experimentos.objects.filter(nombre_experimento__icontains=search).order_by('nombre_experimento')
    else:
        experimentos = Experimentos.objects.all().order_by('-fecha_experimento')

    # Paginación de la lista de fluidos
    paginator = Paginator(experimentos, 5)
    try:
        experimentos_paginate = paginator.page(page)
    except EmptyPage:
        experimentos_paginate = paginator.page(paginator.num_pages)

    template_name = 'historial.html'
    return render(request, template_name, {'template_name': template_name, 'experimentos_paginate': experimentos_paginate, 'paginator': paginator, 'page': page, 'search': search})


def actualizar_favorito(request, experimento_id):
    experimento = get_object_or_404(Experimentos, pk=experimento_id)
    print(experimento.favorito)
    
    if experimento.favorito == False:
        experimento.favorito = True
        experimento.save()
    else:
        experimento.favorito = False
        experimento.save()
    # Redirige de nuevo a donde corresponda, por ejemplo al listado de experimentos
    return redirect('historial')




@login_required
def fluidos(request):
    # Restricciones de acceso, asegurando que el usuario tiene el grupo adecuado

    # Parámetros de paginación y búsqueda
    page = request.GET.get('page', 1)
    search = request.GET.get('search', '')

    # Consulta de fluidos
    if search and search != "None":
        fluidos = Fluido.objects.filter(nombre_fluido__icontains=search).order_by('nombre_fluido')
    else:
        fluidos = Fluido.objects.all().order_by('nombre_fluido')

    # Paginación de la lista de fluidos
    paginator = Paginator(fluidos, 5)
    try:
        fluidos_paginate = paginator.page(page)
    except EmptyPage:
        fluidos_paginate = paginator.page(paginator.num_pages)

    template_name = 'fluidos.html'
    return render(request, template_name, {'template_name': template_name, 'fluidos_paginate': fluidos_paginate, 'paginator': paginator, 'page': page, 'search': search})

def agregar_fluido(request):
    return render(request, 'agregar_fluido.html')


@login_required
def eliminar_fluidos(request):
    if request.method == 'POST':
        selected_fluid_ids = request.POST.getlist('selected_fluidos')
        
        Fluido.objects.filter(id__in=selected_fluid_ids).delete()
        
        return redirect('fluidos')
    else:
        return redirect('fluidos')
    
def editar_experimento(request, experimento_id):
    experimento = get_object_or_404(Experimentos, pk=experimento_id)
    print(experimento.favorito)
    if request.method == 'POST':
        nombre_experimento= request.POST.get('nombre_experimento')
        comentario = request.POST.get('comentario')
        experimento.nombre_experimento = nombre_experimento
        experimento.comentario = comentario
        experimento.save()
        return redirect('historial') 
    return render(request, 'editar_experimento.html', {'experimento': experimento})

@login_required
def eliminar_experimentos(request):
    if request.method == 'POST':
        # Getting the list of selected fluid IDs from the form
        selected_experimentos_ids = request.POST.getlist('selected_experimentos')
        
        
        ExperimentoMongo.objects(nombre_experimento__in=selected_experimentos_ids).delete()
        
        # Deleting the selected fluids using Django's ORM
        Experimentos.objects.filter(nombre_experimento__in=selected_experimentos_ids).delete()
        
        # Redirecting back to the fluidos page with a success message
        return redirect('historial')
    else:
        return redirect('historial')
        