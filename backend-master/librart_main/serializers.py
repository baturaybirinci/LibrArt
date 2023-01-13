from rest_framework import serializers
from .models import ContentCreator, Collection, NFT


class ContentCreatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContentCreator
        fields = "__all__"


class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = "__all__"

class CollectionImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = "__all__"


class NFTSerializer(serializers.ModelSerializer):
    class Meta:
        model = NFT
        fields = "__all__"