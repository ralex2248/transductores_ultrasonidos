from django.contrib import admin
from django.urls import include, path
from usuarios.urls import usuarios_urlpatterns
from experimentos.urls import experimentos_urlpatterns


urlpatterns = [
    path('admin/', admin.site.urls),
    path('usuarios/', include(usuarios_urlpatterns)),
    path('experimentos/',include(experimentos_urlpatterns)),
]
admin.site.site_header = 'Transductores Ultrasonicos'
admin.site.site_title = 'Transductores Ultrasonicos'    