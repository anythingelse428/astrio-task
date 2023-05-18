<template>
  <div>
    <NavigationComponent></NavigationComponent>
    <NuxtPage />
  </div>
</template>
<script>
import { useBrandsStore } from '~~/store/brands';
import { useProductsStore } from '~~/store/products';

export default defineNuxtComponent({

  async asyncData() {
    const productStore = useProductsStore()
    const products = await productStore.getProducts

    const brandStore = useBrandsStore()
    const brands = await brandStore.getBrands

    return {
      products,
      brands,
    }
  },
})
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;800&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  font-family: 'Open Sans', sans-serif;
}
</style>


