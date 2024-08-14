from django.contrib import admin
from . import models

admin.site.register(models.Gym)
admin.site.register(models.GymAddress)
admin.site.register(models.City)
admin.site.register(models.BodyGoals)
admin.site.register(models.User)
