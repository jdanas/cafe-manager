from django.db import models
import uuid

class Employee(models.Model):
    id = models.CharField(max_length=10, primary_key=True)
    name = models.CharField(max_length=100)
    email_address = models.EmailField(max_length=100)
    phone_number = models.CharField(max_length=8)
    gender = models.CharField(max_length=6, choices=[('Male', 'Male'), ('Female', 'Female')])

class Cafe(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    description = models.TextField()
    logo = models.ImageField(upload_to='logos/', null=True, blank=True)
    location = models.CharField(max_length=255)

class EmployeeCafe(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    cafe = models.ForeignKey(Cafe, on_delete=models.CASCADE)
    start_date = models.DateField()