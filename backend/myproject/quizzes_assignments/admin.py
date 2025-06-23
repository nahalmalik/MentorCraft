from django.contrib import admin
import quizzes_assignments.models as models
from quizzes_assignments.models import Quiz, Assignment, StudentResponse
# Register your models here.
admin.site.site_header = "Quizzes and Assignments "

@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    list_display = ('title', 'teacher', 'created_at')
    search_fields = ('title',)
    list_filter = ('teacher', 'created_at')

@admin.register(Assignment)
class AssignmentAdmin(admin.ModelAdmin):
    list_display = ('title', 'teacher', 'deadline', 'created_at')
    search_fields = ('title',)
    list_filter = ('teacher', 'created_at')

@admin.register(StudentResponse)
class StudentResponseAdmin(admin.ModelAdmin):
    list_display = ('student', 'quiz', 'assignment', 'submitted_at', 'type')
    search_fields = ('student__username',)
    list_filter = ('type', 'submitted_at')
