
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('channel/', include("room.urls", namespace='chat')),
    path('', include("room.urls", namespace="home")),
]
