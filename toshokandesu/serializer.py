#Crear un archivo 'serializer.py' en StartApp (toshokandesu) para pegar:
from rest_framework import serializers
from .models import *

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'

class AutorSerializer(serializers.ModelSerializer):       
    class Meta:
        model = Autor        
        fields = '__all__'   

class LibroSerializer(serializers.ModelSerializer):       
    class Meta:
        model = Libro        
        fields = '__all__'   

class TipoSerializer(serializers.ModelSerializer):        
    class Meta:
        model = Tipo
        fields = '__all__'   

class LibrotipoSerializer(serializers.ModelSerializer):   
    class Meta:
        model = Librotipo    
        fields = '__all__'   

class GeneroSerializer(serializers.ModelSerializer):      
    class Meta:
        model = Genero       
        fields = '__all__'   

class LibrogeneroSerializer(serializers.ModelSerializer): 
    class Meta:
        model = LibroGenero  
        fields = '__all__'   

class PuntajeSerializer(serializers.ModelSerializer):     
    class Meta:
        model = Puntaje      
        fields = '__all__'   

class NombreSerializer(serializers.ModelSerializer):      
    class Meta:
        model = Nombre       
        fields = '__all__'   

class LibroautorSerializer(serializers.ModelSerializer):  
    class Meta:
        model = LibroAutor   
        fields = '__all__'   
