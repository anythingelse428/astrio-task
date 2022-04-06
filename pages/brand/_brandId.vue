<template>
  <catalog-component :products="FILTRED" />
</template>

<script>
import CatalogComponent from '~/components/CatalogComponent.vue'
export default {
  components: { CatalogComponent },
  layout: 'defaultLayout',
  async asyncData ({ app, route, error }) {
    try {
      await app.store.dispatch('products/getProductsList', { route })
    } catch (err) {
      return error({
        statusCode: 404,
        message: 'Невозможно загрузить список товаров'
      })
    }
  },
  computed: {
    FILTRED () {
      return this.$store.state.products.productsList
    }
  }
}
</script>

<style>
</style>
