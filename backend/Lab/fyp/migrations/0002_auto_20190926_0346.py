# Generated by Django 2.2.5 on 2019-09-25 19:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('fyp', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='equipment',
            old_name='lab',
            new_name='labcode',
        ),
    ]
