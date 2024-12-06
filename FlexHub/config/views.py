from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.views import LoginView
from django.contrib.auth import login
from django import forms
from django.shortcuts import render, redirect
from pyexpat.errors import messages

class RegistrationForm(UserCreationForm):
   username = forms.CharField(
      required = True, 
      widget = forms.TextInput(attrs={'class': 'form-control'}))
   email = forms.EmailField(
      required = True,
       widget=forms.EmailInput(attrs={'class': 'form-control'}))
   first_name = forms.CharField(
      required = True, 
      widget = forms.TextInput(attrs={'class': 'form-control'}))
   last_name = forms.CharField(
      required=True, 
      widget = forms.TextInput(attrs={'class': 'form-control'}))
   password1 = forms.CharField(
      required = True, 
      widget = forms.PasswordInput(attrs={'class': 'form-control'}))
   password2 = forms.CharField(
      required = True, 
      widget = forms.PasswordInput(attrs={'class': 'form-control'}))

   class Meta:
      model = User
      fields = ["username", "email", "first_name", "last_name", "password1", "password2"]

class LoginForm(AuthenticationForm):
   class Meta:
      model = User
      fields = ['username', 'password']
      widgets = { 
         'username': forms.TextInput(attrs={'class': 'form-control'}),
         'password': forms.PasswordInput(attrs={'class': 'form-control'}) }

class CustomLoginView(LoginView):
   form_class = LoginForm
   template_name = 'registration/login.html'

def registration_view(request):
   if request.method == "POST":
      form = RegistrationForm(request.POST)
      if form.is_valid():
         print(User.objects.filter(email=form.cleaned_data['email']))
         if User.objects.filter(email=form.cleaned_data['email']).exists():
            form.add_error('email', "Ezzel az email címmel már regisztráltak!")
            return render(request, 'registration/register.html', {'form': form})
         else:
            user = form.save()
            login(request, user)
            return redirect("index")
   else:
      form = RegistrationForm()
   return render(request, "registration/register.html", {"form": form})

def index(request):
   return render(request, "base.html")