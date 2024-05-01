#Crear un archivo 'serializer.py' en StartApp (toshokandesu) para pegar:
from rest_framework import serializers
from .models import *

class UsuarioSerializer(serializers.ModelSerializer): # Tabla maestra sobre los usuarios
    class Meta:
        model = Usuario
        fields = '__all__'

class AutorSerializer(serializers.ModelSerializer): # Tabla maestra sobre los Autores disponibles
    class Meta:
        model = Autor        
        fields = '__all__'

class GeneroSerializer(serializers.ModelSerializer): # Tabla maestra Generos disponibles
    class Meta:
        model = Genero       
        fields = '__all__'
             
class TipoSerializer(serializers.ModelSerializer): # Tabla maestra sobre Tipos disponibles (anime, manga, novela ligera, etc)
    class Meta:
        model = Tipo
        fields = '__all__'

class LibrotipoSerializer(serializers.ModelSerializer): # Relación (desconocido) (Libros x Tipo)
    tipo_nombre = serializers.ReadOnlyField(source='tipo.nombre')
    class Meta:
        model = Librotipo
        fields = '__all__'

class LibrogeneroSerializer(serializers.ModelSerializer): # Relación (desconocida) (LibroxGeneros)
    nombre_genero = serializers.ReadOnlyField(source='genero.nombre')
    class Meta:
        model = LibroGenero  
        fields = '__all__'

class PuntajeSerializer(serializers.ModelSerializer): # Puntaje sobre un libro
    class Meta:
        model = Puntaje      
        fields = '__all__'

class NombreSerializer(serializers.ModelSerializer): # Nombres alternativos de mis libros     
    class Meta:
        model = Nombre       
        fields = '__all__'

class LibroautorSerializer(serializers.ModelSerializer): # Relación muchos a muchos (LibroxAutor)
    autor_nombre = serializers.ReadOnlyField(source='autor.nombre')
    autor_apellido = serializers.ReadOnlyField(source='autor.apellido')
    class Meta:
        model = LibroAutor
        fields = '__all__'

class LibroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Libro
        fields = '__all__'

class LibroSuperSerializer(serializers.ModelSerializer):
    autor = AutorSerializer()
    libro = LibroSerializer()
    class Meta:
        model = LibroAutor
        fields = '__all__'

class LibroCapituloSerializer(serializers.ModelSerializer):
    class Meta:
        model = LibroCapitulo
        fields = '__all__'

class LibropuntajeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Puntaje
        fields = ['id','libro','calificacion']