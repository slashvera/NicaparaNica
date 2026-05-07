from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from main.models import Student, Tutor, Curso


class AuthorizationTests(APITestCase):
    def setUp(self):
        self.admin = User.objects.create_superuser(
            username="admin", email="admin@example.com", password="AdminPass123!"
        )
        self.student_user = User.objects.create_user(
            username="student1", email="student1@example.com", password="StudentPass123!"
        )
        self.student_other_user = User.objects.create_user(
            username="student2", email="student2@example.com", password="StudentPass123!"
        )
        self.tutor_user = User.objects.create_user(
            username="tutor1", email="tutor1@example.com", password="TutorPass123!"
        )

        self.student_1 = Student.objects.create(
            first_name="Stu",
            last_name="One",
            user=self.student_user,
        )
        self.student_2 = Student.objects.create(
            first_name="Stu",
            last_name="Two",
            user=self.student_other_user,
        )
        self.tutor_1 = Tutor.objects.create(
            first_name="Tut",
            last_name="One",
            user=self.tutor_user,
        )
        self.curso = Curso.objects.create(
            codigo_curso="MAT101",
            nombre_curso="Matematica",
            year_curso=2026,
            semestre_curso=1,
            creditos_curso=4,
            id_tutor=self.tutor_1,
        )

    def test_student_only_sees_own_profile(self):
        self.client.force_authenticate(user=self.student_user)
        response = self.client.get(reverse("students-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["id_std"], self.student_1.id_std)

    def test_non_admin_cannot_create_student(self):
        self.client.force_authenticate(user=self.student_user)
        payload = {
            "first_name": "New",
            "last_name": "Student",
            "user": self.student_other_user.id,
            "gender": "O",
            "is_active": True,
        }
        response = self.client.post(reverse("students-list"), payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class ValidationTests(APITestCase):
    def setUp(self):
        self.admin = User.objects.create_superuser(
            username="admin2", email="admin2@example.com", password="AdminPass123!"
        )
        self.client.force_authenticate(user=self.admin)

    def test_course_semester_validation(self):
        payload = {
            "codigo_curso": "PHY200",
            "nombre_curso": "Physics",
            "year_curso": 2026,
            "semestre_curso": 3,
            "creditos_curso": 4,
            "id_tutor": None,
            "book_precio": "20.00",
            "examen_costo": "10.00",
        }
        response = self.client.post(reverse("cursos-list"), payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("semestre_curso", response.data)
