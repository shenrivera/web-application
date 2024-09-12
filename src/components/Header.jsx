import React from "react";
import Logo from "../assets/fondoper.svg";

// Importación de componentes y estilos de la librería de sub-menus
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
// Importación de iconos
import {
  RiArrowDownSFill,
  RiSettings4Line,
  RiLogoutCircleRLine,
  RiNotification3Line,
} from "react-icons/ri";
import { Link } from "react-router-dom";

// Componente del encabezado
const Header = () => {
  return (
    <header className="h-[7vh] md:h-[10vh] border-b border-secondary-100 p-8 flex items-center justify-end"> {/* Contenedor del encabezado */}
      <nav className="flex items-center gap-x-2"> {/* Contenedor del menú */}
        {/* Menú de notificaciones */}
        <Menu
          menuButton={ // Botón de menú de notificaciones
            <MenuButton className="relative hover:bg-secondary-100 p-2 rounded-lg transition-colors">
              <RiNotification3Line /> {/* Icono de notificaciones */}
              <span className="absolute top-0.5 right-0 bg-primary py-0.5 px-[5px] box-content text-white rounded-full font-bold text-[8px]"> {/* Contador de notificaciones */}
                2
              </span>
            </MenuButton>
          }
          transition
          menuClassName="bg-secondary-100 p-4" // Estilos del menú desplegable
        >
          <h1 className="text-gray-300 text-center font-medium">Notificaciones</h1> {/* Título del menú de notificaciones */}
          <hr className="my-4 border-gray-500" /> {/* Separador */}
          <MenuItem className="p-0 hover:bg-transparent">
            <Link to="/"> {/* Elemento de menú (opción) */}
              {/* Contenido del enlace */}
            </Link>
          </MenuItem>
        </Menu>

        {/* Menú de usuario */}
        <Menu
          menuButton={ // Botón de menú de usuario
            <MenuButton className="flex items-center gap-x-2 hover:bg-secondary-100 py-2 px-4 rounded-lg transition-colors">
              <img src={Logo} className="w-10 h-8 object-cover rounded-full" alt="User logo" /> {/* Logo del usuario */}
              <samp>Cabildo Hondurdas</samp> {/* Nombre del usuario */}
              <RiArrowDownSFill /> {/* Icono de flecha hacia abajo */}
            </MenuButton>
          }
          transition
          menuClassName="bg-secondary-100 p-4" // Estilos del menú desplegable
        >
          {/* Elementos de menú de usuario */}
          <MenuItem className="p-0 hover:bg-transparent">
            <Link
              to="/perfil"
              className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 py-2 px-6 flex-1"
            >
              <img src={Logo} className="w-8 h-10 object-cover rounded-full" alt="User logo" /> {/* Logo del usuario */}
              <div className="flex flex-col gap-1 text-sm"> {/* Contenedor de texto */}
                <samp className="text-sm">Cabildo Hondurdas</samp> {/* Nombre del usuario */}
                <samp className="text-xs text-gray-500">
                  cabildodehonduras@hotmail.es
                </samp> {/* Correo electrónico del usuario */}
              </div>
            </Link>
          </MenuItem>

          <hr className="my-4 border-gray-500" /> {/* Separador */}

          {/* Opciones de configuración y cierre de sesión */}
          <MenuItem className="p-0 hover:bg-transparent">
            <Link
              to="/"
              className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 py-2 px-6 flex-1"
            >
              <RiSettings4Line /> Configuración {/* Icono y texto de configuración */}
            </Link>
          </MenuItem>

          <MenuItem className="p-0 hover:bg-transparent">
            <Link
              to="/"
              className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 py-2 px-6 flex-1"
            >
              <RiLogoutCircleRLine /> Cerrar Sesión {/* Icono y texto de cierre de sesión */}
            </Link>
          </MenuItem>
        </Menu>
      </nav> 
    </header>
  );
};

export default Header;
