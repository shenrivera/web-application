import React, { useState } from "react";
import { Link } from "react-router-dom";
import loginImage from "../../assets/fondo.png";
import { RiMailLine, RiShieldKeyholeLine, RiEyeFill, RiEyeOffFill } from "react-icons/ri";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí debemos agregar la lógica para manejar el envío del formulario
    // los datos al servidor, autenticar al usuario y validar los datos ingresados antes de enviarlos.
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-800">
      <div className="w-full px-4 sm:px-8 md:max-w-4xl">
        <div className="bg-secondary-100 rounded-xl shadow-lg overflow-hidden sm:flex">
          {/* Contenido Izquierdo (Imagen y Texto) */}
          <div className="sm:w-1/2 p-8 bg-white text-white flex flex-col justify-center items-center">
            {/* Contenedor redondeado para el logo */}
            <div className="flex items-center justify-center bg-white p-15 rounded-lg">
              <img src={loginImage} alt="Login Image" className="w-100 h-100 rounded-full" />
            </div>
          </div>

          {/* Contenido Derecho (Formulario de Inicio de Sesión) */}
          <div className="sm:w-1/2 p-8 bg-secondary-100 flex flex-col justify-center">
            <h1 className="text-3xl uppercase font-bold text-white text-center mb-4">Iniciar Sesión</h1>
            <form className="mb-8" onSubmit={handleSubmit}>
              {/* Campo de Correo Electrónico */}
              <div className="relative mb-6">
                <RiMailLine className="absolute top-1/2 transform -translate-y-1/2 left-3 text-blue-700" />
                <input
                  type="email"
                  className="py-3 pl-10 pr-4 bg-gray-200 w-full rounded-lg text-gray-800 focus:outline-none focus:ring focus:ring-blue-400"
                  placeholder="Correo - Usuario"
                  required
                />
              </div> 

              {/* Campo de Contraseña */}
              <div className="relative mb-6">
                <RiShieldKeyholeLine className="absolute top-1/2 transform -translate-y-1/2 left-3 text-blue-700" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="py-3 pl-10 pr-4 bg-gray-200 w-full rounded-lg text-gray-800 focus:outline-none focus:ring focus:ring-blue-400"
                  placeholder="Contraseña"
                  required
                />
                {/* Botón para alternar visibilidad de la contraseña */}
                <div
                  className="absolute top-1/2 transform -translate-y-1/2 right-3 text-blue-700 cursor-pointer"
                  onClick={handlePasswordVisibility}
                >
                  {showPassword ? <RiEyeFill /> : <RiEyeOffFill />}
                </div>
              </div>

              {/* Botón de Iniciar Sesión */}
              <button
                type="submit"
                className="bg-blue-700 text-white py-3 rounded-lg w-full hover:bg-blue-800 transition-all duration-300"
              >
                Ingresar
              </button>
            </form>

            {/* Enlace para recuperar contraseña */}
            <div className="text-center text-white">
              <Link to="/recuperar" className="hover:text-blue-700">
                ¿Olvidaste la contraseña?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
