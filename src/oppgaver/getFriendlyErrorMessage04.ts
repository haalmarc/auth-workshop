import axios from "axios";

interface ErrorData {
  message?: string;
}

export function getFriendlyErrorMessage(error: Error | null) {
  const defaultMessage = "En ukjent feil skjedde. Prøv igjen senere.";

  if (axios.isAxiosError<ErrorData>(error)) {
    return error.response?.data?.message || defaultMessage;
  }

  return error?.message || defaultMessage;
}
