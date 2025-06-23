from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST, require_GET
from django.contrib.auth.models import User
from .models import Student, Enrollment, Query, Quiz, Rating, QueryAnswer
from courses.models import Course
from instructors.models import Instructor
import json
from django.db.models import Q

@csrf_exempt
@require_POST
def signup(request):
    try:
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        name = data.get('name', email.split('@')[0])
        print(f"Student signup attempt: email={email}, name={name}")
        if not email or not password:
            return JsonResponse({'status': 'error', 'message': 'Email and password are required'}, status=400)
        if User.objects.filter(email=email).exists():
            return JsonResponse({'status': 'error', 'message': 'Email already exists'}, status=400)
        user = User.objects.create_user(username=email, email=email, password=password)
        Student.objects.create(user=user, name=name)
        print(f"Student created: user_id={user.id}, name={name}")
        return JsonResponse({'status': 'success', 'user_id': user.id}, status=201)
    except json.JSONDecodeError:
        print("Signup JSON decode error")
        return JsonResponse({'status': 'error', 'message': 'Invalid JSON'}, status=400)
    except Exception as e:
        print(f"Student signup error: {str(e)}")
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)

@csrf_exempt
@require_POST
def login_view(request):
    try:
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        print(f"Student login attempt: email={email}, password={password[:3]}...")  # Mask password
        user = User.objects.filter(email=email).first()
        if user and user.check_password(password):
            try:
                student = user.student_profile
                print(f"Login successful: user_id={user.id}, student_name={student.name}")
                return JsonResponse({'status': 'success', 'user_id': user.id}, status=200)
            except Student.DoesNotExist:
                print(f"Login failed: Student profile not found for email={email}")
                return JsonResponse({'status': 'error', 'message': 'Student profile not found'}, status=404)
        else:
            print(f"Login failed: Invalid credentials for email={email}")
            return JsonResponse({'status': 'error', 'message': 'Invalid credentials'}, status=401)
    except json.JSONDecodeError:
        print("Login JSON decode error")
        return JsonResponse({'status': 'error', 'message': 'Invalid JSON'}, status=400)
    except Exception as e:
        print(f"Student login error: {str(e)}")
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)

@csrf_exempt
@require_POST
def logout_view(request):
    print("Student logout attempt")
    return JsonResponse({'status': 'success', 'message': 'Logged out'}, status=200)

@csrf_exempt
def dashboard(request):
    try:
        email = request.headers.get('X-Email', '') or (json.loads(request.body).get('email', '') if request.body else '')
        print(f"Student dashboard request: email={email}")
        if not email:
            return JsonResponse({'status': 'error', 'message': 'Email required'}, status=401)
        try:
            user = User.objects.get(email=email)
            student = user.student_profile
            enrollments = Enrollment.objects.filter(student=student)
            print(f"Dashboard data: user_id={user.id}, total_enrollments={enrollments.count()}")
            return JsonResponse({
                'status': 'success',
                'user': {
                    'id': student.user.id,
                    'name': student.name,
                },
                'stats': {
                    'totalCourses': enrollments.count(),
                    'completedCourses': enrollments.filter(progress=100).count(),
                }
            }, status=200)
        except User.DoesNotExist:
            print(f"Dashboard failed: User not found for email={email}")
            return JsonResponse({'status': 'error', 'message': 'Unauthorized'}, status=401)
        except Student.DoesNotExist:
            print(f"Dashboard failed: Student profile not found for email={email}")
            return JsonResponse({'status': 'error', 'message': 'Student profile not found'}, status=404)
    except json.JSONDecodeError:
        print("Dashboard JSON decode error")
        return JsonResponse({'status': 'error', 'message': 'Invalid JSON'}, status=400)

@csrf_exempt
@require_GET
def enrolled_courses(request):
    try:
        email = request.headers.get('X-Email', '')
        print(f"Enrolled courses request: email={email}")
        if not email:
            return JsonResponse({'status': 'error', 'message': 'Email required'}, status=401)
        try:
            user = User.objects.get(email=email)
            student = user.student_profile
            enrollments = Enrollment.objects.filter(student=student)
            print(f"Enrolled courses: user_id={user.id}, count={enrollments.count()}")
            return JsonResponse({
                'status': 'success',
                'courses': [{
                    'id': e.course.id,
                    'title': e.course.title,
                    'description': e.course.description,
                    'instructor_name': e.course.instructor.teacher_profile.name,
                    'progress': e.progress,
                } for e in enrollments]
            }, status=200)
        except User.DoesNotExist:
            print(f"Enrolled courses failed: User not found for email={email}")
            return JsonResponse({'status': 'error', 'message': 'Unauthorized'}, status=401)
        except Student.DoesNotExist:
            print(f"Enrolled courses failed: Student profile not found for email={email}")
            return JsonResponse({'status': 'error', 'message': 'Student profile not found'}, status=404)
    except Exception as e:
        print(f"Enrolled courses error: {str(e)}")
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)

@csrf_exempt
@require_GET
def available_courses(request):
    try:
        email = request.headers.get('X-Email', '')
        print(f"Available courses request: email={email}")
        if not email:
            return JsonResponse({'status': 'error', 'message': 'Email required'}, status=401)
        try:
            user = User.objects.get(email=email)
            student = user.student_profile
            enrolled_courses = Enrollment.objects.filter(student=student).values_list('course_id', flat=True)
            courses = Course.objects.exclude(id__in=enrolled_courses)
            print(f"Available courses: user_id={user.id}, count={courses.count()}")
            return JsonResponse({
                'status': 'success',
                'courses': [{
                    'id': c.id,
                    'title': c.title,
                    'description': c.description,
                    'instructor_name': c.instructor.teacher_profile.name,
                } for c in courses]
            }, status=200)
        except User.DoesNotExist:
            print(f"Available courses failed: User not found for email={email}")
            return JsonResponse({'status': 'error', 'message': 'Unauthorized'}, status=401)
        except Student.DoesNotExist:
            print(f"Available courses failed: Student profile not found for email={email}")
            return JsonResponse({'status': 'error', 'message': 'Student profile not found'}, status=404)
    except Exception as e:
        print(f"Available courses error: {str(e)}")
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)

@csrf_exempt
@require_GET
def enrolled_courses(request):
    try:
        enrollments = Enrollment.objects.all()
        print(f"Enrolled courses retrieved: count={enrollments.count()}")
        return JsonResponse({
            'status': 'success',
            'courses': [{
                'id': e.course.id,
                'title': e.course.title,
                'description': e.course.description,
                'video': e.course.video.url if e.course.video else None,
                'image': e.course.image.url if e.course.image else None,
                'progress': e.progress,
            } for e in enrollments]
        }, status=200)
    except Exception as e:
        print(f"Enrolled courses error: {str(e)}")
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)

def my_queries(request):
    if request.method == 'GET':
        try:
            queries = Query.objects.all().select_related('course').prefetch_related('answers').values(
                'id', 'title', 'content', 'course__title'
            )
            queries_list = list(queries)
            for query in queries_list:
                query['course_title'] = query.pop('course__title')
                answers = QueryAnswer.objects.filter(query__id=query['id']).values('content', 'created_at')
                query['answer'] = answers[0]['content'] if answers else None
            print(f"Fetched queries: {len(queries_list)}")
            return JsonResponse({'status': 'success', 'queries': queries_list})
        except Exception as e:
            print(f"Fetch queries error: {str(e)}")
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=400)

@csrf_exempt
def answer_query(request, query_id):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print(f"Answer submission for query {query_id}: {data}")
            query = Query.objects.get(id=query_id)
            answer = QueryAnswer.objects.create(
                query=query,
                content=data.get('answer')
            )
            print(f"Answer created: {answer.id}")
            return JsonResponse({'status': 'success', 'message': 'Answer submitted successfully'})
        except Exception as e:
            print(f"Answer submission error: {str(e)}")
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=400)

@csrf_exempt
def submit_query(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print(f"Query submission: {data}")
            course = Course.objects.get(id=data.get('course_id'))
            query = Query.objects.create(
                title=data.get('title'),
                content=data.get('content'),
                course=course
            )
            print(f"Query created: {query.id}")
            return JsonResponse({'status': 'success', 'message': 'Query submitted successfully'})
        except Exception as e:
            print(f"Query submission error: {str(e)}")
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=400)
@csrf_exempt
@require_POST
def register(request):
    try:
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        name = data.get('name', email.split('@')[0])
        print(f"Student register attempt: email={email}, name={name}")
        if not email or not password:
            return JsonResponse({'status': 'error', 'message': 'Email and password are required'}, status=400)
        if User.objects.filter(email=email).exists():
            return JsonResponse({'status': 'error', 'message': 'Email already exists'}, status=400)
        user = User.objects.create_user(username=email, email=email, password=password)
        Student.objects.create(user=user, name=name)
        print(f"Student registered: user_id={user.id}, name={name}")
        return JsonResponse({'status': 'success', 'user_id': user.id}, status=201)
    except json.JSONDecodeError:
        print("Register JSON decode error")
        return JsonResponse({'status': 'error', 'message': 'Invalid JSON'}, status=400)
    except Exception as e:
        print(f"Student register error: {str(e)}")
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)

@csrf_exempt
@require_POST
def update_profile(request):
    try:
        email = request.headers.get('X-Email', '') or (json.loads(request.body).get('email', '') if request.body else '')
        data = json.loads(request.body)
        name = data.get('name')
        password = data.get('password')
        print(f"Student update profile request: email={email}, name={name}")
        if not email:
            return JsonResponse({'status': 'error', 'message': 'Email required'}, status=401)
        try:
            user = User.objects.get(email=email)
            student = user.student_profile
            if name:
                student.name = name
                student.save()
            if password:
                user.set_password(password)
                user.save()
            print(f"Profile updated: user_id={user.id}, new_name={name}")
            return JsonResponse({'status': 'success', 'message': 'Profile updated'}, status=200)
        except User.DoesNotExist:
            print(f"Update profile failed: User not found for email={email}")
            return JsonResponse({'status': 'error', 'message': 'Unauthorized'}, status=401)
        except Student.DoesNotExist:
            print(f"Update profile failed: Student profile not found for email={email}")
            return JsonResponse({'status': 'error', 'message': 'Student profile not found'}, status=404)
    except json.JSONDecodeError:
        print("Update profile JSON decode error")
        return JsonResponse({'status': 'error', 'message': 'Invalid JSON'}, status=400)

@csrf_exempt
@require_POST
def submit_quiz(request):
    try:
        email = request.headers.get('X-Email', '') or (json.loads(request.body).get('email', '') if request.body else '')
        data = json.loads(request.body)
        course_id = data.get('courseId')
        score = data.get('score')
        print(f"Submit quiz request: email={email}, course_id={course_id}, score={score}")
        if not email or not course_id or score is None:
            return JsonResponse({'status': 'error', 'message': 'Email, course ID, and score required'}, status=400)
        try:
            user = User.objects.get(email=email)
            student = user.student_profile
            course = Course.objects.get(id=course_id)
            quiz = Quiz.objects.create(student=student, course=course, score=score)
            enrollment = Enrollment.objects.get(student=student, course=course)
            enrollment.progress = min(enrollment.progress + (score / 100 * 50), 100)
            enrollment.save()
            print(f"Quiz submitted: quiz_id={quiz.id}, user_id={user.id}, course_id={course_id}, new_progress={enrollment.progress}")
            return JsonResponse({'status': 'success', 'message': 'Quiz submitted'}, status=201)
        except User.DoesNotExist:
            print(f"Submit quiz failed: User not found for email={email}")
            return JsonResponse({'status': 'error', 'message': 'Unauthorized'}, status=401)
        except Student.DoesNotExist:
            print(f"Submit quiz failed: Student profile not found for email={email}")
            return JsonResponse({'status': 'error', 'message': 'Student profile not found'}, status=404)
        except Course.DoesNotExist:
            print(f"Submit quiz failed: Course not found, course_id={course_id}")
            return JsonResponse({'status': 'error', 'message': 'Course not found'}, status=404)
        except Enrollment.DoesNotExist:
            print(f"Submit quiz failed: Not enrolled, user_id={user.id}, course_id={course_id}")
            return JsonResponse({'status': 'error', 'message': 'Not enrolled in course'}, status=400)
    except json.JSONDecodeError:
        print("Submit quiz JSON decode error")
        return JsonResponse({'status': 'error', 'message': 'Invalid JSON'}, status=400)
    except Exception as e:
        print(f"Submit quiz error: {str(e)}")
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)

@csrf_exempt
@require_POST
def submit_rating(request):
    try:
        email = request.headers.get('X-Email', '') or (json.loads(request.body).get('email', '') if request.body else '')
        data = json.loads(request.body)
        course_id = data.get('courseId')
        rating = data.get('rating')
        print(f"Submit rating request: email={email}, course_id={course_id}, rating={rating}")
        if not email or not course_id or not rating:
            return JsonResponse({'status': 'error', 'message': 'Email, course ID, and rating required'}, status=400)
        if not 1 <= rating <= 5:
            return JsonResponse({'status': 'error', 'message': 'Rating must be between 1 and 5'}, status=400)
        try:
            user = User.objects.get(email=email)
            student = user.student_profile
            course = Course.objects.get(id=course_id)
            Rating.objects.create(student=student, course=course, rating=rating)
            print(f"Rating submitted: user_id={user.id}, course_id={course_id}, rating={rating}")
            return JsonResponse({'status': 'success', 'message': 'Rating submitted'}, status=201)
        except User.DoesNotExist:
            print(f"Submit rating failed: User not found for email={email}")
            return JsonResponse({'status': 'error', 'message': 'Unauthorized'}, status=401)
        except Student.DoesNotExist:
            print(f"Submit rating failed: Student profile not found for email={email}")
            return JsonResponse({'status': 'error', 'message': 'Student profile not found'}, status=404)
        except Course.DoesNotExist:
            print(f"Submit rating failed: Course not found, course_id={course_id}")
            return JsonResponse({'status': 'error', 'message': 'Course not found'}, status=404)
    except json.JSONDecodeError:
        print("Submit rating JSON decode error")
        return JsonResponse({'status': 'error', 'message': 'Invalid JSON'}, status=400)
    except Exception as e:
        print(f"Submit rating error: {str(e)}")
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)