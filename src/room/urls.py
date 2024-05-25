
from django.urls import path, include

from .views import index, channel, login_user, register

app_name = 'chat'

urlpatterns = [
    path('', index, name="index"),
    path('login/', login_user, name="login"),
    path('register/', register, name="register"),
    path("<str:channel_name>/", view=channel, name="channel")
    # path("test", view=test, name="test"),
]
