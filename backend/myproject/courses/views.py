from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Course
from instructors.models import Instructor
from django.contrib.auth.models import User
import json

@csrf_exempt
def create_course(request):
    if request.method == 'POST':
        try:
            print('Request files:', request.FILES)
            print('Request POST:', request.POST)
            title = request.POST.get('title')
            description = request.POST.get('description')
            video = request.FILES.get('video')
            video_link = request.POST.get('videoLink')
            image = request.FILES.get('image')
            # Get or create a default instructor
            instructor = Instructor.objects.first()
            if not instructor:
                user, created = User.objects.get_or_create(
                    username='default_instructor',
                    defaults={'email': 'instructor@example.com', 'password': 'default123'}
                )
                instructor = Instructor.objects.create(user=user, name='Default Instructor')
            course = Course.objects.create(
                title=title,
                description=description,
                instructor=instructor,
                video=video,
                video_link=video_link,
                image=image
            )
            print(f'Course created: {course.id}')
            return JsonResponse({'status': 'success', 'message': 'Course created successfully'})
        except Exception as e:
            print(f'Course creation error: {str(e)}')
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=400)

def all_courses(request):
    if request.method == 'GET':
        try:
            courses = Course.objects.all().values('id', 'title', 'description', 'image', 'video', 'video_link', 'student_count')
            courses_list = list(courses)
            print(f'Fetched courses: {len(courses_list)}')
            return JsonResponse({'status': 'success', 'courses': courses_list})
        except Exception as e:
            print(f'Fetch courses error: {str(e)}')
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=400)