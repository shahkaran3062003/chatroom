from django.shortcuts import render


def index(request):
    return render(request, "room/index.html", {})


def channel(request, channel_name):
    return render(request, "room/channel.html", {"channelName": channel_name})
