from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from main.models import Student, Tutor, Curso, Matricula, Nota
from .serializer import StudentSerializer, TutorSerializer, CursoSerializer, MatriculaSerializer, NotaSerializer, UserSerializer #importamos los Serializers
from django.contrib.auth.models import User #importacion del modelo de usuario
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

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
    
class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        role = request.data.get("role")  # admin, tutor, student

        user = authenticate(username=username, password=password)

        if user is not None:
            # Determinar rol según perfil vinculado
            user_role = "admin"
            if hasattr(user, "student_profile"):
                user_role = "student"
            elif hasattr(user, "tutor_profile"):
                user_role = "tutor"

            # Validar que el rol seleccionado coincida
            if user_role != role:
                return Response(
                    {"error": "Rol incorrecto para este usuario"},
                    status=status.HTTP_403_FORBIDDEN,
                )

            # Generar tokens JWT
            refresh = RefreshToken.for_user(user)
            return Response(
                {
                    "access": str(refresh.access_token),
                    "refresh": str(refresh),
                    "role": user_role,
                    "username": user.username,
                },
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {"error": "Credenciales inválidas"},
                status=status.HTTP_401_UNAUTHORIZED,
            )