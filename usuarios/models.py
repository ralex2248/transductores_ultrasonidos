from django.db import models
from django.contrib.auth.models import AbstractUser, Group
from django.conf import settings
class User(AbstractUser):
    # Agrega los campos personalizados que necesites aquí
    rut = models.CharField(max_length=30, unique=True)
    # Otros campos personalizados

    def __str__(self):
        return self.username

class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    grupo = models.ForeignKey(Group, on_delete=models.CASCADE)
    rut = models.CharField(max_length=12, blank=False, null=False)
    cargo = models.CharField(max_length=100, blank=True, null=True)

