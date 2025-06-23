from django.contrib import admin
from .models import Instructor

@admin.register(Instructor)
class InstructorAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'created_at')
    search_fields = ('name', 'user__email')
    list_filter = ('created_at',)