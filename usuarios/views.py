from django.shortcuts import render

def login_inicio(request):
    return render(request, 'login.html')
def create_user(request):
    return render(request, 'create_user.html')
def create_user_datos(request):
    return render(request, 'create_user_datos.html')
def forgot_password(request):
    return render(request, 'forgot_password.html')
def change_password(request):
    return render(request, 'change_password.html')
