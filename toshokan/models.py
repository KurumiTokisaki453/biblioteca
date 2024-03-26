from django.db import models

# Create your models here.
class Autor(models.Model):
    id_autor = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    biografia = models.TextField()
    nacimiento = models.DateField()

    def __str__(self):
        return f"{self.nombre} {self.apellido}"

class Libro(models.Model):
    id_libros = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    # imagen = models.ImageField(upload_to='imagenes_libros')
    sinopsis = models.TextField()
    fecha_creacion = models.DateField()
    capitulos = models.IntegerField()
    estado = models.CharField(max_length=100)
    tipo = models.CharField(max_length=100)
    autores = models.ManyToManyField(Autor, through='LibroAutor')

    def __str__(self):
        return self.nombre

class Libroautor(models.Model):
    libro = models.ForeignKey(Libro, on_delete=models.CASCADE)
    autor = models.ForeignKey(Autor, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('libro', 'autor')