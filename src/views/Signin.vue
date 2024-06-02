<template lang="pug">
  form(class="card" @submit.prevent="SignIn")
    h1 Sign In

    div(:class="['form-control', 'mb10', {invalid: auth[0].error}]")
      label(for="email") {{auth[0].label}}
      input(type="email" id="email" v-model.trim="auth[0].val" @input="validateField(auth, 0)")
      small(v-if="auth[0].error") {{auth[0].error}}

    div(:class="['form-control', 'mb10', {invalid: auth[1].error}]")
      label(for="password") {{auth[1].label}}
      input(type="password" id="password" v-model.trim="auth[1].val" @input="validateField(auth, 1)")
      small(v-if="auth[1].error") {{auth[1].error}}

    button(class="btn main mt10" type="sumbit" :disabled="!validatedAuth" @click="SignIn") Sign In
    div.mt10
      router-link(to="/forgot" tag="div")
        small.link Forgot Password?
</template>

<script setup lang="ts">
import {computed, Ref, ref} from "vue";
import router from "@/router";
import {useUiStore} from "@/stores/UiStore";
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
  },
  {
    label: 'Password',
    val: '',
    pattern: /^[0-9A-Za-z]{5,10}$/,
    valid: false,
    error: '',
    errorText: 'Please enter correct password, min 5 - max 10 symbols'
  }
])

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

const SignIn = (): void => {
  let authData = {
    email: auth.value[0].val,
    password: auth.value[1].val
  }
  console.log(authData)
  router.push('/catalog')
}

</script>
