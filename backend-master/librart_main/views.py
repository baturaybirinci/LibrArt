from rest_framework.response import Response
from rest_framework import status, generics
from .models import User, Collection
from .serializers import UserSerializer, CollectionSerializer
import math
from datetime import datetime


class UserAPI(generics.GenericAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get(self, request):
        users = User.objects.all()
        serializer = self.serializer_class(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response({"message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        

class UserDetailAPI(generics.GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_user(self, pk):
        try:
            return User.objects.get(pk=pk)
        except:
            return None

    def get(self, request, pk):
        user = self.get_user(pk=pk)
        if user is None:
            return Response({"message": f"User with address: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.serializer_class(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, pk):
        user = self.get_user(pk)
        if user == None:
            return Response({"message": f"User with address: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(
            user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        user = self.get_user(pk)
        if user is None:
            return Response({"message": f"User with address: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CollectionAPI(generics.GenericAPIView):
    serializer_class = CollectionSerializer
    queryset = Collection.objects.all()

    def get(self, request):
        req_data = request.GET.dict()
        print(req_data)
        collections = Collection.objects.all().filter(**req_data)
        serializer = self.serializer_class(collections, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response({"message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class CollectionDetailAPI(generics.GenericAPIView):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer

    def get_collection(self, pk):
        try:
            return Collection.objects.get(pk=pk)
        except:
            return None

    def get(self, request, pk):
        collection = self.get_collection(pk=pk)
        if collection is None:
            return Response({"message": f"Collection with address: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.serializer_class(collection)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, pk):
        collection = self.get_collection(pk)
        if collection == None:
            return Response({"message": f"Collection with address: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(
            collection, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        collection = self.get_collection(pk)
        if collection is None:
            return Response({"message": f"Collection with address: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)
        collection.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

