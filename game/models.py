from django.db import models
from  django.contrib.auth.models import AbstractUser

class CustomeUser(AbstractUser):
    all_battle = models.IntegerField(default=0)
    victory_battles = models.IntegerField(default=0)
    defeat_battles = models.IntegerField(default=0)
    
