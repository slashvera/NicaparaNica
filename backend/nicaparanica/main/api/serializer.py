#El serializador es el que nos permite transformar lo que son los objetos de Django a formatos como JSON o XML
from rest_framework import serializers
from main.models import Student, Tutor, Curso, Matricula, Nota
from django.contrib.auth.models import User#importacion del modelo de usuario
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class MytokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        #Obtenemos el token base
        token = super().get_token(user)

        #Agregamos datos personalizados Al JWT
        token['username'] = user.username

        group = user.groups.first() #Obtenemos el primer grupo al que pertenece el usuario
        token['role'] = group.name if group else 'No Role' #Agregamos el nombre del grupo al token o 'No Role' si no tiene grupo    

        #si es superusuario o admin
        token['is_superuser'] = user.is_superuser

        return token



class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    confirm_password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'confirm_password', 'email', 'is_active', 'is_superuser']
        extra_kwargs = {
            'password': {'write_only': True},
            'confirm_password': {'write_only': True}
        }

    def create(self, validated_data):
        validated_data.pop('confirm_password', None)
        user = User.objects.create_user(**validated_data)
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        validated_data.pop('confirm_password', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if password:
            instance.set_password(password)

        instance.save()
        return instance


class StudentSerializer(serializers.ModelSerializer):
    gender_display = serializers.CharField(
        source='get_gender_display',
        read_only=True
    )

    class Meta:
        model = Student
        fields = '__all__'

class TutorSerializer(serializers.ModelSerializer):
    
    gender_display = serializers.CharField(
        source='get_gender_display',
        read_only=True
    ) 
    class Meta:
        model = Tutor 
        fields = '__all__'

class CursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curso
        fields = '__all__'

class MatriculaSerializer(serializers.ModelSerializer):
    estudiante_nombre = serializers.CharField(source="id_std.first_name", read_only=True)
    estudiante_apellido = serializers.CharField(source="id_std.last_name", read_only=True)
    nombre_curso = serializers.CharField(source="id_curso.nombre_curso", read_only=True)
    profesor_nombre = serializers.CharField(source="id_curso.id_profesor.nombre", read_only=True)

    class Meta:
        model = Matricula
        fields = [
            "id_matricula",
            "id_std",
            "estudiante_nombre",
            "estudiante_apellido",
            "id_curso",
            "nombre_curso",
            "profesor_nombre",
            "semestre",
            "estado",
        ]


class NotaSerializer(serializers.ModelSerializer):
    # Traemos el id del estudiante desde la matrícula
    id_std = serializers.IntegerField(source="id_matricula.id_std.id_std", read_only=True)
    first_name = serializers.CharField(source="id_matricula.id_std.first_name", read_only=True)
    last_name = serializers.CharField(source="id_matricula.id_std.last_name", read_only=True)

    class Meta:
        model = Nota
        fields = [
            "id_nota",
            "id_matricula",
            "id_std",        # estudiante relacionado
            "first_name",    # nombre del estudiante
            "last_name",     # apellido del estudiante
            "parcial_1",
            "parcial_2",
            "examen_final",
        ]
