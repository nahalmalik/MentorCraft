from django.urls import path
from . import views

urlpatterns = [
    path('quizzes/teacher/', views.quiz_list, name='quiz_list'),
    path('assignments/teacher/', views.assignment_list, name='assignment_list'),
    path('student-responses/teacher/', views.student_response_list, name='student_response_list'),
]