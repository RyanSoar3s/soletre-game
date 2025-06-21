const port = process.env["NEXT_PUBLIC_PORT"] || 4000;

export const environment = {
  production: true,
  apiUrl: `${process.env["NEXT_PUBLIC_ORIGIN"]}:${port}`

};
