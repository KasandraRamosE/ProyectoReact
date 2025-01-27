import { apiCore } from '../axiosInstance'

const getAll = (params: Record<string, string | number>) => {
  return apiCore({
    url: '/products/search',
    params,
  })
}

const getById = (idProducto: string) => {
  return apiCore({
    url: `/products/${idProducto}`,
  })
}

const apiProductos = {
  getAll,
  getById,
}

export default apiProductos
