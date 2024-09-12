import React from "react";
import imagen from "../assets/fondo_1.jpg";

const Error404 = ({ tamañoImagen="40%"}) => {
    return (
        <div className="bg-cover bg-center bg-no-repeat h-screen flex justify-center items-center text-white" style={{backgroundImage: `url(${imagen})`, backgroundSize: tamañoImagen}}>
            <div className="text-center">
                <h1 className="text-6xl mb-4 text-black font-bold">Error 404</h1>
                <p className="text-2xl text-black font-bold">La página que buscas no existe.</p>
            </div>
        </div>
    );
}

export default Error404;
