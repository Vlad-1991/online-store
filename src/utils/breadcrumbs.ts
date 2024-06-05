import {Ref, ref} from "vue";
import {RouteLocationNormalized} from "vue-router";
import {useUiStore} from "@/stores/UiStore";
import {categoriesType} from "@/utils/requestTypes";


/* to get info from current route and put category and subcategory info to Ui Store */
export const getCategoryAndSubcategory = (categories: [categoriesType], route: RouteLocationNormalized): void => {
    const UiStore= useUiStore()
    let current_category = ''
    let current_subcategory = ''
    let subcategories_array = [{}]
    categories.forEach((cat: categoriesType): void => {
        if (Object.keys(cat)[0] === route.query.category) {
            current_category = cat[Object.keys(cat)[0]].text
            subcategories_array = cat[Object.keys(cat)[0]].subcategory
        }
    })

    subcategories_array.forEach((subcat: any): void => {
        if (subcat.url === route.query.subcategory) {
            current_subcategory = subcat.text
        }
    })

    UiStore.writeCategoryInfo({cat: current_category, subcat: current_subcategory})
}

/* generate html code in string view according to current route */
export function generateBreadcrumbs(route: RouteLocationNormalized, cur_prod: Ref<{ name: '', caturl: '', subcaturl: '' }>,
                                    categories: [categoriesType]): string | undefined {

    const UiStore = useUiStore()

    const categoriesInfo = ref({cat: '', subcat: ''})

    if (route.name !== 'Home' && !route.query.category && route.name !== 'Product') {
        return `<a href=\"/\" class=\"link\">Home</a><span> > </span><a href=\"${route.path}\" class="link active_category">${String(route.name)}</a>`;
    } else if (route.name === 'Catalog' && route.query.subcategory) {
        getCategoryAndSubcategory(categories, route);
        categoriesInfo.value.cat = UiStore.getCategory;
        categoriesInfo.value.subcat = UiStore.getSubcategory;

        return `<a href="/" class="link">Home</a><span> > </span><a href="${route.path}" class="link">${route.name}</a>
    <span> > </span><a href="/catalog?category=${route.query.category}" class="link">${categoriesInfo.value.cat}</a>
    <span> > </span><a href="/catalog?category=${route.query.category}&subcategory=${route.query.subcategory}" class="link active_category">
    ${categoriesInfo.value.subcat}</a>`;
    } else if (route.name === 'Catalog' && route.query.category) {
        getCategoryAndSubcategory(categories, route);
        categoriesInfo.value.cat = UiStore.getCategory;
        categoriesInfo.value.subcat = UiStore.getSubcategory;

        return `<a href="/" class="link">Home</a><span> > </span><a href="${route.path}" class="link">${route.name}</a>
    <span> > </span><a href="/catalog?category=${route.query.category}" class="link active_category">${categoriesInfo.value.cat}</a>`;
    } else if (route.name === 'Product' && route.params.id) {
        categoriesInfo.value.cat = UiStore.getCategory;
        categoriesInfo.value.subcat = UiStore.getSubcategory;

        if (categoriesInfo.value.cat && categoriesInfo.value.subcat) {
            return `<a href="/" class="link">Home</a><span> > </span><a href="/catalog" class="link">Catalog</a>
      <span> > </span><a href="/catalog?category=${cur_prod.value.caturl}" class="link">${categoriesInfo.value.cat}</a>
      <span> > </span><a href="/catalog?category=${cur_prod.value.caturl}&subcategory=${cur_prod.value.subcaturl}" class="link">
      ${categoriesInfo.value.subcat}</a><span> > </span><a href="/product/${route.params.id}" class="link active_category">
      ${cur_prod.value.name}</a>`;
        } else {
            return `<a href="/" class="link">Home</a><span> > </span><a href="/catalog" class="link">Catalog</a>`;
        }
    }
    return undefined;
}