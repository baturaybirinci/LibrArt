from django.db import models
from django.utils.translation import gettext_lazy as _
from django.template.defaultfilters import slugify
from django.core.validators import MaxValueValidator, MinValueValidator

def current_year():
    return datetime.date.today().year

def max_value_current_year(value):
    return MaxValueValidator(current_year())(value)    

class ContentCreator(models.Model):
    class CreatorType(models.TextChoices):
        MUSEUM = 'MU', _('Museum')
        INDIVIDUAL = 'IN', _('Individual')
    
    creator_type = models.CharField(
        max_length = 2,
        choices = CreatorType.choices,
        default = CreatorType.MUSEUM
    )

    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add = True)

    # add banner image

    def get_creator_type(self) -> CreatorType:
        # Get value from choices enum
        return self.CreatorType[self.creator_type]

    def __str__(self):
        return self.slug

    def save(self, *args, **kwargs):
        to_assign = slugify(self.name)

        if ContentCreator.objects.filter(slug = to_assign).exists():
            to_assign = f'{to_assign}-{ContentCreator.objects.all().count()}'

        self.slug = to_assign
        super().save(*args, **kwargs)


class Collection(models.Model):
    owned_by = models.ForeignKey(ContentCreator, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)
    def save(self, *args, **kwargs):
        to_assign = slugify(self.name)

        if ContentCreator.objects.filter(slug = to_assign).exists():
            to_assign = f'{to_assign}-{ContentCreator.objects.all().count()}'

        self.slug = to_assign
        super().save(*args, **kwargs)

class CollectionImage(models.Model):
    owned_by = models.ForeignKey(Collection, on_delete=models.CASCADE)
    path = models.FilePathField(path="/images", match=None, recursive=False, max_length=255)
    image_type = models.CharField(max_length=255)
    year = models.IntegerField(_('year'), validators=[MinValueValidator(1984), max_value_current_year])
    name = models.CharField(max_length=255)
    artist = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)
    def save(self, *args, **kwargs):
        to_assign = slugify(self.name)

        if ContentCreator.objects.filter(slug = to_assign).exists():
            to_assign = f'{to_assign}-{ContentCreator.objects.all().count()}'

        self.slug = to_assign
        super().save(*args, **kwargs)

class NFT(models.Model):
    name = models.CharField(max_length=255)

    