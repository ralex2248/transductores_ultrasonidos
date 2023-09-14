from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import UserCreationForm
from usuarios.models import User

from django.shortcuts import render

def home_view(request):
    return render(request, 'usuarios/home.html')


def register(request):
    if request.method == 'POST':
        correo = request.POST.get('correo')
        rut = request.POST.get('rut')
        
        # Guardar los datos en la sesión
        request.session['correo'] = correo
        request.session['rut'] = rut
        
        return redirect('create_user_datos')
    return render(request, 'usuarios/register.html')

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



def create_user_datos(request):
    correo = request.session.get('correo', '')
    rut = request.session.get('rut', '')
    
    if request.method == 'POST':
        nombre = request.POST.get('nombre')
        password = request.POST.get('password')
        

        user = User.objects.create_user(username=rut, email=correo, password=password, first_name=nombre)
        user.save()


        del request.session['correo']
        del request.session['rut']

        return redirect('login')
    
    context = {
        'correo': correo,
        'rut': rut
    }
    
    return render(request, 'create_user_datos.html', context)

def forgot_password(request):
    return render(request, 'forgot_password.html')
def change_password(request):
    return render(request, 'change_password.html')