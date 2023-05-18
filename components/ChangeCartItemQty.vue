<template>
  <div class="change-cart-qty">
    <button class="change-cart-qty__btn" @click="increaseCartItem()">+</button>
    <div class="change-cart-qty__counter">
      <slot></slot>
    </div>
    <button class="change-cart-qty__btn" @click="decreaseCartItem()">-</button>
  </div>
</template>

<script>
import { useCartStore } from '~~/store/cart';


export default {
  props: {
    itemId: {
      type: Number,
      required: true
    },

  },
  methods: {
    increaseCartItem() {
      if (process.client) {
        useCartStore().increaseCartItem(this.itemId)
      }
    },
    decreaseCartItem() {
      if (process.client) {
        useCartStore().decreaseCartItem(this.itemId)
      }
    }
  }
}
</script>

<style lang="scss">
.change-cart-qty {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  user-select: none;
  &__btn {
    background: transparent;
    font-size: 18px;
    border: none;
    font-weight: 600;
    cursor: pointer;
    padding: 5px;
  }
  &__counter{
    font-size: 18px;
  }
}
</style>