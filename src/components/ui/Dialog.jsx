import React, { useRef, useState, useEffect } from "react";
import {
  AiOutlineInfoCircle,
  AiOutlineCloseCircle,
  AiOutlineArrowUp,
  AiOutlineDownload,
} from "react-icons/ai";

function Dialog({ isOpen, onClose, title, content, radicado }) {
  const fileInputRef = useRef(null); // Referencia al campo de entrada de archivo
  const [pdfUploaded, setPdfUploaded] = useState(false); // Estado para rastrear si se ha subido y guardado el PDF

  // Efecto para comprobar si el PDF ya está cargado al abrir el diálogo
  useEffect(() => {
    const storedForms = JSON.parse(localStorage.getItem("seguimientos")) || [];
    const form = storedForms.find((form) => form.radicado === radicado);
    if (form && form.estado === "Cerrado") {
      setPdfUploaded(true);
    }
  }, [isOpen, radicado]);

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Obtener el archivo seleccionado
    if (file && file.type === "application/pdf") {
      // Si es un archivo PDF, hacer algo con él (por ejemplo, subirlo)
      console.log("Archivo PDF seleccionado:", file);
  
      // Convertir el archivo a una cadena base64 para poder guardarlo en localStorage
      const reader = new FileReader();
      reader.onload = (event) => {
        const pdfBase64 = event.target.result;
  
        // Guardar el archivo PDF en localStorage
        localStorage.setItem("pdfFile", pdfBase64);
  
        setPdfUploaded(true); // Establecer el estado de subida de PDF a true
  
        // Cambiar el estado de los formularios en localStorage
        const storedForms = JSON.parse(localStorage.getItem("forms")) || [];
        const updatedForms = storedForms.map((form) => {
          if (form.radicado === radicado) {
            return { ...form, estado: "Cerrado" }; // Actualizar el estado a "Cerrado" solo para el formulario con el mismo radicado
          }
          return form;
        });
        localStorage.setItem("forms", JSON.stringify(updatedForms));
        
        // Cambiar el estado del seguimiento en localStorage
        const storedSeguimientos = JSON.parse(localStorage.getItem("seguimientos")) || [];
        const updatedSeguimientos = storedSeguimientos.map((seguimiento) => {
          if (seguimiento.radicado === radicado) {
            return { ...seguimiento, estado: "Cerrado" }; // Actualizar el estado a "Cerrado" solo para el seguimiento con el mismo radicado
          }
          return seguimiento;
        });
        localStorage.setItem("seguimientos", JSON.stringify(updatedSeguimientos));
  
        console.log("Valor de radicado:", radicado);
  
        onClose(); // Cerrar el diálogo
      };
      reader.readAsDataURL(file);
    } else {
      // Si no es un archivo PDF, mostrar un mensaje de error
      console.error("Por favor selecciona un archivo PDF.");
    }
  };
  

  const handleDownloadFile = () => {
    const pdfBase64 = localStorage.getItem("pdfFile");
    const link = document.createElement("a");
    link.href = pdfBase64;
    link.download = "archivo.pdf"; // Nombre de archivo por defecto
    link.click();
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white p-8 rounded-lg w-96 relative">
        <span className="text-4xl absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="bg-white rounded-full p-2">
            <AiOutlineInfoCircle className="text-6xl text-blue-500" />
          </div>
        </span>
        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold mb-6 text-gray-600">{title}</h2>
          <p className="text-lg mb-6 text-blue-500">{content}</p>
          {pdfUploaded ? (
            // Mostrar el mensaje de éxito si el PDF se ha subido y guardado
            <div className="text-black mb-4">
              El caso ya está cerrado. Puedes descargar el PDF para
              revisarlo....(-.-)
            </div>
          ) : (
            // Mostrar el botón de subida solo si el PDF aún no se ha subido
            <div className="flex justify-between mt-4">
              {/* Campo de entrada de archivo */}
              <input
                type="file"
                accept=".pdf" // Solo permite archivos PDF
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <button
                onClick={() => fileInputRef.current.click()} // Simular clic en el campo de entrada de archivo
                className="bg-blue-500 text-white px-4 py-2 items-center rounded hover:bg-primary flex justify-between mt-"
              >
                Subir
                <span className="ml-2">
                  <AiOutlineArrowUp />
                </span>
              </button>
            </div>
          )}
          <div className="flex justify-end mt-4">
            <button
              onClick={onClose}
              className="bg-blue-500 text-white px-6 py-2 flex items-center rounded hover:bg-primary mr-4 "
            >
              Cancelar
              <span className="ml-2">
                <AiOutlineCloseCircle />
              </span>
            </button>
            {pdfUploaded && (
              // Mostrar el botón de descarga si el PDF se ha subido y guardado correctamente
              <button
                onClick={handleDownloadFile}
                className="bg-blue-500 text-white px-4 py-2 flex items-center rounded hover:bg-primary"
              >
                Descargar PDF
                <span className="ml-2">
                  <AiOutlineDownload />
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dialog;
