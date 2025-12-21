from rest_framework import viewsets
from main.models import Student, Tutor, Curso, Matricula, Nota
from .serializer import StudentSerializer, TutorSerializer, CursoSerializer, MatriculaSerializer, NotaSerializer #importamos los Serializers


#¿Qué es ModelViewSet?
#Un ModelViewSet es una clase proporcionada por Django REST Framework que combina la funcionalidad de un ViewSet con la de un modelo específico. Permite crear automáticamente vistas para operaciones CRUD (Crear, Leer, Actualizar, Eliminar) basadas en un modelo de Django, simplificando el proceso de desarrollo de API RESTful.

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all() #trae todos los registros
    serializer_class = StudentSerializer;#asignamos el serializador

class TutorViewSet(viewsets.ModelViewSet):
    queryset = Tutor.objects.all() 
    serializer_class = TutorSerializer;

class CursoViewSet(viewsets.ModelViewSet):
    queryset = Curso.objects.all() 
    serializer_class = CursoSerializer;

class MatriculaViewSet(viewsets.ModelViewSet):
    queryset = Matricula.objects.all() 
    serializer_class = MatriculaSerializer; 

class NotaViewSet(viewsets.ModelViewSet):
    queryset = Nota.objects.all() 
    serializer_class = NotaSerializer;