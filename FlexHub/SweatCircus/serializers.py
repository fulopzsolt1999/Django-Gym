from rest_framework import serializers
from .models import City, GymAddress, Gym, Days, MuscleGroups, Exercises, WorkoutPlans

class CitySerializer(serializers.ModelSerializer):
   class Meta:
      model = City
      fields = '__all__'

class GymAddressSerializer(serializers.ModelSerializer):
   class Meta:
      model = GymAddress
      fields = '__all__'
      depth = 1

class GymSerializer(serializers.ModelSerializer):
   class Meta:
      model = Gym
      fields = '__all__'
      depth = 2

class DaysSerializer(serializers.ModelSerializer):
   class Meta:
      model = Days
      fields = '__all__'

class MuscleGroupsSerializer(serializers.ModelSerializer):
   class Meta:
      model = MuscleGroups
      fields = '__all__'

class ExercisesSerializer(serializers.ModelSerializer):
   class Meta:
      model = Exercises
      fields = '__all__'
      depth = 1

class WorkoutPlansSerializer(serializers.ModelSerializer):
   class Meta:
      model = WorkoutPlans
      fields = '__all__'
      depth = 1