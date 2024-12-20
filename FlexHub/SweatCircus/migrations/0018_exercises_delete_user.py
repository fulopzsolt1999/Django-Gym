# Generated by Django 5.1 on 2024-08-30 13:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('SweatCircus', '0017_remove_user_comment'),
    ]

    operations = [
        migrations.CreateModel(
            name='Exercises',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=250)),
                ('muscle_group', models.CharField(max_length=250)),
                ('image', models.ImageField(blank=True, default='', upload_to='')),
                ('video', models.URLField()),
            ],
            options={
                'verbose_name_plural': 'Gyakorlatok',
            },
        ),
        migrations.DeleteModel(
            name='User',
        ),
    ]
