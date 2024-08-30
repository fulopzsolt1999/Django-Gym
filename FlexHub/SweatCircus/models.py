from django.db import models
from django.urls import reverse

""" 
   5000-12000Ft -> $
   12000-16000Ft -> $$
   16000-20000Ft -> $$$
   20000Ft< -> $$$$

   After registration
      name, gender, weight, height, intolerants, body goals, comment

   Trainers
      name, gender, weight, height, work place, individual results, if trained competitor (results), prices, client capacity, comment

   Workout plans
      trainer, name, img, exercise, reps, series, comment

   Workout plan images
      workout plan name, chest, shoulder, biceps, triceps, forearm, back, glutes, thight, calf, abs
 """

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
   
class BodyGoals(models.Model):
   name = models.CharField(max_length=250)

   class Meta:
      verbose_name_plural = 'Célok'

   def __str__(self):
      template = '{0.name}'
      return template.format(self)

class Exercises(models.Model):
   name = models.CharField(max_length=250)
   muscle_group = models.CharField(max_length=250)
   image = models.ImageField(default="", blank=True)
   video = models.URLField()

   class Meta:
      verbose_name_plural = 'Gyakorlatok'

   def __str__(self):
      template = '{0.name}'
      return template.format(self)