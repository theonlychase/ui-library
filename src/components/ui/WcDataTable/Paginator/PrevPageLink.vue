<template>
  <button :class="containerClass" type="button">
    <span class="p-paginator-icon pi pi-angle-left" />
  </button>
</template>

<script>
  export default {
    name: 'PrevPageLink',
    computed: {
      containerClass() {
        return [
          'p-paginator-prev p-paginator-element p-link',
          {
            'p-disabled': this.$attrs.disabled,
          },
        ];
      },
    },
  };
</script>
