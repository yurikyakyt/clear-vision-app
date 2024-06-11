from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets, permissions
from django.shortcuts import get_object_or_404
from .serializers import *
from rest_framework.response import Response
from .models import *
from users.models import User
import tensorflow as tf
from tensorflow import keras
import numpy as np
from matplotlib.pyplot import imshow
from PIL import Image
from rest_framework.decorators import action
import os
import rembg
from django.http import QueryDict
from urllib.parse import urlencode



class UserImageViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = UserImage.objects.all()
    serializer_class = UserImageSerializer
    model_path = os.path.join(os.path.dirname(__file__), '../static/cnn/modelResNet50PreIdeal.h5')
    model = tf.keras.models.load_model(model_path)
    
    def list(self, request):
        queryset = self.queryset
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def get_history(self, request):
        email = request.query_params.get('email')
        user = User.objects.get(email=email)
        userimages = UserImage.objects.filter(user=user)
        serializer = self.serializer_class(userimages, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def get_checked_userimages(self, request):
        email = request.query_params.get('email')
        doctor = User.objects.get(email=email)
        checked_userimages = UserImage.objects.filter(doctordesicion__user=doctor)
        serializer = UserImageSerializer(checked_userimages, many=True)
        return Response(serializer.data)
     
    @action(detail=False, methods=['get'])
    def get_unchecked_userimages(self, request):
        email = request.query_params.get('email')
        doctor = User.objects.get(email=email)
        unchecked_userimages = UserImage.objects.filter(permission=1).exclude(doctordesicion__user=doctor).exclude(user_id=doctor)
        serializer = self.serializer_class(unchecked_userimages, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['delete'])
    def delete_userimage(self, request):
        file_path = request.query_params.get('file')
        file_name = os.path.basename(file_path)
        file_name = 'userimages/'+ file_name
        req = UserImage.objects.get(file=file_name)
        req.delete()
        full_file_path = os.path.join('media', file_name)
        os.remove(full_file_path)
        return Response('Ok')
    
    @action(detail=False, methods=['post'])
    def update_verified_status(self, request):
        file = request.data.get('file')
        trimmed_path = file.replace('/media/', '')
        verified_status = request.data.get('verified_status')
        print(trimmed_path)
        print(verified_status)
        
        user_image = get_object_or_404(UserImage, file=trimmed_path)
        user_image.verified_status = verified_status  
        user_image.save()

        return Response('Ok')

    def create(self, request):
        data = request.data.copy()
        data.pop("email", None)
        
        if(request.data.get("email")):
            user = User.objects.get(email=request.data.get("email"))
            data["user"] = user.id
        else:
            data["user"] = None
            
        image = request.data.get("file")
        img = Image.open(image)
        x = np.array(img.resize((256,256)))
        x = x.reshape(1,256,256,3)
        res = self.model.predict_on_batch(x)
        classification = np.where(res == np.amax(res))[1][0]
        probability = np.amax(res) * 100
        data["probability"] = probability
        data["classification"] = classification
        data["verified_status"] = 0
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            if(request.data.get("email")):
                serializer.save()
            return Response({'result': classification, 'probability': probability})
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        userImage = self.queryset.get(pk=pk)
        serializer = self.serializer_class(userImage)
        return Response(serializer.data)

    def update(self, request, pk=None):
        userImage = self.queryset.get(pk=pk)
        serializer = self.serializer_class(userImage, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        userImage = self.queryset.get(pk=pk)
        userImage.delete()
        return Response(status=204)


class DiseaseViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Disease.objects.all()
    serializer_class = DiseaseSerializer
    
    def list(self, request):
        queryset = self.queryset
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response("OK")

    def retrieve(self, request, pk=None):
        queryset = Disease.objects.all()
        disease = get_object_or_404(queryset, pk=pk)
        serializer = DiseaseSerializer(disease)
        return Response(serializer.data)
    
class DoctorDesicionViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = DoctorDesicion.objects.all()
    serializer_class = DoctorDesicionSerializer
    
    def list(self, request):
        queryset = self.queryset
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        user = User.objects.get(email=request.data.get('email'))
        file=request.data.get('file')
        trimmed_path = file.replace('/media/', '')
        userimage = UserImage.objects.get(file=trimmed_path)
        userimage_id = userimage.id
        my_dict = {'verified_status': request.data.get('verifiedStatus'), 'comment': request.data.get('comment'), 'user_image': userimage_id}
        serializer = self.serializer_class(data=my_dict)
        if serializer.is_valid():
            serializer.save(user_id=user.id)
        return Response("OK")
    
    @action(detail=False, methods=['get'])
    def get_doctor_desicions(self, request):
        file = request.query_params.get('file')
        trimmed_path = file.replace('/media/', '')
        userimage = UserImage.objects.get(file=trimmed_path)
        doctor_desicions = DoctorDesicion.objects.filter(user_image=userimage)
        serializer = DoctorDesicionSerializer(doctor_desicions, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Disease.objects.all()
        disease = get_object_or_404(queryset, pk=pk)
        serializer = DiseaseSerializer(disease)
        return Response(serializer.data)