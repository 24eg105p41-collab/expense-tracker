import axios from 'axios';

/** Turns any thrown value into a message that is safe to show to the user. */
export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string; fieldErrors?: Record<string, string> } | undefined;
    if (data?.fieldErrors) {
      const first = Object.values(data.fieldErrors)[0];
      if (first) return first;
    }
    if (data?.message) return data.message;
    if (error.code === 'ECONNABORTED') return 'The request timed out. Please try again.';
    if (!error.response) return 'Cannot reach the server. Please check your connection.';
    return `Request failed (${error.response.status})`;
  }
  if (error instanceof Error) return error.message;
  return 'Something went wrong';
}

export function truncate(text: string, max: number): string {
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}
