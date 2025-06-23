from django.urls import path
from . import views

app_name = 'contact'

urlpatterns = [
    path('api/contact/submit/', views.submit_contact, name='submit_contact'),
]