from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EmployeeViewSet, CafeViewSet, EmployeeCafeViewSet

router = DefaultRouter()
router.register(r'employees', EmployeeViewSet)
router.register(r'cafes', CafeViewSet)
router.register(r'employee-cafes', EmployeeCafeViewSet)

urlpatterns = [
    path('', include(router.urls)),
]