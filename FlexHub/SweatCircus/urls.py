from django.urls import include, path
from .views import MainPage, GymSearch, PremiumPump, WorkoutPlanUpdate, AboutUs, getSerializedGymAndCityData, getSerializedWorkoutPlansData

urlpatterns = [
    path('', MainPage, name="FlexHub"),
    path('getSerializedGym&CityData/', getSerializedGymAndCityData, name="getSerializedGymAndCityData"),
    path('getSerializedWorkoutPlansData/', getSerializedWorkoutPlansData, name="getSerializedWorkoutPlansData"),
    path('gym-search/', GymSearch, name="GymSearch"),
    path('premium-pump/', PremiumPump, name="PremiumPump"),
    path('premium-pump/workout-plan-update/', WorkoutPlanUpdate, name="WorkoutPlanUpdate"),
    path('about-us/', AboutUs, name="AboutUs"),
]