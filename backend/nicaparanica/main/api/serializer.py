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
        fields = ['id', 'username', 'password', 'confirm_password', 'email', 'is_active']
        extra_kwargs = {
            'password': {'write_only': True},
            'confirm_password': {'write_only': True}
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
    # Añadimos este campo para obtener el texto legible
    gender_display = serializers.CharField(source="get_gender_display", read_only=True)

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
            "gender_display",
            "is_active",
            "user",         #importante para vincular al usuario
        ]

class TutorSerializer(serializers.ModelSerializer):
    gender_display = serializers.CharField(source='get_gender_display', read_only=True)

    class Meta:
        model = Tutor
        fields = '__all__'

class CursoSerializer(serializers.ModelSerializer):
    def validate_year_curso(self, value):
        if value < 2000 or value > 2100:
            raise serializers.ValidationError("El year del curso debe estar entre 2000 y 2100.")
        return value

    def validate_semestre_curso(self, value):
        if value not in (1, 2):
            raise serializers.ValidationError("El semestre del curso debe ser 1 o 2.")
        return value

    def validate_creditos_curso(self, value):
        if value <= 0:
            raise serializers.ValidationError("Los créditos del curso deben ser mayores que cero.")
        return value

    def validate_book_precio(self, value):
        if value is not None and value < 0:
            raise serializers.ValidationError("El precio del libro no puede ser negativo.")
        return value

    def validate_examen_costo(self, value):
        if value is not None and value < 0:
            raise serializers.ValidationError("El costo del examen no puede ser negativo.")
        return value

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

    def validate_semestre(self, value):
        if value not in (1, 2):
            raise serializers.ValidationError("El semestre de matrícula debe ser 1 o 2.")
        return value

    def validate(self, attrs):
        id_std = attrs.get("id_std")
        id_curso = attrs.get("id_curso")
        semestre = attrs.get("semestre")
        existing = Matricula.objects.filter(id_std=id_std, id_curso=id_curso, semestre=semestre)
        if self.instance:
            existing = existing.exclude(pk=self.instance.pk)
        if existing.exists():
            raise serializers.ValidationError("Ya existe una matrícula para este estudiante, curso y semestre.")
        return attrs

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

    def validate(self, attrs):
        for field in ("parcial_1", "parcial_2", "examen_final"):
            value = attrs.get(field)
            if value is not None and (value < 0 or value > 100):
                raise serializers.ValidationError({field: "La nota debe estar entre 0 y 100."})
        return attrs