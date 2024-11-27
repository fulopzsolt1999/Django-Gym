from django.db import models
from django.urls import reverse
from django.contrib.auth.models import User

class City(models.Model):
   name = models.CharField(max_length=250)

   class Meta:
      verbose_name_plural = 'Városok'

   def __str__(self):
      template = '{0.name}'
      return template.format(self)

class GymAddress(models.Model):
   city_name = models.ForeignKey(City, on_delete=models.CASCADE, default="-")
   street = models.CharField(max_length=250)
   street_number = models.CharField(max_length=50)
   
   class Meta:
      verbose_name_plural = 'Edzőtermek címe'

   def __str__(self):
      template = '{0.city_name} {0.street} {0.street_number}'
      return template.format(self)
   
class Gym(models.Model):
   name = models.CharField(max_length=250)
   address = models.ForeignKey(GymAddress, on_delete=models.CASCADE, default="-")
   url = models.URLField()
   price_group = models.CharField(max_length=25)

   class Meta:
      verbose_name_plural = 'Edzőtermek'

   def get_absolute_url(self):
      return reverse('article-detail', kwargs={"pk": self.pk})

   def __str__(self):
      template = '{0.name}'
      return template.format(self)
   
class MuscleGroups(models.Model):
   name = models.CharField(max_length=250)

   class Meta:
      verbose_name_plural = 'Izomcsoportok'

   def __str__(self):
      template = '{0.name}'
      return template.format(self)
   
class Days(models.Model):
   name = models.CharField(max_length=250)

   class Meta:
      verbose_name_plural = 'Napok'

   def __str__(self):
      template = '{0.name}'
      return template.format(self)

class Exercises(models.Model):
   name = models.CharField(max_length=250)
   muscle_group = models.ForeignKey(MuscleGroups, on_delete=models.CASCADE)
   image = models.ImageField(default="", blank=True)
   video = models.URLField()

   class Meta:
      verbose_name_plural = 'Gyakorlatok'

   def __str__(self):
      template = '{0.name}'
      return template.format(self)

class WorkoutPlans(models.Model):
   userName = models.ForeignKey(User, on_delete=models.CASCADE)
   day = models.ForeignKey(Days, on_delete=models.CASCADE)
   muscleGroupName = models.ForeignKey(MuscleGroups, on_delete=models.CASCADE)
   exerciseName = models.ForeignKey(Exercises, on_delete=models.CASCADE)
   series = models.CharField(max_length=250)
   reps = models.CharField(max_length=250)
   comment = models.TextField(default="")

   class Meta:
      verbose_name_plural = 'Edzés tervek'

   def __str__(self):
      template = '{0.id} {0.userName}'
      return template.format(self)