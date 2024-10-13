from django.urls import include, path
from .views import MainPage, GymSearch, PremiumPump, AboutUs, getSerializedGymAndCityData

urlpatterns = [
    path('', MainPage, name="FlexHub"),
    path('getSerializedGym&CityData/', getSerializedGymAndCityData, name="getSerializedGymAndCityData"),
    path('gym-search/', GymSearch, name="GymSearch"),
    path('premium-pump/', PremiumPump, name="PremiumPump"),
    path('about-us/', AboutUs, name="AboutUs"),
]