from dataclasses import fields
from rest_framework import serializers
from game.models import *

class ArenaApi(serializers.ModelSerializer):
    class Meta:
        model = ArenaModel
        fields = '__all__'
        
class PlayerApi(serializers.ModelSerializer):
    class Meta:
        model = PlayerModel
        fields = '__all__'