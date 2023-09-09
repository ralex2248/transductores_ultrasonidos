from django import forms
from django.contrib.auth.forms import AuthenticationForm

class inicio_sesion(AuthenticationForm):
    username = forms.CharField(label='RUT', max_length=12)
