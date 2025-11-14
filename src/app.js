const express = require("express");
const cors = require("cors");
const produtoRouter = require("./routes/produto.routes");
const entradaRouter = require("./routes/entrada.routes");
const saidaRouter = require("./routes/saida.routes");

const app = express();

// Configuração de CORS
app.use(
  cors({
    origin: "https://front-end-medsync-production.up.railway.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use("/produto", produtoRouter);
app.use("/entrada", entradaRouter);
app.use("/saida", saidaRouter);

module.exports = app;
