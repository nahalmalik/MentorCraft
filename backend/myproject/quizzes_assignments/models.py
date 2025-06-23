from django.db import models
from django.contrib.auth.models import User

class Quiz(models.Model):
    title = models.CharField(max_length=200)
    teacher = models.ForeignKey(User, on_delete=models.CASCADE, related_name='quizzes')
    questions = models.JSONField(default=list)  # Store questions as JSON {question, options, correctAnswer}
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Assignment(models.Model):
    title = models.CharField(max_length=200)
    teacher = models.ForeignKey(User, on_delete=models.CASCADE, related_name='assignments')
    deadline = models.DateTimeField()
    file = models.FileField(upload_to='assignments/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class StudentResponse(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, null=True, blank=True)
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE, null=True, blank=True)
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='responses')
    answer = models.TextField(null=True, blank=True)  # For quiz responses
    file = models.FileField(upload_to='responses/', null=True, blank=True)  # For assignment responses
    submitted_at = models.DateTimeField(auto_now_add=True)
    type = models.CharField(max_length=20, choices=[('quiz', 'Quiz'), ('assignment', 'Assignment')])

    def __str__(self):
        return f"{self.type} - {self.student.username}"