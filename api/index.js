export default async (req, res) => {
  const { app } = await import("../dist/soletre/server/server.mjs");
  return app(req, res);

};
