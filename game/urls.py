from django.urls import path
from game.views import *

urlpatterns = [
    path('', home, name='home'),
]
