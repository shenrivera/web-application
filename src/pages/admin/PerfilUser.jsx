import React, { useState } from "react";
import Logo from "../../assets/fondo.png";
import Selectt from "../../components/ui/SelectVeredas";

import { RiEditLine, RiShieldCheckLine } from "react-icons/ri";

const PerfilUser = () => {
  return (
    <>
      {/* codigo de perfil de usuario*/}
      <div className="bg-secondary-100 p-8 rounded-xl mb-8">
        <h1 className="text-xl text-gray-100"> Perfil de Usuario</h1>
        <hr className="my-8 border-gray-500/30" />
        <form>
          <div className="flex items-center mb-8">
            <div className="w-1/4">
              <p>avatar</p>
            </div>

            <div className="flex-1">
              <div className="relative mb-2">
                <img src={Logo} className="w-20 h-30 object-cover rounded-lg" />
                <label
                  htmlFor="avatar"
                  className="absolute bg-secondary-900 p-2 rounded-full hover:cursor-pointer -top-2 left-20"
                >
                  <RiEditLine />
                </label>
                <input type="file" id="avatar" className="hidden" />
              </div>

              <p className="text-gray-500 text-sm">
                Permitido archivos con los siguientes formatos: png, jpg, jpeg
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-y-2 md:flex-row md:items-center mb-8">
            <div className="w-full md:w-1/4">
              <p>
                Nombre Completo<samp className="text-red-500">*</samp>
              </p>
            </div>

            <div className="flex-1 flex items-center gap-4 ">
              <div className="w-full">
                <input
                  type="text"
                  className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                  placeholder="Nombre(s)"
                />
              </div>

              <div className="w-full">
                <input
                  type="text"
                  className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                  placeholder="Apellidos(s)"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-y-2 md:flex-row md:items-center mb-8">
            <div className="w-full md:w-1/4">
              <p>
                Nombre resguardo<samp className="text-red-500">*</samp>
              </p>
            </div>

            <div className="flex-1 flex items-center gap-4">
              <div className="w-full">
                <input
                  type="text"
                  className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                  placeholder="Resguardo"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-y-2 md:flex-row md:items-center mb-6">
            <div className="w-full md:w-1/4">
              <label>
                Correo<samp className="text-red-500">*</samp>
              </label>
            </div>

            <div className="flex-1">
              <div className="w-full">
                <input
                  type="text"
                  className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                  placeholder="Correo"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-y-2 md:flex-row md:items-center mb-6 ">
            <label htmlFor="veredaDemandante" className="bw-full md:w-1/4 ">
              Vereda Demandauuunte:
            </label>
            <Selectt />
          </div>
        </form>

        <hr className="my-8 border-gray-500" />
        <div className="flex justify-end">
          <button className="bg-primary/80 text-black py-2 px-4 rounded-lg hover:bg-primary transition-colors">
            Guardar
          </button>
        </div>
      </div>

      {/* codigo de cambio de password*/}

      <div className="bg-secondary-100 p-8 rounded-xl">
        <h1 className="text-xl  text-gray-100">
          {" "}
          Cambiar contraseña de usuario
        </h1>
        <hr className="my-8 border-gray-500/30" />

        <form className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-y-4 justify-between">
            <div>
              <h5 className="text-gray-100 text-xl mb-1">Correo Electronico</h5>
              <p className="text-gray-500 text-sm">
                cabildodehonduras@hotmail.e
              </p>
            </div>

            <div>
              <button className="w-full md:w-auto bg-secondary-900/50 py-3 px-4 rounded-lg hover:bg-secondary-900 hover:text-gray-100 transition-colors">
                Cambiar Email
              </button>
            </div>
          </div>

          <hr className="my-8 border-gray-500/30 border-dashed" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-y-4">
            <div>
              <h5 className="text-gray-100 text-xl mb-1">Contraseña</h5>
              <p className="text-gray-500 text-sm">*****************</p>
            </div>

            <div>
              <button className="w-full md:w-auto bg-secondary-900/50 py-3 px-4 rounded-lg hover:bg-secondary-900 hover:text-gray-100 transition-colors">
                Cambiar Contraseña
              </button>
            </div>
          </div>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-8 items-center gap-y-4 bg-blue-500/10 p-4 rounded-lg border border-dashed border-blue-100">
          <div className="flex justify-center">
            <RiShieldCheckLine className="text-6xl text-blue-600" />
          </div>

          <div className="md:col-span-6">
            <h5 className="text-gray-100 text-xl mb-2">Asegure su cuenta</h5>
            <p className="text-gray-400">
              la autenticacion de dos factores agrega una copia de seguridad a
              su cuenta. Para iniciar sesion
            </p>
          </div>

          <div className="flex justify-center">
            <button className="bg-blue-600/70 hover:bg-blue-600 transition-colors py-2 px-4 rounded-lg text-gray-100">
              Activar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PerfilUser;
