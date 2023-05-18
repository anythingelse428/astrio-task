<template>
  <div class="navigation__cart">
    <div class="cart-button">
      <div class="cart-button__total-qty">{{ getCartTotalQty }}</div>
      <!-- <font-awesome-icon icon="fa-solid fa-cart-shopping" /> -->
      <svg class="cart-button__img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
        <path
          d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
      </svg>
      <div class="cart-button__total-price">{{ getCartTotalPrice }}</div>
    </div>
  </div>
</template>

<script>
import { useCartStore } from '~~/store/cart';

export default {
  computed: {
    getCartTotalQty() {
      if (process.client) {
        return useCartStore().getCartTotalQuantity
      }
    },
    getCartTotalPrice() {
      if (process.client) {
        return useCartStore().getCartTotalPrice
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cart-button {
  display: flex;
  flex-direction: column;
  color: #000;
  position: relative;
  width: fit-content;
  align-items: center;

  &__total-qty {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    min-width: 20px;
    max-width: fit-content;
    aspect-ratio: 1/1;
    padding: 5px;
    height: 20px;
    text-align: center;
    left: calc(100% - 20px);
    top: -5px;
    z-index: 1;
    border-radius: 100%;
  }

  &__total-price {
    position: relative;
    font-weight: 500;
  }

  &__img {
    position: relative;
    width: 25px;
    height: 25px;
  }
}
</style>