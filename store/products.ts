import { defineStore } from "pinia";
import products from '../static/level3/products.json'

export const useProductsStore = defineStore('productsStore', {
  state: () => ({
    products: products
  }),
  getters: {
    getProducts(state) {
      return state.products
    },
    getProductById(state) {
      return (productId: number) => {
        let result = state.products.find(productItem => productItem.id === productId) ? state.products.find(productItem => productItem.id === productId) : {}
        if (!result?.id) {
          for (const product of state.products) {
            const validProduct = product.variants?.find(variant => variant.product.id === productId)
            if (validProduct) {
              result = { ...product, ...validProduct.product }
              return result
            }
          }
        }
        return result
      }
    },
    getFilteredByBrand(state) {
      return (brandId: number) => state.products.filter(product => product.brand === brandId)
    },
    getProductPrice(state) {
      return (productId: number) => this.getProductById(productId)?.regular_price.value
    }
  }
})