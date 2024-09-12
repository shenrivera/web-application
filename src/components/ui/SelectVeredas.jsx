import React from 'react';
import Select from 'react-select';

// Define las opciones de vereda
const options = [
  { value: 'kwes kiwe', label: 'kwes kiwe' },
  { value: 'Valle Nuevo', label: 'Valle Nuevo' },
  { value: 'Yarumal', label: 'Yarumal' },
  { value: 'Quingos', label: 'Quingos' },
  { value: 'Union Risaralda', label: 'Union Risaralda' },
  { value: 'Florida', label: 'Florida' },
  { value: 'Tierradentro', label: 'Tierradentro' },
  { value: 'Jordan', label: 'Jordan' },
  { value: 'Galilea', label: 'Galilea' },
  { value: 'Brisas', label: 'Brisas' },
  { value: 'Agua Sucia', label: 'Agua Sucia' },
  { value: 'Chirriadero', label: 'Chirriadero' },
  { value: 'Medellin', label: 'Medellin' },
  { value: 'Bodega', label: 'Bodega' },
  { value: 'Pueblillo', label: 'Pueblillo' },
  { value: 'Honduras', label: 'Honduras' },
  { value: 'Belen', label: 'Belen' },
  { value: 'Chorrera', label: 'Chorrera' },
  { value: 'Meson', label: 'Meson' },
  { value: 'Lomitas', label: 'Lomitas' },
  { value: 'Puerto Limon', label: 'Puerto Limon' },
  { value: 'San José', label: 'San José' },
  { value: 'Ukawhes', label: 'Ukawhes' },
];

function SelectVeredas({ value, onChange }) {
 



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
        placeholder="Seleccionar Vereda"
      />
    </div>
  );
}

export default SelectVeredas;
