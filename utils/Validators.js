export const validateSignUpFormInputs = (
  phone_number,
  password,
  validate_password
) => {
  const errors = {};
  if (phone_number.length != 10 || !["5", "6", "7"].includes(phone_number[1])) {
    errors.phone_number = "Numéro de téléphone invalide";
  }
  if (phone_number.trim() === "") {
    errors.phone_number = "Le champ est obligatoire";
  }

  if (password.trim() === "") {
    errors.password = "Le champs est obligatoire";
  }
  if (validate_password.trim() === "" || validate_password != password) {
    errors.validate_password = "pas égaux";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
export const validateSignInFormInputs = (
  phone_number,

  password
) => {
  const errors = {};
  if (phone_number.length != 10 || !["5", "6", "7"].includes(phone_number[1])) {
    errors.phone_number = "Numéro de téléphone invalide";
  }
  if (phone_number.trim() === "") {
    errors.phone_number = "Le champ est obligatoire";
  }

  if (password.trim() === "") {
    errors.password = "Le champs est obligatoire";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
