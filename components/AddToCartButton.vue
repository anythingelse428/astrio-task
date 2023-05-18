<template>
  <div class="add-to-cart">
    <button class="add-to-cart__btn" :disabled="!isAvailable" @click="addToCart()">Add to cart</button>
  </div>
</template>

<script>
import { useCartStore } from '../store/cart';

export default {
  props: {
    itemId: {
      type: Number,
      required: true
    },
    isAvailable: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    addToCart() {
      if (process.client) {
        useCartStore().addToCart(this.itemId);
      }
    },

  },

}
</script>

<style lang="scss" scoped>
.add-to-cart {

  &__btn {
    padding: 8px 16px;
    font-size: 18px;
    cursor: pointer;
    transition: background .3s ease;
    border: 1px solid black;
    :hover {
      background: rgb(196, 196, 196);
    }
  }
}
</style>