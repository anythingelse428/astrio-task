<template>
  <div name="defaultLayout" class="layout-default">
    <div>
      <navigation-component :cart-qty="CART_QTY" />
      <Nuxt />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NavigationComponent from '../components/NavigationComponent.vue'
export default {
  components: {
    NavigationComponent
  },

  computed: {
    ...mapState({
      qty: state => state.cart.count
    }),
    CART_QTY () {
      return this.qty
    }
  }
}
</script>
