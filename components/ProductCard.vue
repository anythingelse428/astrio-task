<template>
  <div class="productCard">
    <div class="productCard__img ratio ratio-1x1">
      <img v-lazy="require(`~/assets${image}`)" alt="">
    </div>
    <div class="productCard__footer">
      <div class="info productCard__information">
        <div class="info__name">
          {{ title }}
        </div>
        <div v-if="brandTitle" class="info__brand">
          {{ brandTitle }}
        </div>
        <div class="info__price">
          {{ price.currency }}{{ price.value }}
        </div>
      </div>
      <cart-add-button :id="id" :price="price.value" />
    </div>
  </div>
</template>

<script>
import CartAddButton from './CartAddButton.vue'
export default {
  components: { CartAddButton },
  props: {
    type: {
      type: String,
      required: true
    },
    id: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    price: {
      type: Object,
      required: true,
      default () {
        return { currency: 'USD', value: 0 }
      }
    },
    image: {
      type: String,
      required: false,
      default: '@/assets/blank.jpg'
    },
    brandTitle: { type: String, required: true }
  }
}
</script>

<style scoped>
.productCard {
  width: 30%;
  display: flex;
  margin: 0.5em 0.3em;
  flex-direction: row;
  flex-wrap: wrap;
  border: 1px solid #d7d7d7;
  border-radius: 0.2em;
  padding: 0.5em;
}

.productCard__footer {
  width: 99%;
  border-top: 2px solid #d7d7d7;
  padding: .4em 0;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
}
.info {
  width: 70%;
  text-align: left;
}

@media screen and (max-width: 780px) {
  .productCard {
    width: 44%;
    margin: 0.5em;
  }
}
@media screen and (max-width: 650px) {
  .productCard {
    width: 90%;
    margin: 1em 0;
  }
}
@media screen and (max-width: 650px) {
  .productCard__footer {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
}
</style>
