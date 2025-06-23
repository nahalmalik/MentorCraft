from django.contrib import admin
from .models import Student, Enrollment, Query, QueryAnswer, Quiz, Rating

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'created_at')
    search_fields = ('name', 'email')

@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ('student', 'course', 'progress', 'created_at')
    list_filter = ('course',)

@admin.register(Query)
class QueryAdmin(admin.ModelAdmin):
    list_display = ('title', 'course', 'created_at')
    list_filter = ('course',)
    search_fields = ('title', 'content')

@admin.register(QueryAnswer)
class QueryAnswerAdmin(admin.ModelAdmin):
    list_display = ('query', 'content', 'created_at')
    list_filter = ('query__course',)
    search_fields = ('content',)

@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    list_display = ('title', 'course', 'created_at')
    list_filter = ('course',)

@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    list_display = ('course', 'rating', 'created_at')
    list_filter = ('rating',)