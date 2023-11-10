from django.db import models
from django.conf import settings
from datetime import timedelta
from mongoengine import Document, StringField, ListField, FloatField

class ExperimentoMongo(Document):
    nombre_experimento = StringField(max_length=100)
    comentario = StringField(max_length=500)
    max_values2 = ListField(FloatField())
    frecuencia = ListField(FloatField())
    shift_phase = ListField(FloatField())
    def __str__(self):
        return self.nombre_experimento
class Fluido(models.Model):
    nombre_fluido=models.CharField(max_length=200,null=False)
    descripcion=models.TextField(max_length=200,null=False)
    fecha_fluido=models.DateField(null=False,auto_now_add=True)

class Experimentos(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    fluido = models.ForeignKey(Fluido, on_delete=models.CASCADE)
    nombre_experimento = models.CharField(max_length=200, null=False)
    voltaje = models.FloatField(null=False)
    frecuencia_inicial = models.FloatField(null=True)
    final_frecuency = models.FloatField(null=True)
    tiempo = models.TimeField(null=True)
    sensibilidad = models.FloatField(null=True)
    pasos = models.FloatField(null=True)
    fecha_experimento = models.DateField(null=False, auto_now_add=True)
    comentario = models.CharField(max_length=500, null=True)
    pdf_experimento = models.FileField(upload_to='experimento_pdf/', null=True, blank=True)
    tiempo_pausa = models.DurationField(default=timedelta(seconds=0))  # Valor predeterminado de 0 segundos
    favorito = models.BooleanField(default=False)
