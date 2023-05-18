import { defineStore } from "pinia";
import { useProductsStore } from "./products";
export interface CartItem {
  id: number
  quantity: number
  type?: string
  title?: string
  regular_price?: {
    currency: string,
    value: number
  }
  image?: string
  brand?: number
  totalPrice: number
}

export const useCartStore = defineStore('cartStore', {
  state: () => ({
    cart: localStorage.getItem('astrio-cart') ? JSON.parse(localStorage.getItem('astrio-cart') || '[]') : [],
    cartTotalQuantity: 0,
    cartTotalPrice: 0
  }),
  getters: {
    getCart(state) {
      return state.cart
    },
    getCartItemQty(state) {
      return (itemId: number) => state.cart.find((cartEl: CartItem) => cartEl.id === itemId).quantity
    },
    getCartTotalQuantity(state) {
      let counter = 0
      state.cart.forEach((cartEl: CartItem) => {
        counter += cartEl.quantity
      });
      state.cartTotalQuantity = counter
      return state.cartTotalQuantity
    },
    getCartTotalPrice(state) {
      let counter = 0
      state.cart.forEach((cartEl: CartItem) => {
        const cartElPrice = useProductsStore().getProductPrice(cartEl.id)
        if (cartElPrice) {
          counter += cartElPrice * cartEl.quantity
        }
      });
      state.cartTotalPrice = counter
      return state.cartTotalPrice.toFixed(2)
    },
    getPrettyCart(state) {
      state.cart.forEach((cartEl: CartItem) => {
        Object.assign(cartEl, useProductsStore().getProductById(cartEl.id))
        if (cartEl.totalPrice && cartEl.regular_price) {
          cartEl.totalPrice = (cartEl.quantity * cartEl.regular_price.value).toFixed(2)
        }
      });
      return state.cart
    }
  },
  actions: {
    addToCart(itemId: number) {
      const cart = this.$state.cart
      const existCartItem = cart.find((cartItem: CartItem) => cartItem.id === itemId)
      if (existCartItem) {
        existCartItem.quantity++
      } else {
        cart.push({ id: itemId, quantity: 1 })
      }
      localStorage.setItem('astrio-cart', JSON.stringify(cart))
    },
    removeFromCart(itemId: number) {
      const itemInCartIdx = this.$state.cart.findIndex((cartItem: CartItem) => cartItem.id === itemId)
      if (itemInCartIdx > -1) {
        this.$state.cart.splice(itemInCartIdx, 1)
        localStorage.setItem('astrio-cart', JSON.stringify(this.$state.cart))
      }
    },
    decreaseCartItem(itemId: number) {
      const cartItem = this.$state.cart.find((cartItem: CartItem) => cartItem.id === itemId)
      if (cartItem.quantity > 1) {
        cartItem.quantity--
      } else {
        this.removeFromCart(itemId)
      }
      localStorage.setItem('astrio-cart', JSON.stringify(this.$state.cart))
    },
    increaseCartItem(itemId: number) {
      const cartItem = this.$state.cart.find((cartItem: CartItem) => cartItem.id === itemId)
      if (cartItem) {
        cartItem.quantity++
        localStorage.setItem('astrio-cart', JSON.stringify(this.$state.cart))
      }
    }
  }
})