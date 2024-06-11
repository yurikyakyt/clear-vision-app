from .views import RegisterViewset, LoginViewset, UserViewset, LogoutViewset
from django.urls import path
from rest_framework.routers import DefaultRouter
from django.urls import path, include

router = DefaultRouter()
router.register('register', RegisterViewset, basename='register')
router.register('login', LoginViewset, basename='login')
router.register('user', UserViewset, basename='user')
router.register('logout', LogoutViewset, basename='logout')

urlpatterns = [
    path('', include(router.urls))
]