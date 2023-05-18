<template>
  <nav class="navigation">
    <NuxtLink to="/">
      <div class="navigation__logo">
        <img src="../assets/images/logo.png" alt="Astrio" />
      </div>
    </NuxtLink>
    <div class="cart-link">
      <NuxtLink to="/cart">
        <NavigationCartButton></NavigationCartButton>
      </NuxtLink>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: #ccc;
}
</style>