from django.urls import path
from game.views import *

urlpatterns = [
    path('', home, name='home'),
    path('arena', arena, name='arena'),
    path('arena-add', arena_add, name='arena_add'),
    path('arena-<int:pk>', arena_single, name='arena_single'),
    path('arena-edit-<int:pk>', arena_single_edit, name='arena_single_edit'),
    path('arena-delete-<int:pk>', arena_single_delete, name='arena_single_delete'),
    
    path('player', player, name='player'),
    path('player-add', player_add, name='player_add'),
    path('player-<int:pk>', player_single, name='player_single'),
    path('player-edit-<int:pk>', player_single_edit, name='player_single_edit'),
    path('player-delete-<int:pk>', player_single_delete, name='player_single_delete'),
]
