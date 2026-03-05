from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from main.models import Student, Tutor, Curso, Matricula, Nota
from .serializer import StudentSerializer, TutorSerializer, CursoSerializer, MatriculaSerializer, NotaSerializer, UserSerializer, MytokenObtainPairSerializer #importamos los Serializers
from django.contrib.auth.models import User #importacion del modelo de usuario
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.exceptions import PermissionDenied
from rest_framework.decorators import action
from rest_framework.response import Response
#¿Qué es ModelViewSet?
#Un ModelViewSet es una clase proporcionada por Django REST Framework que combina la funcionalidad de un ViewSet con la de un modelo específico. Permite crear automáticamente vistas para operaciones CRUD (Crear, Leer, Actualizar, Eliminar) basadas en un modelo de Django, simplificando el proceso de desarrollo de API RESTful.

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MytokenObtainPairSerializer


class RegisterUserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        # Superusers see all users, others only see themselves
        if self.request.user.is_superuser:
            return User.objects.all()
        return User.objects.filter(id=self.request.user.id)

    def perform_create(self, serializer):
        if not self.request.user.is_superuser:
            raise PermissionDenied("Solo los administradores pueden crear usuarios.")
        serializer.save()


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    @action(detail=False, methods=["get"])
    def me(self, request):
        if hasattr(request.user, "student_profile"):
            serializer = self.get_serializer(request.user.student_profile)
            return Response(serializer.data)
        return Response({"detail": "No es estudiante"}, status=404)


class TutorViewSet(viewsets.ModelViewSet):
    queryset = Tutor.objects.all() 
    serializer_class = TutorSerializer;

class CursoViewSet(viewsets.ModelViewSet):
    queryset = Curso.objects.all() 
    serializer_class = CursoSerializer;

class MatriculaViewSet(viewsets.ModelViewSet):
    serializer_class = MatriculaSerializer

    def get_queryset(self):
        user = self.request.user

        # Admin ve todas las matrículas
        if user.is_superuser or user.is_staff:
            return Matricula.objects.all()

        # Estudiante ve solo sus matrículas
        if hasattr(user, "student_profile"):
            return Matricula.objects.filter(id_std=user.student_profile)

        return Matricula.objects.none()

class NotaViewSet(viewsets.ModelViewSet):
    queryset = Nota.objects.all() 
    serializer_class = NotaSerializer;