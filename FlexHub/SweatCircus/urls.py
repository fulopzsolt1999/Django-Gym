from django.urls import path
from .views import MainPage, GymSearch, PremiumPump, Signup, CustomLoginView, AboutUs

urlpatterns = [
    path('', MainPage, name="FlexHub"),
    path('gym-search/', GymSearch, name="GymSearch"),
    path('premium-pump/', PremiumPump, name="PremiumPump"),
    path('about-us/', AboutUs, name="AboutUs"),
    path('signup/', Signup, name="Signup"),
    path('login/', CustomLoginView.as_view(), name="Login")
]