# Generated by Django 2.2.18 on 2023-10-15 01:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('experimentos', '0005_auto_20230917_1130'),
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
