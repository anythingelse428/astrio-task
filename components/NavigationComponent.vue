<template>
  <nav class="navigation">
    <nuxt-link to="/" class="navigation__link">
      <div class="logo navigation__logo navigation__link">
        <img src="~/assets/logo.png" alt="" srcset="">
      </div>
    </nuxt-link>
    <div class="navigation__link">
      <div class="cart navigation__cart">
        <i id="cart" class="bi bi-cart" />
        <label v-show="cartQty > 0" for="cart" class="cart__counter">
          <span>
            {{ cartQty }}
          </span>
        </label>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavigationComponent',
  props: {
    cartQty: {
      type: Number,
      required: false,
      default: 0
    }
  }
}
</script>

<style scoped>
.navigation {
  display: flex;
  width: 100%;
  background: #faae31;
  position: sticky;
  z-index: 1;
  top: 0;
  margin-bottom: 2em;
  align-items: center;
  justify-content: space-between;
  padding: 2em;
}
.navigation__link {
  text-decoration: none;
  color: #313131;
  cursor: pointer;
}
.cart {
  font-size: 2em;
  cursor: pointer;
  display: flex;
}
.cart__counter {
  font-size: 0.5em;
  background: #ffffff;
  border-radius: 50%;
  width: 1.5em;
  height: 1.5em;
  text-align: center;
}
@media screen and (max-width: 680px) {
  .navigation {
    padding: 1em;
  }
}
</style>
