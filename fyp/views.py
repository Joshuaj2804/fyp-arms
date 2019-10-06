from django.shortcuts import render
from rest_framework import generics, viewsets, mixins
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet, ModelViewSet
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import Group
from .permission import IsAdminUser, IsLoggedInUserOrAdmin, IsAdminOrAnonymousUser
from .models import Labs,Equipment,User
from .serializers import EquipmentSerializer, LabSerializer,UserSerializer,GroupSerializer

  

###################################################
class EquipmentDetails(viewsets.ModelViewSet):
    queryset =Equipment.objects.all()
    serializer_class = EquipmentSerializer

    
class LabDetails(viewsets.ModelViewSet):
    queryset=Labs.objects.all()
    serializer_class = LabSerializer


class UserViewset(viewsets.GenericViewSet,mixins.ListModelMixin,mixins.RetrieveModelMixin):
    queryset=User.objects.all()
    serializer_class=UserSerializer

class GroupViewset(viewsets.GenericViewSet,mixins.ListModelMixin,mixins.RetrieveModelMixin):
    queryset=Group.objects.all()
    serializer_class=GroupSerializer
