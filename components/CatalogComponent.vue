<template>
  <div class="catalog">
    <brand-filter :brands="BRANDS" />
    <div v-if="products.length" class="catalog__cards">
      <product-card
        v-for="item in products"
        :id="item.id"
        :key="item.id"
        :title="item.title"
        :price="item.regular_price"
        :type="item.type"
        :brand-title="item.brandTitle"
        :image="item.image"
      />
    </div>
    <div v-else class="catalog__cards-error">
      Ничего не найдено :(
    </div>
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue'
import BrandFilter from './BrandFilter.vue'
export default {
  components: { ProductCard, BrandFilter },
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  async asyncData ({ app, route, params, error, store }) {
    try {
      await store.dispatch('products/getBrandsList')
    } catch (err) {
      return error({
        statusCode: 404,
        message: 'Невозможно загрузить список брендов'
      })
    }
  },

  computed: {
    BRANDS () {
      return this.$store.state.products.brandsList
    }
  }
}
</script>

<style scoped>
.catalog {
  display: flex;
  width: 100%;
  justify-content: center;
}
.catalog__cards-error,
.catalog__cards {
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  justify-content: center;
}

@media screen and (max-width: 768px) and (min-width: 481px) {
  .catalog__cards {
    width: 75%;
  }
}
@media screen and (max-width: 481px) {
  .catalog__cards {
    width: 90%;
  }
  .catalog {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
}
</style>
