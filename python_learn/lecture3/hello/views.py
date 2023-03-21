from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
def index(request):
    #not just response , render a  html file page 
    return render(request, "hello/index.html")

def wei(request):
    return HttpResponse("Ran yunhao and wei ")

def greet(request , name):
    return render(request, "hello/greet.html", {"name": name.capitalize()})