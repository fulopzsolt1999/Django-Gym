from django.urls import path
from .views import MainPage, GymSearch, PremiumPump, Signup, Login, AboutUs, ForgotPassword

urlpatterns = [
    path('', MainPage, name="FlexHub"),
    path('gym-search/', GymSearch, name="GymSearch"),
    path('premium-pump/', PremiumPump, name="PremiumPump"),
    path('about-us/', AboutUs, name="AboutUs"),
    path('signup/', Signup, name="Signup"),
    path('login/', Login, name="Login"),
    path('login/forgot-password', ForgotPassword, name="ForgotPassword")
]