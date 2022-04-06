<template>
  <catalog-component :products="PRODUCTS" />
</template>

<script>
import CatalogComponent from '~/components/CatalogComponent.vue'
export default {
  name: 'IndexPage',
  components: { CatalogComponent },
  layout: 'defaultLayout',
  async asyncData ({ app, route, params, error, store }) {
    try {
      await store.dispatch('products/getProductsList', { route })
    } catch (err) {
      return error({
        statusCode: 404,
        message: 'Невозможно загрузить список товаров'
      })
    }
  },

  computed: {
    PRODUCTS () {
      return this.$store.state.products.productsList
    }
  }

}
</script>
