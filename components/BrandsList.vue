
<template>
  <Transition name="filter">
    <div class="brands-list" :class="isCollapsed ? 'collapsed' : ''">
      <button class="brands-list__collapse-btn" @click="isCollapsed = !isCollapsed">
        <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px"
          viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
          <path
            d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z" />
        </svg>
      </button>


      <div class="brands-list__item" :class="selected === -1 ? 'active' : ''" @click="clearBrandFilter()">
        All brands</div>
      <BrandItem v-for="brand in brands" :key="brand.id" :title="brand.title" :id="brand.id" :code="brand.code"
        @select-brand="selectBrand(brand.id)" :class="selected === brand.id ? 'active' : ''"></BrandItem>
    </div>
  </Transition>
</template>

<script>
import { useBrandsStore } from '~~/store/brands';

export default {
  data() {
    return {
      brands: [],
      selected: this.$route.query.brand ? Number(this.$route.query.brand) : -1,
      isCollapsed: false
    }
  },

  created() {
    this.brands = useBrandsStore().getBrands
  },
  methods: {
    clearBrandFilter() {
      this.$router.push({ path: this.$route.path })
      this.selected = -1
    },
    selectBrand(id) {
      this.selected = id
    },

  }
}
</script>

<style lang="scss" scoped>


.brands-list {
  display: flex;
  flex-direction: column;
  width: min(140px, 20%);
  height: min-content;
  border-right: 2px solid #000;

  @media screen and (max-width:992px) {
    width: fit-content;
    border-right: none;

    &.collapsed {
      flex-direction: row;
      flex-wrap: nowrap;

      position: absolute;
      z-index: 2;
      inset: 0;

      max-width: 100%;
      margin: 0 auto;
      padding: 10px;
      overflow-x: auto;

      .brands-list__item {
        white-space: nowrap;
        display: block;
      }
    }

    &__item {
      display: none;
    }
  }

  &__item {
    cursor: pointer;
    padding: 10px;
    width: fit-content;
    user-select: none;

    &.active {
      font-weight: bold;
      position: relative;

      &::after {
        display: block;
        position: absolute;
        content: "";
        inset: 0;
        top: calc(100% - 10px);
        width: calc(95% - 20px);
        height: 3px;
        margin: 0 auto;
        background: #000;
      }
    }
  }

  &__collapse-btn {
    display: none;

    @media screen and (max-width:992px) {
      display: block;
    }
  }
}
</style>