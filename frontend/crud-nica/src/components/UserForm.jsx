import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { createUser, updateUser, getUser } from "../api/users";
import { useNotify } from "../hook/useNotify";

export default function UserForm() {
  const notify = useNotify();
  const navigate = useNavigate();
  const params = useParams();

  const [user, setUser] = useState({
    username: "",
    email: "",
    is_active: false,
    password: "",
    confirmPassword: "",
  });

  const [showPasswordFields, setShowPasswordFields] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      if (params.id) {
        try {
          const res = await getUser(params.id);
          setUser(res.data);
        } catch (error) {
          console.error("Error cargando usuario", error);
        }
      }
    };
    loadUsers();
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar contraseña solo si se abrió la sección y se escribió algo
    if (showPasswordFields && user.password) {
      if (user.password !== user.confirmPassword) {
        notify.error("Las contraseñas no coinciden");
        return;
      }
      if (user.password.length < 8) {
        notify.error("La contraseña debe tener al menos 8 caracteres");
        return;
      }
      const regexMayuscula = /[A-Z]/;
      const regexMinuscula = /[a-z]/;
      const regexNumero = /[0-9]/;
      const regexEspecial = /[!@#$%^&*]/;

      if (!regexMayuscula.test(user.password)) {
        notify.error("Debe incluir al menos una letra mayúscula");
        return;
      }
      if (!regexMinuscula.test(user.password)) {
        notify.error("Debe incluir al menos una letra minúscula");
        return;
      }
      if (!regexNumero.test(user.password)) {
        notify.error("Debe incluir al menos un número");
        return;
      }
      if (!regexEspecial.test(user.password)) {
        notify.error("Debe incluir al menos un carácter especial (!@#$%^&*)");
        return;
      }
    } else {
      // Si no se modifica la contraseña, la eliminamos antes de enviar
      delete user.password;
      delete user.confirmPassword;
    }

    if (user.id) {
      await updateUser(user.id, user);
    } else {
      await createUser(user);
    }
    navigate("/");
  };

  return (
    <div className="bg-base-200 flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-base-100 p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Formulario de Usuario</h1>

        {/* Username */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-bold mb-2">Username:</label>
          <input
            value={user.username}
            type="text"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            id="username"
            className="w-full border rounded py-2 px-3 bg-base-200"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-bold mb-2">Email:</label>
          <input
            value={user.email}
            type="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            id="email"
            className="w-full border rounded py-2 px-3 bg-base-200"
          />
        </div>

        {/* Estado */}
        <div className="mb-6 flex items-center bg-base-200 p-3 rounded-lg border">
          <input
            id="is_active"
            type="checkbox"
            checked={user.is_active}
            onChange={(e) => setUser({ ...user, is_active: e.target.checked })}
            className="w-5 h-5"
          />
          <label htmlFor="is_active" className="ml-3 text-sm font-bold">¿El usuario está activo?</label>
        </div>

        {/* Botón para mostrar campos de contraseña */}
        <div className="mb-4">
          <button
            type="button"
            onClick={() => setShowPasswordFields(!showPasswordFields)}
            className="bg-secondary text-secondary-content px-4 py-2 rounded"
          >
            {showPasswordFields ? "Cancelar cambio de contraseña" : "Modificar contraseña"}
          </button>
        </div>

        {/* Campos de contraseña solo si se activa */}
        {showPasswordFields && (
          <>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-bold mb-2">Password:</label>
              <input
                value={user.password}
                type="password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                id="password"
                className="w-full border rounded py-2 px-3 bg-base-200"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-bold mb-2">Confirm Password:</label>
              <input
                value={user.confirmPassword}
                type="password"
                onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                id="confirmPassword"
                className="w-full border rounded py-2 px-3 bg-base-200"
              />
            </div>
          </>
        )}

        {/* Botones */}
        <div className="mt-4 flex gap-2">
          <button type="submit" className="bg-primary text-primary-content px-4 py-2 rounded">Submit</button>
          <button type="reset" onClick={() => navigate("/users")} className="bg-error text-error-content px-4 py-2 rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
}