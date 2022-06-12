import { useContext } from 'react'
import ProductosContext from '../context/ProductosProvider'

const useProductos = () => {
  return useContext(ProductosContext)
}

export default useProductos