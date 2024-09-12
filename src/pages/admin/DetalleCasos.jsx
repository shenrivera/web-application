import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import DatosDemandante from "../../components/ui/DatosDemandante";
import { AiOutlineAudit, AiOutlineDownload } from "react-icons/ai";

import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfDetalles from "../../components/PdfDetalles";

function DetalleCasos() {
  const { radicado } = useParams();

  const [selectedForm, setSelectedForm] = useState(null);

  useEffect(() => {
    const storedForms = JSON.parse(localStorage.getItem("forms")) || [];
    const form = storedForms.find((form) => form.radicado === radicado);

    if (form) {
      setSelectedForm(form);
    }
  }, [radicado]);

  if (!selectedForm) {
    return <div>Cargando...</div>;
  }

  const { demandante, demandados, estado, evidencias } = selectedForm;

  return (
    <div className="container mx-auto p-4 bg-secondary-100">
      <h2 className="text-2xl font-bold mb-4">Detalle del Caso</h2>
      {/* Datos del radicado */}
      <div className="mb-4">
        <p>Número de Radicado: {radicado}</p>
        <p>Fecha: {demandante && demandante.fecha}</p>
        <p>Hora: {demandante && demandante.hora}</p>
      </div>

      {/* Datos del Demandante */}
      <h3 className="text-lg font-bold mb-2 md:mb">Datos del Demandante</h3>
      <DatosDemandante demandante={demandante} />

      {/* Datos de los Demandados */}
      {demandados &&
        demandados.map((demandado, index) => (
          <div key={index} className="border p-4 mb-4">
            <h3 className="text-lg font-bold mb-2">
              Datos del Demandado {index + 1}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <span className="font-semibold">Nombre:</span>{" "}
                <div className="py-2 px-4 outline-none rounded-lg bg-secondary-900">
                  {demandado.nombres}
                </div>
              </div>
              <div>
                <span className="font-semibold">Apellido:</span>{" "}
                <div className="py-2 px-4 outline-none rounded-lg bg-secondary-900">
                  {demandado.apellidos}
                </div>
              </div>
              <div>
                <span className="font-semibold">Vereda:</span>{" "}
                <div className="py-2 px-4 outline-none rounded-lg bg-secondary-900">
                  {demandado.vereda.label}
                </div>
              </div>
              <div>
                <span className="font-semibold">Tipo de Identificación:</span>{" "}
                <div className="py-2 px-4 outline-none rounded-lg bg-secondary-900">
                  {demandado.tipoIdentificacion}
                </div>
              </div>
              <div>
                <span className="font-semibold">Cédula:</span>{" "}
                <div className="py-2 px-4 outline-none rounded-lg bg-secondary-900">
                  {demandado.numeroIdentificacion}
                </div>
              </div>
            </div>
          </div>
        ))}

      {/* Detalle de la demanda */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 border p-4 mb-4">
        <div>
          <h3 className="text-lg font-bold mb-2">Detalle de la Demanda</h3>
          {demandante && demandante.tipoDemanda && (
            <>
              <div>
                <span className="font-semibold">Tipo de Demanda:</span>{" "}
                <div className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900">
                  {demandante.tipoDemanda.label}
                </div>
              </div>
              <div>
                <span className="font-semibold">Descripción:</span>{" "}
                <textarea
                  className="w-full h-40 md:h-64 py-2 px-4 outline-none rounded-lg bg-secondary-900 text-white  mb-4"
                  value={demandante.descripcion}
                  readOnly
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Evidencias */}
      <div className="border p-4">
        <h3 className="text-lg font-bold mb-2">Evidencias</h3>
        <div className="grid grid-cols-3 gap-4">
          {evidencias && evidencias.urls && evidencias.urls.length > 0 ? (
            evidencias.urls.map((evidencia, index) => (
              <div key={index}>
                {/* Renderizar cada URL de la evidencia */}
                {evidencia.url.endsWith(".pdf") ? (
                  <object
                    data={evidencia.url}
                    type="application/pdf"
                    width="100%"
                    height="600"
                  >
                    PDF Viewer
                  </object>
                ) : (
                  <img
                    src={evidencia.url}
                    alt={evidencia.name}
                    width="200"
                    height="200"
                  />
                )}
              </div>
            ))
          ) : (
            <p>No hay evidencias disponibles.</p>
          )}
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="flex justify-between">
        <Link to={`/seguimiento/${radicado}`}>
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold px-4 py-2 rounded flex items-center hover:bg-primary mt-4"
          >
            Seguimiento
            <span className="ml-2">
              <AiOutlineAudit />
            </span>
          </button>
        </Link>

        <PDFDownloadLink
          document={
            <PdfDetalles type="recibidos" selectedForm={selectedForm} />
          }
          fileName="documento.pdf"
        >
          {({ blob, url, loading, error }) =>
            loading ? (
              <button className="bg-blue-500 text-white px-4 py-2 rounded font-bold flex items-center justify-center hover:bg-primary mt-4">
                Descargando PDF...
              </button>
            ) : (
              <button className="bg-blue-500 text-white px-4 py-2 rounded font-bold flex items-center justify-center hover:bg-primary mt-4">
                Recibido Desarmonia PDF
                <span className="ml-2">
                  <AiOutlineDownload />
                </span>
              </button>
            )
          }
        </PDFDownloadLink>
      </div>
    </div>
  );
}

export default DetalleCasos;
