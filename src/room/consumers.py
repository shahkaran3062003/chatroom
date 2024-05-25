import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from .models import Messages, User, Channel


class ChannelConsumer(WebsocketConsumer):

    def fetch_messages(self, data):
        # messages = Messages.get_messages(self)
        # print("Channelll name = "+self.ch_name)
        messages = Channel.objects.filter(
            name=self.ch_name).first().get_messages()

        content = {
            'command': "message",
            'messages': self.messages_to_json(messages)
        }

        self.send_chat_message(content)

    def messages_to_json(self, messages):
        result = []

        for message in messages:
            result.append(self.message_to_json(message))

        return result

    def message_to_json(self, message):
        return {
            'author': message.user.get_username(),
            'content': str(message.content),
            'timeStamp': str(message.timeStamp)
        }

    def new_message(self, data):
        author = data['from']
        author_user = User.objects.filter(username=author)[0]
        channel = Channel.objects.filter(name=self.ch_name).first()

        message = Messages.objects.create(
            channel=channel,
            user=author_user,
            content=data['message']
        )

        content = {
            'command': 'new_message',
            'message': self.message_to_json(message)
        }

        return self.send_chat_message(content)

    def send_chat_message(self, message):
        async_to_sync(self.channel_layer.group_send)(
            self.ch_group_name, {
                "type": "chat.message",
                "message": message}
        )

    commands = {
        'fetch_message': fetch_messages,
        'new_message': new_message,
        'send_message': send_chat_message
    }

    def connect(self):
        self.ch_name = self.scope["url_route"]["kwargs"]["channel_name"]
        self.ch_group_name = f"chat_{self.ch_name}"
        async_to_sync(self.channel_layer.group_add)(
            self.ch_group_name, self.channel_name)

        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.ch_group_name, self.channel_name)

    def receive(self, text_data):
        data = json.loads(text_data)
        self.commands[data['command']](self, data)

    def send_messages(self, messages):
        self.send(text_data=json.dump({"message": messages}))

    def chat_message(self, event):
        message = event["message"]
        self.send(text_data=json.dumps({"message": message}))
