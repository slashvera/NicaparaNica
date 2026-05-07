from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return request.user and (request.user.is_staff or request.user.is_superuser)


class IsOwnerOrAdmin(BasePermission):
    """
    Generic object-level permission for objects with a `user` field.
    """

    def has_object_permission(self, request, view, obj):
        if request.user.is_staff or request.user.is_superuser:
            return True
        return getattr(obj, "user_id", None) == request.user.id
