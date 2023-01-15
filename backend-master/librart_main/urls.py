from django.urls import path
from .views import UserAPI, UserDetailAPI, CollectionAPI, CollectionDetailAPI, IPFSMetadataAPI, InsertCollectionAPI


urlpatterns = [
    path('user/', UserAPI.as_view()),
    path('user/<str:pk>/', UserDetailAPI.as_view()),

    path('collection/', CollectionAPI.as_view()),
    path('collection/<str:pk>/', CollectionDetailAPI.as_view()),

    path('ipfs_metadata/', IPFSMetadataAPI.as_view()),

    path('insert_collection/', InsertCollectionAPI.as_view(), name='insert_collection'),

]