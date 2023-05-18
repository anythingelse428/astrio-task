<template>
  <div class="configurator">
    <ProductItemOption v-for="option in configurableOptions" :key="option.attribute_id" :option="option"
      @select-option="selectOption($event)">
    </ProductItemOption>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedOptions: []
    }
  },
  props: {
    configurableOptions: {
      type: Array,
      required: true
    },

  },
  methods: {
    selectOption(params) {
      // проверяем существует ли уже такая опция
      const alreadyExitOption = this.selectedOptions.find(el => el.code === params.code)
      // если существует, меняем ей значение 
      if (alreadyExitOption && params.value_index > -1) {
        alreadyExitOption.value_index = params.value_index
      } else if (alreadyExitOption && params.value_index === -1) {
        this.selectedOptions = this.selectedOptions.filter(el => el.code != params.code)
        this.$emit('check-variants', this.selectedOptions)
      }
      else {
        this.selectedOptions.push({ code: params.code, value_index: params.value_index })
      }
      this.$emit('check-variants', this.selectedOptions)
    }
  }
}
</script>
