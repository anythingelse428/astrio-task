<template>
  <div class="configurator__option">
    <div class="configurator__option-title">
      {{ option.label }}
    </div>
    <div class="configurator__option-values">
      <div class="configurator__option-value" v-for="value in option.values" :key="value.value_index">
        <input type="checkbox" :name="option.attribute_id" :value="value.value_index" :code="option.attribute_code"
          ref="configurableOption" class="configurator__option-selector"
          @click="selectOption(option.attribute_code, value.value_index, option.attribute_id)" />
        {{ value.label }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    option: {
      type: Object,
      required: true
    }
  },
  mounted() {
    console.log(this.option);
    this.$refs.configurableOption.forEach(el => el.checked = false)
  },
  methods: {
    selectOption(optionCode, valueId, name) {
      const $selectors = this.$refs.configurableOption
      if ($selectors) {
        const selectedOption = $selectors.find(el => el.checked === true && el.name == name && el.value == valueId && el.attributes.code.value == optionCode)
        const unselectedOptions = $selectors.filter(el => el.name != name || el.value != valueId || el.attributes.code.value != optionCode)

        unselectedOptions.forEach(el => {
          el.checked = false
          el.parentElement.classList.remove('selected')
        }) // снимаем выделение с ненужных опций
        if (selectedOption) {
          selectedOption.parentElement.classList.add('selected')
          this.$emit('select-option', { code: selectedOption.attributes.code.value, value_index: Number(selectedOption.value) })
        } else {
          $selectors.forEach(el => {
            el.parentElement.classList.remove('selected')
          })
          // ставим заглушку на место опции которая была снята, код опции в группе у всех одинаковый 
          this.$emit('select-option', { code: unselectedOptions[0].attributes.code.value, value_index: -1 })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.configurator__option {
  display: flex;
  gap: 5px;
  margin-bottom: 5px;
  flex-direction: column;
  
  &-values {
    display: flex;
    gap: 5px;
  }
  
  &-value {
    display: flex;
    position: relative;
    cursor: pointer;
    text-align: center;
    border: 1px solid #bbb;
    border-radius: 10px;
    padding: 10px;
    transition: background .3s ease;
    
    &:hover {
      background: #ddd;
    }
  }
  
  &-selector {
    cursor: pointer;
    position: absolute;
    inset: 0;
    z-index: 1;
    opacity: 0;
    width: 100%;
    height: 100%;
  }

  .selected {
    background: #000;
    color: #eee;
  }

}
</style>