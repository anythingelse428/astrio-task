<template>
  <div class="brands-list__item" @click="filterByBrand()" :ref="code">
    <span>{{ title }}</span>
  </div>
</template>
<script>

export default {
  props: {
    title: {
      type: String,
      required: true,
      default: ''
    },
    id: {
      type: Number,
      required: true
    },
    code:{
      type: String,
      required: true
    }
  },
  methods: {
    filterByBrand() {
      this.$router.push({path: this.$route.path, query: { brand: this.id }})
      this.$emit('select-brand')
    }
  }
}
</script>