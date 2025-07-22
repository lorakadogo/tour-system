# users/urls.py
from django.urls import path
from . import views # Correctly imports views from the current app
from django.contrib.auth.views import LoginView, LogoutView

app_name = 'users' # Essential for namespacing

urlpatterns = [
    # Home page
    path('', views.home, name='home'),

    # User authentication paths
    path('register/', views.register_visitor, name='register'),
    path('login/', LoginView.as_view(template_name='users/login.html'), name='login'),
    path('logout/', LogoutView.as_view(next_page='users:login'), name='logout'),

    # Dashboard paths
    path('dashboard/guide/', views.guide_dashboard, name='guide_dashboard'),
    path('dashboard/visitor/', views.visitor_dashboard, name='visitor_dashboard'),
    path('guide_dashboard/', views.guide_dashboard, name='guide_dashboard'),



    # User profile path
    path('profile/', views.profile, name='profile'),

    # Add other user-related URLs here as needed
]
