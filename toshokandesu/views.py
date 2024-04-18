from rest_framework import viewsets
from .serializer import *    
from .models import *        

class UsuarioView(viewsets.ModelViewSet):
    serializer_class = UsuarioSerializer
    queryset = Usuario.objects.all()
class AutorView(viewsets.ModelViewSet):
    serializer_class = AutorSerializer
    queryset = Autor.objects.all()
class LibroView(viewsets.ModelViewSet):
    serializer_class = LibroSerializer
    queryset = Libro.objects.all()
class TipoView(viewsets.ModelViewSet):
    serializer_class = TipoSerializer
    queryset = Tipo.objects.all()
class LibrotipoView(viewsets.ModelViewSet):
    serializer_class = LibrotipoSerializer
    queryset = Librotipo.objects.all()
class GeneroView(viewsets.ModelViewSet):
    serializer_class = GeneroSerializer
    queryset = Genero.objects.all()
class LibrogeneroView(viewsets.ModelViewSet):
    serializer_class = LibrogeneroSerializer
    queryset = LibroGenero.objects.all()
class PuntajeView(viewsets.ModelViewSet):
    serializer_class = PuntajeSerializer
    queryset = Puntaje.objects.all()
class NombreView(viewsets.ModelViewSet):
    serializer_class = NombreSerializer
    queryset = Nombre.objects.all()
class LibroautorView(viewsets.ModelViewSet):
    serializer_class = LibroautorSerializer
    queryset = LibroAutor.objects.all()