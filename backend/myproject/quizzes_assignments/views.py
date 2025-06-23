from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Quiz, Assignment, StudentResponse
from django.core.files.storage import default_storage
import json

@csrf_exempt
def quiz_list(request):
    if request.method == 'GET':
        quizzes = Quiz.objects.filter(teacher=request.user)
        return JsonResponse({'status': 'success', 'quizzes': list(quizzes.values('id', 'title', 'created_at'))})
    elif request.method == 'POST':
        data = json.loads(request.body)
        quiz = Quiz.objects.create(teacher=request.user, title=data['title'], questions=data['questions'])
        return JsonResponse({'status': 'success', 'quiz': {'id': quiz.id, 'title': quiz.title, 'created_at': quiz.created_at.isoformat()}})

@csrf_exempt
def assignment_list(request):
    if request.method == 'GET':
        assignments = Assignment.objects.filter(teacher=request.user)
        return JsonResponse({'status': 'success', 'assignments': list(assignments.values('id', 'title', 'deadline', 'created_at'))})
    elif request.method == 'POST':
        data = request.POST
        assignment = Assignment.objects.create(
            teacher=request.user,
            title=data['title'],
            deadline=data['deadline']
        )
        if 'file' in request.FILES:
            assignment.file = request.FILES['file']
            assignment.save()
        return JsonResponse({'status': 'success', 'assignment': {'id': assignment.id, 'title': assignment.title, 'deadline': assignment.deadline.isoformat(), 'created_at': assignment.created_at.isoformat()}})

@csrf_exempt
def student_response_list(request):
    if request.method == 'GET':
        responses = StudentResponse.objects.filter(quiz__teacher=request.user) | StudentResponse.objects.filter(assignment__teacher=request.user)
        return JsonResponse({'status': 'success', 'responses': list(responses.values('id', 'type', 'quiz_id', 'assignment_id', 'student__username', 'submitted_at', 'answer', 'file'))})
    elif request.method == 'POST':
        data = request.POST
        response = StudentResponse.objects.create(
            student=request.user,
            type=data['type'],
            quiz_id=data.get('quiz_id'),
            assignment_id=data.get('assignment_id'),
            answer=data.get('answer')
        )
        if 'file' in request.FILES:
            response.file = request.FILES['file']
            response.save()
        return JsonResponse({'status': 'success', 'response': {'id': response.id, 'type': response.type, 'submitted_at': response.submitted_at.isoformat()}})