# Generated by Django 2.2.18 on 2023-11-06 01:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0010_delete_usersession'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userlogintimestamp',
            old_name='timestamp',
            new_name='login_timestamp',
        ),
        migrations.AddField(
            model_name='userlogintimestamp',
            name='logout_timestamp',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
