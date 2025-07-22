from django.shortcuts import render,redirect
from .forms import BookingForm

def book_tour(request):
    if request.method == 'POST':
        form = BookingForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('success')
    else:
        form = BookingForm()
    return render(request, 'bookings/book_tour.html', {'form': form})

def success(request):
    return render(request, 'bookings/success.html')

