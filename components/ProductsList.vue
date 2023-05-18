<template>
  <div class="products-list">
    <ProductItem class="products-list__item" v-for="product in products" :key="product.id" :productItem="product">
    </ProductItem>
  </div>
</template>

<script>
import { useProductsStore } from '~~/store/products';

export default {
  data() {
    return {
      products: []
    }
  },
  methods: {
    getProductList() {
      const brandId = Number(this.$route.query.brand)
      if (brandId) {
        this.products = useProductsStore().getFilteredByBrand(brandId)
      } else {
        this.products = useProductsStore().getProducts
      }
    }
  },

  created() {
    this.getProductList()
  },
  watch: {
    $route() {
      this.getProductList()
    }
  }
}
</script>

<style lang="scss" scoped>
.products-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: calc(100% - min(180px, 20%));

  @media screen and (max-width:992px) {
    width: calc(95%);
    margin: auto;
  }

  &__item {
    width: calc(25% - 20px);

    @media screen and (max-width:992px) {
      width: calc(33% - 20px);
    }

    @media screen and (max-width:768px) {
      width: calc(50% - 20px);
    }

    @media screen and (max-width:576px) {
      width: 100%
    }
  }
}
</style>