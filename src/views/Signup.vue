<template lang="pug">
  form(class="card" @submit.prevent="SignUp")
    h1 Sign Up

    div(:class="['form-control', 'mb10', {invalid: auth[0].error}]")
      label(for="email") {{auth[0].label}}
      input(type="email" id="email" v-model.trim="auth[0].val" @input="validateField(auth, 0)")
      small(v-if="auth[0].error") {{auth[0].error}}

    div(:class="['form-control', 'mb10', {invalid: auth[1].error}]")
      label(for="fullname") {{auth[1].label}}
      input(type="text" id="fullname" v-model.trim="auth[1].val" @input="validateField(auth, 1)")
      small(v-if="auth[1].error") {{auth[1].error}}

    div(:class="['form-control', 'mb10', {invalid: auth[2].error}]")
      label(for="password") {{auth[2].label}}
      input(type="password" id="password" v-model.trim="auth[2].val" @input="validateField(auth, 2)")
      small(v-if="auth[2].error") {{auth[2].error}}

    div(:class="['form-control', 'mb10', {invalid: auth[3].error}]")
      label(for="passwordRepeat") {{auth[3].label}}
      input(type="password" id="passwordRepeat" v-model.trim="auth[3].val" @input="validateMatchingPassword(auth, 3)")
      small(v-if="auth[3].error") {{auth[3].error}}

    button(class="btn main mt10" type="sumbit" :disabled="!validatedAuth" @click="SignUp") Sign Up
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import router from "@/router";
import {useUiStore} from "@/stores/UiStore";
const UiStore = useUiStore()

const auth = ref([
  {
    label: 'Please Enter Your Email',
    val: '',
    pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    valid: false,
    activated: false,
    error: '',
    errorText: 'Please enter correct email, example: john.carson@gmail.com'
  },
  {
    label: 'Please Enter Your Full Name',
    val: '',
    pattern: /^[0-9A-Za-z ]{3,20}$/,
    valid: false,
    activated: false,
    error: '',
    errorText: 'Please enter correct name, example: John Carson'
  },
  {
    label: 'Please Enter Your Password',
    val: '',
    pattern: /^[0-9A-Za-z]{5,10}$/,
    valid: false,
    error: '',
    errorText: 'Please enter correct password, min 5 - max 10 symbols'
  },
  {
    label: 'Please Repeat Your Password',
    val: '',
    pattern: '',
    valid: false,
    error: '',
    errorText: 'Password isn\'t matching'
  }
])

const validateField = (infoArr: [], index: number): void =>  {

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

const validateMatchingPassword = () => {
  if(auth.value[2].val === auth.value[3].val){
    auth.value[3].error = ''
    auth.value[3].valid = true
  }else{
    auth.value[3].error = auth.value[3].errorText
    auth.value[3].valid = false
  }
}

const SignUp = () => {
  let authData = {
    email: auth.value[0].val,
    fullname: auth.value[1].val,
    password: auth.value[2].val
  }
  console.log(authData)
  router.push('/catalog')
}

</script>
