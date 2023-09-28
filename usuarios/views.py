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

def validar_rut(rut):
    rut = rut.replace(".", "").replace("-", "").upper()
    
    if not rut.isdigit() or len(rut) < 2:
        return False
    
    numero, verificador = rut[:-1], rut[-1]
    
    suma = 0
    multiplicador = 2
    
    for digito in reversed(numero):
        suma += int(digito) * multiplicador
        multiplicador += 1
        if multiplicador > 7:
            multiplicador = 2
    
    resto = suma % 11
    dv_esperado = 11 - resto if resto != 0 else 0
    
    if dv_esperado == int(verificador):
        return True
    else:
        return False
    
def validar_email(email):
    # Expresión regular para validar el formato del email
    patron = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    
    # Usamos re.match para verificar si el email coincide con el patrón
    if re.match(patron, email):
        return True
    else:
        return False


def register(request):
    message = ""
    if request.method == 'POST':
        correo = request.POST.get('correo')
        rut = request.POST.get('rut')

        if correo and rut:
            request.session['correo'] = correo
            request.session['rut'] = rut

            if validar_rut(rut) == False:
                message = "Ingrese un rut válido."
            
            elif validar_email(correo) == False:
                message = "Ingrese un correo válido."

            elif User.objects.filter(email=correo).exists():
                message = "Este correo ya está registrado."

            elif User.objects.filter(username=rut).exists():
                message = "Este RUT ya está registrado." 
            else:
                return redirect('create_user_datos')
        
        else:
            message = "Debes rellenar los campos."
        
    return render(request, 'usuarios/register.html', {'message' : message})

def login_view(request):
    message = ''
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            return redirect('home')
        else:
            message = "Contraseña incorrecta."

    return render(request, 'usuarios/login.html', {'message' : message})



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

