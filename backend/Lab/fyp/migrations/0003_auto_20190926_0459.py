# Generated by Django 2.2.5 on 2019-09-25 20:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('fyp', '0002_auto_20190926_0346'),
    ]

    operations = [
        migrations.RenameField(
            model_name='equipment',
            old_name='labcode',
            new_name='lab',
        ),
    ]
