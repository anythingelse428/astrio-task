<template>
  <aside class="filter">
    <div class="brands">
      <nuxt-link to="/" class="brand">
        All Brands
      </nuxt-link>
      <nuxt-link
        v-for="brand in brands"
        :key="brand.id"
        :to="`/brand/${brand.id}`"
        class="brand"
      >
        {{ brand.title }}
      </nuxt-link>
    </div>
  </aside>
</template>

<script>
export default {
  props: {
    brands: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>
.filter {
  padding: 0.5em;
  height: 100%;
  text-align: center;
  float: right;
  border-right: 2px solid #d3d3d3ee;
}
.brandActive {
  text-decoration: underline;
  font-weight: bolder;
}
.brands{
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
}
.brand {
  cursor: pointer;
  font-size: 1.2em;
  margin: 0.5em auto;
  color: #535353;
}

@media screen and (max-width: 768px) and (min-width: 481px) {
  .filter {
    width: 25%;
  }
}
@media screen and (max-width: 481px) {
  .filter {
    width: 100%;
    border: none;
  }
  .brands {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    flex-direction: row;
  }
  .brand {
    cursor: pointer;
    font-size: 1.2em;
    width: max-content;
    margin: 0.1em 0.4em;
  }
}
@media screen and (max-width: 320px) and (min-width: 481px) {
  .brands {
    justify-content: center;
  }
  .brand {
    width: 34%;
  }
}
</style>
