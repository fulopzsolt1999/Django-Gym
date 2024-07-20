from django.urls import path
from .views import MainPage, BudgetBiceps, PremiumPump, Signup, CustomLoginView

urlpatterns = [
    path('', MainPage, name="FlexHub"),
    path('budget-biceps/', BudgetBiceps, name="BudgetBiceps"),
    path('premium-pump/', PremiumPump, name="PremiumPump"),
    path('signup/', Signup, name="Signup"),
    path('login/', CustomLoginView.as_view(), name="Login"),
]