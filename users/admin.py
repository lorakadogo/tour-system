# users/admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin # Import UserAdmin for CustomUser
from .models import CustomUser, Tour # Import your CustomUser and Tour models

# Define a custom Admin class for CustomUser
# This allows you to customize how CustomUser is displayed and edited in the admin.
class CustomUserAdmin(UserAdmin):
    # Add 'is_guide' and 'is_visitor' to the fields displayed in the admin change form.
    # fieldsets control the layout of the form.
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('is_guide', 'is_visitor')}),
    )
    # Add 'is_guide' and 'is_visitor' to the fields displayed in the list view.
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'is_guide', 'is_visitor')
    # Add 'is_guide' and 'is_visitor' to the filters sidebar.
    list_filter = ('is_staff', 'is_active', 'is_superuser', 'is_guide', 'is_visitor')

# Register your CustomUser model with the custom admin class
admin.site.register(CustomUser, CustomUserAdmin)

# Register the Tour model
# You can define a custom admin class for Tour if you need more customization
# class TourAdmin(admin.ModelAdmin):
#     list_display = ('name', 'price', 'duration', 'guide', 'available_date', 'created_at')
#     list_filter = ('guide', 'available_date')
#     search_fields = ('name', 'description', 'location')
#     date_hierarchy = 'available_date'

# admin.site.register(Tour, TourAdmin)
admin.site.register(Tour) # Simple registration for now
