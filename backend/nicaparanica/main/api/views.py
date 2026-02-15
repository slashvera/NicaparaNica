from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from main.models import Student, Tutor, Curso, Matricula, Nota
from .serializer import StudentSerializer, TutorSerializer, CursoSerializer, MatriculaSerializer, NotaSerializer, UserSerializer #importamos los Serializers
from django.contrib.auth.models import User #importacion del modelo de usuario

#¿Qué es ModelViewSet?
#Un ModelViewSet es una clase proporcionada por Django REST Framework que combina la funcionalidad de un ViewSet con la de un modelo específico. Permite crear automáticamente vistas para operaciones CRUD (Crear, Leer, Actualizar, Eliminar) basadas en un modelo de Django, simplificando el proceso de desarrollo de API RESTful.

class RegisterUserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    def get_permissions(self):#validar permisos
        if self.action == 'create':
            return [AllowAny()]  # Permitir acceso sin autenticación para la acción de creación
        # Para ver la lista (GET) o borrar, pedimos estar logueado
        return [AllowAny()]  # Requerir autenticación para otras acciones


class StudentViewSet(viewsets.ModelViewSet):
    #permission_classes = [IsAuthenticated] #protege la vista con autenticacion
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