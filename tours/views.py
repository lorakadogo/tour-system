from django.shortcuts import render, redirect

# Create your views here.
from .models import Tour

def guide_dashboard(request):
    if request.user.is_authenticated and request.user.is_guide:
        assigned_tours = Tour.objects.filter(assigned_guide=request.user)
        return render(request, 'users/guide_dashboard.html', {'tours': assigned_tours})
    else:
        return redirect('login')