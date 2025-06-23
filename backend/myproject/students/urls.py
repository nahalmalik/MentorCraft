from django.urls import path
from . import views

app_name = 'students'

urlpatterns = [
    path('api/students/signup/', views.signup, name='signup'),
    path('api/students/login/', views.login_view, name='login'),
    path('api/students/logout/', views.logout_view, name='logout'),
    path('api/students/dashboard/', views.dashboard, name='dashboard'),
    path('api/students/courses/', views.enrolled_courses, name='enrolled_courses'),
    path('api/students/available-courses/', views.available_courses, name='available_courses'),
    path('api/students/enroll/<int:course_id>/', views.enrolled_courses, name='enroll_course'),
    path('api/students/my_queries/', views.my_queries, name='my_queries'),
    path('api/students/submit_query/', views.submit_query, name='submit_query'),
    path('api/students/register/', views.register, name='register'),
    path('api/students/update_profile/', views.update_profile, name='update_profile'),
    path('api/students/submit-quiz/', views.submit_quiz, name='submit_quiz'),
    path('api/students/submit-rating/', views.submit_rating, name='submit_rating'),
    path('submit_query/', views.submit_query, name='submit_query'),
    path('my_queries/', views.my_queries, name='my_queries'),
    path('answer_query/<int:query_id>/', views.answer_query, name='answer_query'),
]