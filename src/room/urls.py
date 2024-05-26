
from django.urls import path, re_path

from .views import index, channel, login_user, register, logout_view, join_room, join_channel
from django.conf import settings
from django.conf.urls.static import static

app_name = 'chat'

urlpatterns = [
    path('', index, name="index"),
    path('login/', login_user, name="login"),
    path('register/', register, name="register"),
    path('logout/', logout_view, name="logout"),
    re_path(
        r'^join/(?P<room_id>[A-Za-z0-9_\-]+={0,2})/$', join_room, name="joinRoom"),
    re_path(r'^join/(?P<room_id>[A-Za-z0-9_\-]+={0,2})/(?P<channel_id>[A-Za-z0-9_\-]+={0,2})/$',
            join_channel, name="joinChannel")
    # path("test", view=test, name="test"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
