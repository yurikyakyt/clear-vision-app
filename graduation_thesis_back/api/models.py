from django.db import models
from users.models import User

def upload_path_userimages(instance, filename):
    return '/'.join(['userimages', filename])

def upload_path_diseases(instance, filename):
    return '/'.join(['diseases', filename])

class UserImage(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=100)
    surname = models.CharField(max_length=100)
    file = models.ImageField(upload_to=upload_path_userimages, null=True, blank=True)
    permission = models.BooleanField(null=True, blank=True)
    classification = models.SmallIntegerField()
    probability = models.FloatField()
    
    def __str__(self):
        return self.file
    
class Disease(models.Model):
    title = models.CharField(unique=True, max_length=100)
    description = models.CharField(unique=True, max_length=1000)
    short_description = models.CharField(unique=True, max_length=100)
    img = models.ImageField(upload_to=upload_path_diseases, null=True, blank=True)
    
    def __str__(self):
        return self.title
    
class DoctorDesicion(models.Model):
    verified_status = models.SmallIntegerField(default=0)
    comment = models.CharField(max_length=1000)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False)
    user_image = models.ForeignKey(UserImage, on_delete=models.CASCADE, null=False, blank=False)
    
    
    def __str__(self):
        return str(self.verified_status)