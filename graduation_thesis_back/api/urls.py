from django.urls import path, include
from .views import *
from django.contrib import admin
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register('userimage', UserImageViewset, basename='userImage')
router.register('disease', DiseaseViewset, basename='disease')
router.register('doctorDesicion', DoctorDesicionViewset, basename='doctorDesicion')



urlpatterns = [
    path('', include(router.urls))
]


