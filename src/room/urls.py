
from django.urls import path, include

from .views import index, channel, login_user, register, logout_view, join_room, join_channel
from django.conf import settings
from django.conf.urls.static import static

app_name = 'chat'

urlpatterns = [
    path('', index, name="index"),
    path('login/', login_user, name="login"),
    path('register/', register, name="register"),
    path('logout/', logout_view, name="logout"),
    path('join/<int:room_id>/', join_room, name="joinRoom"),
    path('join/<int:room_id>/<int:channel_id>/',
         join_channel, name="joinChannel")
    # path("test", view=test, name="test"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
