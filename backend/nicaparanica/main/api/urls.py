from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import (
    RegisterUserViewSet,
    StudentViewSet,
    TutorViewSet,
    CursoViewSet,
    MatriculaViewSet,
    NotaViewSet,
    LoginView,   # importa tu LoginView
)

router = DefaultRouter()
router.register("students", StudentViewSet, basename="students")
router.register("tutors", TutorViewSet, basename="tutors")
router.register("cursos", CursoViewSet, basename="cursos")
router.register("matriculas", MatriculaViewSet, basename="matriculas")
router.register("nota", NotaViewSet, basename="nota")
router.register("register", RegisterUserViewSet, basename="register")

urlpatterns = [
    path("login/", LoginView.as_view(), name="login"),  # aquí el login
]

urlpatterns += router.urls