<template>
  <div class="page-guide-nav">
    <h1 class="nav-title">
      <router-link to="/">
        <i class="ico-logo"></i><br>MO Guide <span>2023.02</span>
      </router-link>
    </h1>
    <ul class="nav">
      <custom-router-link to="/color-guide">color</custom-router-link>
      <custom-router-link to="/font-guide">font</custom-router-link>
      <custom-router-link to="/text-guide">text</custom-router-link>
      <custom-router-link to="/button-guide">button</custom-router-link>
      <custom-router-link to="/form-guide">form</custom-router-link>
      <custom-router-link to="/component-guide">component</custom-router-link>
      <custom-router-link to="/icons-guide">icon</custom-router-link>
      <custom-router-link to="/table-guide">table</custom-router-link>
      <custom-router-link to="/swiper-guide">swiper</custom-router-link>
      <custom-router-link to="/popup-guide">layerpop</custom-router-link>
      <custom-router-link to="/vimeo-guide">vimeo</custom-router-link>
    </ul>
  </div>
</template>
  
<script setup lang="ts">
  import CustomRouterLink from './CustomRouterLink.vue';
</script>