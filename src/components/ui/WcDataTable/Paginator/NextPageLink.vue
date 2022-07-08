<template>
  <button :class="containerClass" type="button">
    <span class="p-paginator-icon pi pi-angle-right" />
  </button>
</template>

<script>
  export default {
    name: 'NextPageLink',
    computed: {
      containerClass() {
        return [
          'p-paginator-next p-paginator-element p-link',
          {
            'p-disabled': this.$attrs.disabled,
          },
        ];
      },
    },
  };
</script>
