from django.urls import include, path
from .views import MainPage, GymSearch, PremiumPump, AboutUs

urlpatterns = [
    path('', MainPage, name="FlexHub"),
    path('gym-search/', GymSearch, name="GymSearch"),
    path('premium-pump/', PremiumPump, name="PremiumPump"),
    path('about-us/', AboutUs, name="AboutUs"),
]