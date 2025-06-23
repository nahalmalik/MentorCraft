from django.urls import path
from . import views

urlpatterns = [
    path('api/courses/teacher/create/', views.create_course, name='create_course'),
    path('api/courses/all/', views.all_courses, name='all_courses'),
]