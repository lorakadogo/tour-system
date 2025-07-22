from django.urls import path
from . import views
from django.contrib.auth.views import LoginView, LogoutView

app_name = 'users'

urlpatterns = [
    path('', views.home, name='home'),

    path('register/', views.register_visitor, name='register'),
    path('login/', LoginView.as_view(template_name='users/login.html', next_page='users:guide_dashboard'), name='login'),
    path('logout/', LogoutView.as_view(next_page='users:login'), name='logout'),

    path('guide_dashboard/', views.guide_dashboard, name='guide_dashboard'),
    path('visitor_dashboard/', views.visitor_dashboard, name='visitor_dashboard'),

    path('submit-tour-report/', views.submit_tour_report, name='submit_tour_report'),
    path('upload-feedback/', views.upload_feedback, name='upload_feedback'),  # ✅ Add this
    path('submit-incident/', views.submit_incident, name='submit_incident'),  # ✅ Add this
    path('generate-gallery/', views.generate_gallery, name='generate_gallery'),  # ✅ Add this
    path('save-itinerary/', views.save_itinerary, name='save_itinerary'),  # ✅ Add this

    path('profile/', views.profile, name='profile'),
]
