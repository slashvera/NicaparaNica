from rest_framework import viewsets
from main.models import Student, Tutor, Curso, Matricula, Notas
from .serializer import StudentSerializer, TutorSerializer, CursoSerializer, MatriculaSerializer, NotasSerializer #importamos los Serializers


#¿Qué es ModelViewSet?
#Un ModelViewSet es una clase proporcionada por Django REST Framework que combina la funcionalidad de un ViewSet con la de un modelo específico. Permite crear automáticamente vistas para operaciones CRUD (Crear, Leer, Actualizar, Eliminar) basadas en un modelo de Django, simplificando el proceso de desarrollo de API RESTful.

class studentViewSet(viewsets.ModelViewSet):
    queryset = Student.object.all() #trae todos los registros
    serializer_class = StudentSerializer;#asignamos el serializador

class tutorViewSet(viewsets.ModelViewSet):
    queryset = Tutor.object.all() 
    serializer_class = TutorSerializer;

class cursoViewSet(viewsets.ModelViewSet):
    queryset = Curso.object.all() 
    serializer_class = CursoSerializer;

class matriculaViewSet(viewsets.ModelViewSet):
    queryset = Matricula.object.all() 
    serializer_class = MatriculaSerializer; 

class notasViewSet(viewsets.ModelViewSet):
    queryset = Notas.object.all() 
    serializer_class = NotasSerializer;