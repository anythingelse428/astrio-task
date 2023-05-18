<template>
  <div class="cart-list">
    <table class="cart-list__table" v-if="cartList.length">
      <thead>
        <th colspan="2">Item</th>
        <th>Price</th>
        <th>Qty</th>
        <th>Total</th>
        <th></th>

      </thead>
      <tbody>
        <CartItem v-for="cartItem in cartList" :key="cartItem.id" :cartItem="cartItem"></CartItem>
        <tr class="cart-list__total-price">
          <td colspan="6">
            Subtotal: USD <span>{{ totalPrice }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="cart-list--empty" v-else>
      Корзина пуста, милорд
    </div>
  </div>
</template>

<script>
import { useCartStore } from '~~/store/cart';

export default {
  data() {
    return {
      cartList: []
    }
  },
  mounted() {
    this.getCartList()
  },
  methods: {
    getCartList() {
      this.cartList = useCartStore().getPrettyCart
    },
  },
  computed: {
    totalPrice() {
      return useCartStore().getCartTotalPrice
    }
  }
}
</script>

<style lang="scss">
.cart-list {
  display: flex;

  &__table {
    width: 50%;
    margin: 0 auto;

    @media screen and (max-width: 1200px) {
      width: 80%;
    }

    @media screen and (max-width: 992px) {
      width: 100%;
    }
  }

  &__total-price {
    text-align: end;
    font-weight: 600;

    td {
      padding: 10px;
      padding-right: 0;
      border-top: 2px solid #000;
    }
  }

  &--empty {
    width: 100%;
    text-align: center;
    font-size: 20px;
    font-weight: 500;
  }
}
</style>