from django.urls import include, path
from .views import MainPage, GymSearch, PremiumPump, AboutUs, getSerializedGymAndCityData, getSerializedWorkoutPlansData, getSerializedExercisesData, DeleteExercise, CreateWorkoutPlan

urlpatterns = [
    path('', MainPage, name="FlexHub"),
    path('getSerializedGym&CityData/', getSerializedGymAndCityData, name="getSerializedGymAndCityData"),
    path('getSerializedWorkoutPlansData/', getSerializedWorkoutPlansData, name="getSerializedWorkoutPlansData"),
    path('getSerializedExercisesData/', getSerializedExercisesData, name="getSerializedExercisesData"),
    path("createWorkoutPlan/", CreateWorkoutPlan, name="CreateWorkoutPlan"),
    path('deleteExercise/<str:id>', DeleteExercise, name="deleteExercise"),
    path('gym-search/', GymSearch, name="GymSearch"),
    path('premium-pump/', PremiumPump, name="PremiumPump"),
    path('about-us/', AboutUs, name="AboutUs"),
]