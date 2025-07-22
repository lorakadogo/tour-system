from django.urls import path
from . import views

urlpatterns = [
    path('book/', views.book_tour, name='book'),
    path('success/', views.success, name='success'),
]