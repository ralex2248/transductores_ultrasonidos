# Generated by Django 2.2.18 on 2023-11-06 00:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('experimentos', '0008_experimentos_favorito'),
    ]

    operations = [
        migrations.AlterField(
            model_name='experimentos',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='fluido',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]