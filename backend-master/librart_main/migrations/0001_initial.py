# Generated by Django 4.1.5 on 2023-01-13 22:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('creator_type', models.CharField(choices=[('MU', 'Museum'), ('IN', 'Individual')], default='MU', max_length=2)),
                ('username', models.CharField(max_length=255)),
                ('name', models.CharField(max_length=255)),
                ('last_name', models.CharField(max_length=255)),
                ('address', models.CharField(max_length=255, primary_key=True, serialize=False)),
                ('avatar', models.ImageField(blank=True, null=True, upload_to='')),
            ],
        ),
        migrations.CreateModel(
            name='Collection',
            fields=[
                ('name', models.CharField(max_length=255)),
                ('address', models.CharField(max_length=255, primary_key=True, serialize=False)),
                ('avatar', models.ImageField(blank=True, null=True, upload_to='')),
                ('banner', models.ImageField(blank=True, null=True, upload_to='')),
                ('creator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='collections', to='librart_main.user')),
            ],
        ),
    ]
