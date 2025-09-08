export function createErrorResponse(consoleText, errorText, error) {
  console.error(consoleText, error);
  return {
    status: 500,
    error: errorText,
    message: error.message,
  };
}
