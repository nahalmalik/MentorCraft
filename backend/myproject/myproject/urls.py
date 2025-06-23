from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from django.conf import settings
from django.conf.urls.static import static

def root_view(request):
    return JsonResponse({'status': 'success', 'message': 'Welcome to Mentor Craft API'})

urlpatterns = [
    path('', root_view, name='root'),
    path('admin/', admin.site.urls),
    path('', include('courses.urls')),
    path('', include('instructors.urls')),
    path('', include('students.urls')),
    path('', include('contact.urls')),
    path('', include('quizzes_assignments.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)