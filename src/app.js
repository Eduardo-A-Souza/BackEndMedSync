const express = require("express");
const produtoRouter = require("./routes/produto.routes");
const entradaRouter = require("./routes/entrada.routes");
const saidaRouter = require("./routes/saida.routes");

const app = express();

app.use(express.json());
app.use("/produto", produtoRouter);
app.use("/entrada", entradaRouter);
app.use("/saida", saidaRouter);

module.exports = app;
