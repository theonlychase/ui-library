<template>
  <span class="p-paginator-pages">
    <button
      v-for="pageLink of value"
      :key="pageLink"
      :class="[
        'p-paginator-page p-paginator-element p-link',
        { 'p-highlight': pageLink - 1 === page },
      ]"
      type="button"
      @click="onPageLinkClick($event, pageLink)"
    >
      {{ pageLink }}
    </button>
  </span>
</template>
<script>
  export default {
    name: 'PageLinks',
    inheritAttrs: false,
    props: {
      value: {
        type: Array,
        default: () => [],
      },
      page: {
        type: Number,
        default: 0,
      },
    },
    emits: ['click'],
    methods: {
      onPageLinkClick(event, pageLink) {
        this.$emit('click', {
          originalEvent: event,
          value: pageLink,
        });
      },
    },
  };
</script>
