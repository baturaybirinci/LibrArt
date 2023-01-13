from django.urls import path
from .views import UserAPI, UserDetailAPI, CollectionAPI, CollectionDetailAPI


urlpatterns = [
    path('user/', UserAPI.as_view()),
    path('user/<str:pk>/', UserDetailAPI.as_view()),

    path('collection/', CollectionAPI.as_view()),
    path('collection/<str:pk>/', CollectionDetailAPI.as_view()),

]