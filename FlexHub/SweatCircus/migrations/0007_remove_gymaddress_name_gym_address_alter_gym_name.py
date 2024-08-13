# Generated by Django 5.1 on 2024-08-13 12:53

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('SweatCircus', '0006_remove_gym_address_gymaddress_name_alter_gym_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='gymaddress',
            name='name',
        ),
        migrations.AddField(
            model_name='gym',
            name='address',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='SweatCircus.gymaddress'),
        ),
        migrations.AlterField(
            model_name='gym',
            name='name',
            field=models.CharField(max_length=250),
        ),
    ]
