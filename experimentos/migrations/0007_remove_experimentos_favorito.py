# Generated by Django 3.2.20 on 2023-11-03 03:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('experimentos', '0006_experimentos_favorito'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='experimentos',
            name='favorito',
        ),
    ]
