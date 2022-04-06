<template>
  <button class="productCard-add" @click="addToCart(id, price)">
    <i class="bi bi-cart-plus" />
  </button>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  },
  methods: {
    ...mapActions({
      addProduct: 'cart/addProduct'
    }),
    addToCart (id, price) {
      this.addProduct({ id, price })
    }
  }
}
</script>

<style>
.productCard-add {
  width: 30%;
  border: 0;
  padding: 0.5em;
  border-radius: 0.25em;
  font-size: 1.5em;
  background: #a7f5b3;
  cursor: pointer;
  transition: all 0.2s;
}
.productCard-add:hover {
  background: #6ff08b;
}
</style>
