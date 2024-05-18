<template lang="pug">
  h1 Cart
  h3(v-if="CartStore.getCartCount === 0") Cart is empty, please add some products first
  div(v-else)
    ul.list
      li.list-item(v-for="product in products" :key="product.id")
        span {{product.name}}
        span.cart_flex
          span
            button.btn_cart(@click="CartStore.updateCount({id: product.id, cnt: --product.qty})") -
            input.btn_cart_input(type="number" min="1" max="100" step="1" pattern="[0-9]{3}" :value="product.qty" @input="onInput({e: $event.target.value, id: product.id})")
            button.btn_cart(@click="CartStore.updateCount({id: product.id, cnt: ++product.qty})") +
          span.mw100 ${{(parseFloat(product.qty) * parseFloat(product.price)).toFixed(2)}}
          span
            fa(icon="trash-alt" size="lg" @click="CartStore.deleteProduct(product.id)")
      h2.right Summary: ${{parseFloat(CartStore.getSummary).toFixed(2)}}
      router-link(to="/checkout")
        button.btn.primary.right.btn_inline_block Checkout
</template>

<script setup lang="ts">
import {useCartStore} from "@/stores/CartStore";
const CartStore = useCartStore()

let products: {} | null = CartStore.getCartProducts



function onInput (payload: {e: string, id: string}) {
  let cnt
  let e = payload.e
  e = e.replace(/[^+\d]/g, '');
  if(e === ''){
    e = '1'
  }
  if(parseInt(e) < 1){
    cnt = 1
  }else if(parseInt(e) > 100){
    cnt = 100
  }else{
    cnt = parseInt(e)
  }
  CartStore.updateCount({id: payload.id, cnt: cnt})
}



</script>