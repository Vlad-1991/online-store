<template lang="pug">
  div(v-if="!showReviews")
    div.product(v-if="product")
      h1 {{ product[Object.keys(product)].name }}
      div.rating Rating {{product[Object.keys(product)].rating}} of {{MAX_RATING}}
        span.reviews(@click="showReviews = true") {{product[Object.keys(product)].reviews.length}} Reviews
      div.image_card
        div
          SimpleGallery(galleryID="my-test-gallery-primary" :images="product[Object.keys(product)].image" class="card-image")
          //img(:src="product[Object.keys(product)].image[0].largeURL" class="card-image")
        div.flex-box
          h2.price ${{product[Object.keys(product)].price}}
          div
            button.btn_cart(@click="decrease") -
            input.btn_cart_input(type="number" min="1" max="100" step="1" pattern="[0-9]{3}" v-model="cart_qty" @input="onInput($event.target.value)")
            button.btn_cart(@click="increase") +
          span
            button.btn.danger.add_to_cart(@click="addCart()") Add to Cart
            h3.price_sum(v-if="cart_qty > 1") Summary: ${{(cart_qty * parseFloat(product[Object.keys(product)].price)).toFixed(2)}}
            h3.inline-block(v-if="message_overload") Max count of this position is 100
            h3.primary.inline-block(v-if="product_added") Product added to Cart
      div.description(v-html="product[Object.keys(product)].description")
    div(v-else)
      h1 There are no this product
      router-link(to="/catalog") Back to Catalog
  div.reviews-block(v-else)
    div(v-if="AuthStore.isAuthentificated")
    h1 Reviews
    div.flex-reviews
      div.reviews-50
        div.card-flex.review-card(v-for="review in product[Object.keys(product)].reviews")
          div.bold {{review.username}}
          h5 {{review.date}}
          div {{review.text}}
      div.reviews-50(v-if="AuthStore.isAuthentificated")
        div(v-if="reviewSended")
          h3 You have already left a review or rating on this product
        div(v-else)
          div.mb10.rating-star Push your rating
          span.rating-star
            input(type="radio" id="0stars" value="0" v-model="ratingVote")
            label(for="0stars")  0
          span.rating-star
            input(type="radio" id="1star" value="1" v-model="ratingVote")
            label(for="1star")  1
          span.rating-star
            input(type="radio" id="0stars" value="2" v-model="ratingVote")
            label(for="2stars")  2
          span.rating-star
            input(type="radio" id="1star" value="3" v-model="ratingVote")
            label(for="3star")  3
          span.rating-star
            input(type="radio" id="0stars" value="4" v-model="ratingVote")
            label(for="4stars")  4
          span.rating-star
            input(type="radio" id="0stars" value="5" v-model="ratingVote")
            label(for="5stars")  5
          div.mt10.rating-star
            label(for="review-area") Your review for this product (Optional)
            textarea.review-textarea.mt10(placeholder="Write review... 300 symbols max" id="review-area" v-model="reviewText" )
          button.btn.main.mt10(:disabled="!ratingVote" @click="sendReview(product[Object.keys(product)].id, reviewText, ratingVote)") Send review
      div(v-else)
        span.mr10 To send rating and review please
        button.main.btn Sign In

</template>

<script setup lang="ts">
import {useCartStore} from "@/stores/CartStore";
import {useAuthStore} from "@/stores/AuthStore";
import {onMounted, reactive, ref} from "vue";
import {useRoute} from "vue-router";
import SimpleGallery from "@/components/ui/SimpleGallery.vue";
import {useUiStore} from "@/stores/UiStore";
const route = useRoute()

const CartStore = useCartStore()
const AuthStore = useAuthStore()
const UiStore = useUiStore()

const cart_qty = ref<number>(1)

//const local_storage = localStorage.getItem("cart")

//const result = JSON.parse(local_storage)
const product_added = ref<boolean>(false)
const message_overload = ref<boolean>(false)
const MAX_RATING = 5

const showReviews = ref<boolean>(false)
const ratingVote = ref<number>()
const reviewText = ref<string>()

let categories = [{}]
categories = await fetch('/categories.json')
    .then(response => response.json())

const sendReview = (id: string, reviewText: string, ratingVote: string) => {

  let currentUserName = AuthStore.getUserName
  let currentUserId = AuthStore.getUserId

  let currentDate = new Date();
  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  let year = currentDate.getFullYear();
  let formattedDate = (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day  + '-' + year;

  //let newRatingVotes = ++product[Object.keys(product)].rating_votes
  let newRating = (product[Object.keys(product)].rating * product[Object.keys(product)].rating_votes + parseInt(ratingVote)) /
      (product[Object.keys(product)].rating_votes + 1)
  newRating = newRating.toFixed(2)

  let updatedProduct = product
  updatedProduct[Object.keys(updatedProduct)].rating = newRating
  updatedProduct[Object.keys(updatedProduct)].rating_votes = product[Object.keys(product)].rating_votes + 1

  if(reviewText){
    let reviewObj = {text: reviewText, username: currentUserName, date: formattedDate}
    updatedProduct[Object.keys(updatedProduct)].reviews.push(reviewObj)
  }


  console.log(updatedProduct)

}

function addCart (){
  let key = product[Object.keys(product)].id

  let cur_product = CartStore.getProductById(key)

  if(cur_product && (cur_product.qty >= 100)){

      message_overload.value = true
      cart_qty.value = 1
      setTimeout(() => {message_overload.value = false}, 3000)
  }else {
    let payload = {}

    payload[key] = {
      id: product[Object.keys(product)].id,
      qty: cart_qty.value,
      name: product[Object.keys(product)].name,
      price: product[Object.keys(product)].price
    }

    CartStore.addToCart(payload)
    cart_qty.value = 1
    product_added.value = true
    setTimeout(() => {
      product_added.value = false
    }, 3000)

    console.log('product added')

  }
}

let decrease = () => {
  if(cart_qty.value <= 1){
    cart_qty.value = 1
  }else{
    cart_qty.value--
  }
}

function onInput (e: string) {
  cart_qty.value = parseInt(e.replace(/[^+\d]/g, ''));
  if(parseInt(e) < 1){
    cart_qty.value = 1
  }else if(parseInt(e) > 100){
    cart_qty.value = 100
  }
}

let increase = () => {
  if(cart_qty.value >= 100){
    cart_qty.value = 100
  }else{
    cart_qty.value++
  }
}

let product = ref()
let products = await fetch('/catalog.json')
      .then(response => response.json())
      .then(data => data.filter(val => Object.keys(val)[0] === route.params.id))

product = products[0]

console.log(product[Object.keys(product)])

const reviewSended = ref<boolean>(false)

if(AuthStore.isAuthentificated){

  let reviewIndex = product[Object.keys(product)].reviews.findIndex(el => el.userId === AuthStore.getUserId)

  reviewSended.value = reviewIndex !== -1;

}

let writeCategoryAndSubcategory = () => {
  let categoryInfo = {catUrl: '', subCatUrl: ''}
  categoryInfo.catUrl = product[Object.keys(product)].category
  categoryInfo.subCatUrl = product[Object.keys(product)].subcategory

  let current_category
  let current_subcategory
  let subcategories_array = [{}]
  categories.forEach(cat => {
    if (Object.keys(cat)[0] === categoryInfo.catUrl) {
      current_category = cat[Object.keys(cat)[0]].text
      subcategories_array = cat[Object.keys(cat)[0]].subcategory
    }
  })

  subcategories_array.forEach(subcat => {
    if (subcat.url === categoryInfo.subCatUrl) {
      current_subcategory = subcat.text
    }
  })

  UiStore.writeCategoryInfo({cat: current_category, subcat: current_subcategory})
}

writeCategoryAndSubcategory()

//console.log(product)

</script>
