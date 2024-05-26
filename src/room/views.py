from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.db.models import Q
from room.models import RoomParticipant, ChannelParticipant, Messages, Room, Channel, UserProfile


@login_required
def index(request):

    context = {}
    selectedroom = None
    selectedChannel = None

    if request.method == 'POST':

        print(request.POST)
        print(request.POST.get("name"))
        name = request.POST['type']
        print(name)
        if name == 'addroom':
            roomName = request.POST['roomname']
            new_room = Room.objects.create(name=roomName, owner=request.user)
            new_room.save()
            new_room_part = RoomParticipant.objects.create(
                user=request.user, room=new_room)
            new_room_part.save()

            channel = Channel.objects.create()

            print("new room added")
            return redirect("/")

        if name == 'addChannel':
            roomId = request.POST['roomId']
            channelName = request.POST['channelname']
            room = Room.objects.get(id=roomId)
            newChannel = Channel.objects.create(
                name=channelName, room=room, owner=request.user)
            newChannel.save()
            new_channel_part = ChannelParticipant.objects.create(
                user=request.user, channel=newChannel)
            new_channel_part.save()
            print("new channel added")
            return redirect("/")

        if name == 'editChannel':
            channelId = request.POST['channelId']
            channelName = request.POST['channelname']
            Channel.objects.filter(id=channelId).update(name=channelName)
            print("channel edit")
            return redirect("/")

        if name == "deleteChannel":
            channelId = request.POST['channel_id']
            Channel.objects.filter(id=channelId).delete()
            if 'selected_channel_id' in request.session:
                del request.session['selected_channel_id']
            return redirect("/")

        if name == "deleteMessage":
            messageId = request.POST['messageId']
            mess = Messages.objects.filter(id=messageId)
            if (mess.exists()):
                mess.delete()

        if name == "removeUser":
            userId = request.POST['userId']
            channelId = request.POST['channel_id']

            memberUser = ChannelParticipant.objects.filter(
                user__id=userId, channel__id=channelId)

            if (memberUser.exists()):
                memberUser.delete()

            # return redirect("/")

        change_type = request.POST.get('type')

        if change_type == 'room':
            room_id = request.POST.get('room_id')
            request.session['selected_room_id'] = room_id
            request.session
            if 'selected_channel_id' in request.session:
                del request.session['selected_channel_id']

        elif change_type == 'channel':
            room_id = request.POST.get('room_id')
            channel_id = request.POST.get('channel_id')
            request.session['selected_room_id'] = room_id
            request.session['selected_channel_id'] = channel_id

    user = request.user
    allRooms = RoomParticipant.objects.filter(user=user).all()

    myRoom = Room.objects.filter(owner=user, name="My Room").first()

    if 'selected_room_id' in request.session:
        selectedroom = Room.objects.filter(
            id=request.session['selected_room_id']).first()
    else:
        selectedroom = myRoom

    channels = []

    if 'selected_channel_id' in request.session:
        selectedChannel = Channel.objects.get(
            id=request.session['selected_channel_id'])

        for channel in Channel.objects.filter(room=selectedroom).all():
            print("yes")
            if (ChannelParticipant.objects.filter(user=user, channel=channel).exists):
                channels.append(channel)
    else:
        for channel in Channel.objects.filter(room=selectedroom).all():
            print("yes")
            if (ChannelParticipant.objects.filter(user=user, channel=channel).exists):
                if (channel.name == "Common"):
                    selectedChannel = channel
                channels.append(channel)

    participants = {}
    for channel in channels:
        participants[channel] = ChannelParticipant.objects.filter(
            channel=channel).all()

    context['user'] = user
    context['allRooms'] = allRooms
    context['selectedroom'] = selectedroom
    context['channels'] = channels
    context['selectedChannel'] = selectedChannel
    context['participants'] = participants

    print(allRooms, myRoom, selectedroom,
          selectedChannel, channels, participants)

    return render(request, "room/basic_1.html", context=context)


@login_required
def join_room(request, room_id):
    # room = Room.objects.get(room_id)
    room = Room.objects.get(id=room_id)
    allChanells = Channel.objects.filter(room=room)
    user = request.user
    objRoom = RoomParticipant.objects.filter(room=room, user=user)
    if (not objRoom.exists()):
        print("working....")
        temp = RoomParticipant.objects.create(room=room, user=user)
        temp.save()
        for channel in allChanells:
            obj = ChannelParticipant.objects.filter(user=user, channel=channel)
            if (not obj.exists()):
                print("yess working...")
                temp = ChannelParticipant.objects.create(
                    user=user, channel=channel)
                temp.save()

    return redirect("/")


@login_required
def join_channel(request, room_id, channel_id):
    user = request.user

    obj1 = RoomParticipant.objects.filter(room__id=room_id, user=user)
    obj2 = ChannelParticipant.objects.filter(user=user, channel__id=channel_id)
    if (not obj1.exists()):
        room = Room.objects.get(id=room_id)
        temp = RoomParticipant.objects.create(room=room, user=user)
        temp.save()
        if (not obj2.exists()):
            channel = Channel.objects.get(id=channel_id)
            temp = ChannelParticipant.objects.create(
                user=user, channel=channel)
            temp.save()

    return redirect("/")


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
            # UserProfile.objects.filter(user=user).update(isActive=True)

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
        print(request.FILES)
        profile = request.FILES['profile']
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
            new_user_profile = UserProfile(user=new_user, avatar=profile)
            new_user_profile.save()
            new_room = Room.objects.create(name="My Room", owner=new_user)
            new_room.save()
            new_channel = Channel(name="Common", owner=new_user, room=new_room)
            new_channel.save()
            roomParticipant = RoomParticipant(user=new_user, room=new_room)
            roomParticipant.save()
            channelParticipant = ChannelParticipant(
                user=new_user, channel=new_channel)
            channelParticipant.save()
            return redirect("home:login")

    return render(request, "room/register.html", context=context)


def logout_view(request):
    # UserProfile.objects.filter(user=request.user).update(isActive=False)

    logout(request)
    return redirect("/")
