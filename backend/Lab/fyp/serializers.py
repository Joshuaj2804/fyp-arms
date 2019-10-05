from rest_framework import serializers
from rest_auth.models import TokenModel
from django.contrib.auth.models import Group
from .models import Labs,Equipment,User
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from rest_auth.registration.serializers import RegisterSerializer

class CustomRegisterSerializer(RegisterSerializer):
    groups= serializers.PrimaryKeyRelatedField(required=True,queryset=Group.objects.all())
    def get_cleaned_data(self):
        data_dict = super().get_cleaned_data()
        data_dict['groups'] = self.validated_data.get('groups', '')
        return data_dict



class LabSerializer(serializers.HyperlinkedModelSerializer):
    class Meta :
        model=Labs
        fields=('url','id', 'name','administrator')



class EquipmentSerializer(serializers.HyperlinkedModelSerializer):
    lab=serializers.PrimaryKeyRelatedField(many=False, queryset=Labs.objects.all())
    class Meta :
        model=Equipment
        fields=('url','id', 'name','lab','maintenancedate','comment')



class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        fields = '__all__'
        model=Group



class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        fields = ('url','id', 'first_name', 'last_name', 'username', 'password', 'groups', 'email')
        model = User
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.is_staff = True
        user.save()
        return user



class TokenSerializer(serializers.ModelSerializer):
    user= UserSerializer(many=False,read_only=True)
    class Meta:
        model=TokenModel
        fields=('key','user')


