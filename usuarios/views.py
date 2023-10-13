from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render
from django.core.mail import send_mail
from django.utils import timezone
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib import messages
from django.contrib.auth import get_user_model
from django.contrib import messages
from django.contrib.auth.decorators import login_required
import re
from usuarios.models import User
from .models import PasswordReset, User 
from datetime import timedelta
from django.template.loader import render_to_string
from django.core.mail import EmailMessage
from . import views

def change_password(request):
    message = ""
    if request.method == 'POST':
        new_password1 = request.POST.get('new_password1')
        new_password2 = request.POST.get('new_password2')
        
        if new_password1 and new_password2:
            if new_password1 == new_password2:
                user = get_user_model().objects.get(email=request.user.email)
                user.set_password(new_password1)
                user.save()
                messages.success(request, 'Tu contraseña ha sido actualizada con éxito!')
                return redirect('home')
            else:
                message = 'Las contraseñas no coinciden.'
        else:
            message = 'Por favor, ingresa una contraseña.'
    return render(request, 'change_password.html',  {'message' : message})


def enter_code(request):
    message = ""
    if request.method == 'POST':
        entered_code = request.POST.get('code')
        
        try:
            reset_entry = PasswordReset.objects.get(code=entered_code)
            
            if timezone.now() - reset_entry.timestamp > timedelta(minutes=15):
                message = "El código ha expirado."
            else:

                return redirect('change_password')
        except PasswordReset.DoesNotExist:
            message = "El código no es válido."

    return render(request, 'code_password.html', {'message': message})


def forgot_password(request):
    message = ""
    if request.method == 'POST':
        email = request.POST.get('email')
        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            reset_entry = PasswordReset(user=user)
            reset_entry.generate_code()
            reset_entry.save()

            context = {'user': user, 'code': reset_entry.code}
            html_content = render_to_string('password_reset_email.html', context)

            email = EmailMessage(
                'Recuperacion de contraseña',
                html_content,
                'TeamRocket@cloud.uautonoma.cl',
                [user.email]
            )
            email.content_subtype = "html" 
            email.send()

            return redirect('enter_code') 
        else:
            message = "No existe una cuenta con el correo ingresado."

    return render(request, 'forgot_password.html', {'message': message})



def home_view(request):
    return render(request, 'usuarios/home.html')

def register(request):
    message = ""
    if request.method == 'POST':
        correo = request.POST.get('correo')
        rut = request.POST.get('rut')

        if correo and rut:
            request.session['correo'] = correo
            request.session['rut'] = rut

            if User.objects.filter(email=correo).exists():
                message = "Este correo ya está registrado."

            elif User.objects.filter(username=rut).exists():
                message = "Este RUT ya está registrado." 
            else:
                return redirect('create_user_datos')
        
    return render(request, 'usuarios/register.html', {'message' : message})

def login_view(request):
    message = ''
    username = ''
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            return redirect('home')
        elif User.objects.filter(username=username).count() == 0:
            message = "Este RUT no está registrado."
        else:
            message = "Contraseña incorrecta."

    return render(request, 'usuarios/login.html', {'message' : message, 'username': username})



def create_user_datos(request):
    correo = request.session.get('correo', '')
    rut = request.session.get('rut', '')
    
    if request.method == 'POST':
        nombre = request.POST.get('nombre')
        password = request.POST.get('password')
        nombre = nombre.title()
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


