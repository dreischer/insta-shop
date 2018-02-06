import axios from 'axios'
import { getToken } from '../../../utils/Auth'

const config = {
  headers: {
    Authorization: `Bearer ${getToken().access_token}`
  }
}

function getAllProducts () {
  return axios.get('/api/admin/products', config).then(data => data.data)
}

function addProduct (productData) {
  return axios.post('/api/admin/products', productData, config).then(data => data.data)
}

function updateProduct (_id, productData) {
  return axios.put(`/api/admin/products/${_id}`, productData, config).then(data => data.data)
}

function deleteProduct (_id) {
  return axios.delete(`/api/admin/products/${_id}`, config).then(data => data.data)
}

function validateProduct (data) {
  return []
}

export {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  validateProduct
}
