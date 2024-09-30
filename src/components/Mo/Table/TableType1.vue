<template>
  <table class="tbl-type">
    <caption class="table-caption">Table Caption</caption>
    <colgroup>
      <col width="30%">
      <col>
    </colgroup>
    <tbody>
      <tr v-for="item in props.items" :key="item.title">
        <th scope="row">{{ item.title }}</th>
        <td>
          <strong>{{ item.priceRange }}</strong>
          <ul class="list-type">
            <li v-for="(benefit, index) in item.benefits" :key="index">{{ benefit }}</li>
          </ul>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

interface TableItem {
  title: string;
  priceRange: string;
  benefits: string[];
}

const props = defineProps<{
  items: TableItem[];
}>();
</script>