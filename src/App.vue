<template>
    <router-view />
</template>



<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Guide from './pages/Guide.vue';
@Options({
  components: {
    Guide,
  },
})
export default class App extends Vue {}
</script>


