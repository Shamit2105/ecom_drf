from django.db import models
from users.models import CustomUser

class BaseModel(models.Model):
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    created_by = models.ForeignKey(to=CustomUser)
    updated_by = models.ForeignKey(to=CustomUser)
    
    class Meta:
        abstract=True
        ordering = ['-created_at']

    def __str__(self):
        return str(self.id)
