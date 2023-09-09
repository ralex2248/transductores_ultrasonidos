from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from .forms import inicio_sesion

def login_inicio(request):
    if request.method == 'POST':
        form = inicio_sesion(request, request.POST)
        if form.is_valid():
            rut = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=rut, password=password)
            if user is not None:
                login(request, user)
                return redirect('create_user')  # Redirige a la página deseada después del inicio de sesión
    else:
        form = inicio_sesion()
    return render(request, 'login.html', {'form': form})

def create_user(request):
    return render(request, 'create_user.html')
def create_user_datos(request):
    return render(request, 'create_user_datos.html')
def forgot_password(request):
    return render(request, 'forgot_password.html')
def change_password(request):
    return render(request, 'change_password.html')
