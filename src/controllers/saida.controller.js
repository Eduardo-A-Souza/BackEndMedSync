import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createExit(req, res) {
  try {
    const { nome, motivo, quantidade } = req.body;

    if (quantidade === 0)
      return res
        .status(400)
        .json({ message: "A quantidade não pode ser igual a 0" });

    if (!nome || !quantidade || !motivo)
      return res.status(400).json({ message: "Preencha todos os dados" });

    const produto = await prisma.produto.findUnique({
      where: {
        nome: nome,
      },
    });

    if (quantidade > produto.quantidade)
      return res.status(400).json({
        message: `A quantidade de produtos removidos não pode ser maior que: ${produto.quantidade}`,
      });
    if (!produto)
      return res
        .status(404)
        .json({ message: "Não foi possivel encontrar o item" });

    const produtoAtualizado = await prisma.produto.update({
      where: {
        id: produto.id,
      },
      data: {
        quantidade: produto.quantidade - quantidade,
      },
    });

    const saida = await prisma.saida.create({
      data: {
        motivo: motivo,
        produtoId: produto.id,
      },
    });

    return res.status(201).json({
      message: "Produto atualizado com sucesso",
      saida,
      produto: produtoAtualizado,
    });
  } catch (err) {
    return res.status(500).json({ message: `Erro ao registrar saida ${err}` });
  }
}

export async function getExit(req, res) {
  try {
    const saidas = await prisma.saida.findMany();

    if (!saidas) return res.status(404).json({ message: "Não existem saidas" });

    return res.status(200).json(saidas);
  } catch (err) {
    return res.status(500).json({ message: `Erro ao ler saidas ${err}` });
  }
}
