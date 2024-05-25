
from django.urls import path, include

from .views import index, channel

app_name = 'chat'

urlpatterns = [
    path('', index, name="index"),
    path("<str:channel_name>/", view=channel, name="channel")
    # path("test", view=test, name="test"),
]
