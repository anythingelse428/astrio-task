import brands from '~/static/brands.json'
import products from '~/static/products.json'

const API = {
  getBrands () {
    return brands
  },
  getProducts () {
    return products
  },
  validCardImage (src) {
    let source
    try {
      source = require('@/assets' + src)
    } catch (error) {
      source = require('@/assets/blank.jpg')
    }
    return source
  }
}

export default API
