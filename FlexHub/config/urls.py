from django.contrib import admin
from django.urls import path, include
from .views import registration_view
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include("django.contrib.auth.urls")),
    path('', include('SweatCircus.urls')),
    path('accounts/register/', registration_view, name="register")
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)