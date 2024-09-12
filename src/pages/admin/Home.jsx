import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  RiSearchLine,
  RiFileList2Line,
  RiAlarmWarningLine,
  RiTimerLine,
  RiCheckDoubleLine,
} from "react-icons/ri";
import { MdPlaylistAddCircle } from "react-icons/md";
import TextInput from "../../components/ui/TextInput"; // Importa el componente TextInput
import CardCasos from "../../components/CardCasosos"; // Importa el componente CardCasos (revisar el nombre correcto)

const Home = () => {
  // Estados locales para gestionar el término de búsqueda, los datos filtrados y los mensajes de búsqueda
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const [filteredFormData, setFilteredFormData] = useState([]); // Estado para los datos filtrados
  const [searchMessage, setSearchMessage] = useState(""); // Estado para el mensaje de búsqueda

  // Función para mostrar el PDF almacenado previamente
  const downloadPdf = (pdfBase64, filename) => {
    // Convierte la cadena base64 en un blob
    const byteCharacters = atob(pdfBase64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });

    // Crea una URL temporal para el blob
    const pdfUrl = URL.createObjectURL(blob);

    // Crea un enlace y simula un clic para descargar el archivo
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = filename || "documento.pdf"; // Nombre de archivo predeterminado si no se proporciona ninguno
    link.click();

    // Liberar el objeto URL creado para el blob
    URL.revokeObjectURL(pdfUrl);
  };

  const showPdf = (pdfBase64) => {
    downloadPdf(pdfBase64);
  };

  // Función que cuenta los casos por estado
  const countCasosByEstado = (estado) => {
    return filteredFormData.filter((form) => form.estado === estado).length;
  };

  // Efecto para cargar los datos desde localStorage al iniciar el componente
  useEffect(() => {
    const savedForms = JSON.parse(localStorage.getItem("forms")) || []; // Obtiene los datos del localStorage
    setFilteredFormData(savedForms); // Establece los datos filtrados
  }, []);

  // Efecto para filtrar los datos en base al término de búsqueda
  useEffect(() => {
    if (searchTerm.trim() === "") {
      // Si el término de búsqueda está vacío, muestra todos los datos
      setFilteredFormData(JSON.parse(localStorage.getItem("forms")) || []);
      setSearchMessage(""); // Limpia el mensaje de búsqueda
    } else {
      // Si hay un término de búsqueda, filtra los datos por el término
      const filteredData = JSON.parse(
        localStorage.getItem("forms") || "[]"
      ).filter((form) =>
        form.radicado.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFormData(filteredData); // Establece los datos filtrados

      setSearchMessage(filteredData.length > 0 ? "" : "Desarmonia no encontrada"); // Establece el mensaje de búsqueda
    }
  }, [searchTerm]);

  // Efecto para cargar los datos desde localStorage al iniciar el componente
  useEffect(() => {
    const savedForms = JSON.parse(localStorage.getItem("forms")) || []; // Obtiene los datos del localStorage
    // Actualiza los datos filtrados, incluyendo la cadena base64 del PDF
    setFilteredFormData(
      savedForms.map((form) => ({
        ...form,
        pdfFile: localStorage.getItem("pdfFile"), // Recupera la cadena base64 del PDF
      }))
    );
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Encabezado principal */}
      <h1 className="text-4xl text-white mb-8">Vista de Casos</h1>

      {/* Grilla de tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {/* Componentes de estadísticas de casos */}
        <CardCasos
          caso="Total"
          totalCasos={filteredFormData.length}
          texto="Total de Casos Jurídicos"
          icon={<RiFileList2Line />}
        />
        <CardCasos
          caso="Pendientes"
          totalCasos={countCasosByEstado("Activo")}
          texto="Casos Pendientes de Atención"
          icon={<RiAlarmWarningLine />}
        />
        <CardCasos
          caso="Proceso"
          totalCasos={countCasosByEstado("Seguimiento")}
          texto="Casos en Proceso de Seguimiento"
          icon={<RiTimerLine />}
        />
        <CardCasos
          caso="Cerrados"
          totalCasos={countCasosByEstado("Cerrado")}
          texto="Casos Cerrados"
          icon={<RiCheckDoubleLine />}
        />
      </div>

      {/* Sección de tablas de demandas */}
      <div className="my-12">
        {/* Título de la sección */}
        <h2 className="text-2xl text-white mb-4">Tablas de Desarmonias</h2>
        {/* Barra de herramientas (agregar demanda y campo de búsqueda) */}
        <div className="flex items-center space-x-4 mb-4">
          {/* Enlace para agregar una demanda */}
          <Link
            to="Desarmonias"
            className="bg-blue-500 text-white px-4 py-2 font-bold rounded flex items-center hover:bg-primary"
          >
            Agregar Demanda <MdPlaylistAddCircle className="ml-2" />
          </Link>
          <div className="flex items-center">
            {/* Campo de texto para buscar casos */}
            <TextInput
              type="text"
              placeholder="Buscar Casos"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 border rounded-r-md focus:ring focus:border-primary-300"
            />
          </div>
        </div>

        {/* Contenedor de la tabla de demandas */}
        <div className="bg-secondary-100 p-8 rounded-xl">
          {/* Encabezados de la tabla */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4 text-center">
            <h5 className="hidden md:block">N° Radicado</h5>
            <h5 className="hidden md:block">Fecha</h5>
            <h5 className="hidden md:block">Demandante</h5>
            <h5 className="hidden md:block">Demandado</h5>
            <h5 className="hidden md:block">Tipo Demanda</h5>
            <h5 className="hidden md:block">Estado</h5>
            <h5 className="hidden md:block">Opción</h5>
          </div>

          {/* Cuerpo de la tabla (renderiza los casos filtrados) */}
          {filteredFormData.length > 0 ? (
            // Si hay datos filtrados, mapea y renderiza cada caso
            filteredFormData.map((form, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-7 gap-5 mb-2 bg-secondary-900 p-4 rounded-xl text-center"
              >
                {/* Datos de cada caso */}
                <div>{form.radicado}</div>
                <div>{form.demandante && form.demandante.fecha}</div>
                <div>{form.demandante && form.demandante.nombres}</div>
                <div>
                  {/* Renderiza los nombres de los demandados */}
                  {form.demandados &&
                    form.demandados.map((demandado, index) => (
                      <span key={index}>{demandado.nombres}</span>
                    ))}
                </div>
                <div>
                  {/* Muestra el tipo de demanda si está disponible */}
                  {form.demandante &&
                    form.demandante.tipoDemanda &&
                    form.demandante.tipoDemanda.label}
                </div>
                <div
                  className={`py-1 px-2 rounded-lg ${
                    form.estado === "Activo"
                      ? "bg-green-600 text-white"
                      : form.estado === "Seguimiento"
                      ? "bg-orange-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {/* Muestra el estado del caso */}
                  {form.estado === "Activo"
                    ? "Activo"
                    : form.estado === "Seguimiento"
                    ? "Seguimiento"
                    : "Cerrado"}
                </div>

                <div>
                  {/* Enlace para ver detalles del caso */}
                  {form.estado === "Activo" && (
                    <Link
                      to={{
                        pathname: `/detalles/${form.radicado}`,
                        state: { radicado: form.radicado },
                      }}
                      className="underline text-blue-500 hover:text-blue-700"
                    >
                      Ver Detalles
                    </Link>
                  )}
                  {form.estado === "Seguimiento" && (
                    <Link
                      to={`/seguimiento/${form.radicado}`}
                      className="underline text-blue-500 hover:text-blue-700"
                    >
                      Ver Seguimiento
                    </Link>
                  )}
                  {form.estado === "Cerrado" && (
                    <Link
                      to={`/seguimiento/${form.radicado}`}
                      className="underline text-blue-500 hover:text-blue-700"
                    >
                      Ver Caso
                    </Link>
                  )}
                </div>
              </div>
            ))
          ) : (
            // Si no hay datos filtrados, muestra un mensaje de búsqueda
            <p className="text-white">{searchMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
