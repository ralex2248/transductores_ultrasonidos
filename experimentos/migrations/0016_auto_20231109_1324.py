# Generated by Django 3.2.20 on 2023-11-09 16:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('experimentos', '0015_auto_20231108_1527'),
    ]

    operations = [
        migrations.AlterField(
            model_name='experimentos',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='fluido',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]