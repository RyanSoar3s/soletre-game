const port = process.env['PORT'] || 4000;

export const environment = {
  production: true,
  apiUrl: `${process.env["ORIGIN"]}:${port}`

};
