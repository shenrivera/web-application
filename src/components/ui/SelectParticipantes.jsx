import React from 'react';
import Select from 'react-select';

// Define los cargos del gabinete
const options = [
  { value: 'Gobernador', label: 'Gobernador' },
  { value: 'Vice Gobernador', label: 'Vice Gobernador' },
  { value: 'Capitan', label: 'Capitan' },
  { value: 'Capitan Vitalicio', label: 'Capitan Vitalico' },
  { value: 'Juez', label: 'Juez' },
  { value: 'Secretario Juridico', label: 'Secretario Juridico' },
  { value: 'Comisario', label: 'Comisario' },
  { value: 'Secretario General', label: 'Secretario General' },
  { value: 'Secretario Suplente', label: 'Secretario Suplente' },
  { value: 'Alguacil', label: 'Alguacil' },
  { value: 'Fiscal', label: 'Fiscal' },
  { value: 'Fiscal Suplente', label: 'Fiscal Suplente' },
  { value: 'Alcalde', label: 'Alcalde' },
  { value: 'Alcalde Suplente', label: 'Alcalde Suplente' },
  { value: 'Tesorero', label: 'Tesorero' },
  { value: 'Tesorero-Suplente', label: 'Tesorero-Suplente' },
];

function SelectParticipantes ({ value, onChange }) {
  

  

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#131517',
      borderRadius: '0.375rem', // Cambia el color de fondo del Select
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'white', // Cambia el color del texto seleccionado

    }),

    
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#1E1F25' : '#131517', // Cambia el color de fondo de las opciones seleccionadas y no seleccionadas
      
      '&:hover': {
        backgroundColor: '#1E1F25', // Cambia el color de fondo al pasar el mouse sobre la opción
      },

    }),
    

  };

  const handleChange = (selectedOption) => {
    onChange(selectedOption);
  };


  return (
    <div>
     
      <Select   
        
        styles={customStyles}
        value={value}
        onChange={handleChange}
        options={options}
        isClearable
        placeholder="Seleccionar Cargo del cabildante"
      />
    </div>
  );
}

export default SelectParticipantes;
