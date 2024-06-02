<template lang="pug">
  form(class="card" @submit.prevent)
    h1 Please enter email
    div.mb10 We will send your password to your email

    div(:class="['form-control', 'mb10', {invalid: auth[0].error}]")
      input(type="email" id="email" v-model.trim="auth[0].val" @input="validateField(auth, 0)")
      small(v-if="auth[0].error") {{auth[0].error}}

    button(class="btn main mt10" type="sumbit" :disabled="!validatedAuth" @click="SendEmail") Send Email

    teleport(to="body")
      app-modal(v-if="modal" title="Your password was sent" @close="modal = false") Please check your inbox on email
</template>

<script setup lang="ts">
import {computed, Ref, ref} from "vue";
import router from "@/router";
import {useUiStore} from "@/stores/UiStore";
import AppModal from "@/components/ui/AppModal.vue";
import {arrInfoType} from "@/utils/requestTypes";
const UiStore = useUiStore()

const auth: Ref<arrInfoType[]> = ref([
  {
    label: 'Email',
    val: '',
    pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    valid: false,
    activated: false,
    error: '',
    errorText: 'Please enter correct email, example: john.carson@gmail.com'
  }
])

const modal = ref(false)

const validateField = (infoArr: arrInfoType[], index: number): void =>  {

  if (infoArr[index].val !== '') {
    infoArr[index].activated = true
    infoArr[index].valid = false
  }
  if (infoArr[index].val === '' && infoArr[index].activated) {
    infoArr[index].error = 'Field cant be empty'
    infoArr[index].valid = false
  }
  if (infoArr[index].val !== '' && infoArr[index].activated && !(infoArr[index].pattern.test(infoArr[index].val))) {
    infoArr[index].error = infoArr[index].errorText
    infoArr[index].valid = false
  }
  if (infoArr[index].activated && (infoArr[index].pattern.test(infoArr[index].val))) {

    infoArr[index].error = ''
    infoArr[index].valid = true
  }
}

let validatedAuth = computed((): boolean => {
  let validCount: number = 0
  auth.value.forEach((el) => {
    if(el.valid){
      validCount++
    }
  })
  return validCount === auth.value.length;
})

const SendEmail = (): void => {
  let authData = {
    email: auth.value[0].val
  }
  console.log(authData)

  modal.value = true
 // UiStore.toMainLayout()
}

</script>
