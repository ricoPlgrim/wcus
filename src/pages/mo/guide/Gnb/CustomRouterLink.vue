<template>
  <li :class="{ on: isActive }">
    <router-link v-bind="$attrs" @click="navigate">
      <slot></slot>
    </router-link>
  </li>
</template>
  
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRoute, useRouter, RouteLocationRaw } from 'vue-router';


export default defineComponent({
  name: 'CustomRouterLink',
  setup(props, { attrs }) {
    const route = useRoute();
    const router = useRouter();

    const isActive = computed(() => {
      return route.path === (attrs.to as string);
    });

    const navigate = () => {
      const to = attrs.to as RouteLocationRaw;
      const replace = attrs.replace as boolean;

      if (typeof to === 'string' && to.startsWith('#')) {
        return;
      }
      if (replace) {
        router.replace(to);
      } else {
        router.push(to);
      }
    };

    return {
      isActive,
      navigate,
    };
  },
});
</script>