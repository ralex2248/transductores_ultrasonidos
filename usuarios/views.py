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
from django.contrib.auth.models import User
from usuarios.models import User
from experimentos.models import Fluido, Experimentos 
from .models import UserLoginTimestamp
from .models import UserActivity
from django.shortcuts import render, redirect
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.contrib.auth import get_user_model

def forgot_rut(request):
    message = ""
    if request.method == 'POST':
        email = request.POST.get('email')
        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            
            # Dado que username se utiliza como el RUT
            rut = user.username
            
            # Preparando el contenido del correo usando la plantilla rut_reset_email.html
            context = {'user': user, 'rut': rut}
            html_content = render_to_string('rut_reset_email.html', context)
            
            # Enviando el correo
            email = EmailMessage(
                'Recuperación de RUT',
                html_content,
                'TeamRocket@cloud.uautonoma.cl',
                [user.email]
            )
            email.content_subtype = "html" 
            email.send()
            
            # Redirigiendo a la página de inicio de sesión después de enviar el correo
            return redirect('login')
        else:
            message = "No existe una cuenta con el correo ingresado."

    return render(request, 'forgot_rut.html', {'message': message})




def count_logins_last_24_hours(user):
    now = timezone.now()
    start_time = now - timedelta(days=1)
    return UserLoginTimestamp.objects.filter(user=user, timestamp__range=(start_time, now)).count()


def change_password(request):
    if request.method == 'POST':
        email = request.session.pop('reset_email', None)
        new_password1 = request.POST.get('new_password1')
        new_password2 = request.POST.get('new_password2')
        
        if not email:
            messages.error(request, 'No se pudo recuperar el correo electrónico. Intenta nuevamente.')
            return redirect('forgot_password')
        try:
            user = get_user_model().objects.get(email=email)
            if new_password1 == new_password2:
                user.set_password(new_password1)
                user.save()
                messages.success(request, 'Tu contraseña ha sido actualizada con éxito!')
                return redirect('login')
            else:
                messages.error(request, 'Las contraseñas no coinciden.')
        except get_user_model().DoesNotExist:
            messages.error(request, 'Este correo electrónico no está registrado.')

    return render(request, 'change_password.html')


def enter_code(request):
    message = ""
    if request.method == 'POST':
        entered_code = request.POST.get('code')
        
        try:
            reset_entry = PasswordReset.objects.get(code=entered_code)
            
            if timezone.now() - reset_entry.timestamp > timedelta(minutes=15):
                message = "El código ha expirado."
            else:
                request.session['reset_email'] = reset_entry.user.email
                return redirect('change_password')
        except PasswordReset.DoesNotExist:
            message = "El código no es válido o ya ha sido utilizado."

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

def logout_view(request):
    logout(request)
    return redirect('login')  # Redirigir al usuario a la página de inicio de sesión después de cerrar sesión


def home_view(request):
    user = request.user.first_name
    total_usuarios = get_user_model().objects.count()
    total_fluidos = Fluido.objects.count() 
    total_experiementos = Experimentos.objects.count()

    # Obtener el conteo de inicios de sesión en las últimas 24 horas
    logins_last_24_hours = count_logins_last_24_hours(request.user)
    recent_activities = UserActivity.objects.filter(user=request.user)[:5]


    return render(request, 'usuarios/home.html', {
        'user': user, 
        'total_fluidos': total_fluidos, 
        'total_usuarios': total_usuarios,
        'recent_activities': recent_activities,
        'total_experimentos': total_experiementos,
        'logins_last_24_hours': logins_last_24_hours  # Pasa el conteo al contexto
    })



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

            # Registrar el inicio de sesión en UserLoginTimestamp
            login_timestamp = UserLoginTimestamp(user=user)
            login_timestamp.save()

            return redirect('home')
        elif User.objects.filter(username=username).count() == 0:
            message = "Este RUT no está registrado."
        else:
            message = "Contraseña incorrecta."

    return render(request, 'usuarios/login.html', {'message' : message, 'username': username})




def create_user_datos(request):
    correo = request.session.get('correo', '')
    rut = request.session.get('rut', '')
    user_first_name = ""  # Define user_first_name aquí

    if request.method == 'POST':
        nombre = request.POST.get('nombre')
        password = request.POST.get('password')
        nombre = nombre.title()
        user = User.objects.create_user(username=rut, email=correo, password=password, first_name=nombre)
        user.save()

        del request.session['correo']
        del request.session['rut']
        user_first_name = user.first_name  # Asigna el valor de user.first_name a user_first_name

        return redirect('login')

    context = {
        'correo': correo,
        'rut': rut,
        'first_name': user_first_name  # Pasa user_first_name al contexto
    }

    return render(request, 'create_user_datos.html', context)


def ajustes(request):
    if request.method == 'POST':
        current_password = request.POST.get('current_password')
        current_email = request.POST.get('current_email')
        new_password1 = request.POST.get('new_password1')
        new_password2 = request.POST.get('new_password2')
        new_email = request.POST.get('correo')
        confirm_email = request.POST.get('confirmar_correo')
        user = request.user


        if current_password and new_password1 and new_password2:
            if user.check_password(current_password):
                if new_password1 == new_password2:
                    user.set_password(new_password1)
                    user.save()
                    messages.success(request, 'Contraseña actualizada con éxito!')
                else:
                    messages.error(request, 'Las contraseñas no coinciden.')
            else:
                messages.error(request, 'La contraseña actual es incorrecta.')


        elif current_email and new_email and confirm_email:
            if user.email == current_email:
                if new_email == confirm_email:
                    user.email = new_email
                    user.save()
                    messages.success(request, 'Correo electrónico actualizado con éxito!')
                else:
                    messages.error(request, 'Los correos electrónicos no coinciden.')
            else:
                messages.error(request, 'El correo electrónico actual es incorrecto.')

    return render(request, 'ajustes.html')
