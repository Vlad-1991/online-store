<!-- page of 404 error -->
<template lang="pug">
  div.breadcrumbs
    main.center
      h1 404
      h1 Ooops! There are no these page
      router-link.link(:to="{name: 'Home'}") Back to home page
</template>