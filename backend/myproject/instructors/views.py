from django.http import JsonResponse
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from .models import Instructor
from students.models import Query
import json

@csrf_exempt
@require_POST
def signup(request):
    try:
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        name = data.get('name', email.split('@')[0])
        print(f"Instructor signup attempt: email={email}")
        if not email or not password:
            return JsonResponse({'status': 'error', 'message': 'Email and password are required'}, status=400)
        if User.objects.filter(email=email).exists():
            return JsonResponse({'status': 'error', 'message': 'Email already exists'}, status=400)
        user = User.objects.create_user(username=email, email=email, password=password)
        Instructor.objects.create(user=user, name=name)
        return JsonResponse({'status': 'success', 'user_id': user.id}, status=201)
    except json.JSONDecodeError:
        return JsonResponse({'status': 'error', 'message': 'Invalid JSON'}, status=400)
    except Exception as e:
        print(f"Instructor signup error: {str(e)}")
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)

@csrf_exempt
@require_POST
def login_view(request):
    try:
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        print(f"Instructor login attempt: email={email}")
        user = User.objects.filter(email=email, password=password).first()
        if user:
            return JsonResponse({'status': 'success', 'user_id': user.id}, status=200)
        else:
            return JsonResponse({'status': 'error', 'message': 'Invalid credentials'}, status=401)
    except json.JSONDecodeError:
        return JsonResponse({'status': 'error', 'message': 'Invalid JSON'}, status=400)
    except Exception as e:
        print(f"Instructor login error: {str(e)}")
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)

@csrf_exempt
@require_POST
def logout_view(request):
    print(f"Instructor logout attempt")
    return JsonResponse({'status': 'success', 'message': 'Logged out'}, status=200)

@csrf_exempt
@require_POST
def dashboard(request):
    return JsonResponse({'status': 'success', 'message': 'Welcome to Teacher Dashboard'}, status=200)
@csrf_exempt
@require_POST
def update_profile(request):
    try:
        email = request.headers.get('X-Email', '') or (json.loads(request.body).get('email', '') if request.body else '')
        data = json.loads(request.body)
        name = data.get('name')
        password = data.get('password')
        print(f"Instructor update profile request: email={email}")
        if not email:
            return JsonResponse({'status': 'error', 'message': 'Email required'}, status=401)
        try:
            user = User.objects.get(email=email)
            instructor = user.teacher_profile
            if name:
                instructor.name = name
                instructor.save()
            if password:
                user.set_password(password)
                user.save()
            return JsonResponse({'status': 'success', 'message': 'Profile updated'}, status=200)
        except User.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Unauthorized'}, status=401)
        except Instructor.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Instructor profile not found'}, status=404)
    except json.JSONDecodeError:
        return JsonResponse({'status': 'error', 'message': 'Invalid JSON'}, status=400)