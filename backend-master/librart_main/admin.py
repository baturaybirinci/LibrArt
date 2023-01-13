from django.contrib import admin
from .models import ContentCreator, Collection, CollectionImage, NFT


class ContentCreatorModelAdmin(admin.ModelAdmin):
    list_display = ('name', 'address', 'slug', 'created_at')
    search_fields = ('name', 'address')
    list_per_page = 25


class CollectionModelAdmin(admin.ModelAdmin):
    list_display = ('name', 'creator', 'created_at', 'updated_at')
    search_fields = ('name', 'creator__name')
    list_per_page = 25

class CollectionImageModelAdmin(admin.ModelAdmin):
    list_display = ('name', 'owned_by', 'created_at', 'updated_at')
    search_fields = ('name', 'owned_by__name')
    list_per_page = 25


admin.site.register(ContentCreator, ContentCreatorModelAdmin)
admin.site.register(CollectionImage, CollectionImageModelAdmin)
admin.site.register(Collection, CollectionModelAdmin)
admin.site.register(NFT)