import React from "react";
import { Link } from "react-router-dom";

//*iconos

import {  RiMore2Fill } from "react-icons/ri";
//libreria para sub-menus de User “drop down”
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

const CardCasosos = (props)=>
{
    const {caso,totalCasos,texto,icon} = props;

    let status ="";
    let text ="";

    switch (caso) 
    {
        case "Total":
            status = "bg-blue-500/20 text-blue-500"
            text ="Ver Tabla"
            break;

        case "Pendientes":
            status = "bg-green-500/10 text-green-500"
            text ="Ver Casos Pendientes"
            break;

        case "Proceso":
            status = "bg-orange-500/10 text-orange-500"
            text ="Ver Casos en Procesos"
            break;

        case "Cerrados":
            status = "bg-red-500/10 text-red-500"
            text ="Ver Casos Cerrados"
            break;
    }

    return(

        <div className=" bg-secondary-100 p-8 rounded-xl">
        <div className="flex items-center justify-between mb-4 ">
          <div>

          <div className={`text-4xl p-2 ${status} box-content rounded-lg`}>{icon}</div>
            
          </div>

          <div>
            <Menu
            
              menuButton={
                
                <MenuButton className="flex items-center gap-x-2 hover:bg-secondary-900 py-2 px-4 rounded-lg transition-colors">
                <RiMore2Fill/>
                </MenuButton>
              }
              
              transition
              menuClassName="bg-secondary-100 p-4"
            >
              <MenuItem className="p-0 hover:bg-transparent">
                <Link
                  to="/"
                  className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 py-2 p-2 flex-1"
                >
                  {text}
                </Link>
              </MenuItem>
            </Menu>
          </div>
        </div>
        {/*Numero de casos Juridicos*/}
        <div>
          <h1 className="text-4xl text-white font-bold mb-4">{totalCasos}</h1>
          <p>{texto}</p>
        </div>

      </div>
    );
};
export default CardCasosos;