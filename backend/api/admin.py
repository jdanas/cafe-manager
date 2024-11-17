from django.contrib import admin
from .models import Employee, Cafe, EmployeeCafe

admin.site.register(Employee)
admin.site.register(Cafe)
admin.site.register(EmployeeCafe)