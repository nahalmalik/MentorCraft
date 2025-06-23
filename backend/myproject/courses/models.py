from django.db import models
from instructors.models import Instructor

class Course(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    instructor = models.ForeignKey(Instructor, on_delete=models.CASCADE, related_name='courses')
    image = models.ImageField(upload_to='courses/images/', null=True, blank=True)
    video = models.FileField(upload_to='courses/videos/', null=True, blank=True)
    video_link = models.URLField(max_length=500, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    student_count = models.IntegerField(default=0)

    def __str__(self):
        return self.title