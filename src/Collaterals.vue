<template>
  <div>
    <dx-data-grid
      id="gridContainer"
      :ref="dataGridRefName"
      :data-source="collateralsStore"
      :highlight-changes="true"
      :repaint-changes-only="true"
      :two-way-binding-enabled="false"
      :column-auto-width="true"
      :show-borders="true"
      :focused-row-enabled="true"
      :focused-row-key.sync="focusedRowKey"
      :show-column-lines="true"
      :show-row-lines="true"
      :row-alternation-enabled="true"
      :allowColumnReordering="true"      
    >
      <dx-paging :page-size="5"/>
      <dx-column
        data-field="Acct"
        data-type="string"
        :header-filter="{groupInterval: 10000}"
        :visible="visibleCols.visibleColAcct"
      />      
      <dx-column
        data-field="SessionCol"
        data-type="number"
        format="###,##0.00##"
        :visible="visibleCols.visibleColPx"
      />
      <dx-column
        data-field="TotalPL"
        data-type="number"
        format="###,##0.00##"
        :visible="visibleCols.visibleColPx"
      />
      <dx-column
        data-field="Amt"
        data-type="number"
        format="###,##0.00##"
        :visible="visibleCols.visibleColPx"
      />

      <dx-summary>
        <dx-total-item column="Amt" summary-type="sum" value-format="###,##0.00##"/>
      </dx-summary>
    </dx-data-grid>
  </div>
</template>
<script>
/* eslint-disable */
import {
  DxDataGrid,
  DxColumn,
  DxSummary,
  DxTotalItem,
  DxMasterDetail,
  DxPaging,
  DxHeaderFilter,
  DxFilterPanel,
  DxFilterBuilderPopup,
  DxScrolling,
  DxGrouping,
  DxGroupPanel,
  DxSearchPanel,
  DxSelection,
  DxFilterRow,
  DxExport
} from "devextreme-vue/data-grid";
import { DxCheckBox, DxSelectBox } from "devextreme-vue";
import contextMenu from "vue-context-menu";
import { DxSlider, DxTooltip } from "devextreme-vue/slider";
import {
  collateralsStore,
  fillsStore,
  getOrderCount,
  addFill,
  setOrderCount,
  init,
  getParamInt
} from "./data.js";
import ChangeCell from "./ChangeCell.vue";
import DxNumberBox from "devextreme-vue/number-box";

export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxSummary,
    DxTotalItem,
    DxMasterDetail,
    DxPaging,
    DxHeaderFilter,
    DxFilterPanel,
    DxFilterBuilderPopup,
    DxScrolling,
    DxGrouping,
    DxGroupPanel,
    DxSearchPanel,
    DxSelection,
    DxFilterRow,
    ChangeCell,
    DxSlider,
    DxTooltip,
    DxSelectBox,
    DxNumberBox,
    DxExport,
    DxCheckBox,
    contextMenu
  },
  data() {
    return {
      visibleCols: {
        visibleColOrderId: true,
        visibleColAcct: true,
        visibleColSymISIN: true,
        visibleColQty: true,
        visibleColMarketPx: true,
        visibleColCumQty: true,
        visibleColPx: true,
        visibleColAmt: true,
        visibleColFillAmt: true
      },
      enableAlternateRow: false,
      pageSize: 10,
      updatesPerSecond: 50,
      dataGridRefName: "dataGrid",
      collateralsStore: {
        store: collateralsStore,
        reshapeOnPush: true
      },
      focusedRowKey: ""
    };
  },
  created() {},
  methods: {},
  filters: {
    format(value) {
      let num = require("numeral");
      return num(value).format("###,####.#####");
    }
  },
  watch: {
    enableAlternateRow: function() {
      //this.$refs.dataGrid.clearSelection();
    }
  }
};
</script>
<style >
.dx-datagrid .dx-row > td{
  padding: 3px;  
  vertical-align:middle;
}

.dx-datagrid-content .dx-datagrid-table .dx-row > td {
  vertical-align:middle;
}
</style>
