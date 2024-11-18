from rest_framework import serializers
from .models import Employee, Cafe, EmployeeCafe

class EmployeeSerializer(serializers.ModelSerializer):
    days_worked = serializers.SerializerMethodField()
    cafe = serializers.SerializerMethodField()

    class Meta:
        model = Employee
        fields = ['id', 'name', 'email_address', 'phone_number', 'days_worked', 'cafe']

    def get_days_worked(self, obj):
        employee_cafe = EmployeeCafe.objects.filter(employee=obj).first()
        if employee_cafe:
            return (date.today() - employee_cafe.start_date).days
        return 0

    def get_cafe(self, obj):
        employee_cafe = EmployeeCafe.objects.filter(employee=obj).first()
        if employee_cafe:
            return employee_cafe.cafe.name
        return ''

class CafeSerializer(serializers.ModelSerializer):
    employees = serializers.SerializerMethodField()

    class Meta:
        model = Cafe
        fields = ['name', 'description', 'employees', 'logo', 'location']

    def get_employees(self, obj):
        return EmployeeCafe.objects.filter(cafe=obj).count()

class EmployeeCafeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployeeCafe
        fields = '__all__'