import * as yup from "yup";

export const codeFormSchema = yup.object().shape({
  code: yup
    .number()
    .typeError("El código debe ser numérico")
    .test("len", "El código debe tener 6 dígitos", (val) => {
      const valueToStringWithZeros = val?.toString().padStart(6, "0");
      return val && valueToStringWithZeros.length === 6;
    })
    .required("El código es requerido"),
});
