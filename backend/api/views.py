from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Employee, Cafe, EmployeeCafe
from .serializers import EmployeeSerializer, CafeSerializer, EmployeeCafeSerializer
from datetime import date

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

class CafeViewSet(viewsets.ModelViewSet):
    queryset = Cafe.objects.all()
    serializer_class = CafeSerializer

class EmployeeCafeViewSet(viewsets.ModelViewSet):
    queryset = EmployeeCafe.objects.all()
    serializer_class = EmployeeCafeSerializer

class CafeListView(APIView):
    def get(self, request):
        location = request.GET.get('location', None)
        if location:
            cafes = Cafe.objects.filter(location=location)
        else:
            cafes = Cafe.objects.all()

        cafes = sorted(cafes, key=lambda cafe: EmployeeCafe.objects.filter(cafe=cafe).count(), reverse=True)
        serializer = CafeSerializer(cafes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class EmployeeListView(APIView):
    def get(self, request):
        cafe_name = request.GET.get('cafe', None)
        if cafe_name:
            try:
                cafe = Cafe.objects.get(name=cafe_name)
                employees = Employee.objects.filter(employeecafe__cafe=cafe)
            except Cafe.DoesNotExist:
                employees = Employee.objects.none()
        else:
            employees = Employee.objects.all()

        employees = sorted(employees, key=lambda emp: (date.today() - EmployeeCafe.objects.filter(employee=emp).first().start_date).days if EmployeeCafe.objects.filter(employee=emp).exists() else 0, reverse=True)
        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class CafeCreateView(APIView):
    def post(self, request):
        serializer = CafeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EmployeeCreateView(APIView):
    def post(self, request):
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)  # Log the errors
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CafeUpdateView(APIView):
    def put(self, request, pk):
        try:
            cafe = Cafe.objects.get(pk=pk)
        except Cafe.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = CafeSerializer(cafe, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EmployeeUpdateView(APIView):
    def put(self, request, pk):
        try:
            employee = Employee.objects.get(pk=pk)
        except Employee.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = EmployeeSerializer(employee, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CafeDeleteView(APIView):
    def delete(self, request, pk):
        try:
            cafe = Cafe.objects.get(pk=pk)
        except Cafe.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        # Delete all employees under the cafe
        Employee.objects.filter(employeecafe__cafe=cafe).delete()
        cafe.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class EmployeeDeleteView(APIView):
    def delete(self, request, pk):
        try:
            employee = Employee.objects.get(pk=pk)
        except Employee.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        employee.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)