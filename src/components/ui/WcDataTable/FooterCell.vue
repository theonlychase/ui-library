<template>
  <td
    :style="containerStyle"
    :class="containerClass"
    role="cell"
    :colspan="columnProp('colspan')"
    :rowspan="columnProp('rowspan')"
  >
    <component
      :is="column.children.footer"
      v-if="column.children && column.children.footer"
      :column="column"
    />
    {{ columnProp('footer') }}
  </td>
</template>

<script>
  import { DomHandler, ObjectUtils } from './utils';

  export default {
    name: 'FooterCell',
    props: {
      column: {
        type: null,
        default: null,
      },
    },
    data() {
      return {
        styleObject: {},
      };
    },
    computed: {
      containerClass() {
        return [
          this.columnProp('footerClass'),
          this.columnProp('class'),
          {
            'p-frozen-column': this.columnProp('frozen'),
          },
        ];
      },
      containerStyle() {
        const bodyStyle = this.columnProp('footerStyle');
        const columnStyle = this.columnProp('style');

        return this.columnProp('frozen')
          ? [columnStyle, bodyStyle, this.styleObject]
          : [columnStyle, bodyStyle];
      },
    },
    mounted() {
      if (this.columnProp('frozen')) {
        this.updateStickyPosition();
      }
    },
    updated() {
      if (this.columnProp('frozen')) {
        this.updateStickyPosition();
      }
    },
    methods: {
      columnProp(prop) {
        return ObjectUtils.getVNodeProp(this.column, prop);
      },
      updateStickyPosition() {
        if (this.columnProp('frozen')) {
          const align = this.columnProp('alignFrozen');
          if (align === 'right') {
            let right = 0;
            const next = this.$el.nextElementSibling;
            if (next) {
              right =
                DomHandler.getOuterWidth(next) + parseFloat(next.style.left);
            }
            this.styleObject.right = right + 'px';
          } else {
            let left = 0;
            const prev = this.$el.previousElementSibling;
            if (prev) {
              left =
                DomHandler.getOuterWidth(prev) + parseFloat(prev.style.left);
            }
            this.styleObject.left = left + 'px';
          }
        }
      },
    },
  };
</script>
