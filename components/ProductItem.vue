<template>
  <div class="product-item">
    <img :src="`/_nuxt/src${product?.image}`" :alt="`${product?.title} (${getBrandName()})`" srcset=""
      class="product-item__image" width="410px" height="410px">
    <div class="product-item__title">{{ product?.title }}</div>
    <div class="product-item__brand">{{ getBrandName() }}</div>
    <div class="product-item__price">
      <div class="product-item__price-currency">{{ product?.regular_price.currency }}</div>
      <div class="product-item__price-value">{{ product?.regular_price.value }}</div>
    </div>
    <div class="product-item__configurator" v-if="product?.type === 'configurable'">
      <ProductItemConfigurator :configurableOptions="getConfigAttrs" @check-variants="compareVariants($event)">
      </ProductItemConfigurator>
    </div>
    <ClientOnly>
      <AddToCartButton :itemId="product.id" :isAvailable="isAvailable" v-if="!isItemInCart || !isAvailable" />
      <ChangeCartItemQty :itemId="product.id" v-else-if="isItemInCart && isAvailable">
        {{ getCartItemQty }} {{ product.id }}
      </ChangeCartItemQty>
    </ClientOnly>
  </div>
</template>

<script>
import { useBrandsStore } from '~~/store/brands';
import { useCartStore } from '~~/store/cart';

import AddToCartButton from './AddToCartButton.vue';
import ChangeCartItemQty from './ChangeCartItemQty.vue';
import ProductItemConfigurator from './ProductItemConfigurator.vue';

export default {
  props: {
    productItem: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      product: { ...this.productItem },
      isAvailable: true
    }
  },
  methods: {
    compareVariants(params) {
      // проверяем наличие параметров, функция вызывается каждый раз при их изменении,
      // значит возможен вариант, что снимутся все опции
      // если параметры есть, начинаем проверку комбинаций из конфигуратора и вариантов из списка продуктов
      if (params.length) {
        for (const variant of this.product?.variants) {
          if (this.isObjectsEqual(params, variant.attributes)) {
            // если вариант совпал с конфигуратором,
            // указываем доступность продукта, меняем данные о нем
            // и заканчиваем проверку
            this.isAvailable = true
            console.log(variant.product);
            this.product = { ...this.product, ...variant.product }
            break
          } else {
            // если ни один вариант не совпал с параметрами конфигуратора указываем о невозможности купить
            // и возвращаем продукт к изначальному виду 
            this.product = { ...this.productItem }
            this.isAvailable = false
          }
        }
      }
      // если параметры не заданы, возвращаем продукт к начальныи значениям
      else {
        this.isAvailable = true
        this.product = { ...this.productItem }
      }
    },
    isObjectsEqual(obj1, obj2) {
      // сравниваем массивы объектов
      let acc = 0
      // если длины не совпадают, массивы точно неравны
      if (Object.keys(obj1).length === Object.keys(obj2).length) {
        Object.entries(obj1).forEach(([key, val]) => {
          // пробегаемся по первому массиву объектов,
          // преобразовываем объект в строку и ищем такой же преобразованный в строку объект из второго массива
          if (Object.entries(obj2).find(([key2, val2]) => JSON.stringify(val2) === JSON.stringify(val)) && acc <= Object.keys(obj1).length) {
            // считаем количество совпадений
            acc += 1
          }
          return false
        })
        // если количество совпадений совпадает с длинной массива, массивы объектов равны
        if (acc === Object.keys(obj1).length) {
          return true
        }
      }
      return false
    },
    getBrandName() {
      return useBrandsStore().getBrandById(this.product.brand).title;
    },

  },

  computed: {
    isItemInCart() {
      if (process.client) {
        return useCartStore().getCart.find(cartItem => cartItem.id === this.product.id);
      }
    },
    getCartItemQty() {
      if (process.client) {
        return useCartStore().getCartItemQty(this.product.id)
      }
    },
    getConfigAttrs() {
      if (this.product.type === 'configurable') {
        return this.product.configurable_options
      }
    }
  },
  components: { ChangeCartItemQty, AddToCartButton, ProductItemConfigurator }
}
</script>

<style lang="scss" scoped>
.product-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &__image {
    width: 410px;
    height: 410px;
    max-width: 100%;
    object-fit: contain;
  }

  &__title {
    font-size: 18px;
  }

  &__price {
    display: flex;
  }
}
</style>