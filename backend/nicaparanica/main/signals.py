from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import Group
from .models import Student, Tutor

@receiver(post_save, sender=Student)
def assing_student_group(sender, instance, created, **kwargs):
    if created:
        #Buscamos el grupo(o lo creamos si no existe)
        group, _= Group.objects.get_or_create(name='students')
        #Accedemos al usuario a travez de la relacion OneToOne y agregamos el grupo 
        instance.user.groups.add(group)

@receiver(post_save, sender=Tutor)
def assing_tutor_group(sender, instance, created, **kwargs):
    if created:
        group, _= Group.objects.get_or_create(name='tutors')
        instance.user.groups.add(group)