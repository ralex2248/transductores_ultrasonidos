# Generated by Django 3.2.20 on 2023-11-07 04:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('experimentos', '0011_auto_20231106_2008'),
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
