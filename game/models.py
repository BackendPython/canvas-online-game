from django.db import models
from  django.contrib.auth.models import AbstractUser

class CustomeUser(AbstractUser):
    all_battle = models.IntegerField(default=0)
    victory_battles = models.IntegerField(default=0)
    defeat_battles = models.IntegerField(default=0)

class PlayerModel(models.Model):
    x = models.IntegerField(default=0)
    y = models.IntegerField(default=0)
    vx = models.IntegerField(default=0)
    vy = models.IntegerField(default=0)
    dead = models.BooleanField(default=False)
    orignal_heal = models.IntegerField(default=100)
    turn = models.CharField(max_length=20, default='idle')
    name = models.CharField(max_length=10, default='null')
    
