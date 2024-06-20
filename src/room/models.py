from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to='images/')
    isActive = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username}"


class Room(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(
        User, related_name='owned_rooms', on_delete=models.CASCADE)
    participants = models.ManyToManyField(
        User, related_name='rooms', through='RoomParticipant')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name}-{self.id}"


class Channel(models.Model):
    name = models.CharField(max_length=100)
    room = models.ForeignKey(
        Room, related_name='channels', on_delete=models.CASCADE)
    owner = models.ForeignKey(
        User, related_name='owned_channels', on_delete=models.CASCADE)
    participants = models.ManyToManyField(
        User, related_name='participants', through='ChannelParticipant')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.id}"

    def get_messages(self):
        return self.messages.order_by('timeStamp')


class RoomParticipant(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    joined_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'room')

    def __str__(self):
        return f"{self.room.name} - {self.user.username}"


class ChannelParticipant(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE)
    joined_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'channel')

    def __str__(self):
        return f"{self.channel.name} - {self.user.username} - {self.channel.id}"


class Messages(models.Model):
    channel = models.ForeignKey(
        Channel, related_name='messages', on_delete=models.CASCADE)
    user = models.ForeignKey(
        User, related_name='messages', on_delete=models.CASCADE)
    content = models.TextField()
    timeStamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Message by {self.user.username} in {self.channel.name}'


# class Messages(models.Model):
#     author = models.ForeignKey(
#         User, related_name="author_message", on_delete=models.CASCADE)
#     content = models.TextField()
#     timeStamp = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return self.author.get_username()

#     def get_messages(self):
#         return Messages.objects.order_by("timeStamp")
