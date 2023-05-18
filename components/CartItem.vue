<template>
  <tr class="cart-item">
    <td class="cart-item__img"><img :src="`/_nuxt/src${cartItem?.image}`" alt=""></td>
    <td class="cart-item__title">{{ cartItem?.title }} / {{ getBrandName(cartItem?.brand) }}</td>
    <td class="cart-item__price">{{ cartItem?.regular_price?.currency }} {{ cartItem?.regular_price?.value }}</td>
    <td class="cart-item__qty">
      <ChangeCartItemQty :itemId="cartItem?.id">
        {{ cartItem?.quantity }}
      </ChangeCartItemQty>
    </td>
    <td class="cart-item__total-price">
      {{ cartItem?.regular_price?.currency }} {{ (cartItem?.quantity * cartItem?.regular_price?.value).toFixed(2) }}
    </td>
    <td class="cart-item__delete-btn" @click="deleteItem(cartItem.id)">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="18px" height="18px">
        <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
        <path
          d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
      </svg>
    </td>
  </tr>
</template>

<script>
import { useBrandsStore } from '~~/store/brands';
import { useCartStore } from '~~/store/cart'
import ChangeCartItemQty from './ChangeCartItemQty.vue';

export default {
  props: {
    cartItem: {
      type: Object,
      required: true
    }
  },
  mounted() {
    console.log(this.cartItem);

  },
  methods: {
    deleteItem(id) {
      useCartStore().removeFromCart(id)
    },
    getBrandName(id) {
      return useBrandsStore().getBrandById(id)?.title;
    }
  },
  components: { ChangeCartItemQty }
}
</script>
<style lang="scss">
.cart-item {
  text-align: center;

  &__img {

    img {
      object-fit: contain;
      width: 100px;
      height: 100px;
    }
  }

  &__title {
    text-align: start;
  }

  &__delete-btn {
    cursor: pointer;
  }
}
</style>