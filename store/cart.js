export const state = () => ({
  products: [],
  count: 0
})
export const mutations = {
  ADD_PRODUCT (state, productId) {
    const result = state.products.find(p => productId.id === p.id)
    if (result) {
      result.qty += 1
      state.products = [...state.products]
    } else {
      productId.qty = 1
      state.products = [...state.products, productId]
    }
    state.count += 1
  },
  SET_PRODUCT (state, { productId, data }) {
    state.products = [
      ...state.products.filter(prod => prod.id !== productId), data]
  }
}
export const actions = {
  async addProduct ({ commit }, data) {
    await commit('ADD_PRODUCT', data)
  },
  async removeProduct ({ commit }, productId) {
    await commit('REMOVE_PRODUCT', productId)
  }
}
