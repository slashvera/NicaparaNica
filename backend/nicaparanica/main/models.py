from django.db import models
from django.contrib.auth.models import User # importamos el usuario nativo de Django

#1. Modelo Estudiante : Vinculado a auth_user
class Student(models.Model):
    id_std = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    correo_std = models.EmailField(max_length=150, blank=True, null=True)
    fecha_nac = models.DateField(blank=True, null=True)
    city_std = models.CharField(max_length=100, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    
    #Esta es la conexion con el usuario nativo de Django
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='student_profile')

    class Meta:
        db_table = 'student'

#=========================== 2. Modelo tutor : Vinculado a auth_user
class Tutor(models.Model):
    id_tutor = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    correo_tutor = models.EmailField(max_length=150, blank=True, null=True)
    is_active = models.BooleanField(default=True)

    #Esta es la conexion con el usuario nativo de Django
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='tutor_profile')

    class Meta:
        db_table = 'tutor'


#=========================== 3. Modelo Curso
class Curso(models.Model):
    id_curso = models.AutoField(primary_key=True)
    codigo_curso = models.CharField(max_length=20)
    nombre_curso = models.CharField(max_length=100)
    year_curso = models.IntegerField()
    semestre_curso = models.IntegerField()
    creditos_curso = models.IntegerField()
    id_tutor = models.ForeignKey(Tutor, on_delete=models.SET_NULL, db_column='id_tutor', null=True)
    book_precio = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    examen_costo = models.DecimalField(max_digits=10, decimal_places=2, null=True)

    class Meta:
        db_table = 'curso'

#======================= 4. Matricula Modelo
class Matricula(models.Model):
    id_matricula = models.AutoField(primary_key=True)
    id_std = models.ForeignKey(Student, on_delete=models.RESTRICT, db_column='id_std')
    id_curso = models.ForeignKey(Curso, on_delete=models.RESTRICT, db_column='id_curso')
    fecha_matricula = models.DateField()
    semestre = models.IntegerField()
    estado = models.CharField(max_length=20, default='ACTIVA')

    class Meta:
        db_table = 'matricula'

#======================= 5. Notas Modelo
class Nota(models.Model):
    id_nota = models.AutoField(primary_key=True)
    id_matricula = models.ForeignKey(Matricula, on_delete=models.CASCADE, db_column='id_matricula')
    parcial_1 = models.DecimalField(max_digits=5, decimal_places=2, null=True)
    parcial_2 = models.DecimalField(max_digits=5, decimal_places=2, null=True)
    examen_final = models.DecimalField(max_digits=5, decimal_places=2, null=True)
    
    class Meta:
        db_table = 'nota'



