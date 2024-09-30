<template>
  <div :class="['address-box', { active: isActive }]">
    <strong v-if="type" class="title">
      {{ type }} Address<span class="tag-type3" v-if="isDefault">DEFAULT</span>
    </strong>
    <div class="info">
      <p class="name">{{ address.name }}</p>
      <!-- company 필드가 있을 경우에만 표시 -->
      <p class="company" v-if="address.company">{{ address.company }}</p>
      <p>
        {{ address.street }}<br />
        {{ address.city }}, {{ address.state }}, {{ address.zip }}<br />
        {{ address.country }}
      </p>
      <p class="tel">T : {{ address.tel }}</p>
    </div>
    <a href="#" class="btn-delete" v-if="!isDefault" @click.prevent="onDelete">
      Delete
    </a>
    <a href="#" class="btn-edit" @click.prevent="onEdit">
      Edit
    </a>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

interface Address {
  name: string;
  company?: string; // company 필드가 선택적임
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  tel: string;
}

const props = defineProps<{
  address: Address;
  isActive: boolean;
  isDefault: boolean;
  type: string;
}>();

const emit = defineEmits<{
  (e: 'delete', address: Address): void;
  (e: 'edit', address: Address): void;
}>();

const onDelete = () => {
  emit('delete', props.address);
};

const onEdit = () => {
  emit('edit', props.address);
};
</script>
