# Generated by Django 5.0.4 on 2024-04-26 00:53

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('toshokandesu', '0009_alter_autor_apellido'),
    ]

    operations = [
        migrations.AlterField(
            model_name='librotipo',
            name='libro',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='toshokandesu.libro'),
        ),
    ]
