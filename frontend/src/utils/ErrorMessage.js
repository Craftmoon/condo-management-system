import React from "react";

export default function ErrorMessage({ error }) {
  if (error) {
    switch (error.type) {
      case "required":
        return <p className="help is-danger">Este campo é obrigatório.</p>;
      case "maxLength":
        return (
          <p className="help is-danger">O número máximo de caracteres é 15.</p>
        );
      case "pattern":
        return (
          <p className="help is-danger">
            Somente letras e números são válidos.
          </p>
        );
      default:
        return null;
    }
  }

  return null;
}
