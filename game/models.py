from django.db import models
from  django.contrib.auth.models import AbstractUser

class CustomeUser(AbstractUser):
    all_battle = models.IntegerField(default=0)
    defeat_battles = models.IntegerField(default=0)
    victory_battles = models.IntegerField(default=0)

class ArenaModel(models.Model):
    team_red = models.IntegerField(default=0)
    team_blue = models.IntegerField(default=0)
    won = models.CharField(default='null', max_length=10)
    player_1 = models.CharField(max_length=20, default='null')
    player_2 = models.CharField(max_length=20, default='null')
    player_3 = models.CharField(max_length=20, default='null')
    player_4 = models.CharField(max_length=20, default='null')
    def __str__(self):
        return self.won
    

class PlayerModel(models.Model):
    x = models.IntegerField(default=0)
    y = models.IntegerField(default=0)
    vx = models.IntegerField(default=0)
    vy = models.IntegerField(default=0)
    width = models.IntegerField(default=100)
    height = models.IntegerField(default=100)
    dead = models.BooleanField(default=False)
    arena_id = models.IntegerField(default=0)
    orignal_heal = models.IntegerField(default=100)
    team = models.CharField(default='blue', max_length=10)
    turn = models.CharField(max_length=20, default='idle')
    player = models.CharField(max_length=10, default='null')
    def __str__(self):
        return self.player
    
