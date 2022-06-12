/*
  Warnings:

  - Made the column `telefono` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `Order_estadoId_fkey` ON `Order`;

-- DropIndex
DROP INDEX `Order_tipoEnvioId_fkey` ON `Order`;

-- DropIndex
DROP INDEX `PedidoProductos_pedidoId_fkey` ON `PedidoProductos`;

-- DropIndex
DROP INDEX `Producto_proveedorId_fkey` ON `Producto`;

-- AlterTable
ALTER TABLE `Order` MODIFY `telefono` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_proveedorId_fkey` FOREIGN KEY (`proveedorId`) REFERENCES `Proveedor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PedidoProductos` ADD CONSTRAINT `PedidoProductos_pedidoId_fkey` FOREIGN KEY (`pedidoId`) REFERENCES `Pedido`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_estadoId_fkey` FOREIGN KEY (`estadoId`) REFERENCES `EstadosPedidos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_tipoEnvioId_fkey` FOREIGN KEY (`tipoEnvioId`) REFERENCES `TipoEnvio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoriaBlogToPost` ADD FOREIGN KEY (`A`) REFERENCES `CategoriaBlog`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoriaBlogToPost` ADD FOREIGN KEY (`B`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
