from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm, SetPasswordForm
from django.contrib.auth.views import LoginView, PasswordResetConfirmView
from django.contrib.auth import login
from django import forms
from django.shortcuts import render, redirect, get_object_or_404
from django.urls import reverse_lazy
from django.utils.encoding import force_str
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_decode

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

def PasswordResetConfirmView(request, uidb64=None, token=None):
   try:
      uid = force_str(urlsafe_base64_decode(uidb64))
      user = get_object_or_404(User, pk=uid)
   except (TypeError, ValueError, OverflowError, User.DoesNotExist):
      user = None

   if request.method == 'POST':
      print("CSRF Token in POST request:", request.POST.get('csrfmiddlewaretoken'))
      form = SetPasswordForm(user, request.POST)
      if form.is_valid():
         form.save()
         return redirect('password_reset_complete')
   else:
      form = SetPasswordForm(user)
   return render(request, 'registration/password_reset_confirm.html', {'form': form})