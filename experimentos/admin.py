from django.contrib import admin

from experimentos.models import Experimentos
from usuarios.models import User

# Register your models here.
admin.site.register(Experimentos)
admin.site.register(User)