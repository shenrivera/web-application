import React from "react";

function DatosDemandante({ demandante }) {
  if (!demandante) {
    return <p>No se encontraron datos del demandante.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 border p-4 mb-4">
      <div className="col-span-2 md:col-span-1">
        <span className="font-semibold">Nombre:</span>
        <div className="py-2 px-4 outline-none rounded-lg bg-secondary-900">
          {demandante.nombres}
        </div>
      </div>
      <div className="col-span-2 md:col-span-1">
        <span className="font-semibold">Apellido:</span>{" "}
        <div className="py-2 px-4 outline-none rounded-lg bg-secondary-900">
          {demandante.apellidos}
        </div>
      </div>
      <div className="col-span-2 md:col-span-1">
        <span className="font-semibold">Vereda:</span>{" "}
        <div className="py-2 px-4 outline-none rounded-lg bg-secondary-900">
          {demandante.vereda && demandante.vereda.label ? demandante.vereda.label : ""}
        </div>
      </div>
      <div className="col-span-2 md:col-span-1">
        <span className="font-semibold">Tipo de Demanda:</span>{" "}
        <div className="py-2 px-4 outline-none rounded-lg bg-secondary-900">
          {demandante.tipoDemanda && demandante.tipoDemanda.label ? demandante.tipoDemanda.label : ""}
        </div>
      </div>
      <div className="col-span-2 md:col-span-1">
        <span className="font-semibold">Tipo de Identificación:</span>{" "}
        <div className="py-2 px-4 outline-none rounded-lg bg-secondary-900">
          {demandante.tipoIdentificacion }
        </div>
      </div>
      <div className="col-span-2 md:col-span-1">
        <span className="font-semibold">Cédula:</span>{" "}
        <div className="py-2 px-4 outline-none rounded-lg bg-secondary-900">
          {demandante.numeroIdentificacion}
        </div>
      </div>
    </div>
  );
}

export default DatosDemandante;
