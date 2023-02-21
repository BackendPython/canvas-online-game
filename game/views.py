from game.models import *
from game.serializer import *
from django.shortcuts import render
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

def home(request):
    return render(request, 'index.html')




# ---------------------------------------------------------------- arena REST API ----------------------------------------------------------------

# get carusel
@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def arena(request):
    arena = ArenaModel.objects.all()
    serializer = ArenaApi(arena, many=True)
    return Response(serializer.data)

# add arena
@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def arena_add(request):
    serializer = ArenaApi(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

# search arena with id
@api_view(["GET"])
@permission_classes((permissions.AllowAny, ))
def arena_single(request, pk):
    arena = ArenaModel.objects.get(id=pk)
    serializer = ArenaApi(arena, many=False)
    return Response(serializer.data)

# edit arena
@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def arena_single_edit(request, pk):
    arena = ArenaModel.objects.get(id=pk)
    serializer = ArenaApi(instance=arena, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

# delete arena
@api_view(['DELETE'])
@permission_classes((permissions.AllowAny,))
def arena_single_delete(request, pk):
    krasovka = ArenaModel.objects.get(id=pk)
    krasovka.delete()
    return Response("Successfull deleted")

# ---------------------------------------------------------------- arena REST API ----------------------------------------------------------------

# ---------------------------------------------------------------- player REST API ----------------------------------------------------------------

# get carusel
@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def player(request):
    player = PlayerModel.objects.all()
    serializer = PlayerApi(player, many=True)
    return Response(serializer.data)

# add player
@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def player_add(request):
    serializer = PlayerApi(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

# search player with id
@api_view(["GET"])
@permission_classes((permissions.AllowAny, ))
def player_single(request, pk):
    player = PlayerModel.objects.get(id=pk)
    serializer = PlayerApi(player, many=False)
    return Response(serializer.data)

# edit player
@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def player_single_edit(request, pk):
    player = PlayerModel.objects.get(id=pk)
    serializer = PlayerApi(instance=player, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

# delete player
@api_view(['DELETE'])
@permission_classes((permissions.AllowAny,))
def player_single_delete(request, pk):
    krasovka = PlayerModel.objects.get(id=pk)
    krasovka.delete()
    return Response("Successfull deleted")

# ---------------------------------------------------------------- player REST API ----------------------------------------------------------------
