-- DropIndex
DROP INDEX `PedidoProductos_pedidoId_fkey` ON `PedidoProductos`;

-- DropIndex
DROP INDEX `Producto_proveedorId_fkey` ON `Producto`;

-- AlterTable
ALTER TABLE `Pedido` MODIFY `observaciones` VARCHAR(191) NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_proveedorId_fkey` FOREIGN KEY (`proveedorId`) REFERENCES `Proveedor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PedidoProductos` ADD CONSTRAINT `PedidoProductos_pedidoId_fkey` FOREIGN KEY (`pedidoId`) REFERENCES `Pedido`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoriaBlogToPost` ADD FOREIGN KEY (`A`) REFERENCES `CategoriaBlog`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoriaBlogToPost` ADD FOREIGN KEY (`B`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;