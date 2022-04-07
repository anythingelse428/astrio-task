import products from '../static/products.json'
import brands from '../static/brands.json'

export const state = () => ({
  brandsList: brands,
  productsList: modifyProductList(products, brands),
  currentBrand: {}
})
export const mutations = {
  SET_BRANDS_LIST (state, brands) {
    state.brandsList = brands
  },
  SET_CURRENT_BRAND (state, brand) {
    state.currentBrand = brand
  },
  SET_PRODUCTS_LIST (state, products) {
    state.productsList = products
  }
}
// модифицируем список товаров, добавляем название бренда
function modifyProductList (products, brands) {
  const result = products.map((product) => {
    const withCurrentId = brands.filter(brand => brand.id === product.brand)
    // склеили новый объект с суммами свойств
    const brand = withCurrentId.reduce((acc, curr) => {
      acc.brandTitle = curr.title
      return acc
    }, {})
    return { ...product, ...brand }
  })
  return result
}
export const actions = {
  async getBrandList ({ commit }) {
    try {
      await commit('SET_BRANDS_LIST', brands)
    } catch (err) {
      throw new Error('Не удалось получить бренды')
    }
  },
  async getCurrentBrand ({ commit }, { route }) {
    const selectedBrand = brands.find(brnd => brnd.id === Number(route.params.brandId))
    await commit('SET_CURRENT_BRAND', selectedBrand)
  },
  async getProductsList ({ commit }, { route }) {
    let filtred = products
    if (route.fullPath !== '/') {
      filtred = products.filter((el) => { return el.brand === Number(route.params.brandId) })
    }
    await commit('SET_PRODUCTS_LIST', modifyProductList(filtred, brands))
  }
}
