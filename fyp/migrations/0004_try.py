# Generated by Django 2.2.5 on 2019-10-02 10:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fyp', '0003_auto_20190926_0459'),
    ]

    operations = [
        migrations.CreateModel(
            name='Try',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tittle', models.CharField(max_length=100)),
                ('contents', models.CharField(max_length=100)),
            ],
        ),
    ]
