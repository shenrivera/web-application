import React, { useState } from "react";
import TextInput from "../../components/ui/TextInput";
import SelectDemandas from "../../components/ui/SelectDemadas";
import SelectIdentificacion from "../../components/ui/SelectIdentificacion";
import SelectVeredas from "../../components/ui/SelectVeredas";

function Desarmonias() {

  const [demandante, setDemandante] = useState({
    fecha: "",
    hora: "",
    nombres: "",
    apellidos: "",
    tipoIdentificacion: "",
    numeroIdentificacion: "",
    vereda: "",
    tipoDemanda: "",
    descripcion: "",
  });

  // Estado para los demandados
  const [demandados, setDemandados] = useState([
    {
      nombres: "",
      apellidos: "",
      tipoIdentificacion: "",
      numeroIdentificacion: "",
      vereda: "",
    },
  ]);

  // Estado para evidencias
  const [evidencias, setEvidencias] = useState({
    files: [],
    urls: [],
  });

  // Estado para controlar el envío del formulario
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Función para manejar cambios en los campos del demandante
  const handleDemandanteChange = (field, value) => {
  let validatedValue = value;

  // Reiniciar número de identificación si se cambia el tipo de identificación
  if (field === "tipoIdentificacion") {
    validatedValue = value; // Establecer el nuevo valor de tipo de identificación

    // Limpiar el número de identificación al cambiar el tipo de identificación
    setDemandante({
      ...demandante,
      tipoIdentificacion: validatedValue,
      numeroIdentificacion: "", // Reiniciar número de identificación
    });

    return;
  }

  // Validar longitud del número de identificación según el tipo seleccionado
  if (field === "numeroIdentificacion") {
    // Aplicar validación específica según el tipo de identificación
    const { tipoIdentificacion } = demandante;

    if (tipoIdentificacion === "Cédula de ciudadanía" || tipoIdentificacion === "Tarjeta de Identidad") {
      validatedValue = validatedValue.replace(/\D/g, "").slice(0, 10);
    } else if (tipoIdentificacion === "Pasaporte") {
      validatedValue = validatedValue.slice(0, 12);
    }
  }

  // Actualizar el estado del demandante con el nuevo valor validado
  setDemandante({ ...demandante, [field]: validatedValue });
};


  // Función para manejar cambios en los campos de un demandado específico
  const handleDemandadoChange = (index, field, value) => {
    const updatedDemandados = [...demandados];
    let validatedValue = value;

    // Reiniciar número de identificación si se cambia el tipo de identificación
    if (field === "tipoIdentificacion") {
      updatedDemandados[index]["tipoIdentificacion"] = value;
      updatedDemandados[index]["numeroIdentificacion"] = "";
    }

    // Validar longitud del número de identificación según el tipo seleccionado
    if (field === "numeroIdentificacion") {
      const tipoIdentificacion = updatedDemandados[index]["tipoIdentificacion"];
      if (
        tipoIdentificacion === "Cédula de ciudadanía" ||
        tipoIdentificacion === "Tarjeta de Identidad"
      ) {
        validatedValue = validatedValue.replace(/\D/g, "").slice(0, 10);
      } else if (tipoIdentificacion === "Pasaporte") {
        validatedValue = validatedValue.slice(0, 12);
      }
    }

    updatedDemandados[index][field] = validatedValue;
    setDemandados(updatedDemandados);
  };

  // Función para agregar un nuevo demandado
  const handleAddDemandado = () => {
    setDemandados([
      ...demandados,
      {
        nombres: "",
        apellidos: "",
        tipoIdentificacion: "",
        numeroIdentificacion: "",
        vereda: "",
      },
    ]);
  };

  // Función para eliminar un demandado
  const handleRemoveDemandado = (index) => {
    const newDemandados = [...demandados];
    newDemandados.splice(index, 1);
    setDemandados(newDemandados);
  };

  // Función para manejar cambios en archivos de evidencia
  const handleFileChange = (e) => {
    const files = e.target.files;
    const urls = Array.from(files).map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setEvidencias({ files: Array.from(files), urls });
  };

  // Función para enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
 

    // Validar campos obligatorios del demandante
    const requiredFields = [
      "fecha",
      "hora",
      "nombres",
      "apellidos",
      "tipoIdentificacion",
      "numeroIdentificacion",
      "vereda",
      "tipoDemanda",
      "descripcion",
    ];
    const isDemandanteValid = requiredFields.every(
      (field) => demandante[field]
    );

    if (!isDemandanteValid) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }

    // Función para generar y obtener el próximo número de radicado
    const getNextRadicado = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");

      // Obtener el contador actual para el día actual (o inicializar a 1 si no existe)
      const todayKey = `${year}${month}${day}`;
      let currentCount = parseInt(localStorage.getItem(todayKey)) || 1;

      // Construir el próximo número de radicado en formato NN-añomesdia
      const nextRadicado = `${currentCount
        .toString()
        .padStart(2, "0")}-${year}${month}${day}`;

      // Incrementar el contador para el próximo radicado del día
      localStorage.setItem(todayKey, currentCount + 1);

      return nextRadicado;
    };

    // Llamar a la función para obtener el próximo número de radicado
    const newRadicado = getNextRadicado();

    // Guardar los datos en el localStorage
    const newFormData = {
      demandante,
      demandados,
      evidencias,
      radicado: newRadicado,
      estado: "Activo",
    };

    const storedForms = JSON.parse(localStorage.getItem("forms")) || [];
    const updatedForms = [...storedForms, newFormData];
    localStorage.setItem("forms", JSON.stringify(updatedForms));

    setFormSubmitted(true);

    // Limpiar el estado del formulario para el próximo uso
    setDemandante({
      fecha: "",
      hora: "",
      nombres: "",
      apellidos: "",
      tipoIdentificacion: "",
      numeroIdentificacion: "",
      vereda: "",
      tipoDemanda: "",
      descripcion: "",
    });
    setDemandados([
      {
        nombres: "",
        apellidos: "",
        tipoIdentificacion: "",
        numeroIdentificacion: "",
        vereda: "",
      },
    ]);
    setEvidencias({
      files: [],
      urls: [],
    });
    // Redirigir a la página de detalles después de enviar el formulario
    
  };


  return (
    <div className="container mx-auto p-4 bg-secondary-100">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Formulario de Demandas</h2>

        {/* Datos del Demandante */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border p-4 mb-4">
          <TextInput
            label="Fecha"
            type="date"
            value={demandante.fecha}
            onChange={(e) => handleDemandanteChange("fecha", e.target.value)}
            required
          />
          <TextInput
            label="Hora"
            type="time"
            value={demandante.hora}
            onChange={(e) => handleDemandanteChange("hora", e.target.value)}
            required
          />
          <TextInput
            label="Nombres del Demandante"
            value={demandante.nombres}
            onChange={(e) => handleDemandanteChange("nombres", e.target.value)}
            placeholder="Ingrese nombres"
            required
          />
          <TextInput
            label="Apellidos del Demandante"
            value={demandante.apellidos}
            onChange={(e) =>
              handleDemandanteChange("apellidos", e.target.value)
            }
            placeholder="Ingrese apellidos"
            required
          />
          <SelectIdentificacion
            label="Tipo de Identificación"
            value={demandante.tipoIdentificacion}
            onChange={(value) =>
              handleDemandanteChange("tipoIdentificacion", value)
            }
            required
          />
          <TextInput
            label="Número de Identificación"
            value={demandante.numeroIdentificacion}
            onChange={(e) =>
              handleDemandanteChange("numeroIdentificacion", e.target.value)
            }
            placeholder="Ingrese número de identificación"
            required
          />
          <SelectVeredas
            label="Vereda del Demandante"
            value={demandante.vereda}
            onChange={(value) => handleDemandanteChange("vereda", value)}
            required
          />
          <SelectDemandas
            label="Tipo de Demanda"
            value={demandante.tipoDemanda}
            onChange={(value) =>
              setDemandante({ ...demandante, tipoDemanda: value })
            }
            required
          />
          <div className="sm:col-span-2">
            <label htmlFor="descripcion" className="block mb-1">
              Descripción de la Demanda:
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={demandante.descripcion}
              onChange={(e) =>
                handleDemandanteChange("descripcion", e.target.value)
              }
              required
              className="border bg-secondary-900 rounded px-2 py-1 w-full h-24"
            ></textarea>
          </div>
        </div>

        {/* Demandados */}
        {demandados.map((demandado, index) => (
          <div key={index} className="mb-4 border p-4">
            <h3 className="text-lg font-bold mb-4">Demandado {index + 1}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                label="Nombres del Demandado"
                value={demandado.nombres}
                onChange={(e) =>
                  handleDemandadoChange(index, "nombres", e.target.value)
                }
                placeholder="Ingrese nombres"
                required
              />
              <TextInput
                label="Apellidos del Demandado"
                value={demandado.apellidos}
                onChange={(e) =>
                  handleDemandadoChange(index, "apellidos", e.target.value)
                }
                placeholder="Ingrese apellidos"
                required
              />
              <SelectIdentificacion
                label="Tipo de Identificación"
                value={demandado.tipoIdentificacion}
                onChange={(value) =>
                  handleDemandadoChange(index, "tipoIdentificacion", value)
                }
                required
              />
              <TextInput
                label="Número de Identificación"
                value={demandado.numeroIdentificacion}
                onChange={(e) =>
                  handleDemandadoChange(
                    index,
                    "numeroIdentificacion",
                    e.target.value
                  )
                }
                placeholder="Ingrese número de identificacdión"
                required
              />
              <SelectVeredas
                label="Vereda del Demandado"
                value={demandado.vereda}
                onChange={(value) =>
                  handleDemandadoChange(index, "vereda", value)
                }
                required
              />
              <button
                type="button"
                onClick={() => handleRemoveDemandado(index)}
                className="bg-blue-500 text-white px-2 py-2 rounded hover:bg-primary "
              >
                Eliminar Demandado
              </button>
            </div>
          </div>
        ))}

        {/* Botón para agregar demandado */}
        <button
          type="button"
          onClick={handleAddDemandado}
          className="bg-blue-500 font-bold text-white px-4 py-2 rounded hover:bg-primary"
        >
          Agregar Demandado
        </button>

        {/* Input para subir evidencias */}
        <div className="mt-4">
          <label htmlFor="evidencias" className="block mb-1">
            Evidencias:
          </label>
          <input
            type="file"
            id="evidencias"
            multiple
            onChange={handleFileChange}
            accept="image/*,.pdf"
            className="border border-gray-300 rounded px-2 py-1 w-full"
          />
        </div>

        {/* Botón para enviar el formulario */}
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-primary mt-4"
          >
            Enviar Demanda
          </button>
        </div>

        {/* Mensaje de éxito después de enviar el formulario */}
        {formSubmitted && <p>¡Demanda enviada con éxito!</p>}
      </form>
    </div>
  );
}

export default Desarmonias;
