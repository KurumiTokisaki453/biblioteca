from django.db import models
from datetime import date, datetime
# from django.contrib.auth.models import AbstractUser

class Usuario(models.Model):
    nombre = models.CharField(max_length=100)
    perfil = models.TextField(blank=True, null=True)    ##Imagen
    usuario = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    creacion = models.DateField(auto_now_add=True, blank=True, null=True)
    def __str__(self):
        return f"{self.nombre}"

class Autor(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100, blank=True,null=True)
    nacimiento = models.DateField(blank=True, null=True)
    perfil = models.TextField(blank=True, null=True)    ##Imagen
    def __str__(self):
        return f"{self.nombre}"

class Libro(models.Model):
    titulo = models.CharField(max_length=100)
    perfil = models.TextField(blank=True, null=True)    ##Imagen
    sinopsis = models.TextField(blank=True, null=True)
    publicacion = models.DateField(default=date.today)
    estado = models.CharField(max_length=100, blank=True, null=True)
    idioma = models.CharField(max_length=75, blank=True, null=True)
    def __str__(self):
        return self.titulo

class LibroCapitulo(models.Model):
    libro = models.ForeignKey(Libro, on_delete=models.CASCADE)
    capitulo = models.FloatField(blank=True, null=True)
    volumen = models.FloatField(blank=True, null=True)

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
    descripcion = models.CharField(blank=True, null=True) # Ejemplo: Escritor, Ilustrador, vocal, etc.
    libro = models.ForeignKey(Libro, on_delete=models.CASCADE)
    autor = models.ForeignKey(Autor, on_delete=models.CASCADE)
    def __str__(self):
        return f"{self.libro.titulo} - {self.autor.nombre}"
