-- DropIndex
DROP INDEX `PedidoProductos_pedidoId_fkey` ON `PedidoProductos`;

-- AddForeignKey
ALTER TABLE `PedidoProductos` ADD CONSTRAINT `PedidoProductos_pedidoId_fkey` FOREIGN KEY (`pedidoId`) REFERENCES `Pedido`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoriaBlogToPost` ADD FOREIGN KEY (`A`) REFERENCES `CategoriaBlog`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoriaBlogToPost` ADD FOREIGN KEY (`B`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
