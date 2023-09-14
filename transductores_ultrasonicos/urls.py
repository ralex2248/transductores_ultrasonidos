from django.contrib import admin
from django.urls import include, path
from experimentos.urls import experimentos_urlpatterns
from usuarios import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('usuarios.urls')),
]
admin.site.site_header = 'Transductores Ultrasonicos'
admin.site.site_title = 'Transductores Ultrasonicos'    