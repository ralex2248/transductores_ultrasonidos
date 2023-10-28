from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone
import random
import string

class UserActivity(models.Model):
    user = models.ForeignKey('usuarios.User', on_delete=models.CASCADE)
    activity_type = models.CharField(max_length=255)
    detail = models.TextField(null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-timestamp']


class UserLoginTimestamp(models.Model):
    user = models.ForeignKey('usuarios.User', on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

class PasswordReset(models.Model):
    user = models.ForeignKey('usuarios.User', on_delete=models.CASCADE)
    code = models.CharField(max_length=6, blank=True, default='')
    timestamp = models.DateTimeField(auto_now_add=True)

    def generate_code(self):
        """Generate a random 6-digit code."""
        self.code = ''.join(random.choices(string.digits, k=6))

class User(AbstractUser):
    pass
