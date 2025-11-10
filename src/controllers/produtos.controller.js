import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// post
export async function createProduct(req, res) {
  try {
    const { nome, descricao, codigo, quantidade } = req.body;
    if (!nome || !descricao || !codigo || !quantidade) {
      return res.status(400).json({ message: "Preencha todos os campos" });
    }

    const newProduct = await prisma.Produto.create({
      data: {
        nome: nome,
        descricao: descricao,
        codigo: codigo,
        quantidade: quantidade,
      },
    });

    return res
      .status(201)
      .json({ newProduct, message: "Produto criado com sucesso" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Erro ao adicionar produto ${err}` });
  }
}

// put
export async function editProduct(req, res) {
  try {
    const id = req.params.id;
    const { nome, descricao, codigo, quantidade } = req.body;
    const updatedProduct = await prisma.Produto.update({
      where: {
        id: id,
      },
      data: {
        ...(nome && { nome }),
        ...(descricao && { descricao }),
        ...(codigo && { codigo }),
        ...(quantidade && { quantidade }),
      },
    });

    return res
      .status(201)
      .json({ updatedProduct, message: "Produto atualizado com sucesso" });
  } catch (err) {
    return res.status(500).json({ message: `Erro ao editar produto ${err}` });
  }
}

// get produto
export async function getProducts(req, res) {
  try {
    const products = await prisma.Produto.findMany();
    if (products.lenght === 0)
      return res.status(404).json({ message: "Nenhum produto encontrado" });

    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json({ message: `Erro ao resgatar produtos` });
  }
}

export async function getProductById(req, res) {
  try {
    const productId = req.params.id;

    const product = await prisma.Produto.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product || product.lenght === 0) {
      return res
        .status(404)
        .json({ message: "Não foi possivel encotrar o produto" });
    }

    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json({ message: `Erro ao resgatar produto` });
  }
}

// delete
export async function deleteProduct(req, res) {
  try {
    const productId = req.params.id;

    const product = await prisma.Produto.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }

    await prisma.Produto.delete({
      where: {
        id: productId,
      },
    });

    return res.sendStatus(204);
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Erro ao deletar o produto ${err}` });
  }
}
