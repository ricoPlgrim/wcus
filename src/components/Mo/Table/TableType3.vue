<template>
  <div class="tbl-wrap2">
    <table class="tbl-type2">
      <tbody>
        <tr v-for="title in props.titles" :key="title">
          <th>{{ title }}</th>
        </tr>
      </tbody>
    </table>
    <div class="scroll-wrap">
      <table class="tbl-type2">
        <colgroup>
          <col v-for="col in props.columns" :key="col" />
        </colgroup>
        <tbody>
          <tr v-for="(row, rowIndex) in props.rows" :key="rowIndex">
            <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  titles: string[];
  columns: string[];
  rows: string[][];
}>();
</script>
