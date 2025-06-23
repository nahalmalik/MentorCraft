from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from .models import Contact
import json

@csrf_exempt
@require_POST
def submit_contact(request):
    try:
        email = request.headers.get('X-Email', '') or (json.loads(request.body).get('email', '') if request.body else '')
        data = json.loads(request.body)
        name = data.get('name')
        message = data.get('message')
        print(f"Contact submission: email={email}, name={name}")
        if not name or not email or not message:
            return JsonResponse({'status': 'error', 'message': 'Name, email, and message required'}, status=400)
        Contact.objects.create(name=name, email=email, message=message)
        return JsonResponse({'status': 'success', 'message': 'Contact form submitted successfully'}, status=201)
    except json.JSONDecodeError:
        return JsonResponse({'status': 'error', 'message': 'Invalid JSON'}, status=400)
    except Exception as e:
        print(f"Contact submission error: {str(e)}")
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)