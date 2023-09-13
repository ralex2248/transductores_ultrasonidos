from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from .forms import inicio_sesion

from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect

def login_view(request):
    error_message = None

    if request.method == 'POST':
        form = inicio_sesion(request, request.POST)  # Usa el formulario personalizado
        if form.is_valid():
            rut = form.cleaned_data['rut']
            password = form.cleaned_data['password']
            user = authenticate(request, username=rut, password=password)  # Autentica con el campo 'rut'
            if user is not None:
                login(request, user)
                # Redirige a una página después del inicio de sesión exitoso.
                return redirect('create_user.html')
        else:
                # Si la autenticación falla, muestra un mensaje de error.
                error_message = "RUT o contraseña incorrectos."
    else:
        form = inicio_sesion()  # Crea una instancia del formulario personalizado
    return render(request, 'login.html', {'form': form, 'error_message': error_message})

def create_user(request):
    return render(request, 'create_user.html')
def create_user_datos(request):
    return render(request, 'create_user_datos.html')
def forgot_password(request):
    return render(request, 'forgot_password.html')
def change_password(request):
    return render(request, 'change_password.html')
