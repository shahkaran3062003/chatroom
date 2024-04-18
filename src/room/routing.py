from django.urls import re_path

from .consumers import ChannelConsumer


websocket_urlpatterns = [
    re_path(r"ws/channel/(?P<channel_name>\w+)/$", ChannelConsumer.as_asgi()),
]
