from django.db import models
from django.urls import reverse

""" 
   After registration
      name, gender, weight, height, intolerants, body goals, comment

   Trainers
      name, gender, weight, height, work place, individual results, if trained competitor (results), prices, client capacity, comment

   Workout plans
      trainer, name, img, exercise, reps, series, comment

   Workout plan images
      workout plan name, chest, shoulder, biceps, triceps, forearm, back, glutes, thight, calf, abs
 """

class GymAddress(models.Model):
   city = models.CharField(max_length=250)
   street = models.CharField(max_length=250)
   street_number = models.IntegerField()
   
   class Meta:
      verbose_name_plural = 'Edzőtermek címe'

   def __str__(self):
       return self.city, self.street
   

class Gym(models.Model):
   name = models.CharField(max_length=250)
   address = models.ForeignKey(GymAddress, on_delete=models.CASCADE)
   url = models.URLField()
   price_group = models.CharField(max_length=25)
   comment = models.CharField(max_length=500)

   class Meta:
      verbose_name_plural = 'Edzőtermek'

   def get_absolute_url(self):
      return reverse('article-detail', kwargs={"pk": self.pk})

   def __str__(self):
      return self.name
