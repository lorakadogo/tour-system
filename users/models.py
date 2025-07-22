# users/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

# CustomUser model extending Django's AbstractUser
# This model adds 'is_guide' and 'is_visitor' fields to the default user.
class CustomUser(AbstractUser):
    # Boolean field to identify if the user is a tour guide
    is_guide = models.BooleanField(default=False)
    # Boolean field to identify if the user is a regular visitor/customer
    is_visitor = models.BooleanField(default=False)

    # You can add more fields here if needed, e.g., profile picture, phone number, etc.
    # For example:
    # phone_number = models.CharField(max_length=15, blank=True, null=True)
    # profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)

    def __str__(self):
        # String representation of the CustomUser object
        # This is useful for displaying user objects in the Django admin and elsewhere
        return self.username

# Tour model definition
# This model represents a tour that can be booked by visitors and guided by guides.
class Tour(models.Model):
    # Name of the tour (e.g., "Safari Adventure", "City Walking Tour")
    name = models.CharField(max_length=255)
    # Detailed description of the tour
    description = models.TextField()
    # Price of the tour (using DecimalField for accurate currency representation)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    # Duration of the tour (e.g., "3 days", "8 hours")
    duration = models.CharField(max_length=100)
    # Location of the tour
    location = models.CharField(max_length=255)
    # Date and time when the tour is available (can be a single date or a start date)
    # For more complex scheduling, you might need a separate model (e.g., TourInstance)
    available_date = models.DateField(null=True, blank=True)
    # Foreign Key to CustomUser, linking a tour to a specific guide.
    # 'limit_choices_to={'is_guide': True}' ensures that only users marked as guides can be selected.
    # 'on_delete=models.SET_NULL' means if a guide is deleted, their tours will have guide set to NULL.
    # 'related_name' allows reverse lookup from a CustomUser to their tours (e.g., guide.tours.all())
    guide = models.ForeignKey(
        CustomUser,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        limit_choices_to={'is_guide': True},
        related_name='guided_tours' # Changed from 'tours' to 'guided_tours' for clarity
    )
    # Date and time when the tour was created (automatically set when created)
    created_at = models.DateTimeField(auto_now_add=True)
    # Date and time when the tour was last updated (automatically updated on each save)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        # Orders tours by name by default
        ordering = ['name']

    def __str__(self):
        # String representation of the Tour object
        return self.name

