from django.shortcuts import render
from django.contrib.auth.decorators import login_required


def index(request):
    return render(request, "room/index.html", {})


@login_required
def channel(request, channel_name):
    return render(request, "room/channel.html", {"channelName": channel_name, "userName": request.user.username})
