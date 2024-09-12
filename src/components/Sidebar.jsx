import React, { useState } from "react";
import { Link } from "react-router-dom";
// Importación de iconos
import {
  RiBarChart2Fill,
  RiGitRepositoryFill,
  RiLogoutCircleRLine,
  RiMenuLine,
  RiCloseFill,
} from "react-icons/ri";
import { IoMdBonfire } from "react-icons/io";

const Sidebar = () => {

  // Estado para controlar la visibilidad del menú
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuItemClick = () => {
    // Ocultar el menú al hacer clic en un elemento de la lista
    setShowMenu(false);
  };

    // Función para cerrar la sesión y cerrar la aplicación
    const handleLogout = () => {
      // Aquí puedes agregar cualquier lógica necesaria antes de cerrar la sesión y la aplicación
      // Por ejemplo, puedes hacer llamadas a APIs para cerrar la sesión del usuario
      // Luego, puedes redirigir al usuario a la página de inicio de sesión o simplemente cerrar la pestaña o la ventana del navegador
      // Para cerrar la pestaña o la ventana, puedes usar window.close()
      window.close();
    };

  return (
    <>
      {/* Contenedor del menú lateral */}
      <div className={`xl:h-[100vh] overflow-y-scroll fixed xl:static w-[80%] md:w-[40%] lg-w-[30%] xl:w-auto h-full top-0 bg-secondary-100 p-8 flex flex-col justify-between z-50 ${showMenu ? "left-0" : "-left-full"} transition-all`}>
        {/* Contenido del menú */}
        <div>
          {/* Título del menú */}
          <h1 className="text-center text-2xl font-bold text-white mb-10">
            Honduras
            <span className="text-primary text-4xl" />.
          </h1>
          {/* Lista de opciones de menú */}
          <ul>
            <li>
              <Link
                className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
                to="/"
                onClick={handleMenuItemClick}
              >
                <RiBarChart2Fill className="text-primary" /> {/* Icono de Inicio */}
                Inicio
              </Link>
            </li>

            <li>
              <Link
                className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
                to="/Desarmonias"
                onClick={handleMenuItemClick}
              >
                <IoMdBonfire className="text-primary" /> {/* Icono de Desarmonias */}
                Desarmonias
              </Link>
            </li>

            <li>
              <Link
                className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
                to="/Reportes"
                onClick={handleMenuItemClick}
              >
                <RiGitRepositoryFill className="text-primary" /> {/* Icono de Reportes */}
                Reportes
              </Link>
            </li>
          </ul>
        </div>
        {/* Opción de Cerrar Sesión */}
        <nav>
          <Link
            className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
            to="/"
            onClick={handleLogout}
          >
            <RiLogoutCircleRLine className="text-primary" /> {/* Icono de Cerrar Sesión */}
            Cerrar Sesión
          </Link>
        </nav>
      </div>

      {/* Botón para mostrar/ocultar el menú en dispositivos móviles */}
      <button onClick={() => setShowMenu(!showMenu)} className="xl:hidden fixed bottom-4 right-1 bg-primary text-black p-4 rounded-full z-50">
        {/* Condicional para mostrar el icono de menú o de cerrar */}
        {showMenu ? <RiCloseFill /> : <RiMenuLine />}
      </button>
      {/*
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="xl:hidden fixed top-12 right-4 bg-primary text-black p-3 rounded-full z-50"
      >
      
        {showMenu ? <RiCloseFill /> : <RiMenuLine />}
      </button>*/}
    </>
  );
};

export default Sidebar;
