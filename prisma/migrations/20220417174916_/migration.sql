/*
  Warnings:

  - You are about to drop the column `proveedorId` on the `Producto` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `PedidoProductos_pedidoId_fkey` ON `PedidoProductos`;

-- DropIndex
DROP INDEX `Producto_proveedorId_fkey` ON `Producto`;

-- AlterTable
ALTER TABLE `Producto` DROP COLUMN `proveedorId`,
    ADD COLUMN `proveedor` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_proveedor_fkey` FOREIGN KEY (`proveedor`) REFERENCES `Proveedor`(`nombre`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PedidoProductos` ADD CONSTRAINT `PedidoProductos_pedidoId_fkey` FOREIGN KEY (`pedidoId`) REFERENCES `Pedido`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoriaBlogToPost` ADD FOREIGN KEY (`A`) REFERENCES `CategoriaBlog`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoriaBlogToPost` ADD FOREIGN KEY (`B`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
