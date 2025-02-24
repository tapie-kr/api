export function ApiUrl(url: string) {
  const version = process.env.API_VERSION || 'v1';
  const hostname = process.env.API_HOSTNAME || 'http://localhost:8877/';
  const baseURL = new URL(hostname);

  baseURL.pathname = `${version}${url}`;

  return baseURL.toString();
}
