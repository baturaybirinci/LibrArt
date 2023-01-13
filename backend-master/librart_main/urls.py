from django.urls import path
from .views import ContentCreatorAPI, ContentCreatorDetailAPI, CollectionAPI, CollectionDetailAPI, CollectionImageAPI, CollectionImageDetailAPI, NFTAPI, NFTDetailAPI


urlpatterns = [
    path('content-cretor', ContentCreatorAPI.as_view()),
    path('content-cretor/<str:pk>', ContentCreatorDetailAPI.as_view()),

    path('collection', CollectionAPI.as_view()),
    path('collection/<str:pk>', CollectionDetailAPI.as_view()),


    path('collection-image', CollectionImageAPI.as_view()),
    path('collection-image/<str:pk>', CollectionImageDetailAPI.as_view()),

    path('nft', NFTAPI.as_view()),
    path('nft/<str:pk>', NFTDetailAPI.as_view()),
]