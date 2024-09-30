<template>
  <AsideNav />
  <div class="page-guide-content">
    <h2 class="page-guide-title">FONT</h2>

    <h3 class="page-guide-title2">EN</h3>
    <div class="page-guide-box font">
      <p class="guide-font-box" style="font-size:30px;font-weight:700">Hello, Jost Bold 700</p>
      <p class="guide-font-box" style="font-size:30px;font-weight:600">Hello, Jost SemiBold 600</p>
      <p class="guide-font-box" style="font-size:30px;font-weight:500">Hello, Jost Medium 500</p>
      <p class="guide-font-box" style="font-size:30px;font-weight:400">Hello, Jost Regular 400</p>
      <p class="guide-font-box" style="font-size:30px;font-weight:300">Hello, Jost Light 300</p>
    </div>
  </div>
</template>
    

<script setup lang="ts">
    import AsideNav from '../Gnb/AsideNav.vue';
    defineOptions({
      name: 'FontGuide'
    });
</script>



