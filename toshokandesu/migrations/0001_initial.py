# Generated by Django 5.0.4 on 2024-04-17 16:31

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Autor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
                ('apellido', models.CharField(max_length=100)),
                ('nacimiento', models.DateField()),
                ('perfil', models.ImageField(blank=True, null=True, upload_to='autores/%Y/%m/%d/')),
            ],
        ),
        migrations.CreateModel(
            name='Genero',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Libro',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titulo', models.CharField(max_length=100)),
                ('perfil', models.ImageField(blank=True, null=True, upload_to='libros/%Y/%m/%d/')),
                ('sinopsis', models.TextField(blank=True, null=True)),
                ('tipo', models.CharField(blank=True, max_length=100, null=True)),
                ('capitulo', models.CharField(blank=True, max_length=100, null=True)),
                ('publicacion', models.DateField(auto_now_add=True)),
                ('estado', models.CharField(blank=True, max_length=100, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Usuario',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
                ('perfil', models.ImageField(blank=True, null=True, upload_to='usuarios/%Y/%m/%d/')),
                ('usuario', models.CharField(max_length=100)),
                ('password', models.CharField(max_length=100)),
                ('creacion', models.DateField(auto_now_add=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='LibroAutor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('autor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='toshokandesu.autor')),
                ('libro', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='toshokandesu.libro')),
            ],
        ),
        migrations.CreateModel(
            name='LibroGenero',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('genero', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='toshokandesu.genero')),
                ('libro', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='toshokandesu.libro')),
            ],
        ),
        migrations.CreateModel(
            name='Nombre',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(blank=True, max_length=100)),
                ('descripcion', models.TextField(blank=True, max_length=100, null=True)),
                ('libro', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='toshokandesu.libro')),
            ],
        ),
        migrations.CreateModel(
            name='Puntaje',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('calificacion', models.IntegerField()),
                ('fecha_calificacion', models.DateTimeField(auto_now_add=True)),
                ('libro', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='toshokandesu.libro')),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='toshokandesu.usuario')),
            ],
        ),
    ]