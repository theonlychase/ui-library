<template>
  <thead class="p-datatable-thead" role="rowgroup">
    <template v-if="!columnGroup">
      <tr role="row">
        <template
          v-for="(col, i) of columns"
          :key="columnProp(col, 'columnKey') || columnProp(col, 'field') || i"
        >
          <HeaderCell
            v-if="
              !columnProp(col, 'hidden') &&
              (rowGroupMode !== 'subheader' ||
                groupRowsBy !== columnProp(col, 'field'))
            "
            :column="col"
            :group-rows-by="groupRowsBy"
            :group-row-sort-field="groupRowSortField"
            :reorderable-columns="reorderableColumns"
            :resizable-columns="resizableColumns"
            :sort-mode="sortMode"
            :sort-field="sortField"
            :sort-order="sortOrder"
            :multi-sort-meta="multiSortMeta"
            :all-rows-selected="allRowsSelected"
            :empty="empty"
            :filters="filters"
            :filter-display="filterDisplay"
            :filters-store="filtersStore"
            @column-click="$emit('column-click', $event)"
            @column-mousedown="$emit('column-mousedown', $event)"
            @column-dragstart="$emit('column-dragstart', $event)"
            @column-dragover="$emit('column-dragover', $event)"
            @column-dragleave="$emit('column-dragleave', $event)"
            @column-drop="$emit('column-drop', $event)"
            @column-resizestart="$emit('column-resizestart', $event)"
            @checkbox-change="$emit('checkbox-change', $event)"
            @filter-change="$emit('filter-change', $event)"
            @filter-apply="$emit('filter-apply')"
            @operator-change="$emit('operator-change', $event)"
            @matchmode-change="$emit('matchmode-change', $event)"
            @constraint-add="$emit('constraint-add', $event)"
            @constraint-remove="$emit('constraint-remove', $event)"
            @apply-click="$emit('apply-click', $event)"
          />
        </template>
      </tr>
      <tr v-if="filterDisplay === 'row'" role="row">
        <template
          v-for="(col, i) of columns"
          :key="columnProp(col, 'columnKey') || columnProp(col, 'field') || i"
        >
          <th
            v-if="
              !columnProp(col, 'hidden') &&
              (rowGroupMode !== 'subheader' ||
                groupRowsBy !== columnProp(col, 'field'))
            "
            :style="getFilterColumnHeaderStyle(col)"
            :class="getFilterColumnHeaderClass(col)"
          >
            <HeaderCheckbox
              v-if="columnProp(col, 'selectionMode') === 'multiple'"
              :checked="allRowsSelected"
              :disabled="empty"
              @change="$emit('checkbox-change', $event)"
            />
            <!--            <ColumnFilter-->
            <!--              v-if="col.children && col.children.filter"-->
            <!--              :field="-->
            <!--                columnProp(col, 'filterField') || columnProp(col, 'field')-->
            <!--              "-->
            <!--              :type="columnProp(col, 'dataType')"-->
            <!--              display="row"-->
            <!--              :show-menu="columnProp(col, 'showFilterMenu')"-->
            <!--              :filter-element="col.children && col.children.filter"-->
            <!--              :filter-header-template="-->
            <!--                col.children && col.children.filterheader-->
            <!--              "-->
            <!--              :filter-footer-template="-->
            <!--                col.children && col.children.filterfooter-->
            <!--              "-->
            <!--              :filter-clear-template="col.children && col.children.filterclear"-->
            <!--              :filter-apply-template="col.children && col.children.filterapply"-->
            <!--              :filters="filters"-->
            <!--              :filters-store="filtersStore"-->
            <!--              :filter-menu-style="columnProp(col, 'filterMenuStyle')"-->
            <!--              :filter-menu-class="columnProp(col, 'filterMenuClass')"-->
            <!--              :show-operator="columnProp(col, 'showFilterOperator')"-->
            <!--              :show-clear-button="columnProp(col, 'showClearButton')"-->
            <!--              :show-apply-button="columnProp(col, 'showApplyButton')"-->
            <!--              :show-match-modes="columnProp(col, 'showFilterMatchModes')"-->
            <!--              :show-add-button="columnProp(col, 'showAddButton')"-->
            <!--              :match-mode-options="columnProp(col, 'filterMatchModeOptions')"-->
            <!--              :max-constraints="columnProp(col, 'maxConstraints')"-->
            <!--              @filter-change="$emit('filter-change', $event)"-->
            <!--              @filter-apply="$emit('filter-apply')"-->
            <!--              @operator-change="$emit('operator-change', $event)"-->
            <!--              @matchmode-change="$emit('matchmode-change', $event)"-->
            <!--              @constraint-add="$emit('constraint-add', $event)"-->
            <!--              @constraint-remove="$emit('constraint-remove', $event)"-->
            <!--              @apply-click="$emit('apply-click', $event)"-->
            <!--            />-->
          </th>
        </template>
      </tr>
    </template>
    <template v-else>
      <tr v-for="(row, i) of getHeaderRows()" :key="i" role="row">
        <template
          v-for="(col, j) of getHeaderColumns(row)"
          :key="columnProp(col, 'columnKey') || columnProp(col, 'field') || j"
        >
          <HeaderCell
            v-if="
              !columnProp(col, 'hidden') &&
              (rowGroupMode !== 'subheader' ||
                groupRowsBy !== columnProp(col, 'field')) &&
              typeof col.children !== 'string'
            "
            :column="col"
            :group-rows-by="groupRowsBy"
            :group-row-sort-field="groupRowSortField"
            :sort-mode="sortMode"
            :sort-field="sortField"
            :sort-order="sortOrder"
            :multi-sort-meta="multiSortMeta"
            :all-rows-selected="allRowsSelected"
            :empty="empty"
            :filters="filters"
            :filter-display="filterDisplay"
            :filters-store="filtersStore"
            @column-click="$emit('column-click', $event)"
            @column-mousedown="$emit('column-mousedown', $event)"
            @checkbox-change="$emit('checkbox-change', $event)"
            @filter-change="$emit('filter-change', $event)"
            @filter-apply="$emit('filter-apply')"
            @operator-change="$emit('operator-change', $event)"
            @matchmode-change="$emit('matchmode-change', $event)"
            @constraint-add="$emit('constraint-add', $event)"
            @constraint-remove="$emit('constraint-remove', $event)"
            @apply-click="$emit('apply-click', $event)"
          />
        </template>
      </tr>
    </template>
  </thead>
</template>

<script>
  import HeaderCell from './HeaderCell.vue';
  import HeaderCheckbox from './HeaderCheckbox.vue';
  // import ColumnFilter from './ColumnFilter.vue';
  import { ObjectUtils } from './utils';

  export default {
    name: 'TableHeader',
    components: {
      HeaderCell,
      HeaderCheckbox,
      // ColumnFilter,
    },
    props: {
      columnGroup: {
        type: null,
        default: null,
      },
      columns: {
        type: null,
        default: null,
      },
      rowGroupMode: {
        type: String,
        default: null,
      },
      groupRowsBy: {
        type: [Array, String],
        default: null,
      },
      resizableColumns: {
        type: Boolean,
        default: false,
      },
      allRowsSelected: {
        type: Boolean,
        default: false,
      },
      empty: {
        type: Boolean,
        default: false,
      },
      sortMode: {
        type: String,
        default: 'single',
      },
      groupRowSortField: {
        type: [String, Function],
        default: null,
      },
      sortField: {
        type: [String, Function],
        default: null,
      },
      sortOrder: {
        type: Number,
        default: null,
      },
      multiSortMeta: {
        type: Array,
        default: null,
      },
      filterDisplay: {
        type: String,
        default: null,
      },
      filters: {
        type: Object,
        default: null,
      },
      filtersStore: {
        type: Object,
        default: null,
      },
      reorderableColumns: {
        type: Boolean,
        default: false,
      },
    },
    emits: [
      'column-click',
      'column-mousedown',
      'column-dragstart',
      'column-dragover',
      'column-dragleave',
      'column-drop',
      'column-resizestart',
      'checkbox-change',
      'filter-change',
      'filter-apply',
      'operator-change',
      'matchmode-change',
      'constraint-add',
      'constraint-remove',
      'filter-clear',
      'apply-click',
    ],
    methods: {
      columnProp(col, prop) {
        return ObjectUtils.getVNodeProp(col, prop);
      },
      getFilterColumnHeaderClass(column) {
        return [
          'p-filter-column',
          this.columnProp(column, 'filterHeaderClass'),
          this.columnProp(column, 'class'),
          {
            'p-frozen-column': this.columnProp(column, 'frozen'),
          },
        ];
      },
      getFilterColumnHeaderStyle(column) {
        return [
          this.columnProp(column, 'filterHeaderStyle'),
          this.columnProp(column, 'style'),
        ];
      },
      getHeaderRows() {
        let rows = [];

        const columnGroup = this.columnGroup;
        if (columnGroup.children && columnGroup.children.default) {
          for (const child of columnGroup.children.default()) {
            if (child.type.name === 'Row') {
              rows.push(child);
            } else if (child.children && child.children instanceof Array) {
              rows = child.children;
            }
          }

          return rows;
        }
      },
      getHeaderColumns(row) {
        let cols = [];

        if (row.children && row.children.default) {
          row.children.default().forEach((child) => {
            if (child.children && child.children instanceof Array)
              cols = [...cols, ...child.children];
            else if (child.type.name === 'Column') cols.push(child);
          });

          return cols;
        }
      },
    },
  };
</script>
