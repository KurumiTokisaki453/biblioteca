from django.contrib import admin
from .models import * 
admin.site.register(Usuario)
admin.site.register(Autor)
admin.site.register(Libro)
admin.site.register(Tipo)
admin.site.register(Librotipo)
admin.site.register(Genero)
admin.site.register(LibroGenero)
admin.site.register(Puntaje)
admin.site.register(Nombre)
admin.site.register(LibroAutor)