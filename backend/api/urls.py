from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EmployeeViewSet, CafeViewSet, EmployeeCafeViewSet, CafeListView, EmployeeListView

router = DefaultRouter()
router.register(r'employees', EmployeeViewSet)
router.register(r'cafes', CafeViewSet)
router.register(r'employee-cafes', EmployeeCafeViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/cafes/', CafeListView.as_view(), name='cafe-list'),
    path('api/employees/', EmployeeListView.as_view(), name='employee-list'),
]