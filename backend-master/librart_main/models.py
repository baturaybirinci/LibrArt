from django.db import models
from django.utils.translation import gettext_lazy as _

class User(models.Model):
    class UserType(models.TextChoices):
        MUSEUM = 'MU', _('Museum')
        INDIVIDUAL = 'IN', _('Individual')

    creator_type = models.CharField(
        max_length = 2,
        choices = UserType.choices,
        default = UserType.MUSEUM
    )

    name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    address = models.CharField(max_length=255, primary_key=True)
    avatar = models.ImageField(null=True, blank=True)

    # add banner image

    def get_creator_type(self) -> UserType:
        # Get value from choices enum
        return self.UserType[self.creator_type]



class Collection(models.Model):
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name="collections")
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255, primary_key=True)
    avatar = models.ImageField(null=True, blank=True)
    banner = models.ImageField(null=True, blank=True)

