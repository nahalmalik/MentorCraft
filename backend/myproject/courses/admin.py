from django.contrib import admin
from .models import Course
from students.models import Enrollment

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'instructor', 'created_at', 'student_count')
    list_filter = ('created_at',)
    search_fields = ('title', 'description')
    fields = ('instructor', 'title', 'description', 'video', 'image', 'created_at')
    readonly_fields = ('created_at',)

    def student_count(self, obj):
        return Enrollment.objects.filter(course=obj).count()
    student_count.short_description = 'Students Enrolled'