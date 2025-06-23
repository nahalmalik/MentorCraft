from django.urls import path
from . import views
app_name = 'instructors'
urlpatterns = [
    path('api/instructors/signup/', views.signup, name='signup'),
    path('api/instructors/login/', views.login_view, name='login'),
    path('api/instructors/logout/', views.logout_view, name='logout'),
    path('api/instructors/dashboard/', views.dashboard, name='dashboard'),
    path('api/instructors/update_profile/', views.update_profile, name='update_profile'),
]