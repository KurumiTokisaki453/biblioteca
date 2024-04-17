from django.db import models
from django.contrib.auth.models import AbstractUser

# class Libro(models.Model):
#     titulo = models.CharField(max_length=100) 
#     tipo = models.CharField(max_length=100)
#     capitulo = models.CharField(max_length=100)
#     publicacion = models.DateField()
#     estado = models.CharField(max_length=100)
    
class User(AbstractUser):
    nombre = models.CharField(max_length=100)
#   perfil = models.ImageField(upload_to='fotos_de_perfil/', blank=True, null=True)
    creacion = models.DateField(blank=True, null=True)
    def __str__(self):
        return self.nombre
  
class Autor(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    nacimiento = models.DateField()
#   perfil = models.ImageField(upload_to='../../', blank=True, null=True)
    def __str__(self):
        return f"{self.nombre} {self.apellido}"
      
class Genero(models.Model):
    nombre = models.CharField(max_length=100)
    def __str__(self):
        return self.nombre

class Libro(models.Model):
    titulo = models.CharField(max_length=100) 
    tipo = models.CharField(max_length=100)
    capitulo = models.CharField(max_length=100)
    publicacion = models.DateField()
    estado = models.CharField(max_length=100)
    generos = models.ManyToManyField(Genero, related_name='libros')
    autores = models.ManyToManyField(Autor, related_name='libros')
    def __str__(self):
        return self.titulo

class Puntaje(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)  # Conecta al usuario que hizo la calificación
    libro = models.ForeignKey(Libro, on_delete=models.CASCADE)    # Conecta al libro que fue calificado
    calificacion = models.IntegerField()             # Calificación del libro por el usuario
    fecha_calificacion = models.DateTimeField(auto_now_add=True)  # Fecha en que se realizó la calificación

    def __str__(self):
        return f'{self.calificacion} estrellas'


class Nombre(models.Model):
    libro = models.ForeignKey(Libro, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=100, blank=True)
    descripcion = models.TextField(max_length=100, blank=True, null=True)
    def __str__(self):
        return f"Nombres del libro {self.nombre}"


class LibroAutor(models.Model):
    libro = models.ForeignKey(Libro, on_delete=models.CASCADE)
    autor = models.ForeignKey(Autor, on_delete=models.CASCADE)
    def __str__(self):
        return f"{self.libro.titulo} - {self.autor.nombre}"
