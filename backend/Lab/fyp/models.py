from django.db import models
from django.contrib.auth.models import AbstractUser, Group

class User(AbstractUser):
    groups = models.ForeignKey(Group, on_delete=models.CASCADE)
    email = models.EmailField(max_length=50, unique=True)

    REQUIRED_FIELDS = ['groups_id', 'email']

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'

    def get_full_name(self):
        return '%s %s' % (self.first_name, self.last_name)

    def get_short_name(self):
        return self.first_name

    def __str__(self):
        return self.username


class Labs(models.Model):
    name = models.CharField(max_length=100)
    administrator = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Equipment(models.Model):
    equipcode=models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    maintenancedate=models.DateField()
    comment=models.CharField(max_length=500)
    qrcodestring=models.CharField(max_length=2048)
    lab=models.ForeignKey(Labs, on_delete=models.PROTECT, related_name='equipment')

    def __str__ (self):
        return self.name+' '+self.equipcode



