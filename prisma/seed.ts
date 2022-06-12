import { categorias } from "./data/categorias";
import { productos } from "./data/productos";
import { proveedores } from "./data/proveedores";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async (): Promise<void> => {
  try {
    await prisma.categoria.createMany({
      data: categorias,
    });
    await prisma.producto.createMany({
        data: productos,
    })
    await prisma.proveedor.createMany({
      data: proveedores,
    })
  } catch (error) {
    console.log(error);
  }
};
main();
