import * as yup from "yup";

export const newItemFormSchema = yup.object().shape({
  title: yup
    .string()
    .max(100, "El título es muy largo")
    .required("El título es requerido"),
  price: yup
    .number()
    .max(100000000, "El precio es muy alto")
    .required("El precio es requerido"),
  phone_number: yup
    .string()
    .required("El número de teléfono es requerido")
    .matches(/^\d{10}$/, "Ingrese teléfono válido"),
  description: yup
    .string()
    .max(300, "La descripción es muy larga")
    .required("La descripción es requerida"),
});
