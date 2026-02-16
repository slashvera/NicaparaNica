from django.apps import AppConfig

#Importamos las signals para que python las cargue al iniciar la aplicación
class MainConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'main'

    def ready(self):
        import main.signals # Importante: aquí conectamos los signals



