from rest_framework import serializers
from .models import *
from users.serializers import UserSerializer


        
class DiseaseSerializer(serializers.ModelSerializer):
    img = serializers.ImageField(use_url=True)
    
    class Meta:
        model = Disease
        fields = ('title', 'description', 'img', 'short_description')
        
class DoctorDesicionSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True) 
    
    class Meta:
        model = DoctorDesicion
        fields = ('verified_status', 'comment', 'user', 'user_image')
        
class UserImageSerializer(serializers.ModelSerializer):
    file = serializers.ImageField(use_url=True)
    doctor_decision = DoctorDesicionSerializer(source='doctordesicion_set', many=True, read_only=True)
    
    class Meta:
        model = UserImage
        fields = ('name', 'surname', 'user', 'file', 'permission', 'classification', 'doctor_decision', 'probability')         