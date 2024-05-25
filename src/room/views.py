from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.db.models import Q
from room.models import RoomParticipant, ChannelParticipant, Messages, Room, Channel


@login_required
def index(request):

    context = {}
    user = request.user
    allRooms = RoomParticipant.objects.filter(user=user).all()
    selectedroom = allRooms.first().room
    # channels = Channel.objects.filter((Q(room=selectedroom)) & (Q(
    #     ChannelParticipant.objects.all() == user))).all()
    channels = []
    selectedChannel = None
    for channel in Channel.objects.filter(room=selectedroom).all():
        if (ChannelParticipant.objects.filter(user=user, channel=channel).exists):
            if (channel.name == "Common"):
                selectedChannel = channel
            channels.append(channel)

    participants = {}
    for channel in channels:
        participants[channel] = ChannelParticipant.objects.filter(
            channel=channel).all()

    print(participants)

    context['user'] = user
    context['allRooms'] = allRooms
    context['selectedroom'] = selectedroom
    context['channels'] = channels
    context['selectedChannel'] = selectedChannel
    context['participants'] = participants

    # allChannels =
    return render(request, "room/basic_1.html", context=context)


@login_required
def channel(request, channel_name):
    # return render(request, "room/channel.html", {"channelName": channel_name, "userName": request.user.username})
    return render(request, "room/basic_1.html", {"channelName": channel_name, "userName": request.user.username})
    # return render(request, "room/channel.html", {"channelName": channel_name})


# def test(request):
#     return render(request, "room/basic_1.html")

def login_user(request):

    context = {}
    if request.method == 'POST':
        data = dict(request.POST)
        username = data['username'][0]
        password = data['login_password'][0]

        user = authenticate(
            request=request, username=username, password=password)

        if user is None:
            context['message'] = "wrong"
        else:
            login(request, user)
            next_page = dict(request.GET)
            if (len(next_page) > 0 and len(next_page['next']) > 0):
                return redirect(next_page['next'][0])
            else:
                return redirect('home:index')
            # return redirect('')

    return render(request, "room/login.html", context=context)


def register(request):
    context = {}
    if request.method == 'POST':
        data = dict(request.POST)
        username = data['username'][0]
        email = data['email'][0]
        password = data['password'][0]

        isUser = User.objects.filter(
            Q(username=username) | Q(email=email)).exists()

        if isUser:
            context['message'] = "wrong"
            print("wrong")
        else:
            new_user = User.objects.create_user(
                username=username, email=email, password=password)
            new_user.save()
            new_room = Room(name="My Room", owner=new_user)
            new_room.save()
            new_channel = Channel(name="Common", owner=new_user)
            new_channel.save()
            roomParticipant = RoomParticipant(user=new_user, room=new_room)
            roomParticipant.save()
            channelParticipant = ChannelParticipant(
                user=new_user, channel=new_channel)
            channelParticipant.save()
            return redirect("home:login")

    return render(request, "room/register.html", context=context)
