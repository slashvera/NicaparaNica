from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from main.models import Student, Tutor, Curso, Matricula, Nota
from .serializer import StudentSerializer, TutorSerializer, CursoSerializer, MatriculaSerializer, NotaSerializer, UserSerializer, MytokenObtainPairSerializer #importamos los Serializers
from django.contrib.auth.models import User #importacion del modelo de usuario
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.exceptions import PermissionDenied
from rest_framework.decorators import action
from rest_framework.response import Response
from .permissions import IsOwnerOrAdmin, IsAdminOrReadOnly
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
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrAdmin]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff or user.is_superuser:
            return Student.objects.all()
        if hasattr(user, "student_profile"):
            return Student.objects.filter(pk=user.student_profile.pk)
        return Student.objects.none()

    def perform_create(self, serializer):
        user = self.request.user
        if not (user.is_staff or user.is_superuser):
            raise PermissionDenied("Solo los administradores pueden crear estudiantes.")
        serializer.save()

    @action(detail=False, methods=["get"])
    def me(self, request):
        if hasattr(request.user, "student_profile"):
            serializer = self.get_serializer(request.user.student_profile)
            return Response(serializer.data)
        return Response({"detail": "No es estudiante"}, status=404)


class TutorViewSet(viewsets.ModelViewSet):
    serializer_class = TutorSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrAdmin]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff or user.is_superuser:
            return Tutor.objects.all()
        if hasattr(user, "tutor_profile"):
            return Tutor.objects.filter(pk=user.tutor_profile.pk)
        return Tutor.objects.none()

    def perform_create(self, serializer):
        user = self.request.user
        if not (user.is_staff or user.is_superuser):
            raise PermissionDenied("Solo los administradores pueden crear tutores.")
        serializer.save()

class CursoViewSet(viewsets.ModelViewSet):
    serializer_class = CursoSerializer
    permission_classes = [IsAuthenticated, IsAdminOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff or user.is_superuser:
            return Curso.objects.all()
        if hasattr(user, "tutor_profile"):
            return Curso.objects.filter(id_tutor=user.tutor_profile)
        return Curso.objects.all()

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

        # Tutor ve solo matrículas de sus cursos
        if hasattr(user, "tutor_profile"):
            return Matricula.objects.filter(id_curso__id_tutor=user.tutor_profile)

        return Matricula.objects.none()

    def perform_create(self, serializer):
        user = self.request.user

        # Admin/staff can create any enrollment
        if user.is_superuser or user.is_staff:
            serializer.save()
            return

        # Students can only enroll themselves
        if hasattr(user, "student_profile"):
            serializer.save(id_std=user.student_profile)
            return

        raise PermissionDenied("No tienes permisos para crear matrículas.")

class NotaViewSet(viewsets.ModelViewSet):
    serializer_class = NotaSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser or user.is_staff:
            return Nota.objects.all()
        if hasattr(user, "student_profile"):
            return Nota.objects.filter(id_matricula__id_std=user.student_profile)
        if hasattr(user, "tutor_profile"):
            return Nota.objects.filter(id_matricula__id_curso__id_tutor=user.tutor_profile)
        return Nota.objects.none()

    def perform_create(self, serializer):
        user = self.request.user
        if user.is_superuser or user.is_staff:
            serializer.save()
            return

        matricula = serializer.validated_data.get("id_matricula")
        if hasattr(user, "tutor_profile") and matricula and matricula.id_curso.id_tutor_id == user.tutor_profile.id_tutor:
            serializer.save()
            return

        raise PermissionDenied("No tienes permisos para crear notas para esta matrícula.")