import React from 'react';
import Select from 'react-select';

const options = [
  { value: 'Desarmonia Ambiental', label: 'Desarmonia Ambiental' },
  { value: 'Desarmonia Cultural', label: 'Desarmonia Cultural' },
  { value: 'Desarmonia Social', label: 'Desarmonia Social' },
  { value: 'Desarmonia Economica', label: 'Desarmonia Economica' },
  { value: 'Desarmonia Rompimiento Espiritual', label: 'Desarmonia Rompimiento Espiritual' },
  { value: 'Desarmonia Familiar', label: 'Desarmonia Familiar' },
  {value: 'Desarmonia De genero', label: 'Desarmonia De Genero' },
];

function SelectDemandas({ value, onChange }) {
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
        placeholder="Seleccionar Demanda"
      />
    </div>
  );
}

export default SelectDemandas;
