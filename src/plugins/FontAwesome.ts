import { library } from '@fortawesome/fontawesome-svg-core'
import { faShoppingCart, faWindowClose, faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {brands} from "@fortawesome/fontawesome-svg-core/import.macro";

library.add(faShoppingCart, faWindowClose, faTrashAlt)
export default (app: any): void => {
  app.component('fa', FontAwesomeIcon)
}