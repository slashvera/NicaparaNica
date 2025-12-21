from django.contrib import admin
from main.models import Student, Tutor, Curso, Matricula, Nota

# Register your models here.
admin.site.site_header = "NicaParanica Admin"
admin.site.register(Student)
admin.site.register(Tutor)
admin.site.register(Curso)
admin.site.register(Matricula)
admin.site.register(Nota)
