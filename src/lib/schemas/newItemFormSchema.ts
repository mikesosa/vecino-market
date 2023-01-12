import * as yup from "yup";

export const newItemFormSchema = yup.object().shape({
  title: yup.string().required("El título es requerido"),
  price: yup.number().required("El precio es requerido"),
  description: yup.string().required("La descripción es requerida"),
});
