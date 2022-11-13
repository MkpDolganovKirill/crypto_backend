const userRoutes = require("./user.routes");
const cryptoRoutes = require("./crypto.routes");

module.exports.registerModules = (app) => {
  app.use("/user", userRoutes);
  app.use("/crypto", cryptoRoutes);
}
