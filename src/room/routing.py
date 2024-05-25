from django.urls import path

from .consumers import ChannelConsumer


websocket_urlpatterns = [
    path(r"ws/room/<int:room_id>/<int:channel_id>/", ChannelConsumer.as_asgi()),
]
