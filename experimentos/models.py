from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Fluido(models.Model):
    nombre_fluido=models.CharField(max_length=200,null=False)
    descripcion=models.TextField(max_length=200,null=False)
    fecha_fluido=models.DateField(null=False,auto_now_add=True)

class Experimentos(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    fluido=models.ForeignKey(Fluido, on_delete=models.CASCADE)
    nombre_experimento=models.CharField(max_length=200,null=False)
    electricidad=models.FloatField(null=False)
    voltaje=models.FloatField(null=False)
    tiempo=models.TimeField(null=True)
    fecha_experimento=models.DateField(null=False,auto_now_add=True)
    pdf_experimento=models.FileField(upload_to='experimento_pdf/', null=True, blank=True)