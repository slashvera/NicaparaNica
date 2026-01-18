#El serializador es el que nos permite transformar lo que son los objetos de Django a formatos como JSON o XML
from rest_framework import serializers
from main.models import Student, Tutor, Curso, Matricula, Nota
from django.contrib.auth.models import User#importacion del modelo de usuario

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','password','email','is_active','is_superuser']#campos a serializar
        extra_kwargs = {'password':{'write_only':True}}# para que la contraseña no se muestre al hacer un get
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)#creacion del usuario con la contraseña encriptada
        return user

class StudentSerializer(serializers.ModelSerializer):
    gender_display = serializers.CharField(
        source='get_gender_display',
        read_only=True
    )

    class Meta:
        model = Student
        fields = '__all__'

class TutorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tutor 
        fields = '__all__'

class CursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curso
        fields = '__all__'

class MatriculaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Matricula
        fields = '__all__'

class NotaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nota
        fields = '__all__'