from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    EmployeeViewSet, CafeViewSet, EmployeeCafeViewSet,
    CafeListView, EmployeeListView, CafeCreateView,
    EmployeeCreateView, CafeUpdateView, EmployeeUpdateView,
    CafeDeleteView, EmployeeDeleteView
)

router = DefaultRouter()
router.register(r'employees', EmployeeViewSet) 
router.register(r'cafes', CafeViewSet)
router.register(r'employee-cafes', EmployeeCafeViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('cafes/', CafeListView.as_view(), name='cafe-list'),
    path('employees/', EmployeeListView.as_view(), name='employee-list'),
    path('cafe/', CafeCreateView.as_view(), name='cafe-create'),
    path('employees/create/', EmployeeCreateView.as_view(), name='employee-create'),
    path('employees/update/<int:pk>/', EmployeeUpdateView.as_view(), name='employee-update'),
    path('employees/delete/<int:pk>/', EmployeeDeleteView.as_view(), name='employee-delete'),
    path('cafe/<int:pk>/', CafeUpdateView.as_view(), name='cafe-update'),
    path('cafe/<int:pk>/delete/', CafeDeleteView.as_view(), name='cafe-delete'),
]