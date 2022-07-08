<template>
  <button :class="containerClass" type="button">
    <span class="p-paginator-icon pi pi-angle-double-right" />
  </button>
</template>

<script>
  export default {
    name: 'LastPageLink',
    computed: {
      containerClass() {
        return [
          'p-paginator-last p-paginator-element p-link',
          {
            'p-disabled': this.$attrs.disabled,
          },
        ];
      },
    },
  };
</script>
