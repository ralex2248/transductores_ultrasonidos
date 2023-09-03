from django.db import models
from django.contrib.auth.models import Group, User
# Create your models here.
class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    grupo=models.ForeignKey(Group, on_delete=models.CASCADE)
    rut = models.CharField(max_length=12, blank=False, null=False)
    cargo=models.CharField(max_length=100, blank=True, null=True)


