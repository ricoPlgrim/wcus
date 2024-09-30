<template>
  <table class="tbl-type2">
    <caption class="table-caption">Table Caption</caption>
    <colgroup>
      <col width="30%">
      <col>
    </colgroup>
    <tbody>
      <tr v-for="item in props.items" :key="item.title">
        <th scope="row">{{ item.title }}</th>
        <td>
          <ul class="list-type">
            <li v-for="(content, index) in item.contents" :key="index">{{ content }}</li>
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
  contents: string[];
}

const props = defineProps<{
  items: TableItem[];
}>();
</script>