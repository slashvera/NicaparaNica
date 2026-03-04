from rest_framework import serializers
from main.models import Student, Tutor, Curso, Matricula, Nota
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class MytokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        group = user.groups.first()
        token['role'] = group.name if group else 'No Role'
        token['is_superuser'] = user.is_superuser
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data['id'] = self.user.id
        data['username'] = self.user.username
        group = self.user.groups.first()
        data['role'] = group.name if group else 'No Role'
        data['is_superuser'] = self.user.is_superuser
        return data

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'confirm_password', 'email', 'is_active', 'is_superuser']
        extra_kwargs = {
            'password': {'write_only': True},
            'confirm_password': {'write_only': True},
            'is_superuser': {'default': False}
        }

    def validate(self, data):
        if data.get('password') != data.get('confirm_password'):
            raise serializers.ValidationError({"password": "Passwords do not match."})
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = User.objects.create_user(**validated_data)
        return user

class StudentSerializer(serializers.ModelSerializer):
    # Exponemos también el email del usuario vinculado
    user_email = serializers.EmailField(source="user.email", read_only=True)

    class Meta:
        model = Student
        fields = [
            "id_std",
            "first_name",
            "last_name",
            "correo_std",   # correo guardado en el modelo Student
            "user_email",   # correo del auth_user vinculado
            "fecha_nac",
            "city_std",
            "gender",
            "is_active",
            "user",         # 👈 importante para vincular al usuario
        ]

class TutorSerializer(serializers.ModelSerializer):
    gender_display = serializers.CharField(source='get_gender_display', read_only=True)

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
    profesor_nombre = serializers.SerializerMethodField()

    def get_profesor_nombre(self, obj):
        if obj.id_curso and obj.id_curso.id_tutor:
            return f"{obj.id_curso.id_tutor.first_name} {obj.id_curso.id_tutor.last_name}"
        return None

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
    id_std = serializers.IntegerField(source="id_matricula.id_std.id_std", read_only=True)
    first_name = serializers.CharField(source="id_matricula.id_std.first_name", read_only=True)
    last_name = serializers.CharField(source="id_matricula.id_std.last_name", read_only=True)

    class Meta:
        model = Nota
        fields = [
            "id_nota",
            "id_matricula",
            "id_std",
            "first_name",
            "last_name",
            "parcial_1",
            "parcial_2",
            "examen_final",
        ]