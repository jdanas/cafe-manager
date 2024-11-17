from rest_framework import serializers
from .models import Employee, Cafe, EmployeeCafe

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'

class CafeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cafe
        fields = '__all__'

class EmployeeCafeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployeeCafe
        fields = '__all__'