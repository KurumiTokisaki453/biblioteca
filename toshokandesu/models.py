from django.db import models
from datetime import date, datetime
# from django.contrib.auth.models import AbstractUser

class Usuario(models.Model):
    nombre = models.CharField(max_length=100)
    perfil = models.ImageField(upload_to='usuarios/%Y/%m/%d/', blank=True, null=True)
    usuario = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    creacion = models.DateField(auto_now_add=True, blank=True, null=True)
    def __str__(self):
        return f"{self.nombre}"

class Autor(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    nacimiento = models.DateField(blank=True, null=True)
    perfil = models.ImageField(upload_to='autores/%Y/%m/%d/', blank=True, null=True)
    def __str__(self):
        return f"{self.nombre} {self.apellido}"

class Libro(models.Model):
    titulo = models.CharField(max_length=100) 
    perfil = models.ImageField(upload_to='libros/%Y/%m/%d/', blank=True, null=True)
    sinopsis = models.TextField(blank=True, null=True)
    capitulo = models.CharField(max_length=100, blank=True, null=True)
    publicacion = models.DateField(default=date.today)
    ul_publicacion = models.DateField(default=datetime.today)
    estado = models.CharField(max_length=100, blank=True, null=True)
    def __str__(self):
        return self.titulo

class Tipo(models.Model):
    nombre = models.CharField(max_length=100)
    def __str__(self):
        return f"{self.nombre}"
    
class Librotipo(models.Model):
    libro = models.ForeignKey(Libro, on_delete=models.CASCADE)
    tipo = models.ForeignKey(Tipo, on_delete=models.CASCADE)
    def __str__(self):
        return self.libro.titulo
 
class Genero(models.Model):
    nombre = models.CharField(max_length=100)
    def __str__(self):
        return self.nombre

class LibroGenero(models.Model):
    libro = models.ForeignKey(Libro, on_delete=models.CASCADE)
    genero = models.ForeignKey(Genero, on_delete=models.CASCADE)
    def __str__(self):
      return f"{self.libro.titulo} {self.genero.nombre}"

class Puntaje(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)  # Conecta al usuario que hizo la calificación
    libro = models.ForeignKey(Libro, on_delete=models.CASCADE)    # Conecta al libro que fue calificado
    calificacion = models.IntegerField()             # Calificación del libro por el usuario (1 al 5)
    fecha_calificacion = models.DateTimeField(default=datetime.today)  # Fecha en que se realizó la calificación
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
