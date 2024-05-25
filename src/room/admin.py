from django.contrib import admin
from .models import Room, Channel, ChannelParticipant, RoomParticipant, Messages


# admin.site.register(Room)
# admin.site.register(Channel)
# admin.site.register(ChannelParticipant)
# admin.site.register(RoomParticipant)
# admin.site.register(Messages)

class RoomParticipantInline(admin.TabularInline):
    model = RoomParticipant
    extra = 1  # Number of extra forms to display


class ChannelParticipantInline(admin.TabularInline):
    model = ChannelParticipant
    extra = 1  # Number of extra forms to display


class RoomAdmin(admin.ModelAdmin):
    list_display = ('name', 'owner', 'created_at')
    inlines = [RoomParticipantInline]


class ChannelAdmin(admin.ModelAdmin):
    list_display = ('name', 'room', 'owner', 'created_at')
    inlines = [ChannelParticipantInline]


class MessageAdmin(admin.ModelAdmin):
    list_display = ('channel', 'user', 'content', 'timeStamp')
    list_filter = ('channel', 'user', 'timeStamp')


admin.site.register(Room, RoomAdmin)
admin.site.register(Channel, ChannelAdmin)
admin.site.register(RoomParticipant)
admin.site.register(ChannelParticipant)
admin.site.register(Messages, MessageAdmin)
