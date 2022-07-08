<template>
  <div :class="containerClass" data-scrollselectors=".p-datatable-wrapper">
    <slot />
    <div v-if="loading" class="p-datatable-loading-overlay p-component-overlay">
      <slot v-if="$slots.loading" name="loading" />
      <i v-else :class="loadingIconClass" />
    </div>
    <div v-if="$slots.header" class="p-datatable-header">
      <slot name="header" />
    </div>
    <Paginator
      v-if="paginatorTop"
      :rows="d_rows"
      :first="d_first"
      :total-records="totalRecordsLength"
      :page-link-size="pageLinkSize"
      :template="paginatorTemplate"
      :rows-per-page-options="rowsPerPageOptions"
      :current-page-report-template="currentPageReportTemplate"
      class="p-paginator-top"
      :always-show="alwaysShowPaginator"
      @page="onPage($event)"
    >
      <template v-if="$slots.paginatorstart" #start>
        <slot name="paginatorstart" />
      </template>
      <template v-if="$slots.paginatorend" #end>
        <slot name="paginatorend" />
      </template>
    </Paginator>
    <div
      class="p-datatable-wrapper"
      :style="{ maxHeight: virtualScrollerDisabled ? scrollHeight : '' }"
    >
      <VirtualScroller
        ref="virtualScroller"
        v-bind="virtualScrollerOptions"
        :items="processedData"
        :columns="columns"
        :style="{ height: scrollHeight }"
        :disabled="virtualScrollerDisabled"
        loader-disabled
        :show-spacer="false"
      >
        <template #content="slotProps">
          <table
            ref="table"
            role="table"
            :class="[tableClass, 'p-datatable-table']"
            :style="[tableStyle, slotProps.spacerStyle]"
          >
            <TableHeader
              :column-group="headerColumnGroup"
              :columns="slotProps.columns"
              :row-group-mode="rowGroupMode"
              :group-rows-by="groupRowsBy"
              :group-row-sort-field="groupRowSortField"
              :reorderable-columns="reorderableColumns"
              :resizable-columns="resizableColumns"
              :all-rows-selected="allRowsSelected"
              :empty="empty"
              :sort-mode="sortMode"
              :sort-field="d_sortField"
              :sort-order="d_sortOrder"
              :multi-sort-meta="d_multiSortMeta"
              :filters="d_filters"
              :filters-store="filters"
              :filter-display="filterDisplay"
              @column-click="onColumnHeaderClick($event)"
              @column-mousedown="onColumnHeaderMouseDown($event)"
              @filter-change="onFilterChange"
              @filter-apply="onFilterApply"
              @column-dragstart="onColumnHeaderDragStart($event)"
              @column-dragover="onColumnHeaderDragOver($event)"
              @column-dragleave="onColumnHeaderDragLeave($event)"
              @column-drop="onColumnHeaderDrop($event)"
              @column-resizestart="onColumnResizeStart($event)"
              @checkbox-change="toggleRowsWithCheckbox($event)"
            />
            <TableBody
              v-if="frozenValue"
              ref="frozenBodyRef"
              :value="frozenValue"
              :frozen-row="true"
              class="p-datatable-frozen-tbody"
              :columns="slotProps.columns"
              :data-key="dataKey"
              :selection="selection"
              :selection-keys="d_selectionKeys"
              :selection-mode="selectionMode"
              :context-menu="contextMenu"
              :context-menu-selection="contextMenuSelection"
              :row-group-mode="rowGroupMode"
              :group-rows-by="groupRowsBy"
              :expandable-row-groups="expandableRowGroups"
              :row-class="rowClass"
              :row-style="rowStyle"
              :edit-mode="editMode"
              :compare-selection-by="compareSelectionBy"
              :scrollable="scrollable"
              :expanded-row-icon="expandedRowIcon"
              :collapsed-row-icon="collapsedRowIcon"
              :expanded-rows="expandedRows"
              :expanded-row-keys="d_expandedRowKeys"
              :expanded-row-groups="expandedRowGroups"
              :editing-rows="editingRows"
              :editing-row-keys="d_editingRowKeys"
              :templates="$slots"
              :responsive-layout="responsiveLayout"
              :editing-meta="d_editingMeta"
              :is-virtual-scroller-disabled="true"
              @rowgroup-toggle="toggleRowGroup"
              @row-click="onRowClick($event)"
              @row-dblclick="onRowDblClick($event)"
              @row-rightclick="onRowRightClick($event)"
              @row-touchend="onRowTouchEnd"
              @row-keydown="onRowKeyDown"
              @row-mousedown="onRowMouseDown"
              @row-dragstart="onRowDragStart($event)"
              @row-dragover="onRowDragOver($event)"
              @row-dragleave="onRowDragLeave($event)"
              @row-dragend="onRowDragEnd($event)"
              @row-drop="onRowDrop($event)"
              @row-toggle="toggleRow($event)"
              @radio-change="toggleRowWithRadio($event)"
              @checkbox-change="toggleRowWithCheckbox($event)"
              @cell-edit-init="onCellEditInit($event)"
              @cell-edit-complete="onCellEditComplete($event)"
              @cell-edit-cancel="onCellEditCancel($event)"
              @row-edit-init="onRowEditInit($event)"
              @row-edit-save="onRowEditSave($event)"
              @row-edit-cancel="onRowEditCancel($event)"
              @editing-meta-change="onEditingMetaChange"
            />
            <TableBody
              ref="bodyRef"
              :value="dataToRender(slotProps.rows)"
              :class="slotProps.styleClass"
              :columns="slotProps.columns"
              :empty="empty"
              :data-key="dataKey"
              :selection="selection"
              :selection-keys="d_selectionKeys"
              :selection-mode="selectionMode"
              :context-menu="contextMenu"
              :context-menu-selection="contextMenuSelection"
              :row-group-mode="rowGroupMode"
              :group-rows-by="groupRowsBy"
              :expandable-row-groups="expandableRowGroups"
              :row-class="rowClass"
              :row-style="rowStyle"
              :edit-mode="editMode"
              :compare-selection-by="compareSelectionBy"
              :scrollable="scrollable"
              :expanded-row-icon="expandedRowIcon"
              :collapsed-row-icon="collapsedRowIcon"
              :expanded-rows="expandedRows"
              :expanded-row-keys="d_expandedRowKeys"
              :expanded-row-groups="expandedRowGroups"
              :editing-rows="editingRows"
              :editing-row-keys="d_editingRowKeys"
              :templates="$slots"
              :responsive-layout="responsiveLayout"
              :editing-meta="d_editingMeta"
              :virtual-scroller-content-props="slotProps"
              :is-virtual-scroller-disabled="virtualScrollerDisabled"
              @rowgroup-toggle="toggleRowGroup"
              @row-click="onRowClick($event)"
              @row-dblclick="onRowDblClick($event)"
              @row-rightclick="onRowRightClick($event)"
              @row-touchend="onRowTouchEnd"
              @row-keydown="onRowKeyDown"
              @row-mousedown="onRowMouseDown"
              @row-dragstart="onRowDragStart($event)"
              @row-dragover="onRowDragOver($event)"
              @row-dragleave="onRowDragLeave($event)"
              @row-dragend="onRowDragEnd($event)"
              @row-drop="onRowDrop($event)"
              @row-toggle="toggleRow($event)"
              @radio-change="toggleRowWithRadio($event)"
              @checkbox-change="toggleRowWithCheckbox($event)"
              @cell-edit-init="onCellEditInit($event)"
              @cell-edit-complete="onCellEditComplete($event)"
              @cell-edit-cancel="onCellEditCancel($event)"
              @row-edit-init="onRowEditInit($event)"
              @row-edit-save="onRowEditSave($event)"
              @row-edit-cancel="onRowEditCancel($event)"
              @editing-meta-change="onEditingMetaChange"
            />
            <TableFooter
              :column-group="footerColumnGroup"
              :columns="slotProps.columns"
            />
          </table>
        </template>
      </VirtualScroller>
    </div>
    <Paginator
      v-if="paginatorBottom"
      :rows="d_rows"
      :first="d_first"
      :total-records="totalRecordsLength"
      :page-link-size="pageLinkSize"
      :template="paginatorTemplate"
      :rows-per-page-options="rowsPerPageOptions"
      :current-page-report-template="currentPageReportTemplate"
      class="p-paginator-bottom"
      :always-show="alwaysShowPaginator"
      @page="onPage($event)"
    >
      <template v-if="$slots.paginatorstart" #start>
        <slot name="paginatorstart" />
      </template>
      <template v-if="$slots.paginatorend" #end>
        <slot name="paginatorend" />
      </template>
    </Paginator>
    <div v-if="$slots.footer" class="p-datatable-footer">
      <slot name="footer" />
    </div>
    <div
      ref="resizeHelper"
      class="p-column-resizer-helper"
      style="display: none"
    />
    <span
      v-if="reorderableColumns"
      ref="reorderIndicatorUp"
      class="pi pi-arrow-down p-datatable-reorder-indicator-up"
      style="position: absolute; display: none"
    />
    <span
      v-if="reorderableColumns"
      ref="reorderIndicatorDown"
      class="pi pi-arrow-up p-datatable-reorder-indicator-down"
      style="position: absolute; display: none"
    />
  </div>
</template>

<script>
  import { ObjectUtils, DomHandler, UniqueComponentId } from './utils';
  import { FilterMatchMode, FilterOperator, FilterService } from './api';
  import Paginator from './Paginator/Paginator.vue';
  import VirtualScroller from './VirtualScroller/VirtualScroller.vue';
  import TableHeader from './TableHeader.vue';
  import TableBody from './TableBody.vue';
  import TableFooter from './TableFooter.vue';

  export default {
    name: 'WcDataTable',
    components: {
      Paginator,
      TableHeader,
      TableBody,
      TableFooter,
      VirtualScroller,
    },
    props: {
      value: {
        type: Array,
        default: null,
      },
      dataKey: {
        type: [String, Function],
        default: null,
      },
      rows: {
        type: Number,
        default: 0,
      },
      first: {
        type: Number,
        default: 0,
      },
      totalRecords: {
        type: Number,
        default: 0,
      },
      paginator: {
        type: Boolean,
        default: false,
      },
      paginatorPosition: {
        type: String,
        default: 'bottom',
      },
      alwaysShowPaginator: {
        type: Boolean,
        default: true,
      },
      paginatorTemplate: {
        type: String,
        default:
          'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown',
      },
      pageLinkSize: {
        type: Number,
        default: 5,
      },
      rowsPerPageOptions: {
        type: Array,
        default: null,
      },
      currentPageReportTemplate: {
        type: String,
        default: '({currentPage} of {totalPages})',
      },
      lazy: {
        type: Boolean,
        default: false,
      },
      loading: {
        type: Boolean,
        default: false,
      },
      loadingIcon: {
        type: String,
        default: 'pi pi-spinner',
      },
      sortField: {
        type: [String, Function],
        default: null,
      },
      sortOrder: {
        type: Number,
        default: null,
      },
      defaultSortOrder: {
        type: Number,
        default: 1,
      },
      multiSortMeta: {
        type: Array,
        default: null,
      },
      sortMode: {
        type: String,
        default: 'single',
      },
      removableSort: {
        type: Boolean,
        default: false,
      },
      filters: {
        type: Object,
        default: null,
      },
      filterDisplay: {
        type: String,
        default: null,
      },
      globalFilterFields: {
        type: Array,
        default: null,
      },
      filterLocale: {
        type: String,
        default: undefined,
      },
      selection: {
        type: [Array, Object],
        default: null,
      },
      selectionMode: {
        type: String,
        default: null,
      },
      compareSelectionBy: {
        type: String,
        default: 'deepEquals',
      },
      metaKeySelection: {
        type: Boolean,
        default: true,
      },
      contextMenu: {
        type: Boolean,
        default: false,
      },
      contextMenuSelection: {
        type: Object,
        default: null,
      },
      selectAll: {
        type: Boolean,
        default: null,
      },
      rowHover: {
        type: Boolean,
        default: false,
      },
      csvSeparator: {
        type: String,
        default: ',',
      },
      exportFilename: {
        type: String,
        default: 'download',
      },
      exportFunction: {
        type: Function,
        default: null,
      },
      autoLayout: {
        type: Boolean,
        default: false,
      },
      resizableColumns: {
        type: Boolean,
        default: false,
      },
      columnResizeMode: {
        type: String,
        default: 'fit',
      },
      reorderableColumns: {
        type: Boolean,
        default: false,
      },
      expandedRows: {
        type: Array,
        default: null,
      },
      expandedRowIcon: {
        type: String,
        default: 'pi-chevron-down',
      },
      collapsedRowIcon: {
        type: String,
        default: 'pi-chevron-right',
      },
      rowGroupMode: {
        type: String,
        default: null,
      },
      groupRowsBy: {
        type: [Array, String],
        default: null,
      },
      expandableRowGroups: {
        type: Boolean,
        default: false,
      },
      expandedRowGroups: {
        type: Array,
        default: null,
      },
      stateStorage: {
        type: String,
        default: 'session',
      },
      stateKey: {
        type: String,
        default: null,
      },
      editMode: {
        type: String,
        default: null,
      },
      editingRows: {
        type: Array,
        default: null,
      },
      rowClass: {
        type: null,
        default: null,
      },
      rowStyle: {
        type: null,
        default: null,
      },
      scrollable: {
        type: Boolean,
        default: false,
      },
      scrollDirection: {
        type: String,
        default: 'vertical',
      },
      virtualScrollerOptions: {
        type: Object,
        default: null,
      },
      scrollHeight: {
        type: String,
        default: null,
      },
      frozenValue: {
        type: Array,
        default: null,
      },
      responsiveLayout: {
        type: String,
        default: 'stack',
      },
      breakpoint: {
        type: String,
        default: '960px',
      },
      showGridlines: {
        type: Boolean,
        default: false,
      },
      stripedRows: {
        type: Boolean,
        default: false,
      },
      tableStyle: {
        type: null,
        default: null,
      },
      tableClass: {
        type: String,
        default: null,
      },
    },
    emits: [
      'value-change',
      'update:first',
      'update:rows',
      'page',
      'update:sortField',
      'update:sortOrder',
      'update:multiSortMeta',
      'sort',
      'filter',
      'row-click',
      'row-dblclick',
      'update:selection',
      'row-select',
      'row-unselect',
      'update:contextMenuSelection',
      'row-contextmenu',
      'row-unselect-all',
      'row-select-all',
      'select-all-change',
      'column-resize-end',
      'column-reorder',
      'row-reorder',
      'update:expandedRows',
      'row-collapse',
      'row-expand',
      'update:expandedRowGroups',
      'rowgroup-collapse',
      'rowgroup-expand',
      'update:filters',
      'state-restore',
      'state-save',
      'cell-edit-init',
      'cell-edit-complete',
      'cell-edit-cancel',
      'update:editingRows',
      'row-edit-init',
      'row-edit-save',
      'row-edit-cancel',
    ],
    data() {
      return {
        d_first: this.first,
        d_rows: this.rows,
        d_sortField: this.sortField,
        d_sortOrder: this.sortOrder,
        d_multiSortMeta: this.multiSortMeta ? [...this.multiSortMeta] : [],
        d_groupRowsSortMeta: null,
        d_selectionKeys: null,
        d_expandedRowKeys: null,
        d_columnOrder: null,
        d_editingRowKeys: null,
        d_editingMeta: {},
        d_filters: this.cloneFilters(this.filters),
      };
    },
    rowTouched: false,
    anchorRowIndex: null,
    rangeRowIndex: null,
    documentColumnResizeListener: null,
    documentColumnResizeEndListener: null,
    lastResizeHelperX: null,
    resizeColumnElement: null,
    columnResizing: false,
    colReorderIconWidth: null,
    colReorderIconHeight: null,
    draggedColumn: null,
    draggedRowIndex: null,
    droppedRowIndex: null,
    rowDragging: null,
    columnWidthsState: null,
    tableWidthState: null,
    columnWidthsRestored: false,
    computed: {
      containerClass() {
        return [
          'p-datatable p-component',
          {
            'p-datatable-hoverable-rows': this.rowHover || this.selectionMode,
            'p-datatable-auto-layout': this.autoLayout,
            'p-datatable-resizable': this.resizableColumns,
            'p-datatable-resizable-fit':
              this.resizableColumns && this.columnResizeMode === 'fit',
            'p-datatable-scrollable': this.scrollable,
            'p-datatable-scrollable-vertical':
              this.scrollable && this.scrollDirection === 'vertical',
            'p-datatable-scrollable-horizontal':
              this.scrollable && this.scrollDirection === 'horizontal',
            'p-datatable-scrollable-both':
              this.scrollable && this.scrollDirection === 'both',
            'p-datatable-flex-scrollable':
              this.scrollable && this.scrollHeight === 'flex',
            'p-datatable-responsive-stack': this.responsiveLayout === 'stack',
            'p-datatable-responsive-scroll': this.responsiveLayout === 'scroll',
            'p-datatable-striped': this.stripedRows,
            'p-datatable-gridlines': this.showGridlines,
            'p-datatable-grouped-header': this.headerColumnGroup != null,
            'p-datatable-grouped-footer': this.footerColumnGroup != null,
          },
        ];
      },
      columns() {
        const children = this.getChildren();

        if (!children) {
          return;
        }

        const cols = this.recursiveGetChildren(children, []);

        if (this.reorderableColumns && this.d_columnOrder) {
          const orderedColumns = [];
          for (const columnKey of this.d_columnOrder) {
            const column = this.findColumnByKey(cols, columnKey);
            if (column && !this.columnProp(column, 'hidden')) {
              orderedColumns.push(column);
            }
          }

          return [
            ...orderedColumns,
            ...cols.filter((item) => orderedColumns.indexOf(item) < 0),
          ];
        }

        return cols;
      },
      headerColumnGroup() {
        const children = this.getChildren();
        if (children) {
          for (const child of children) {
            if (
              child.type.name === 'ColumnGroup' &&
              this.columnProp(child, 'type') === 'header'
            ) {
              return child;
            }
          }
        }

        return null;
      },
      footerColumnGroup() {
        const children = this.getChildren();
        if (children) {
          for (const child of children) {
            if (
              child.type.name === 'ColumnGroup' &&
              this.columnProp(child, 'type') === 'footer'
            ) {
              return child;
            }
          }
        }

        return null;
      },
      hasFilters() {
        return (
          this.filters &&
          Object.keys(this.filters).length > 0 &&
          this.filters.constructor === Object
        );
      },
      processedData() {
        let data = this.value || [];

        if (!this.lazy) {
          if (data && data.length) {
            if (this.hasFilters) {
              data = this.filter(data);
            }

            if (this.sorted) {
              if (this.sortMode === 'single') data = this.sortSingle(data);
              else if (this.sortMode === 'multiple')
                data = this.sortMultiple(data);
            }
          }
        }

        return data;
      },
      totalRecordsLength() {
        if (this.lazy) {
          return this.totalRecords;
        } else {
          const data = this.processedData;
          return data ? data.length : 0;
        }
      },
      empty() {
        const data = this.processedData;
        return !data || data.length === 0;
      },
      paginatorTop() {
        return (
          this.paginator &&
          (this.paginatorPosition !== 'bottom' ||
            this.paginatorPosition === 'both')
        );
      },
      paginatorBottom() {
        return (
          this.paginator &&
          (this.paginatorPosition !== 'top' ||
            this.paginatorPosition === 'both')
        );
      },
      sorted() {
        return (
          this.d_sortField ||
          (this.d_multiSortMeta && this.d_multiSortMeta.length > 0)
        );
      },
      loadingIconClass() {
        return ['p-datatable-loading-icon pi-spin', this.loadingIcon];
      },
      allRowsSelected() {
        if (this.selectAll !== null) {
          return this.selectAll;
        } else {
          const val = this.frozenValue
            ? [...this.frozenValue, ...this.processedData]
            : this.processedData;
          return (
            ObjectUtils.isNotEmpty(val) &&
            this.selection &&
            Array.isArray(this.selection) &&
            val.every((v) => this.selection.some((s) => this.equals(s, v)))
          );
        }
      },
      attributeSelector() {
        return UniqueComponentId();
      },
      groupRowSortField() {
        return this.sortMode === 'single'
          ? this.sortField
          : this.d_groupRowsSortMeta
          ? this.d_groupRowsSortMeta.field
          : null;
      },
      virtualScrollerDisabled() {
        return (
          ObjectUtils.isEmpty(this.virtualScrollerOptions) || !this.scrollable
        );
      },
    },
    watch: {
      first(newValue) {
        this.d_first = newValue;
      },
      rows(newValue) {
        this.d_rows = newValue;
      },
      sortField(newValue) {
        this.d_sortField = newValue;
      },
      sortOrder(newValue) {
        this.d_sortOrder = newValue;
      },
      multiSortMeta(newValue) {
        this.d_multiSortMeta = newValue;
      },
      selection: {
        immediate: true,
        handler(newValue) {
          if (this.dataKey) {
            this.updateSelectionKeys(newValue);
          }
        },
      },
      expandedRows(newValue) {
        if (this.dataKey) {
          this.updateExpandedRowKeys(newValue);
        }
      },
      editingRows(newValue) {
        if (this.dataKey) {
          this.updateEditingRowKeys(newValue);
        }
      },
      filters: {
        deep: true,
        handler: function (newValue) {
          this.d_filters = this.cloneFilters(newValue);
        },
      },
    },
    beforeMount() {
      if (this.isStateful()) {
        this.restoreState();
      }
    },
    mounted() {
      this.$el.setAttribute(this.attributeSelector, '');

      if (this.responsiveLayout === 'stack' && !this.scrollable) {
        this.createResponsiveStyle();
      }

      if (this.isStateful() && this.resizableColumns) {
        this.restoreColumnWidths();
      }

      if (this.editMode === 'row' && this.dataKey && !this.d_editingRowKeys) {
        this.updateEditingRowKeys(this.editingRows);
      }
    },
    beforeUnmount() {
      this.unbindColumnResizeEvents();
      this.destroyStyleElement();
      this.destroyResponsiveStyle();
    },
    updated() {
      if (this.isStateful()) {
        this.saveState();
      }

      if (this.editMode === 'row' && this.dataKey && !this.d_editingRowKeys) {
        this.updateEditingRowKeys(this.editingRows);
      }
    },
    methods: {
      columnProp(col, prop) {
        return ObjectUtils.getVNodeProp(col, prop);
      },
      onPage(event) {
        this.clearEditingMetaData();

        this.d_first = event.first;
        this.d_rows = event.rows;

        const pageEvent = this.createLazyLoadEvent(event);
        pageEvent.pageCount = event.pageCount;
        pageEvent.page = event.page;

        this.$emit('update:first', this.d_first);
        this.$emit('update:rows', this.d_rows);
        this.$emit('page', pageEvent);
        this.$emit('value-change', this.processedData);
      },
      onColumnHeaderClick(e) {
        const event = e.originalEvent;
        const column = e.column;

        if (this.columnProp(column, 'sortable')) {
          const targetNode = event.target;
          const columnField =
            this.columnProp(column, 'sortField') ||
            this.columnProp(column, 'field');

          if (
            DomHandler.hasClass(targetNode, 'p-sortable-column') ||
            DomHandler.hasClass(targetNode, 'p-column-title') ||
            DomHandler.hasClass(targetNode, 'p-column-header-content') ||
            DomHandler.hasClass(targetNode, 'p-sortable-column-icon') ||
            DomHandler.hasClass(
              targetNode.parentElement,
              'p-sortable-column-icon',
            )
          ) {
            DomHandler.clearSelection();

            if (this.sortMode === 'single') {
              if (this.d_sortField === columnField) {
                if (
                  this.removableSort &&
                  this.d_sortOrder * -1 === this.defaultSortOrder
                ) {
                  this.d_sortOrder = null;
                  this.d_sortField = null;
                } else {
                  this.d_sortOrder = this.d_sortOrder * -1;
                }
              } else {
                this.d_sortOrder = this.defaultSortOrder;
                this.d_sortField = columnField;
              }

              this.$emit('update:sortField', this.d_sortField);
              this.$emit('update:sortOrder', this.d_sortOrder);
              this.resetPage();
            } else if (this.sortMode === 'multiple') {
              const metaKey = event.metaKey || event.ctrlKey;
              if (!metaKey) {
                this.d_multiSortMeta = this.d_multiSortMeta.filter(
                  (meta) => meta.field === columnField,
                );
              }

              this.addMultiSortField(columnField);
              this.$emit('update:multiSortMeta', this.d_multiSortMeta);
            }

            this.$emit('sort', this.createLazyLoadEvent(event));
            this.$emit('value-change', this.processedData);
          }
        }
      },
      sortSingle(value) {
        this.clearEditingMetaData();

        if (this.groupRowsBy && this.groupRowsBy === this.sortField) {
          this.d_multiSortMeta = [
            {
              field: this.sortField,
              order: this.sortOrder || this.defaultSortOrder,
            },
            { field: this.d_sortField, order: this.d_sortOrder },
          ];

          return this.sortMultiple(value);
        }

        const data = [...value];

        data.sort((data1, data2) => {
          const value1 = ObjectUtils.resolveFieldData(data1, this.d_sortField);
          const value2 = ObjectUtils.resolveFieldData(data2, this.d_sortField);

          let result = null;

          if (value1 == null && value2 != null) result = -1;
          else if (value1 != null && value2 == null) result = 1;
          else if (value1 == null && value2 == null) result = 0;
          else if (typeof value1 === 'string' && typeof value2 === 'string')
            result = value1.localeCompare(value2, undefined, { numeric: true });
          else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

          return this.d_sortOrder * result;
        });

        return data;
      },
      sortMultiple(value) {
        this.clearEditingMetaData();

        if (
          this.groupRowsBy &&
          (this.d_groupRowsSortMeta ||
            (this.d_multiSortMeta.length &&
              this.groupRowsBy === this.d_multiSortMeta[0].field))
        ) {
          const firstSortMeta = this.d_multiSortMeta[0];
          !this.d_groupRowsSortMeta &&
            (this.d_groupRowsSortMeta = firstSortMeta);

          if (firstSortMeta.field !== this.d_groupRowsSortMeta.field) {
            this.d_multiSortMeta = [
              this.d_groupRowsSortMeta,
              ...this.d_multiSortMeta,
            ];
          }
        }

        const data = [...value];

        data.sort((data1, data2) => {
          return this.multisortField(data1, data2, 0);
        });

        return data;
      },
      multisortField(data1, data2, index) {
        const value1 = ObjectUtils.resolveFieldData(
          data1,
          this.d_multiSortMeta[index].field,
        );
        const value2 = ObjectUtils.resolveFieldData(
          data2,
          this.d_multiSortMeta[index].field,
        );
        let result = null;

        if (typeof value1 === 'string' || value1 instanceof String) {
          if (value1.localeCompare && value1 !== value2) {
            return (
              this.d_multiSortMeta[index].order *
              value1.localeCompare(value2, undefined, { numeric: true })
            );
          }
        } else {
          result = value1 < value2 ? -1 : 1;
        }

        if (value1 === value2) {
          return this.d_multiSortMeta.length - 1 > index
            ? this.multisortField(data1, data2, index + 1)
            : 0;
        }

        return this.d_multiSortMeta[index].order * result;
      },
      addMultiSortField(field) {
        const index = this.d_multiSortMeta.findIndex(
          (meta) => meta.field === field,
        );

        if (index >= 0) {
          if (
            this.removableSort &&
            this.d_multiSortMeta[index].order * -1 === this.defaultSortOrder
          )
            this.d_multiSortMeta.splice(index, 1);
          else
            this.d_multiSortMeta[index] = {
              field: field,
              order: this.d_multiSortMeta[index].order * -1,
            };
        } else {
          this.d_multiSortMeta.push({
            field: field,
            order: this.defaultSortOrder,
          });
        }

        this.d_multiSortMeta = [...this.d_multiSortMeta];
      },
      filter(data) {
        if (!data) {
          return;
        }

        this.clearEditingMetaData();

        let globalFilterFieldsArray;
        if (this.filters['global']) {
          globalFilterFieldsArray =
            this.globalFilterFields ||
            this.columns.map(
              (col) =>
                this.columnProp(col, 'filterField') ||
                this.columnProp(col, 'field'),
            );
        }

        let filteredValue = [];

        for (let i = 0; i < data.length; i++) {
          let localMatch = true;
          let globalMatch = false;
          let localFiltered = false;

          for (const prop in this.filters) {
            if (
              Object.prototype.hasOwnProperty.call(this.filters, prop) &&
              prop !== 'global'
            ) {
              localFiltered = true;
              const filterField = prop;
              const filterMeta = this.filters[filterField];

              if (filterMeta.operator) {
                for (const filterConstraint of filterMeta.constraints) {
                  localMatch = this.executeLocalFilter(
                    filterField,
                    data[i],
                    filterConstraint,
                  );

                  if (
                    (filterMeta.operator === FilterOperator.OR && localMatch) ||
                    (filterMeta.operator === FilterOperator.AND && !localMatch)
                  ) {
                    break;
                  }
                }
              } else {
                localMatch = this.executeLocalFilter(
                  filterField,
                  data[i],
                  filterMeta,
                );
              }

              if (!localMatch) {
                break;
              }
            }
          }

          if (
            this.filters['global'] &&
            !globalMatch &&
            globalFilterFieldsArray
          ) {
            for (let j = 0; j < globalFilterFieldsArray.length; j++) {
              const globalFilterField = globalFilterFieldsArray[j];
              globalMatch = FilterService.filters[
                this.filters['global'].matchMode || FilterMatchMode.CONTAINS
              ](
                ObjectUtils.resolveFieldData(data[i], globalFilterField),
                this.filters['global'].value,
                this.filterLocale,
              );

              if (globalMatch) {
                break;
              }
            }
          }

          let matches;
          if (this.filters['global']) {
            matches = localFiltered
              ? localFiltered && localMatch && globalMatch
              : globalMatch;
          } else {
            matches = localFiltered && localMatch;
          }

          if (matches) {
            filteredValue.push(data[i]);
          }
        }

        if (filteredValue.length === this.value.length) {
          filteredValue = data;
        }

        const filterEvent = this.createLazyLoadEvent();
        filterEvent.filteredValue = filteredValue;
        this.$emit('filter', filterEvent);
        this.$emit('value-change', filteredValue);

        return filteredValue;
      },
      executeLocalFilter(field, rowData, filterMeta) {
        const filterValue = filterMeta.value;
        const filterMatchMode =
          filterMeta.matchMode || FilterMatchMode.STARTS_WITH;
        const dataFieldValue = ObjectUtils.resolveFieldData(rowData, field);
        const filterConstraint = FilterService.filters[filterMatchMode];

        return filterConstraint(dataFieldValue, filterValue, this.filterLocale);
      },
      onRowClick(e) {
        const event = e.originalEvent;
        if (DomHandler.isClickable(event.target)) {
          return;
        }

        this.$emit('row-click', e);

        if (this.selectionMode) {
          const rowData = e.data;
          const rowIndex = this.d_first + e.index;

          if (
            this.isMultipleSelectionMode() &&
            event.shiftKey &&
            this.anchorRowIndex != null
          ) {
            DomHandler.clearSelection();
            this.rangeRowIndex = rowIndex;
            this.selectRange(event);
          } else {
            const selected = this.isSelected(rowData);
            const metaSelection = this.rowTouched
              ? false
              : this.metaKeySelection;
            this.anchorRowIndex = rowIndex;
            this.rangeRowIndex = rowIndex;

            if (metaSelection) {
              const metaKey = event.metaKey || event.ctrlKey;

              if (selected && metaKey) {
                if (this.isSingleSelectionMode()) {
                  this.$emit('update:selection', null);
                } else {
                  const selectionIndex = this.findIndexInSelection(rowData);
                  const _selection = this.selection.filter(
                    (val, i) => i != selectionIndex,
                  );
                  this.$emit('update:selection', _selection);
                }

                this.$emit('row-unselect', {
                  originalEvent: event,
                  data: rowData,
                  index: rowIndex,
                  type: 'row',
                });
              } else {
                if (this.isSingleSelectionMode()) {
                  this.$emit('update:selection', rowData);
                } else if (this.isMultipleSelectionMode()) {
                  let _selection = metaKey ? this.selection || [] : [];
                  _selection = [..._selection, rowData];
                  this.$emit('update:selection', _selection);
                }

                this.$emit('row-select', {
                  originalEvent: event,
                  data: rowData,
                  index: rowIndex,
                  type: 'row',
                });
              }
            } else {
              if (this.selectionMode === 'single') {
                if (selected) {
                  this.$emit('update:selection', null);
                  this.$emit('row-unselect', {
                    originalEvent: event,
                    data: rowData,
                    index: rowIndex,
                    type: 'row',
                  });
                } else {
                  this.$emit('update:selection', rowData);
                  this.$emit('row-select', {
                    originalEvent: event,
                    data: rowData,
                    index: rowIndex,
                    type: 'row',
                  });
                }
              } else if (this.selectionMode === 'multiple') {
                if (selected) {
                  const selectionIndex = this.findIndexInSelection(rowData);
                  const _selection = this.selection.filter(
                    (val, i) => i != selectionIndex,
                  );
                  this.$emit('update:selection', _selection);
                  this.$emit('row-unselect', {
                    originalEvent: event,
                    data: rowData,
                    index: rowIndex,
                    type: 'row',
                  });
                } else {
                  const _selection = this.selection
                    ? [...this.selection, rowData]
                    : [rowData];
                  this.$emit('update:selection', _selection);
                  this.$emit('row-select', {
                    originalEvent: event,
                    data: rowData,
                    index: rowIndex,
                    type: 'row',
                  });
                }
              }
            }
          }
        }

        this.rowTouched = false;
      },
      onRowDblClick(e) {
        const event = e.originalEvent;
        if (DomHandler.isClickable(event.target)) {
          return;
        }

        this.$emit('row-dblclick', e);
      },
      onRowRightClick(event) {
        DomHandler.clearSelection();
        event.originalEvent.target.focus();

        this.$emit('update:contextMenuSelection', event.data);
        this.$emit('row-contextmenu', event);
      },
      onRowTouchEnd() {
        this.rowTouched = true;
      },
      onRowKeyDown(e) {
        const event = e.originalEvent;
        const rowData = e.data;
        const rowIndex = e.index;

        if (this.selectionMode) {
          const row = event.target;

          switch (event.which) {
            //down arrow
            case 40:
              var nextRow = this.findNextSelectableRow(row);
              if (nextRow) {
                nextRow.focus();
              }

              event.preventDefault();
              break;

            //up arrow
            case 38:
              var prevRow = this.findPrevSelectableRow(row);
              if (prevRow) {
                prevRow.focus();
              }

              event.preventDefault();
              break;

            //enter
            case 13:
              this.onRowClick({
                originalEvent: event,
                data: rowData,
                index: rowIndex,
              });
              break;

            default:
              //no op
              break;
          }
        }
      },
      findNextSelectableRow(row) {
        const nextRow = row.nextElementSibling;
        if (nextRow) {
          if (DomHandler.hasClass(nextRow, 'p-selectable-row')) return nextRow;
          else return this.findNextSelectableRow(nextRow);
        } else {
          return null;
        }
      },
      findPrevSelectableRow(row) {
        const prevRow = row.previousElementSibling;
        if (prevRow) {
          if (DomHandler.hasClass(prevRow, 'p-selectable-row')) return prevRow;
          else return this.findPrevSelectableRow(prevRow);
        } else {
          return null;
        }
      },
      toggleRowWithRadio(event) {
        const rowData = event.data;

        if (this.isSelected(rowData)) {
          this.$emit('update:selection', null);
          this.$emit('row-unselect', {
            originalEvent: event.originalEvent,
            data: rowData,
            index: event.index,
            type: 'radiobutton',
          });
        } else {
          this.$emit('update:selection', rowData);
          this.$emit('row-select', {
            originalEvent: event.originalEvent,
            data: rowData,
            index: event.index,
            type: 'radiobutton',
          });
        }
      },
      toggleRowWithCheckbox(event) {
        const rowData = event.data;

        if (this.isSelected(rowData)) {
          const selectionIndex = this.findIndexInSelection(rowData);
          const _selection = this.selection.filter(
            (val, i) => i != selectionIndex,
          );
          this.$emit('update:selection', _selection);
          this.$emit('row-unselect', {
            originalEvent: event.originalEvent,
            data: rowData,
            index: event.index,
            type: 'checkbox',
          });
        } else {
          let _selection = this.selection ? [...this.selection] : [];
          _selection = [..._selection, rowData];
          this.$emit('update:selection', _selection);
          this.$emit('row-select', {
            originalEvent: event.originalEvent,
            data: rowData,
            index: event.index,
            type: 'checkbox',
          });
        }
      },
      toggleRowsWithCheckbox(event) {
        if (this.selectAll !== null) {
          this.$emit('select-all-change', event);
        } else {
          const { originalEvent, checked } = event;
          let _selection = [];

          if (checked) {
            _selection = this.frozenValue
              ? [...this.frozenValue, ...this.processedData]
              : this.processedData;
            this.$emit('row-select-all', { originalEvent, data: _selection });
          } else {
            this.$emit('row-unselect-all', { originalEvent });
          }

          this.$emit('update:selection', _selection);
        }
      },
      isSingleSelectionMode() {
        return this.selectionMode === 'single';
      },
      isMultipleSelectionMode() {
        return this.selectionMode === 'multiple';
      },
      isSelected(rowData) {
        if (rowData && this.selection) {
          if (this.dataKey) {
            return this.d_selectionKeys
              ? this.d_selectionKeys[
                  ObjectUtils.resolveFieldData(rowData, this.dataKey)
                ] !== undefined
              : false;
          } else {
            if (this.selection instanceof Array)
              return this.findIndexInSelection(rowData) > -1;
            else return this.equals(rowData, this.selection);
          }
        }

        return false;
      },
      findIndexInSelection(rowData) {
        return this.findIndex(rowData, this.selection);
      },
      findIndex(rowData, collection) {
        let index = -1;
        if (collection && collection.length) {
          for (let i = 0; i < collection.length; i++) {
            if (this.equals(rowData, collection[i])) {
              index = i;
              break;
            }
          }
        }

        return index;
      },
      updateSelectionKeys(selection) {
        this.d_selectionKeys = {};
        if (Array.isArray(selection)) {
          for (const data of selection) {
            this.d_selectionKeys[
              String(ObjectUtils.resolveFieldData(data, this.dataKey))
            ] = 1;
          }
        } else {
          this.d_selectionKeys[
            String(ObjectUtils.resolveFieldData(selection, this.dataKey))
          ] = 1;
        }
      },
      updateExpandedRowKeys(expandedRows) {
        if (expandedRows && expandedRows.length) {
          this.d_expandedRowKeys = {};
          for (const data of expandedRows) {
            this.d_expandedRowKeys[
              String(ObjectUtils.resolveFieldData(data, this.dataKey))
            ] = 1;
          }
        } else {
          this.d_expandedRowKeys = null;
        }
      },
      updateEditingRowKeys(editingRows) {
        if (editingRows && editingRows.length) {
          this.d_editingRowKeys = {};
          for (const data of editingRows) {
            this.d_editingRowKeys[
              String(ObjectUtils.resolveFieldData(data, this.dataKey))
            ] = 1;
          }
        } else {
          this.d_editingRowKeys = null;
        }
      },
      equals(data1, data2) {
        return this.compareSelectionBy === 'equals'
          ? data1 === data2
          : ObjectUtils.equals(data1, data2, this.dataKey);
      },
      selectRange(event) {
        let rangeStart, rangeEnd;

        if (this.rangeRowIndex > this.anchorRowIndex) {
          rangeStart = this.anchorRowIndex;
          rangeEnd = this.rangeRowIndex;
        } else if (this.rangeRowIndex < this.anchorRowIndex) {
          rangeStart = this.rangeRowIndex;
          rangeEnd = this.anchorRowIndex;
        } else {
          rangeStart = this.rangeRowIndex;
          rangeEnd = this.rangeRowIndex;
        }

        if (this.lazy && this.paginator) {
          rangeStart -= this.first;
          rangeEnd -= this.first;
        }

        const value = this.processedData;
        const _selection = [];
        for (let i = rangeStart; i <= rangeEnd; i++) {
          const rangeRowData = value[i];
          _selection.push(rangeRowData);
          this.$emit('row-select', {
            originalEvent: event,
            data: rangeRowData,
            type: 'row',
          });
        }

        this.$emit('update:selection', _selection);
      },
      exportCSV(options, data) {
        let csv = '\ufeff';

        if (!data) {
          data = this.processedData;

          if (options && options.selectionOnly) data = this.selection || [];
          else if (this.frozenValue)
            data = data ? [...this.frozenValue, ...data] : this.frozenValue;
        }

        //headers
        let headerInitiated = false;
        for (let i = 0; i < this.columns.length; i++) {
          const column = this.columns[i];

          if (
            this.columnProp(column, 'exportable') !== false &&
            this.columnProp(column, 'field')
          ) {
            if (headerInitiated) csv += this.csvSeparator;
            else headerInitiated = true;

            csv +=
              '"' +
              (this.columnProp(column, 'exportHeader') ||
                this.columnProp(column, 'header') ||
                this.columnProp(column, 'field')) +
              '"';
          }
        }

        //body
        if (data) {
          data.forEach((record) => {
            csv += '\n';
            let rowInitiated = false;
            for (let i = 0; i < this.columns.length; i++) {
              const column = this.columns[i];
              if (
                this.columnProp(column, 'exportable') !== false &&
                this.columnProp(column, 'field')
              ) {
                if (rowInitiated) csv += this.csvSeparator;
                else rowInitiated = true;

                let cellData = ObjectUtils.resolveFieldData(
                  record,
                  this.columnProp(column, 'field'),
                );

                if (cellData != null) {
                  if (this.exportFunction) {
                    cellData = this.exportFunction({
                      data: cellData,
                      field: this.columnProp(column, 'field'),
                    });
                  } else cellData = String(cellData).replace(/"/g, '""');
                } else cellData = '';

                csv += '"' + cellData + '"';
              }
            }
          });
        }

        DomHandler.exportCSV(csv, this.exportFilename);
      },
      resetPage() {
        this.d_first = 0;
        this.$emit('update:first', this.d_first);
      },
      onColumnResizeStart(event) {
        const containerLeft = DomHandler.getOffset(this.$el).left;
        this.resizeColumnElement = event.target.parentElement;
        this.columnResizing = true;
        this.lastResizeHelperX =
          event.pageX - containerLeft + this.$el.scrollLeft;

        this.bindColumnResizeEvents();
      },
      onColumnResize(event) {
        const containerLeft = DomHandler.getOffset(this.$el).left;
        DomHandler.addClass(this.$el, 'p-unselectable-text');
        this.$refs.resizeHelper.style.height = this.$el.offsetHeight + 'px';
        this.$refs.resizeHelper.style.top = 0 + 'px';
        this.$refs.resizeHelper.style.left =
          event.pageX - containerLeft + this.$el.scrollLeft + 'px';

        this.$refs.resizeHelper.style.display = 'block';
      },
      onColumnResizeEnd() {
        const delta =
          this.$refs.resizeHelper.offsetLeft - this.lastResizeHelperX;
        const columnWidth = this.resizeColumnElement.offsetWidth;
        const newColumnWidth = columnWidth + delta;
        const minWidth = this.resizeColumnElement.style.minWidth || 15;

        if (columnWidth + delta > parseInt(minWidth, 10)) {
          if (this.columnResizeMode === 'fit') {
            const nextColumn = this.resizeColumnElement.nextElementSibling;
            const nextColumnWidth = nextColumn.offsetWidth - delta;

            if (newColumnWidth > 15 && nextColumnWidth > 15) {
              this.resizeTableCells(newColumnWidth, nextColumnWidth);
            }
          } else if (this.columnResizeMode === 'expand') {
            const tableWidth = this.$refs.table.offsetWidth + delta + 'px';
            const updateTableWidth = (el) => {
              !!el && (el.style.width = el.style.minWidth = tableWidth);
            };

            updateTableWidth(this.$refs.table);

            if (!this.virtualScrollerDisabled) {
              const body = this.$refs.bodyRef && this.$refs.bodyRef.$el;
              const frozenBody =
                this.$refs.frozenBodyRef && this.$refs.frozenBodyRef.$el;

              updateTableWidth(body);
              updateTableWidth(frozenBody);
            }

            this.resizeTableCells(newColumnWidth);
          }

          this.$emit('column-resize-end', {
            element: this.resizeColumnElement,
            delta: delta,
          });
        }

        this.$refs.resizeHelper.style.display = 'none';
        this.resizeColumn = null;
        DomHandler.removeClass(this.$el, 'p-unselectable-text');

        this.unbindColumnResizeEvents();

        if (this.isStateful()) {
          this.saveState();
        }
      },
      resizeTableCells(newColumnWidth, nextColumnWidth) {
        const colIndex = DomHandler.index(this.resizeColumnElement);
        const widths = [];
        const headers = DomHandler.find(
          this.$refs.table,
          '.p-datatable-thead > tr > th',
        );
        headers.forEach((header) =>
          widths.push(DomHandler.getOuterWidth(header)),
        );

        this.destroyStyleElement();
        this.createStyleElement();

        let innerHTML = '';
        widths.forEach((width, index) => {
          const colWidth =
            index === colIndex
              ? newColumnWidth
              : nextColumnWidth && index === colIndex + 1
              ? nextColumnWidth
              : width;
          const style = this.scrollable
            ? `flex: 1 1 ${colWidth}px !important`
            : `width: ${colWidth}px !important`;
          innerHTML += `
                    .p-datatable[${
                      this.attributeSelector
                    }] .p-datatable-thead > tr > th:nth-child(${index + 1}),
                    .p-datatable[${
                      this.attributeSelector
                    }] .p-datatable-tbody > tr > td:nth-child(${index + 1}),
                    .p-datatable[${
                      this.attributeSelector
                    }] .p-datatable-tfoot > tr > td:nth-child(${index + 1}) {
                        ${style}
                    }
                `;
        });

        this.styleElement.innerHTML = innerHTML;
      },
      bindColumnResizeEvents() {
        if (!this.documentColumnResizeListener) {
          this.documentColumnResizeListener = document.addEventListener(
            'mousemove',
            () => {
              if (this.columnResizing) {
                this.onColumnResize(event);
              }
            },
          );
        }

        if (!this.documentColumnResizeEndListener) {
          this.documentColumnResizeEndListener = document.addEventListener(
            'mouseup',
            () => {
              if (this.columnResizing) {
                this.columnResizing = false;
                this.onColumnResizeEnd();
              }
            },
          );
        }
      },
      unbindColumnResizeEvents() {
        if (this.documentColumnResizeListener) {
          document.removeEventListener(
            'document',
            this.documentColumnResizeListener,
          );
          this.documentColumnResizeListener = null;
        }

        if (this.documentColumnResizeEndListener) {
          document.removeEventListener(
            'document',
            this.documentColumnResizeEndListener,
          );
          this.documentColumnResizeEndListener = null;
        }
      },
      onColumnHeaderMouseDown(e) {
        const event = e.originalEvent;
        const column = e.column;

        if (
          this.reorderableColumns &&
          this.columnProp(column, 'reorderableColumn') !== false
        ) {
          if (
            event.target.nodeName === 'INPUT' ||
            event.target.nodeName === 'TEXTAREA' ||
            DomHandler.hasClass(event.target, 'p-column-resizer')
          )
            event.currentTarget.draggable = false;
          else event.currentTarget.draggable = true;
        }
      },
      onColumnHeaderDragStart(event) {
        if (this.columnResizing) {
          event.preventDefault();
          return;
        }

        this.colReorderIconWidth = DomHandler.getHiddenElementOuterWidth(
          this.$refs.reorderIndicatorUp,
        );
        this.colReorderIconHeight = DomHandler.getHiddenElementOuterHeight(
          this.$refs.reorderIndicatorUp,
        );

        this.draggedColumn = this.findParentHeader(event.target);
        event.dataTransfer.setData('text', 'b'); // Firefox requires this to make dragging possible
      },
      onColumnHeaderDragOver(event) {
        const dropHeader = this.findParentHeader(event.target);
        if (this.reorderableColumns && this.draggedColumn && dropHeader) {
          event.preventDefault();
          const containerOffset = DomHandler.getOffset(this.$el);
          const dropHeaderOffset = DomHandler.getOffset(dropHeader);

          if (this.draggedColumn !== dropHeader) {
            const targetLeft = dropHeaderOffset.left - containerOffset.left;
            const columnCenter =
              dropHeaderOffset.left + dropHeader.offsetWidth / 2;

            this.$refs.reorderIndicatorUp.style.top =
              dropHeaderOffset.top -
              containerOffset.top -
              (this.colReorderIconHeight - 1) +
              'px';
            this.$refs.reorderIndicatorDown.style.top =
              dropHeaderOffset.top -
              containerOffset.top +
              dropHeader.offsetHeight +
              'px';

            if (event.pageX > columnCenter) {
              this.$refs.reorderIndicatorUp.style.left =
                targetLeft +
                dropHeader.offsetWidth -
                Math.ceil(this.colReorderIconWidth / 2) +
                'px';
              this.$refs.reorderIndicatorDown.style.left =
                targetLeft +
                dropHeader.offsetWidth -
                Math.ceil(this.colReorderIconWidth / 2) +
                'px';
              this.dropPosition = 1;
            } else {
              this.$refs.reorderIndicatorUp.style.left =
                targetLeft - Math.ceil(this.colReorderIconWidth / 2) + 'px';
              this.$refs.reorderIndicatorDown.style.left =
                targetLeft - Math.ceil(this.colReorderIconWidth / 2) + 'px';
              this.dropPosition = -1;
            }

            this.$refs.reorderIndicatorUp.style.display = 'block';
            this.$refs.reorderIndicatorDown.style.display = 'block';
          }
        }
      },
      onColumnHeaderDragLeave(event) {
        if (this.reorderableColumns && this.draggedColumn) {
          event.preventDefault();
          this.$refs.reorderIndicatorUp.style.display = 'none';
          this.$refs.reorderIndicatorDown.style.display = 'none';
        }
      },
      onColumnHeaderDrop(event) {
        event.preventDefault();
        if (this.draggedColumn) {
          const dragIndex = DomHandler.index(this.draggedColumn);
          const dropIndex = DomHandler.index(
            this.findParentHeader(event.target),
          );
          let allowDrop = dragIndex !== dropIndex;
          if (
            allowDrop &&
            ((dropIndex - dragIndex === 1 && this.dropPosition === -1) ||
              (dropIndex - dragIndex === -1 && this.dropPosition === 1))
          ) {
            allowDrop = false;
          }

          if (allowDrop) {
            ObjectUtils.reorderArray(this.columns, dragIndex, dropIndex);
            this.updateReorderableColumns();

            this.$emit('column-reorder', {
              originalEvent: event,
              dragIndex: dragIndex,
              dropIndex: dropIndex,
            });
          }

          this.$refs.reorderIndicatorUp.style.display = 'none';
          this.$refs.reorderIndicatorDown.style.display = 'none';
          this.draggedColumn.draggable = false;
          this.draggedColumn = null;
          this.dropPosition = null;
        }
      },
      findParentHeader(element) {
        if (element.nodeName === 'TH') {
          return element;
        } else {
          let parent = element.parentElement;
          while (parent.nodeName !== 'TH') {
            parent = parent.parentElement;
            if (!parent) break;
          }
          return parent;
        }
      },
      findColumnByKey(columns, key) {
        if (columns && columns.length) {
          for (let i = 0; i < columns.length; i++) {
            const column = columns[i];
            if (
              this.columnProp(column, 'columnKey') === key ||
              this.columnProp(column, 'field') === key
            ) {
              return column;
            }
          }
        }

        return null;
      },
      onRowMouseDown(event) {
        if (
          DomHandler.hasClass(event.target, 'p-datatable-reorderablerow-handle')
        )
          event.currentTarget.draggable = true;
        else event.currentTarget.draggable = false;
      },
      onRowDragStart(e) {
        const event = e.originalEvent;
        const index = e.index;
        this.rowDragging = true;
        this.draggedRowIndex = index;
        event.dataTransfer.setData('text', 'b'); // For firefox
      },
      onRowDragOver(e) {
        const event = e.originalEvent;
        const index = e.index;

        if (this.rowDragging && this.draggedRowIndex !== index) {
          const rowElement = event.currentTarget;
          const rowY =
            DomHandler.getOffset(rowElement).top +
            DomHandler.getWindowScrollTop();
          const pageY = event.pageY;
          const rowMidY = rowY + DomHandler.getOuterHeight(rowElement) / 2;
          const prevRowElement = rowElement.previousElementSibling;

          if (pageY < rowMidY) {
            DomHandler.removeClass(rowElement, 'p-datatable-dragpoint-bottom');

            this.droppedRowIndex = index;
            if (prevRowElement)
              DomHandler.addClass(
                prevRowElement,
                'p-datatable-dragpoint-bottom',
              );
            else DomHandler.addClass(rowElement, 'p-datatable-dragpoint-top');
          } else {
            if (prevRowElement)
              DomHandler.removeClass(
                prevRowElement,
                'p-datatable-dragpoint-bottom',
              );
            else DomHandler.addClass(rowElement, 'p-datatable-dragpoint-top');

            this.droppedRowIndex = index + 1;
            DomHandler.addClass(rowElement, 'p-datatable-dragpoint-bottom');
          }

          event.preventDefault();
        }
      },
      onRowDragLeave(event) {
        const rowElement = event.currentTarget;
        const prevRowElement = rowElement.previousElementSibling;
        if (prevRowElement) {
          DomHandler.removeClass(
            prevRowElement,
            'p-datatable-dragpoint-bottom',
          );
        }

        DomHandler.removeClass(rowElement, 'p-datatable-dragpoint-bottom');
        DomHandler.removeClass(rowElement, 'p-datatable-dragpoint-top');
      },
      onRowDragEnd(event) {
        this.rowDragging = false;
        this.draggedRowIndex = null;
        this.droppedRowIndex = null;
        event.currentTarget.draggable = false;
      },
      onRowDrop(event) {
        if (this.droppedRowIndex != null) {
          const dropIndex =
            this.draggedRowIndex > this.droppedRowIndex
              ? this.droppedRowIndex
              : this.droppedRowIndex === 0
              ? 0
              : this.droppedRowIndex - 1;
          const processedData = [...this.processedData];
          ObjectUtils.reorderArray(
            processedData,
            this.draggedRowIndex,
            dropIndex,
          );

          this.$emit('row-reorder', {
            originalEvent: event,
            dragIndex: this.draggedRowIndex,
            dropIndex: dropIndex,
            value: processedData,
          });
        }

        //cleanup
        this.onRowDragLeave(event);
        this.onRowDragEnd(event);
        event.preventDefault();
      },
      toggleRow(event) {
        const rowData = event.data;
        let expanded;
        let expandedRowIndex;
        const _expandedRows = this.expandedRows ? [...this.expandedRows] : [];

        if (this.dataKey) {
          expanded = this.d_expandedRowKeys
            ? this.d_expandedRowKeys[
                ObjectUtils.resolveFieldData(rowData, this.dataKey)
              ] !== undefined
            : false;
        } else {
          expandedRowIndex = this.findIndex(rowData, this.expandedRows);
          expanded = expandedRowIndex > -1;
        }

        if (expanded) {
          if (expandedRowIndex == null) {
            expandedRowIndex = this.findIndex(rowData, this.expandedRows);
          }
          _expandedRows.splice(expandedRowIndex, 1);
          this.$emit('update:expandedRows', _expandedRows);
          this.$emit('row-collapse', event);
        } else {
          _expandedRows.push(rowData);
          this.$emit('update:expandedRows', _expandedRows);
          this.$emit('row-expand', event);
        }
      },
      toggleRowGroup(e) {
        const event = e.originalEvent;
        const data = e.data;
        const groupFieldValue = ObjectUtils.resolveFieldData(
          data,
          this.groupRowsBy,
        );
        let _expandedRowGroups = this.expandedRowGroups
          ? [...this.expandedRowGroups]
          : [];

        if (this.isRowGroupExpanded(data)) {
          _expandedRowGroups = _expandedRowGroups.filter(
            (group) => group !== groupFieldValue,
          );
          this.$emit('update:expandedRowGroups', _expandedRowGroups);
          this.$emit('rowgroup-collapse', {
            originalEvent: event,
            data: groupFieldValue,
          });
        } else {
          _expandedRowGroups.push(groupFieldValue);
          this.$emit('update:expandedRowGroups', _expandedRowGroups);
          this.$emit('rowgroup-expand', {
            originalEvent: event,
            data: groupFieldValue,
          });
        }
      },
      isRowGroupExpanded(rowData) {
        if (this.expandableRowGroups && this.expandedRowGroups) {
          const groupFieldValue = ObjectUtils.resolveFieldData(
            rowData,
            this.groupRowsBy,
          );
          return this.expandedRowGroups.indexOf(groupFieldValue) > -1;
        }
        return false;
      },
      isStateful() {
        return this.stateKey != null;
      },
      getStorage() {
        switch (this.stateStorage) {
          case 'local':
            return window.localStorage;

          case 'session':
            return window.sessionStorage;

          default:
            throw new Error(
              this.stateStorage +
                ' is not a valid value for the state storage, supported values are "local" and "session".',
            );
        }
      },
      saveState() {
        const storage = this.getStorage();
        const state = {};

        if (this.paginator) {
          state.first = this.d_first;
          state.rows = this.d_rows;
        }

        if (this.d_sortField) {
          state.sortField = this.d_sortField;
          state.sortOrder = this.d_sortOrder;
        }

        if (this.d_multiSortMeta) {
          state.multiSortMeta = this.d_multiSortMeta;
        }

        if (this.hasFilters) {
          state.filters = this.filters;
        }

        if (this.resizableColumns) {
          this.saveColumnWidths(state);
        }

        if (this.reorderableColumns) {
          state.columnOrder = this.d_columnOrder;
        }

        if (this.expandedRows) {
          state.expandedRows = this.expandedRows;
          state.expandedRowKeys = this.d_expandedRowKeys;
        }

        if (this.expandedRowGroups) {
          state.expandedRowGroups = this.expandedRowGroups;
        }

        if (this.selection) {
          state.selection = this.selection;
          state.selectionKeys = this.d_selectionKeys;
        }

        if (Object.keys(state).length) {
          storage.setItem(this.stateKey, JSON.stringify(state));
        }

        this.$emit('state-save', state);
      },
      restoreState() {
        const storage = this.getStorage();
        const stateString = storage.getItem(this.stateKey);
        const dateFormat = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/;
        const reviver = function (key, value) {
          if (typeof value === 'string' && dateFormat.test(value)) {
            return new Date(value);
          }

          return value;
        };

        if (stateString) {
          const restoredState = JSON.parse(stateString, reviver);

          if (this.paginator) {
            this.d_first = restoredState.first;
            this.d_rows = restoredState.rows;
          }

          if (restoredState.sortField) {
            this.d_sortField = restoredState.sortField;
            this.d_sortOrder = restoredState.sortOrder;
          }

          if (restoredState.multiSortMeta) {
            this.d_multiSortMeta = restoredState.multiSortMeta;
          }

          if (restoredState.filters) {
            this.$emit('update:filters', restoredState.filters);
          }

          if (this.resizableColumns) {
            this.columnWidthsState = restoredState.columnWidths;
            this.tableWidthState = restoredState.tableWidth;
          }

          if (this.reorderableColumns) {
            this.d_columnOrder = restoredState.columnOrder;
          }

          if (restoredState.expandedRows) {
            this.d_expandedRowKeys = restoredState.expandedRowKeys;
            this.$emit('update:expandedRows', restoredState.expandedRows);
          }

          if (restoredState.expandedRowGroups) {
            this.$emit(
              'update:expandedRowGroups',
              restoredState.expandedRowGroups,
            );
          }

          if (restoredState.selection) {
            this.d_selectionKeys = restoredState.d_selectionKeys;
            this.$emit('update:selection', restoredState.selection);
          }

          this.$emit('state-restore', restoredState);
        }
      },
      saveColumnWidths(state) {
        const widths = [];
        const headers = DomHandler.find(
          this.$el,
          '.p-datatable-thead > tr > th',
        );
        headers.forEach((header) =>
          widths.push(DomHandler.getOuterWidth(header)),
        );
        state.columnWidths = widths.join(',');

        if (this.columnResizeMode === 'expand') {
          state.tableWidth = DomHandler.getOuterWidth(this.$refs.table) + 'px';
        }
      },
      restoreColumnWidths() {
        if (this.columnWidthsState) {
          const widths = this.columnWidthsState.split(',');

          if (this.columnResizeMode === 'expand' && this.tableWidthState) {
            this.$refs.table.style.width = this.tableWidthState;
            this.$refs.table.style.minWidth = this.tableWidthState;
            this.$el.style.width = this.tableWidthState;
          }

          if (ObjectUtils.isNotEmpty(widths)) {
            this.createStyleElement();

            let innerHTML = '';
            widths.forEach((width, index) => {
              const style = this.scrollable
                ? `flex: 1 1 ${width}px !important`
                : `width: ${width}px !important`;
              innerHTML += `
                            .p-datatable[${
                              this.attributeSelector
                            }] .p-datatable-thead > tr > th:nth-child(${
                index + 1
              }),
                            .p-datatable[${
                              this.attributeSelector
                            }] .p-datatable-tbody > tr > td:nth-child(${
                index + 1
              }),
                            .p-datatable[${
                              this.attributeSelector
                            }] .p-datatable-tfoot > tr > td:nth-child(${
                index + 1
              }) {
                                ${style}
                            }
                        `;
            });

            this.styleElement.innerHTML = innerHTML;
          }
        }
      },
      onCellEditInit(event) {
        this.$emit('cell-edit-init', event);
      },
      onCellEditComplete(event) {
        this.$emit('cell-edit-complete', event);
      },
      onCellEditCancel(event) {
        this.$emit('cell-edit-cancel', event);
      },
      onRowEditInit(event) {
        const _editingRows = this.editingRows ? [...this.editingRows] : [];
        _editingRows.push(event.data);
        this.$emit('update:editingRows', _editingRows);
        this.$emit('row-edit-init', event);
      },
      onRowEditSave(event) {
        const _editingRows = [...this.editingRows];
        _editingRows.splice(this.findIndex(event.data, _editingRows), 1);
        this.$emit('update:editingRows', _editingRows);
        this.$emit('row-edit-save', event);
      },
      onRowEditCancel(event) {
        const _editingRows = [...this.editingRows];
        _editingRows.splice(this.findIndex(event.data, _editingRows), 1);
        this.$emit('update:editingRows', _editingRows);
        this.$emit('row-edit-cancel', event);
      },
      onEditingMetaChange(event) {
        const { data, field, index, editing } = event;
        const editingMeta = { ...this.d_editingMeta };
        let meta = editingMeta[index];

        if (editing) {
          !meta &&
            (meta = editingMeta[index] = { data: { ...data }, fields: [] });
          meta['fields'].push(field);
        } else if (meta) {
          const fields = meta['fields'].filter((f) => f !== field);
          !fields.length
            ? delete editingMeta[index]
            : (meta['fields'] = fields);
        }

        this.d_editingMeta = editingMeta;
      },
      clearEditingMetaData() {
        if (this.editMode) {
          this.d_editingMeta = {};
        }
      },
      createLazyLoadEvent(event) {
        return {
          originalEvent: event,
          first: this.d_first,
          rows: this.d_rows,
          sortField: this.d_sortField,
          sortOrder: this.d_sortOrder,
          multiSortMeta: this.d_multiSortMeta,
          filters: this.d_filters,
        };
      },
      hasGlobalFilter() {
        return (
          this.filters &&
          Object.prototype.hasOwnProperty.call(this.filters, 'global')
        );
      },
      getChildren() {
        return this.$slots.default ? this.$slots.default() : null;
      },
      onFilterChange(filters) {
        this.d_filters = filters;
      },
      onFilterApply() {
        this.d_first = 0;
        this.$emit('update:first', this.d_first);
        this.$emit('update:filters', this.d_filters);

        if (this.lazy) {
          this.$emit('filter', this.createLazyLoadEvent());
        }
      },
      cloneFilters() {
        const cloned = {};
        if (this.filters) {
          Object.entries(this.filters).forEach(([prop, value]) => {
            cloned[prop] = value.operator
              ? {
                  operator: value.operator,
                  constraints: value.constraints.map((constraint) => {
                    return { ...constraint };
                  }),
                }
              : { ...value };
          });
        }

        return cloned;
      },
      updateReorderableColumns() {
        const columnOrder = [];
        this.columns.forEach((col) =>
          columnOrder.push(
            this.columnProp(col, 'columnKey') || this.columnProp(col, 'field'),
          ),
        );
        this.d_columnOrder = columnOrder;
      },
      createStyleElement() {
        this.styleElement = document.createElement('style');
        this.styleElement.type = 'text/css';
        document.head.appendChild(this.styleElement);
      },
      createResponsiveStyle() {
        if (!this.responsiveStyleElement) {
          this.responsiveStyleElement = document.createElement('style');
          this.responsiveStyleElement.type = 'text/css';
          document.head.appendChild(this.responsiveStyleElement);

          const innerHTML = `
@media screen and (max-width: ${this.breakpoint}) {
    .p-datatable[${this.attributeSelector}] .p-datatable-thead > tr > th,
    .p-datatable[${this.attributeSelector}] .p-datatable-tfoot > tr > td {
        display: none !important;
    }

    .p-datatable[${this.attributeSelector}] .p-datatable-tbody > tr > td {
        display: flex;
        width: 100% !important;
        align-items: center;
        justify-content: space-between;
    }

    .p-datatable[${this.attributeSelector}] .p-datatable-tbody > tr > td:not(:last-child) {
        border: 0 none;
    }

    .p-datatable[${this.attributeSelector}].p-datatable-gridlines .p-datatable-tbody > tr > td:last-child {
        border-top: 0;
        border-right: 0;
        border-left: 0;
    }

    .p-datatable[${this.attributeSelector}] .p-datatable-tbody > tr > td > .p-column-title {
        display: block;
    }
}
`;

          this.responsiveStyleElement.innerHTML = innerHTML;
        }
      },
      destroyResponsiveStyle() {
        if (this.responsiveStyleElement) {
          document.head.removeChild(this.responsiveStyleElement);
          this.responsiveStyleElement = null;
        }
      },
      destroyStyleElement() {
        if (this.styleElement) {
          document.head.removeChild(this.styleElement);
          this.styleElement = null;
        }
      },
      recursiveGetChildren(children, results) {
        if (!results) {
          results = [];
        }
        if (children && children.length) {
          children.forEach((child) => {
            if (child.children instanceof Array) {
              results.concat(
                this.recursiveGetChildren(child.children, results),
              );
            } else if (child.type.name == 'Column') {
              results.push(child);
            }
          });
        }
        return results;
      },
      dataToRender(data) {
        const _data = data || this.processedData;

        if (_data && this.paginator) {
          const first = this.lazy ? 0 : this.d_first;
          return _data.slice(first, first + this.d_rows);
        }

        return _data;
      },
      getVirtualScrollerRef() {
        return this.$refs.virtualScroller;
      },
    },
  };
</script>

<style>
  /* Default */
  /* ------- */
  .p-component-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .p-disabled,
  .p-disabled * {
    cursor: default !important;
    pointer-events: none;
    user-select: none;
  }

  /* ------- */
  /* Data Table */
  /* ------- */
  .p-datatable {
    position: relative;
  }

  .p-datatable table {
    border-collapse: collapse;
    min-width: 100%;
    table-layout: fixed;
  }

  .p-datatable .p-sortable-column {
    cursor: pointer;
    user-select: none;
  }

  .p-datatable .p-sortable-column .p-column-title,
  .p-datatable .p-sortable-column .p-sortable-column-icon,
  .p-datatable .p-sortable-column .p-sortable-column-badge {
    vertical-align: middle;
  }

  .p-datatable .p-sortable-column .p-sortable-column-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .p-datatable-responsive-scroll > .p-datatable-wrapper {
    overflow-x: auto;
  }

  .p-datatable-responsive-scroll > .p-datatable-wrapper > table,
  .p-datatable-auto-layout > .p-datatable-wrapper > table {
    table-layout: auto;
  }

  .p-datatable-hoverable-rows .p-selectable-row {
    cursor: pointer;
  }

  /* Scrollable */
  .p-datatable-scrollable .p-datatable-wrapper {
    position: relative;
    overflow: auto;
  }

  .p-datatable-scrollable .p-datatable-thead,
  .p-datatable-scrollable .p-datatable-tbody,
  .p-datatable-scrollable .p-datatable-tfoot {
    display: block;
  }

  .p-datatable-scrollable .p-datatable-thead > tr,
  .p-datatable-scrollable .p-datatable-tbody > tr,
  .p-datatable-scrollable .p-datatable-tfoot > tr {
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
  }

  .p-datatable-scrollable .p-datatable-thead > tr > th,
  .p-datatable-scrollable .p-datatable-tbody > tr > td,
  .p-datatable-scrollable .p-datatable-tfoot > tr > td {
    display: flex;
    flex: 1 1 0;
    align-items: center;
  }

  .p-datatable-scrollable .p-datatable-thead {
    position: sticky;
    top: 0;
    z-index: 1;
  }

  .p-datatable-scrollable .p-datatable-frozen-tbody {
    position: sticky;
    z-index: 1;
  }

  .p-datatable-scrollable .p-datatable-tfoot {
    position: sticky;
    bottom: 0;
    z-index: 1;
  }

  .p-datatable-scrollable .p-frozen-column {
    position: sticky;
    background: inherit;
  }

  .p-datatable-scrollable th.p-frozen-column {
    z-index: 1;
  }

  .p-datatable-scrollable-both .p-datatable-thead > tr > th,
  .p-datatable-scrollable-both .p-datatable-tbody > tr > td,
  .p-datatable-scrollable-both .p-datatable-tfoot > tr > td,
  .p-datatable-scrollable-horizontal
    .p-datatable-thead
    > tr
    > th
    .p-datatable-scrollable-horizontal
    .p-datatable-tbody
    > tr
    > td,
  .p-datatable-scrollable-horizontal .p-datatable-tfoot > tr > td {
    flex: 0 0 auto;
  }

  .p-datatable-flex-scrollable {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .p-datatable-flex-scrollable .p-datatable-wrapper {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
  }

  .p-datatable-scrollable .p-rowgroup-header {
    position: sticky;
    z-index: 1;
  }

  .p-datatable-scrollable.p-datatable-grouped-header .p-datatable-thead,
  .p-datatable-scrollable.p-datatable-grouped-footer .p-datatable-tfoot {
    display: table;
    border-collapse: collapse;
    width: 100%;
    table-layout: fixed;
  }

  .p-datatable-scrollable.p-datatable-grouped-header .p-datatable-thead > tr,
  .p-datatable-scrollable.p-datatable-grouped-footer .p-datatable-tfoot > tr {
    display: table-row;
  }

  .p-datatable-scrollable.p-datatable-grouped-header
    .p-datatable-thead
    > tr
    > th,
  .p-datatable-scrollable.p-datatable-grouped-footer
    .p-datatable-tfoot
    > tr
    > td {
    display: table-cell;
  }

  .p-datatable-scrollable .p-virtualscroller > .p-datatable-table {
    display: inline-block; /* For Safari */
  }

  /* Resizable */
  .p-datatable-resizable > .p-datatable-wrapper {
    overflow-x: auto;
  }

  .p-datatable-resizable .p-datatable-thead > tr > th,
  .p-datatable-resizable .p-datatable-tfoot > tr > td,
  .p-datatable-resizable .p-datatable-tbody > tr > td {
    overflow: hidden;
    white-space: nowrap;
  }

  .p-datatable-resizable .p-resizable-column:not(.p-frozen-column) {
    background-clip: padding-box;
    position: relative;
  }

  .p-datatable-resizable-fit .p-resizable-column:last-child .p-column-resizer {
    display: none;
  }

  .p-datatable .p-column-resizer {
    display: block;
    position: absolute !important;
    top: 0;
    right: 0;
    margin: 0;
    width: 0.5rem;
    height: 100%;
    padding: 0px;
    cursor: col-resize;
    border: 1px solid transparent;
  }

  .p-datatable .p-column-header-content {
    display: flex;
    align-items: center;
  }

  .p-datatable .p-column-resizer-helper {
    width: 1px;
    position: absolute;
    z-index: 10;
    display: none;
  }

  .p-datatable .p-row-editor-init,
  .p-datatable .p-row-editor-save,
  .p-datatable .p-row-editor-cancel {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
  }

  /* Expand */
  .p-datatable .p-row-toggler {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
  }

  /* Reorder */
  .p-datatable-reorder-indicator-up,
  .p-datatable-reorder-indicator-down {
    position: absolute;
    display: none;
  }

  .p-reorderable-column,
  .p-datatable-reorderablerow-handle {
    cursor: move;
  }

  /* Loader */
  .p-datatable .p-datatable-loading-overlay {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
  }

  /* Filter */
  .p-column-filter-row {
    display: flex;
    align-items: center;
    width: 100%;
  }

  .p-column-filter-menu {
    display: inline-flex;
    margin-left: auto;
  }

  .p-column-filter-row .p-column-filter-element {
    flex: 1 1 auto;
    width: 1%;
  }

  .p-column-filter-menu-button,
  .p-column-filter-clear-button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    text-decoration: none;
    overflow: hidden;
    position: relative;
  }

  .p-column-filter-overlay {
    position: absolute;
    top: 0;
    left: 0;
  }

  .p-column-filter-row-items {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .p-column-filter-row-item {
    cursor: pointer;
  }

  .p-column-filter-add-button,
  .p-column-filter-remove-button {
    justify-content: center;
  }

  .p-column-filter-add-button .p-button-label,
  .p-column-filter-remove-button .p-button-label {
    flex-grow: 0;
  }

  .p-column-filter-buttonbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .p-column-filter-buttonbar .p-button:not(.p-button-icon-only) {
    width: auto;
  }

  /* Responsive */
  .p-datatable .p-datatable-tbody > tr > td > .p-column-title {
    display: none;
  }

  /* VirtualScroller */
  .p-datatable .p-virtualscroller-loading {
    transform: none !important;
    min-height: 0;
    position: sticky;
    top: 0;
    left: 0;
  }

  .p-datatable .p-paginator-top {
    border-width: 0 0 1px 0;
    border-radius: 0;
  }
  .p-datatable .p-paginator-bottom {
    border-width: 0 0 1px 0;
    border-radius: 0;
  }
  .p-datatable .p-datatable-header {
    background: #fafafa;
    color: #3f3f46;
    border: 1px solid #f4f4f5;
    border-width: 1px 0 1px 0;
    padding: 1.25rem 1.25rem;
    font-weight: 600;
  }
  .p-datatable .p-datatable-footer {
    background: #fafafa;
    color: #3f3f46;
    border: 1px solid #f4f4f5;
    border-width: 0 0 1px 0;
    padding: 0.75rem 1.5rem;
    font-weight: 600;
  }
  .p-datatable .p-datatable-thead > tr > th {
    @apply text-left py-5 px-4 border-b border-gray-200 font-semibold text-[#656565] bg-white transition-none;
  }
  .p-datatable .p-datatable-tfoot > tr > td {
    text-align: left;
    padding: 1rem 1rem;
    border: 1px solid #f4f4f5;
    border-width: 0 0 1px 0;
    font-weight: 600;
    color: #3f3f46;
    background: #fafafa;
  }
  .p-datatable .p-sortable-column .p-sortable-column-icon {
    color: #71717a;
    margin-left: 0.5rem;
  }
  .p-datatable .p-sortable-column .p-sortable-column-badge {
    border-radius: 50%;
    height: 1.143rem;
    min-width: 1.143rem;
    line-height: 1.143rem;
    color: #312e81;
    background: #eef2ff;
    margin-left: 0.5rem;
  }
  .p-datatable .p-sortable-column:not(.p-highlight):hover {
    background: #f4f4f5;
    color: #3f3f46;
  }
  .p-datatable
    .p-sortable-column:not(.p-highlight):hover
    .p-sortable-column-icon {
    color: #71717a;
  }
  /*
  .p-datatable .p-sortable-column.p-highlight {
    background: #fafafa;
    color: #4f46e5;
  }

   */
  .p-datatable .p-sortable-column.p-highlight .p-sortable-column-icon {
    color: #4f46e5;
  }
  /*
  .p-datatable .p-sortable-column.p-highlight:hover {
    background: #f4f4f5;
    color: #4f46e5;
  }

   */
  .p-datatable .p-sortable-column.p-highlight:hover .p-sortable-column-icon {
    color: #4f46e5;
  }
  /*
  .p-datatable .p-sortable-column:focus {
    box-shadow: inset 0 0 0 0.15rem #6366f1;
    outline: 0 none;
  }

   */
  .p-datatable .p-datatable-tbody > tr {
    background: #ffffff;
    color: #3f3f46;
    transition: none;
  }
  .p-datatable .p-datatable-tbody > tr > td {
    @apply text-left py-5 px-4 border-gray-200 border-b;
  }
  .p-datatable .p-datatable-tbody > tr > td .p-row-toggler,
  .p-datatable .p-datatable-tbody > tr > td .p-row-editor-init,
  .p-datatable .p-datatable-tbody > tr > td .p-row-editor-save,
  .p-datatable .p-datatable-tbody > tr > td .p-row-editor-cancel {
    width: 2rem;
    height: 2rem;
    color: #71717a;
    border: 0 none;
    background: transparent;
    border-radius: 50%;
    transition: none;
  }
  .p-datatable .p-datatable-tbody > tr > td .p-row-toggler:enabled:hover,
  .p-datatable .p-datatable-tbody > tr > td .p-row-editor-init:enabled:hover,
  .p-datatable .p-datatable-tbody > tr > td .p-row-editor-save:enabled:hover,
  .p-datatable .p-datatable-tbody > tr > td .p-row-editor-cancel:enabled:hover {
    color: #18181b;
    border-color: transparent;
    background: #f4f4f5;
  }
  .p-datatable .p-datatable-tbody > tr > td .p-row-toggler:focus,
  .p-datatable .p-datatable-tbody > tr > td .p-row-editor-init:focus,
  .p-datatable .p-datatable-tbody > tr > td .p-row-editor-save:focus,
  .p-datatable .p-datatable-tbody > tr > td .p-row-editor-cancel:focus {
    outline: 0 none;
    outline-offset: 0;
    box-shadow: 0 0 0 1px #6366f1;
  }
  .p-datatable .p-datatable-tbody > tr > td .p-row-editor-save {
    margin-right: 0.5rem;
  }
  .p-datatable .p-datatable-tbody > tr > td > .p-column-title {
    font-weight: 500;
  }
  .p-datatable .p-datatable-tbody > tr:focus {
    outline: 0.15rem solid #6366f1;
    outline-offset: -0.15rem;
  }
  .p-datatable .p-datatable-tbody > tr.p-highlight {
    background: #f8f8fe;
  }
  .p-datatable .p-datatable-tbody > tr.p-datatable-dragpoint-top > td {
    box-shadow: inset 0 2px 0 0 #eef2ff;
  }
  .p-datatable .p-datatable-tbody > tr.p-datatable-dragpoint-bottom > td {
    box-shadow: inset 0 -2px 0 0 #eef2ff;
  }
  .p-datatable.p-datatable-hoverable-rows
    .p-datatable-tbody
    > tr:not(.p-highlight):hover {
    background: #f4f4f5;
    color: #3f3f46;
  }
  .p-datatable .p-column-resizer-helper {
    background: #4f46e5;
  }
  .p-datatable .p-datatable-scrollable-header,
  .p-datatable .p-datatable-scrollable-footer {
    background: #fafafa;
  }
  .p-datatable.p-datatable-scrollable
    > .p-datatable-wrapper
    > .p-datatable-table
    > .p-datatable-thead,
  .p-datatable.p-datatable-scrollable
    > .p-datatable-wrapper
    > .p-datatable-table
    > .p-datatable-tfoot {
    background-color: #fafafa;
  }
  .p-datatable .p-datatable-loading-icon {
    font-size: 2rem;
  }
  .p-datatable.p-datatable-gridlines .p-datatable-header {
    border-width: 1px 1px 0 1px;
  }
  .p-datatable.p-datatable-gridlines .p-datatable-footer {
    border-width: 0 1px 1px 1px;
  }
  .p-datatable.p-datatable-gridlines .p-paginator-top {
    border-width: 0 1px 0 1px;
  }
  .p-datatable.p-datatable-gridlines .p-paginator-bottom {
    border-width: 0 1px 1px 1px;
  }
  .p-datatable.p-datatable-gridlines .p-datatable-thead > tr > th {
    border-width: 1px 1px 1px 1px;
  }
  .p-datatable.p-datatable-gridlines .p-datatable-tbody > tr > td {
    border-width: 1px;
  }
  .p-datatable.p-datatable-gridlines .p-datatable-tfoot > tr > td {
    border-width: 1px;
  }
  .p-datatable.p-datatable-gridlines.p-datatable-scrollable
    .p-datatable-thead
    > tr
    > th
    + th {
    border-left-width: 0;
  }
  .p-datatable.p-datatable-gridlines.p-datatable-scrollable
    .p-datatable-tbody
    > tr
    > td
    + td {
    border-left-width: 0;
  }
  .p-datatable.p-datatable-gridlines.p-datatable-scrollable
    .p-datatable-tbody
    > tr
    + tr
    > td,
  .p-datatable.p-datatable-gridlines.p-datatable-scrollable
    .p-datatable-tbody
    > tr:first-child
    > td {
    border-top-width: 0;
  }
  .p-datatable.p-datatable-gridlines.p-datatable-scrollable
    .p-datatable-tfoot
    > tr
    > td
    + td {
    border-left-width: 0;
  }
  .p-datatable.p-datatable-striped .p-datatable-tbody > tr:nth-child(even) {
    background: #fcfcfc;
  }
  .p-datatable.p-datatable-striped
    .p-datatable-tbody
    > tr:nth-child(even).p-highlight {
    background: #eef2ff;
    color: #312e81;
  }
  .p-datatable.p-datatable-striped
    .p-datatable-tbody
    > tr:nth-child(even).p-highlight
    .p-row-toggler {
    color: #312e81;
  }
  .p-datatable.p-datatable-striped
    .p-datatable-tbody
    > tr:nth-child(even).p-highlight
    .p-row-toggler:hover {
    color: #312e81;
  }
  .p-datatable.p-datatable-sm .p-datatable-header {
    padding: 0.625rem 0.625rem;
  }
  .p-datatable.p-datatable-sm .p-datatable-thead > tr > th {
    padding: 0.375rem 0.75rem;
  }
  .p-datatable.p-datatable-sm .p-datatable-tbody > tr > td {
    padding: 0.5rem 0.75rem;
  }
  .p-datatable.p-datatable-sm .p-datatable-tfoot > tr > td {
    padding: 0.375rem 0.75rem;
  }
  .p-datatable.p-datatable-sm .p-datatable-footer {
    padding: 0.375rem 0.75rem;
  }
  .p-datatable.p-datatable-lg .p-datatable-header {
    padding: 1.5625rem 1.5625rem;
  }
  .p-datatable.p-datatable-lg .p-datatable-thead > tr > th {
    padding: 0.9375rem 1.875rem;
  }
  .p-datatable.p-datatable-lg .p-datatable-tbody > tr > td {
    padding: 1.25rem 1.875rem;
  }
  .p-datatable.p-datatable-lg .p-datatable-tfoot > tr > td {
    padding: 0.9375rem 1.875rem;
  }
  .p-datatable.p-datatable-lg .p-datatable-footer {
    padding: 0.9375rem 1.875rem;
  }

  .p-column-filter-row .p-column-filter-menu-button,
  .p-column-filter-row .p-column-filter-clear-button {
    margin-left: 0.5rem;
  }

  /* ------- */
  /* Column Filter */
  /* -------- */
  .p-column-filter-menu-button {
    width: 2rem;
    height: 2rem;
    color: #71717a;
    border: 0 none;
    background: transparent;
    border-radius: 50%;
    transition: none;
  }
  .p-column-filter-menu-button:hover {
    color: #18181b;
    border-color: transparent;
    background: #f4f4f5;
  }
  .p-column-filter-menu-button.p-column-filter-menu-button-open,
  .p-column-filter-menu-button.p-column-filter-menu-button-open:hover {
    background: #f4f4f5;
    color: #18181b;
  }
  .p-column-filter-menu-button.p-column-filter-menu-button-active,
  .p-column-filter-menu-button.p-column-filter-menu-button-active:hover {
    background: #eef2ff;
    color: #312e81;
  }
  .p-column-filter-menu-button:focus {
    outline: 0 none;
    outline-offset: 0;
    box-shadow: 0 0 0 1px #6366f1;
  }

  .p-column-filter-clear-button {
    width: 2rem;
    height: 2rem;
    color: #71717a;
    border: 0 none;
    background: transparent;
    border-radius: 50%;
    transition: none;
  }
  .p-column-filter-clear-button:hover {
    color: #18181b;
    border-color: transparent;
    background: #f4f4f5;
  }
  .p-column-filter-clear-button:focus {
    outline: 0 none;
    outline-offset: 0;
    box-shadow: 0 0 0 1px #6366f1;
  }

  .p-column-filter-overlay {
    background: #ffffff;
    color: #3f3f46;
    border: 0 none;
    border-radius: 0.375rem;
    box-shadow: 0 0 #0000, 0 0 #0000, 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    min-width: 12.5rem;
  }
  .p-column-filter-overlay .p-column-filter-row-items {
    padding: 0.25rem 0;
  }
  .p-column-filter-overlay
    .p-column-filter-row-items
    .p-column-filter-row-item {
    margin: 0;
    padding: 0.75rem 1rem;
    border: 0 none;
    color: #3f3f46;
    background: transparent;
    transition: none;
    border-radius: 0;
  }
  .p-column-filter-overlay
    .p-column-filter-row-items
    .p-column-filter-row-item.p-highlight {
    color: #312e81;
    background: #eef2ff;
  }
  .p-column-filter-overlay
    .p-column-filter-row-items
    .p-column-filter-row-item:not(.p-highlight):not(.p-disabled):hover {
    color: #18181b;
    background: #f4f4f5;
  }
  .p-column-filter-overlay
    .p-column-filter-row-items
    .p-column-filter-row-item:focus {
    outline: 0 none;
    outline-offset: 0;
    box-shadow: inset 0 0 0 0.15rem #6366f1;
  }
  .p-column-filter-overlay
    .p-column-filter-row-items
    .p-column-filter-separator {
    border-top: 1px solid #f3f4f6;
    margin: 0.25rem 0;
  }

  .p-column-filter-overlay-menu .p-column-filter-operator {
    padding: 0.5rem 0.75rem;
    border-bottom: 0 none;
    color: #3f3f46;
    background: #fafafa;
    margin: 0;
    border-top-right-radius: 0.375rem;
    border-top-left-radius: 0.375rem;
  }
  .p-column-filter-overlay-menu .p-column-filter-constraint {
    padding: 1.25rem;
    border-bottom: 1px solid #f3f4f6;
  }
  .p-column-filter-overlay-menu
    .p-column-filter-constraint
    .p-column-filter-matchmode-dropdown {
    margin-bottom: 0.5rem;
  }
  .p-column-filter-overlay-menu
    .p-column-filter-constraint
    .p-column-filter-remove-button {
    margin-top: 0.5rem;
  }
  .p-column-filter-overlay-menu .p-column-filter-constraint:last-child {
    border-bottom: 0 none;
  }
  .p-column-filter-overlay-menu .p-column-filter-add-rule {
    padding: 0.75rem 1.25rem;
  }
  .p-column-filter-overlay-menu .p-column-filter-buttonbar {
    padding: 1.25rem;
  }

  /* ------- */
  /* Checkbox */
  /* -------- */
  /*
  .p-checkbox {
    display: inline-flex;
    cursor: pointer;
    user-select: none;
    vertical-align: bottom;
    position: relative;
  }

  .p-checkbox-box {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .p-checkbox {
    width: 16px;
    height: 16px;
  }
  .p-checkbox .p-checkbox-box {
    border: 2px solid #d4d4d8;
    background: #ffffff;
    width: 16px;
    height: 16px;
    color: #3f3f46;
    border-radius: 0.375rem;
    transition: none;
  }
  .p-checkbox .p-checkbox-box .p-checkbox-icon {
    transition-duration: 0.2s;
    color: #ffffff;
    font-size: 10px;
  }
  .p-checkbox .p-checkbox-box.p-highlight {
    border-color: #4f46e5;
    background: #4f46e5;
  }
  .p-checkbox:not(.p-checkbox-disabled) .p-checkbox-box:hover {
    border-color: #d4d4d8;
  }
  .p-checkbox:not(.p-checkbox-disabled) .p-checkbox-box.p-focus {
    outline: 0 none;
    outline-offset: 0;
    box-shadow: 0 0 0 1px #6366f1;
    border-color: #4f46e5;
  }
  .p-checkbox:not(.p-checkbox-disabled) .p-checkbox-box.p-highlight:hover {
    border-color: #4f46e5;
    background: #4f46e5;
    color: #ffffff;
  }
  .p-checkbox.p-invalid > .p-checkbox-box {
    border-color: #f0a9a7;
  } */

  /* --------- */
  /* Paginator */
  /* --------- */
  .p-paginator {
    background: #ffffff;
    color: #71717a;
    border: solid #f4f4f5;
    border-width: 0;
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
  }
  .p-paginator .p-paginator-first,
  .p-paginator .p-paginator-prev,
  .p-paginator .p-paginator-next,
  .p-paginator .p-paginator-last {
    background-color: transparent;
    border: 1px solid #d4d4d8;
    color: #71717a;
    min-width: 3rem;
    height: 3rem;
    margin: 0 0 0 -1px;
    transition: none;
    border-radius: 0;
  }
  .p-paginator .p-paginator-first:not(.p-disabled):not(.p-highlight):hover,
  .p-paginator .p-paginator-prev:not(.p-disabled):not(.p-highlight):hover,
  .p-paginator .p-paginator-next:not(.p-disabled):not(.p-highlight):hover,
  .p-paginator .p-paginator-last:not(.p-disabled):not(.p-highlight):hover {
    background: #f4f4f5;
    border-color: #d4d4d8;
    color: #3f3f46;
  }
  .p-paginator .p-paginator-first {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .p-paginator .p-paginator-last {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .p-paginator .p-dropdown {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    height: 3rem;
  }
  .p-paginator .p-dropdown .p-dropdown-label {
    padding-right: 0;
  }
  .p-paginator .p-paginator-page-input {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
  .p-paginator .p-paginator-page-input .p-inputtext {
    max-width: 3rem;
  }
  .p-paginator .p-paginator-current {
    background-color: transparent;
    border: 1px solid #d4d4d8;
    color: #71717a;
    min-width: 3rem;
    height: 3rem;
    margin: 0 0 0 -1px;
    padding: 0 0.5rem;
  }
  .p-paginator .p-paginator-pages .p-paginator-page {
    background-color: transparent;
    border: 1px solid #d4d4d8;
    color: #71717a;
    min-width: 3rem;
    height: 3rem;
    margin: 0 0 0 -1px;
    transition: none;
    border-radius: 0;
  }
  .p-paginator .p-paginator-pages .p-paginator-page.p-highlight {
    background: #eef2ff;
    border-color: #eef2ff;
    color: #312e81;
  }
  .p-paginator .p-paginator-pages .p-paginator-page:not(.p-highlight):hover {
    background: #f4f4f5;
    border-color: #d4d4d8;
    color: #3f3f46;
  }

  /* ------ */
  /* Customizations */
  /* ------- */
  .p-datatable .p-datatable-tbody > tr.p-datatable-dragpoint-top > td {
    box-shadow: inset 0 2px 0 0 #4f46e5;
  }
  .p-datatable .p-datatable-tbody > tr.p-datatable-dragpoint-bottom > td {
    box-shadow: inset 0 -2px 0 0 #4f46e5;
  }

  .p-checkbox .p-checkbox-box {
    border-radius: 0.25rem;
  }
  .p-checkbox:not(.p-checkbox-disabled) .p-checkbox-box.p-focus {
    box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px #6366f1,
      0 1px 2px 0 rgba(0, 0, 0, 0);
  }

  .p-paginator .p-paginator-pages .p-paginator-page {
    margin-left: -1px;
  }
  .p-paginator .p-paginator-pages .p-paginator-page.p-highlight {
    border-color: #4f46e5;
    margin-right: 1px;
  }
  .p-paginator .p-paginator-current {
    border: 0 none;
  }

  .p-checkbox {
    cursor: pointer;
    user-select: none;
    position: relative;
  }

  .p-checkbox.p-checkbox-disabled {
    cursor: default;
  }

  .p-checkbox-box {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .p-checkbox {
    width: 16px;
    height: 16px;
  }

  .p-checkbox .p-checkbox-box {
    border: 1px solid #656565;
    background: #ffffff;
    width: 16px;
    height: 16px;
    color: #656565;
    border-radius: 4px;
    transition: background-color 0.2s, color 0.2s, border-color 0.2s,
      box-shadow 0.2s;
  }

  .p-checkbox .p-checkbox-box.p-highlight {
    border-color: #4a50dd;
    background-color: #4a50dd;
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
  }
</style>
