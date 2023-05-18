import { defineStore } from "pinia";


import brands from '../static/brands.json'

export const useBrandsStore = defineStore('brandsStore', {
  state: () => ({
    brands: brands
  }),
  getters: {
    getBrands(state) {
      return state.brands
    },
    getBrandById(state){
      return (brandId:number)=>state.brands.find(brand=>brand.id === brandId)
    }
  },

})