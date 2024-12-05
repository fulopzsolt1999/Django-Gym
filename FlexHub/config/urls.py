from django.contrib import admin
from django.urls import path, include
from .views import registration_view, index, CustomLoginView
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include("django.contrib.auth.urls")),
    path('', index, name="index"),
    path('', include('SweatCircus.urls')),
    path('accounts/register/', registration_view, name="register"),
    path('accounts/login/', CustomLoginView.as_view(), name="login")
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)