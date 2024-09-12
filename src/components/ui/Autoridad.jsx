import React from 'react';
import TextInput from '../../components/ui/TextInput';
import SelectParticipantes from '../../components/ui/SelectParticipantes';

function Autoridad({ autoridad, eliminarAutoridad, autoridades, setAutoridades }) {
  const handleNombreChange = (event) => {
    const nuevoNombre = event.target.value;
    const nuevasAutoridades = autoridades.map((aut) => {
      if (aut.id === autoridad.id) {
        return { ...aut, nombre: nuevoNombre };
      }
      return aut;
    });
    setAutoridades(nuevasAutoridades);
  };

  const handleCargoChange = (selectedOption) => {
    const nuevasAutoridades = autoridades.map((aut) => {
      if (aut.id === autoridad.id) {
        return { ...aut, cargo: selectedOption };
      }
      return aut;
    });
    setAutoridades(nuevasAutoridades);
  };

  return (
    <div key={autoridad.id} className="mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor={`nombreAutoridad${autoridad.id}`} className="block mb-1">
            Nombre del Cabildante:
          </label>
          <TextInput
            id={`nombreAutoridad${autoridad.id}`}
            value={autoridad.nombre}
            onChange={handleNombreChange}
          />
        </div>
        <div className="flex items-center">
          <div className="flex-grow">
            <label htmlFor={`cargoAutoridad${autoridad.id}`} className="block mb-1">
              Cargo Del Cabildante:
            </label>
            <SelectParticipantes
              value={autoridad.cargo}
              onChange={handleCargoChange}
            />
          </div>
          {autoridades.length > 1 && (
            <button onClick={() => eliminarAutoridad(autoridad.id)} className="text-red-500 ml-4 mt-5">
              X
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Autoridad;
