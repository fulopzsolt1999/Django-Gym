# Generated by Django 5.1 on 2024-08-14 14:18

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('SweatCircus', '0013_user'),
    ]

    operations = [
        migrations.CreateModel(
            name='BodyGoals',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=250)),
            ],
            options={
                'verbose_name_plural': 'Célok',
            },
        ),
        migrations.AlterField(
            model_name='gym',
            name='address',
            field=models.ForeignKey(default='-', on_delete=django.db.models.deletion.CASCADE, to='SweatCircus.gymaddress'),
        ),
        migrations.AlterField(
            model_name='gymaddress',
            name='city_name',
            field=models.ForeignKey(default='-', on_delete=django.db.models.deletion.CASCADE, to='SweatCircus.city'),
        ),
        migrations.AlterField(
            model_name='user',
            name='body_goals',
            field=models.ForeignKey(default='-', on_delete=django.db.models.deletion.CASCADE, to='SweatCircus.bodygoals'),
        ),
    ]
