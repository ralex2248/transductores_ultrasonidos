from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import UserCreationForm

from django.shortcuts import render

def home_view(request):
    return render(request, 'usuarios/home.html')


def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')
    else:
        form = UserCreationForm()
    return render(request, 'usuarios/register.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            return redirect('home')
        else:
            # Manejar error de inicio de sesión
            pass
    return render(request, 'usuarios/login.html')

def logout_view(request):
    logout(request)
    return redirect('login')

def register(request):
    return render(request, 'usuarios/register.html')
def create_user_datos(request):
    return render(request, 'create_user_datos.html')
def forgot_password(request):
    return render(request, 'forgot_password.html')
def change_password(request):
    return render(request, 'change_password.html')