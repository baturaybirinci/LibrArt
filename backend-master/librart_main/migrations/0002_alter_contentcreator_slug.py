# Generated by Django 4.1.5 on 2023-01-07 16:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('librart_main', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='contentcreator',
            name='slug',
            field=models.SlugField(blank=True, max_length=255, null=True),
        ),
    ]
