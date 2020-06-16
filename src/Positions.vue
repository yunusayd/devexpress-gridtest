<template>
  <div>
    <context-menu id="context-menu" ref="ctxMenu">
      <li>Buy</li>
      <li>Sell</li>
    </context-menu>
    <dx-data-grid
      id="gridContainer"
      :ref="dataGridRefName"
      :data-source="positionsStore"
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
      @ContextMenuPreparing="onContextMenuPreparing"
    >
      <dx-paging :page-size="pageSize"/>            
      <dx-column
        data-field="Acct"
        data-type="string"
        :header-filter="{groupInterval: 10000}"
        :visible="visibleCols.visibleColAcct"
      />
      <dx-column data-field="Sym.ISIN" data-type="string" :visible="visibleCols.visibleColSymISIN"/>
      
      <dx-column
        data-field="Qty"
        data-type="number"
        format="###,##0"
        :visible="visibleCols.visibleColQty"
      />
   
      <dx-column
        data-field="Px"
        data-type="number"
        format="###,##0.00##"
        :visible="visibleCols.visibleColPx"
      />
      <dx-column
        :width="100"
        :allow-sorting="true"
        data-field="MarketPx"
        cell-template="priceCellTemplate"
        format="###,##0.00##"
        :visible="visibleCols.visibleColMarketPx"
      />
      <dx-column
        data-field="Amt"
        data-type="number"
        format="###,##0.00##"
        :visible="visibleCols.visibleColAmt"
      />      

      <dx-summary>
        <dx-total-item column="Amt" summary-type="sum" value-format="###,##0.00##"/>        
      </dx-summary>
      <!-- <div slot="changeCellTemplate" slot-scope="cellData">
        <change-cell :cell-data="cellData"/>
      </div>-->
      <div slot="priceCellTemplate" slot-scope="cellData">
        <!-- <price-cell :cell-data="cellData"/> -->
        <div
          :class="{ inc: cellData.data.Sym.Change > 0, dec: cellData.data.Sym.Change < 0 }"
          style="text-align:right"
        >
          <span>{{ cellData.data.Sym.Px | format }}</span>
        </div>
      </div>   
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
  positionsStore,
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
      pageSize: 5,
      updatesPerSecond: 50,
      dataGridRefName: "dataGrid",
      positionsStore: {
        store: positionsStore,
        reshapeOnPush: true
      },
      focusedRowKey: ""
    };
  },
  created() {
    
  },
  methods: {    
    onContextMenuPreparing(e) {
      if (!e.row) return;
      if (e.row.rowType === "data") {
        this.focusedRowKey = e.row.key;
        e.items = [
          {
            text: "İŞLEMLER",
            template:
              "<border><li class='disabled' style=''>İŞLEMLER <b>(" +
              e.row.key +
              ")</b></li></border>"
          },
          {
            text: "AL!",
            template: "<border><li style='color:Green'>AL</li></border>"
          },
          {
            text: "SAT!",
            template: "<border><li style='color:RED'>SAT</li></border>"
          },
          {
            text: "KOPYALA!",
            template: "<border><li style='color:ORANGE'>KOPYALA</li></border>"
          }
        ];
      }
    },    
  },
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
