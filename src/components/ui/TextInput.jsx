import React from "react";

const TextInput = ({ placeholder, className, ...rest }) => {
  // Definimos las clases por defecto del input
  const defaultClasses =
    "w-full py-2 px-8 outline-none rounded-lg bg-secondary-900";

  // Combinamos las clases por defecto con las clases pasadas por props
  const inputClasses = `${defaultClasses} ${className}`;

  return (
    <input
      type="text"
      className={inputClasses}
      placeholder={placeholder}
      {...rest}
    />
  );
};

export default TextInput;
