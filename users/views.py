# users/views.py
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
# Corrected import: Tour is in users.models, not tours.models
from users.models import Tour # Assuming Tour model is defined in users/models.py
from django.http import HttpResponseForbidden
from django.contrib import messages # Added for messages framework

# --- ADDED: The 'home' view function ---
def home(request):
    """
    Renders the home page.
    """
    return render(request, 'users/home.html')
# --- END ADDED ---


# ✅ Visitor registration view
def register_visitor(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.is_visitor = True
            user.save()
            login(request, user)
            messages.success(request, 'Registration successful! You are now logged in.')
            # Corrected redirect: Use namespaced URL 'users:visitor_dashboard'
            return redirect('users:visitor_dashboard')
        else:
            messages.error(request, 'Registration failed. Please correct the errors below.')
    else:
        form = UserCreationForm()

    return render(request, 'users/register.html', {'form': form})


# ✅ Guide dashboard view — shows only tours assigned to that guide
@login_required
def guide_dashboard(request):
    # Ensure the user is a guide
    if not getattr(request.user, 'is_guide', False):
        return HttpResponseForbidden("You are not authorized to view this page.")

    # Corrected field name: Tour model has 'guide', not 'assigned_guide'
    assigned_tours = Tour.objects.filter(guide=request.user)
    # Ensure template path is correct relative to your TEMPLATES settings
    return render(request, 'frontend/guide_dashboard.html', {'tours': assigned_tours})


# ✅ Visitor dashboard view — generic welcome
@login_required
def visitor_dashboard(request):
    # Ensure the user is a visitor
    if not getattr(request.user, 'is_visitor', False):
        return HttpResponseForbidden("You are not authorized to view this page.")

    # Ensure template path is correct relative to your TEMPLATES settings
    return render(request, 'frontend/visitor_dashboard.html')

# Placeholder for profile view (if you still need it as per urls.py)
@login_required
def profile(request):
    """
    Renders the user's profile page.
    """
    context = {
        'user': request.user,
        'message': 'Your Profile'
    }
    return render(request, 'users/profile.html', context)
