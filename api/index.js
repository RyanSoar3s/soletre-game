export default async (req, res) => {
  const { app } = await import("../dist/soletre/server.mjs");
  return app(req, res);

};
