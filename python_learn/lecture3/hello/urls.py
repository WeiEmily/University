from django.urls import path

from . import views
#smae as two page 
urlpatterns = [
    path("", views.index, name="index") ,
   
    path("wei", views.wei, name="wei") ,
     #get the variblw of the url name and then just 
    path("<str:name>", views.greet, name= "greet")
]
