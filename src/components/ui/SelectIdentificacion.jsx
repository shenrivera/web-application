import React from 'react';
import Select from 'react-select';

// Define las opciones de tipo de identificación
const options = [
  { value: 'Cédula de ciudadanía', label: 'Cédula de Ciudadanía' },
  { value: 'Tarjeta de Identidad', label: 'Tarjeta de Identidad' },
  { value: 'Pasaporte', label: 'Pasaporte' },
];

function SelectIdentificacion({ value, onChange }) {
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#131517',
      borderRadius: '0.375rem',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'white',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#1E1F25' : '#131517',
      '&:hover': {
        backgroundColor: '#1E1F25',
      },
    }),
  };

  const handleChange = (selectedOption) => {
    onChange(selectedOption ? selectedOption.value : ''); // Pasa el valor seleccionado o cadena vacía si se deselecciona
  };

  return (
    <Select
      styles={customStyles}
      value={options.find((option) => option.value === value)} // Encuentra la opción por valor
      onChange={handleChange}
      options={options}
      isClearable
      placeholder="Seleccionar Tipo de Identificación"
    />
  );
}

export default SelectIdentificacion;
