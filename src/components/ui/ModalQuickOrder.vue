<template lang="pug">
  div(class="modal-backdrop")
  div.modal
    div.float-right(@click="emit('close')") X
    div(v-if="!orderSended")
      h3(v-if="title") {{ title }}
      div.mb50
        div(class="form-control" :class="{invalid: phone.error}")
          label(for="phone")  *Phone
          input(type="tel"
            placeholder="123-456-7890" id="phone" v-model.trim="phone.val" @input="validateField(phone)")
          small(v-if="phone.error")  {{phone.error}}

        div(class="form-control" :class="{invalid: name.error}")
          label(for="name")  *Full Name
          input(type="text"
            placeholder="John Doe" id="name" v-model.trim="name.val" @input="validateField(name)")
          small(v-if="name.error")  {{name.error}}
      div.mt10
        button.primary.btn(@click="sendQuickOrder" :disabled="!(name.valid && phone.valid)") Order Now
    div.mt50(v-else)
      div.mb20 Customer Service Team will call you soon as possible, thanks for order
      button.primary.btn.block.center(@click="emit('close')") Ok
</template>

<script setup lang="ts">
import router from "@/router";
import {ref} from "vue";

const orderSended = ref(false)

const emit = defineEmits(['close'])
const props = defineProps<{
  title: string,
  product: Object,
  qty: number
}>()

const product = props.product
const qty = props.qty

const name = ref({
  val: '',
  activated: false,
  valid: false,
  pattern: /^[a-zA-Z ]{3,50}$/,
  error: '',
  errorText: 'Please enter correct Name, minimum 3 symbols'
})

const phone = ref({
  val: '',
  activated: false,
  valid: false,
  pattern: /^[0-9]{3}-{0,1}[0-9]{3}-{0,1}[0-9]{4}$/,
  error: '',
  errorText: 'Please enter correct Name, minimum 3 symbols'
})

const validateField = (field: Object) => {
  if (field.val !== '') {
    field.activated = true
    field.valid = false
  }
  if (field.val === '' && field.activated) {
    field.error = 'Field cant be empty'
    field.valid = false
  }
  if (field.val !== '' && field.activated && !(field.pattern.test(field.val))) {
    field.error = field.errorText
    field.valid = false
  }
  if (field.activated && (field.pattern.test(field.val))) {
    field.error = ''
    field.valid = true
  }
}

const sendQuickOrder = () => {
  let order: {[key: string]: (string | boolean | {})} = {}
  order["name"] = name.value.val
  order["phone"] = phone.value.val
  order["product"] = {
    productId: product.id,
    productQty: qty,
    productPrice: product.price,
    productSum: (parseFloat(product.price) * qty).toFixed(2)
  }
  console.log(order)
  orderSended.value = true
}

</script>