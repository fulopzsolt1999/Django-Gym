from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login
from django import forms
from django.shortcuts import render, redirect

class RegistrationForm(UserCreationForm):
   email = forms.EmailField(required=True)

   class Meta:
      model = User
      fields = ("username", "email", "first_name", "last_name", "password1", "password2")

def registration_view(request):
   if request.method == "POST":
      form = RegistrationForm(request.POST)
      if form.is_valid():
         form.save()
         return render(request, "premiumPump.html")
   else:
      form = RegistrationForm()
   return render(request, "registration/register.html", {"form": form})