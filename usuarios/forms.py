from django import forms
from django.contrib.auth.forms import AuthenticationForm

class inicio_sesion(AuthenticationForm):
    rut = forms.CharField(label="RUT", max_length=30)