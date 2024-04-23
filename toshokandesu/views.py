from rest_framework import viewsets
from rest_framework.response import Response
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
class LibroSuperView(viewsets.ModelViewSet):
    serializer_class = LibroSuperSerializer
    queryset = LibroAutor.objects.all()
class LibrogeneroViewFiltro(viewsets.ModelViewSet):
    serializer_class = LibrogeneroSerializer
    def get_queryset(self):
        libro = self.kwargs.get('libro_id')  # Obtener el libro_id de los parámetros de la URL
        queryset = LibroGenero.objects.filter(libro_id=libro)
        return queryset
class LibroNombreViewFiltro(viewsets.ModelViewSet):
    serializer_class = NombreSerializer
    def get_queryset(self):
        libro = self.kwargs.get('libro_id')  # Obtener el libro_id de los parámetros de la URL
        queryset = Nombre.objects.filter(libro_id=libro)
        return queryset


















# from django.shortcuts import get_object_or_404
# class LibrogeneroViewFiltro(viewsets.ModelViewSet):
#     serializer_class = LibrogeneroSerializer
#     queryset = LibroGenero.objects.all()  # Aquí establecemos un queryset por defecto

#     def list(self, request, *args, **kwargs):
#         libro = get_object_or_404(Libro, pk=self.kwargs.get('libro_id'))

#         # generos = LibroGenero.objects.filter(libro_id=libro) ##Esto funciona correctamente
#         # generos = libro.librogenero_set.all() ## Esto tambien funciona correctamente
#         generos = LibroGenero.objects.filter(libro_id=libro).select_related('libro')  ## Esto funciona

#         # Serializar y devolver los datos de los géneros
#         serializer = self.get_serializer(generos, many=True)
#         return Response(serializer.data)


# from rest_framework.response import Response
# from rest_framework import status
# from rest_framework.views import APIView

# class LibroSuperView(APIView):
#     def get(self, request):
#         libro_autores = LibroAutor.objects.all()
#         data = []
#         for libro_autor in libro_autores:
#             data.append({
#                 'autor_nombre': libro_autor.autor.nombre,
#                 'autor_apellido': libro_autor.autor.apellido,
#                 'libro_titulo': libro_autor.libro.titulo,
#                 'descripcion': libro_autor.descripcion
#             })
#         return Response(data)

#     def post(self, request):
#         # autor_id = request.data.get('autor_id')
#         # libro_id = request.data.get('libro_id')
#         return Response(status=status.HTTP_201_CREATED)

#     def put(self, request, pk=None):
#         # autor_nombre = request.data.get('autor_nombre')
#         # libro_titulo = request.data.get('libro_titulo')
#         return Response(status=status.HTTP_200_OK)

#     def delete(self, request, pk=None):
#         return Response(status=status.HTTP_204_NO_CONTENT)
