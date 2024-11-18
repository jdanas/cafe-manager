from rest_framework import serializers
from .models import Employee, Cafe, EmployeeCafe

class EmployeeSerializer(serializers.ModelSerializer):
    days_worked = serializers.SerializerMethodField(read_only=True)
    cafe = serializers.CharField(write_only=True, required=False)

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

    def create(self, validated_data):
        cafe_name = validated_data.pop('cafe', None)
        employee = Employee.objects.create(**validated_data)
        if cafe_name:
            try:
                cafe = Cafe.objects.get(name=cafe_name)
                EmployeeCafe.objects.create(employee=employee, cafe=cafe, start_date=date.today())
            except Cafe.DoesNotExist:
                pass
        return employee

class CafeSerializer(serializers.ModelSerializer):
    employees = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Cafe
        fields = ['id', 'name', 'description', 'employees', 'logo', 'location']

    def get_employees(self, obj):
        return EmployeeCafe.objects.filter(cafe=obj).count()

class EmployeeCafeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployeeCafe
        fields = '__all__'