import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// post
export async function registerEntry(req, res) {
  try {
    const { nome, motivo, quantidade } = req.body;

    if (quantidade === 0)
      return res
        .status(400)
        .json({ message: "a quantidade não pode ser igual a 0" });

    if (!nome || !quantidade || !motivo)
      return res
        .status(400)
        .json({ message: "Insira todos os dados corretamente" });

    const produto = await prisma.produto.findUnique({
      where: {
        nome: nome,
      },
    });

    if (!produto)
      return res.status(404).json({ message: "Produto não encontrado" });

    const produtoAtualizado = await prisma.produto.update({
      where: {
        id: produto.id,
      },
      data: {
        quantidade: produto.quantidade + quantidade,
      },
    });

    const entrada = await prisma.entrada.create({
      data: {
        motivo: motivo,
        produtoId: produto.id,
      },
    });

    return res.status(201).json({
      message: "Produto atualizado com sucesso",
      entrada,
      produto: produtoAtualizado,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Erro ao adicionar entrada: ${err}` });
  }
}

// get
export async function getEntries(req, res) {
  try {
    const entradas = await prisma.Entrada.findMany();

    if (!entradas)
      return res.status(404).json({ message: "Não existem entradas" });

    return res.status(200).json(entradas);
  } catch (err) {
    return res.status(500).json({ message: `Erro ao ler entradas ${err}` });
  }
}

export async function getEntriesById(req, res) {
  try {
  } catch (err) {}
}
