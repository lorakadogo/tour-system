from django.db import models

# ✅ No need to import tours — you're already writing it here!

class Tour(models.Model):  # ✅ Class name should be TitleCase, not lowercase
    title = models.CharField(max_length=100)
    date = models.DateField()
    price = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return f"{self.title} on {self.date}"

class Booking(models.Model):
    tour = models.ForeignKey(Tour, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    booking_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} booked {self.tour}"
