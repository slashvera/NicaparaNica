#configuracion de rutas para la api
from rest_framework.routers import DefaultRouter# importacion del enrutador por defecto
from .views import RegisterUserViewSet, StudentViewSet, TutorViewSet, CursoViewSet, MatriculaViewSet, NotaViewSet # importacion de las vistas

router = DefaultRouter()
router.register('students', StudentViewSet, basename='students') # registro de la vista del estudiante
router.register('tutors',TutorViewSet, basename='tutors') # registro de la vista del tutor
router.register('cursos',CursoViewSet, basename='cursos') # registro de la vista del curso
router.register('matriculas', MatriculaViewSet, basename='matriculas') # registro de la vista de la matricula
router.register('nota', NotaViewSet, basename='nota') # registro de la vista de las notas
router.register('register', RegisterUserViewSet, basename='register') # registro de la vista de registro de usuarios

urlpatterns = router.urls # asignacion de las rutas del enrutador a las urls del modulo
