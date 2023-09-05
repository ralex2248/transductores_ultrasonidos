from django.shortcuts import render

def login_inicio(request):
    return render(request, 'login.html')
def create_user_view(request):
    return render(request, 'create_user.html')
