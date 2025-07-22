# users/views.py
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy
from users.models import Tour # Assuming Tour model is defined in users/models.py
from django.http import HttpResponseForbidden, JsonResponse # Added JsonResponse for potential API responses

# --- Existing 'home' view ---
def home(request):
    """
    Renders the home page.
    """
    return render(request, 'users/home.html')
# --- End existing 'home' view ---


# ✅ Visitor registration view
def register_visitor(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.is_visitor = True
            user.save()
            from django.contrib.auth import login
            login(request, user)
            messages.success(request, 'Registration successful! You are now logged in.')
            return redirect('users:visitor_dashboard')
        else:
            messages.error(request, 'Registration failed. Please correct the errors below.')
    else:
        form = UserCreationForm()

    return render(request, 'users/register.html', {'form': form})


# ✅ Guide dashboard view — shows only tours assigned to that guide
@login_required
def guide_dashboard(request):
    if not getattr(request.user, 'is_guide', False):
        return HttpResponseForbidden("You are not authorized to view this page.")

    assigned_tours = Tour.objects.filter(guide=request.user)
    return render(request, 'users/guide_dashboard.html', {'tours': assigned_tours})


# ✅ Visitor dashboard view — generic welcome
@login_required
def visitor_dashboard(request):
    if not getattr(request.user, 'is_visitor', False):
        return HttpResponseForbidden("You are not authorized to view this page.")

    return render(request, 'users/visitor_dashboard.html')


# ✅ Submit Tour Report View
@login_required
def submit_tour_report(request):
    if not getattr(request.user, 'is_guide', False):
        return HttpResponseForbidden("Only guides can submit tour reports.")

    if request.method == 'POST':
        # In a real application, process the report data (e.g., save to a model)
        report_content = request.POST.get('report')
        # Example: print(f"Guide {request.user.username} submitted report: {report_content}")
        messages.success(request, 'Tour report submitted successfully!')
        return redirect('users:guide_dashboard')
    
    # This view is typically called via a modal form submission, so a direct GET might not be common
    # but we render a simple response if accessed directly.
    return render(request, 'users/submit_tour_report.html')


# --- NEW: Placeholder views for other dashboard functionalities ---

@login_required
def upload_feedback(request):
    if not getattr(request.user, 'is_guide', False):
        return HttpResponseForbidden("Only guides can upload feedback.")
    if request.method == 'POST':
        # Handle file upload logic here
        messages.success(request, 'Feedback uploaded successfully!')
        return redirect('users:guide_dashboard') # Or a success page
    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)

@login_required
def submit_incident(request):
    if not getattr(request.user, 'is_guide', False):
        return HttpResponseForbidden("Only guides can submit incident reports.")
    if request.method == 'POST':
        # Handle incident report submission logic here
        messages.success(request, 'Incident report submitted successfully!')
        return redirect('users:guide_dashboard')
    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)

@login_required
def generate_gallery(request):
    if not getattr(request.user, 'is_guide', False):
        return HttpResponseForbidden("Only guides can generate galleries.")
    if request.method == 'POST':
        # Handle media gallery generation logic here
        messages.success(request, 'Media gallery generated!')
        return redirect('users:guide_dashboard')
    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)

@login_required
def save_itinerary(request):
    if not getattr(request.user, 'is_guide', False):
        return HttpResponseForbidden("Only guides can save itineraries.")
    if request.method == 'POST':
        # Handle itinerary saving logic here
        messages.success(request, 'Itinerary saved successfully!')
        return redirect('users:guide_dashboard')
    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)

# --- END NEW Placeholder views ---

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
