from django.contrib import admin
from . import models

admin.site.register(models.Gym)
admin.site.register(models.GymAddress)
admin.site.register(models.City)
admin.site.register(models.Days)
admin.site.register(models.MuscleGroups)
admin.site.register(models.Exercises)
admin.site.register(models.WorkoutPlans)
