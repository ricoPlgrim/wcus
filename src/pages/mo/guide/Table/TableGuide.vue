<template>
  <AsideNav />
  <div class="page-guide-content">
    <h2 class="page-guide-title">TABLE</h2>

    <h3 class="page-guide-title2">table type</h3>
    <div class="page-guide-box">
      <TableType1 :items="table1Items" />
    </div>
    <h3 class="page-guide-title2">table type 2</h3>
    <div class="page-guide-box">
      <TableType2 :items="table2Items" />
    </div>
    <h3 class="page-guide-title2">table scroll</h3>
    <div class="page-guide-box">
      <TableTypeScroll :titles="scrollTableTitles" :columns="scrollTableColumns" :rows="scrollTableRows" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import AsideNav from '../Gnb/AsideNav.vue';
  import TableType1 from '../../../../components/Mo/Table/TableType1.vue';
  import TableType2 from '../../../../components/Mo/Table/TableType2.vue';
  import TableTypeScroll from '../../../../components/Mo/Table/TableType3.vue';

  const table1Items = ref([
    {
      title: 'W NEWBIE',
      priceRange: '$0~$299',
      benefits: ['$1 = 1 W Point', 'Early Access to Promotions']
    },
    {
      title: 'W INSIDER',
      priceRange: '$0~$299',
      benefits: ['$1 = 1 W Point', 'Early Access to Promotions', 'More benefits']
    },
    {
      title: 'W ICON',
      priceRange: '$0~$299',
      benefits: ['$1 = 1 W Point', 'Early Access to Promotions', 'Even more benefits']
    }
  ]);

  const table2Items = ref([
    {
      title: 'Title',
      contents: ['You are typing your content.']
    },
    {
      title: 'Abcedfghijk',
      contents: ['You are typing your content.']
    },
    {
      title: 'Abcedfghijk lmnopqr',
      contents: ['You are typing your content. You are typing your content.']
    }
  ]);

  const scrollTableTitles = ref([
    'title titletitle',
    'title',
    'title',
    'title',
    'title'
  ]);

  const scrollTableColumns = ref(['col1', 'col2', 'col3', 'col4']);

  const scrollTableRows = ref([
    ['ddddddddddddd', 'ddddddasdasdasdasdddddddd', 'ddddddddddddd', '1111dsfdsfgsfgsdddddddddd'],
    ['ddddddddddddd', 'ddddddasdasdasdasdddddddd', 'ddddddddddddd', '1111dsfdsfgsfgsdddddddddd'],
    ['ddddddddddddd', 'ddddddasdasdasdasdddddddd', 'ddddddddddddd', '1111dsfdsfgsfgsdddddddddd'],
    ['ddddddddddddd', 'ddddddasdasdasdasdddddddd', 'ddddddddddddd', '1111dsfdsfgsfgsdddddddddd'],
    ['ddddddddddddd', 'ddddddasdasdasdasdddddddd', 'ddddddddddddd', '1111dsfdsfgsfgsdddddddddd']
  ]);

  
</script>