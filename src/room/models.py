from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()


class Messages(models.Model):
    author = models.ForeignKey(
        User, related_name="author_message", on_delete=models.CASCADE)
    content = models.TextField()
    timeStamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.author.get_username()

    def get_last_30_messages(self):
        return Messages.objects.order_by("-timeStamp").all()[:30]
