from django import forms
from django.forms import ModelForm

from .models import Labs,Equipment,User



class UserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = '__all__'

class LabForm(forms.ModelForm):

    class Meta:
        model = Labs
        fields = ('labcode', 'name','administrator')

class EqpForm(forms.ModelForm):
    class Meta:
        model = Equipment
        fields=('name','lab','maintenancedate')


