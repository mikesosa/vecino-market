import { es } from "date-fns/locale";
import { format, formatDistance } from "date-fns";

export function formatDate(dateString, formatString = "MM/dd/yyyy") {
  return format(new Date(dateString), formatString);
}

export function formatFromDistance(dateString) {
  return formatDistance(new Date(dateString), new Date(), {
    locale: es,
  });
}
