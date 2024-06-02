<template lang="pug">
  ToggleSidebar(@toggleSideBar="UiStore.toggleSidebar()")
  CategorySide.category-side(:categories="UiStore.getAllCategories" :checkboxBestSeller="UiStore.getCheckboxBestSeller"
    :style="{left: UiStore.sidebar}").mt20
  div.main-side
    div(v-if="!showReviews")
      div.product(v-if="product")
        h1.ml20 {{ product[Object.keys(product)].name }}
        div.rating Rating {{product[Object.keys(product)].rating}} of {{MAX_RATING}}
          span.reviews(@click="showReviews = true") {{product[Object.keys(product)].reviews.length}} Reviews
        div.image_card
          div
            div(v-if="loading").loader
            SimpleGallery(galleryID="my-test-gallery-primary" :images="product[Object.keys(product)].image" class="card-image" @imgLoaded="toChangeLoader")
          div.flex-box
            h2.price ${{product[Object.keys(product)].price}}
            div
              button.btn_cart(@click="decrease") -
              input.btn_cart_input(type="number" min="1" max="100" step="1" pattern="[0-9]{3}" v-model="cart_qty" @input="onInput($event.target.value)")
              button.btn_cart(@click="increase") +
            span
              button.btn.danger.add_to_cart(@click="addCart()") Add to Cart
              h3.inline-block.price_sum(v-if="cart_qty > 1") Summary: ${{(cart_qty * parseFloat(product[Object.keys(product)].price)).toFixed(2)}}
              h3.inline-block(v-if="message_overload") Max count of this position is 100
              h3.primary.inline-block(v-if="product_added") Product added to Cart
              button.btn.orange.add_to_cart.block.mt20(@click="modal = true") Buy Now
        div.description(v-html="product[Object.keys(product)].description")
      div.ml20(v-else)
        h1 There are no this product
        router-link.link(to="/catalog") Back to Catalog
    div.reviews-block(v-else)
      Reviews(:is-authentificated="AuthStore.isAuthentificated" :reviews="product[Object.keys(product)].reviews" :reviewSended="reviewSended"
      @sendReview="sendReview" @backToProduct="showReviews = false")

  teleport(to="body")
    modal-quick-order(v-if="modal" title="Quick Order" @close="modal = false" :product="product[Object.keys(product)]" :qty="cart_qty")


</template>

<script setup lang="ts">
import {useCartStore} from "@/stores/CartStore";
import {useAuthStore} from "@/stores/AuthStore";
import {onMounted, reactive, ref} from "vue";
import {useRoute} from "vue-router";
import SimpleGallery from "@/components/ui/SimpleGallery.vue";
import {useUiStore} from "@/stores/UiStore";
import CategorySide from "@/components/ui/CategorySide.vue";
import ModalQuickOrder from "@/components/ui/ModalQuickOrder.vue";
import Reviews from "@/components/ui/Reviews.vue";
import ToggleSidebar from "@/components/ui/ToggleSidebar.vue";
import {load} from "@/services/api/requests";
import {productInCartType, productWithId, ratingInfoType, subcategoryType} from "@/utils/requestTypes";
const route = useRoute()

const CartStore = useCartStore()
const AuthStore = useAuthStore()
const UiStore = useUiStore()
const loading = ref(true)
const modal = ref(false)

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
// categories = await fetch('/categories.json')
//     .then(response => response.json())
try {
  categories = await load('/categories.json')
}catch (e: string | unknown) {
  UiStore.setErrorMessage(e.message)
}


const sendReview = (ratingInfo: ratingInfoType): void => {

  let currentUserName = AuthStore.getUserName
  let currentUserId = AuthStore.getUserId

  let currentDate = new Date();
  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  let year = currentDate.getFullYear();
  let formattedDate = (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day  + '-' + year;

  //let newRatingVotes = ++product[Object.keys(product)].rating_votes
  let newRating: number = (product[Object.keys(product)].rating * product[Object.keys(product)].rating_votes + parseInt(ratingInfo.ratingVote)) /
      (product[Object.keys(product)].rating_votes + 1)
  newRating = parseFloat(newRating.toFixed(2))

  let updatedProduct = product
  updatedProduct[Object.keys(updatedProduct)].rating = newRating
  updatedProduct[Object.keys(updatedProduct)].rating_votes = product[Object.keys(product)].rating_votes + 1

  if(reviewText){
    let reviewObj = {text: ratingInfo.reviewText, username: currentUserName, date: formattedDate}
    updatedProduct[Object.keys(updatedProduct)].reviews.push(reviewObj)
  }


   // console.log(updatedProduct)

}

function addCart (): void{
  let key = product[Object.keys(product)].id

  let cur_product = CartStore.getProductById(key)

  if(cur_product && (cur_product.qty >= 100)){

      message_overload.value = true
      cart_qty.value = 1
      setTimeout(() => {message_overload.value = false}, 3000)
  }else {
    let payload: productInCartType = {}

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

    // console.log('product added')

  }
}

let decrease = (): void => {
  if(cart_qty.value <= 1){
    cart_qty.value = 1
  }else{
    cart_qty.value--
  }
}

function onInput (e: string): void {
  cart_qty.value = parseInt(e.replace(/[^+\d]/g, ''));
  if(parseInt(e) < 1){
    cart_qty.value = 1
  }else if(parseInt(e) > 100){
    cart_qty.value = 100
  }
}

let increase = (): void => {
  if(cart_qty.value >= 100){
    cart_qty.value = 100
  }else{
    cart_qty.value++
  }
}

let product = ref()
// let products = await fetch('/catalog.json')
//       .then(response => response.json())
//       .then(data => data.filter(val => Object.keys(val)[0] === route.params.id))
let products = await load('/catalog.json')
products = products.filter((val: productWithId) => Object.keys(val)[0] === route.params.id)

product = products[0]

// console.log(product[Object.keys(product)])

const reviewSended = ref<boolean>(false)

if(AuthStore.isAuthentificated){

  if(product){
    let reviewIndex = product[Object.keys(product)].reviews.findIndex(el => el.userId === AuthStore.getUserId)

    reviewSended.value = reviewIndex !== -1;
  }

}

let writeCategoryAndSubcategory = (): void => {
  let categoryInfo = {catUrl: '', subCatUrl: ''}

  if(product && categories){
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

    subcategories_array.forEach((subcat: subcategoryType): void => {
      console.log(subcat)
      if (subcat.url === categoryInfo.subCatUrl) {
        current_subcategory = subcat.text
      }
    })
    UiStore.writeCategoryInfo({cat: current_category, subcat: current_subcategory})
  }
}

writeCategoryAndSubcategory()

const toChangeLoader = () : void => {
  loading.value = false
}
//console.log(product)

</script>
