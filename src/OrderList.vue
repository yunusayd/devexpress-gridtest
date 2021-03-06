<template>
  <div>
    <context-menu id="context-menu" ref="ctxMenu">
      <li>Buy</li>
      <li>Sell</li>
    </context-menu>
    <dx-data-grid
      id="gridContainer"
      :ref="dataGridRefName"
      :data-source="ordersStore"
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
      @cellPrepared="cellPrepared"
      @ContextMenuPreparing="onContextMenuPreparing"
    >
      <dx-paging :page-size="pageSize"/>      

      <dx-column data-field="OrderId" data-type="number" :visible="visibleCols.visibleColOrderId"/>
      <dx-column
        data-field="Acct"
        data-type="string"
        :header-filter="{groupInterval: 10000}"
        :visible="visibleCols.visibleColAcct"
      />
      <dx-column data-field="Sym.ISIN" data-type="string" :visible="visibleCols.visibleColSymISIN"/>
      <dx-column
        :width="100"
        :allow-sorting="true"
        data-field="MarketPx"
        cell-template="priceCellTemplate"
        format="###,##0.00##"
        :visible="visibleCols.visibleColMarketPx"
      />
      <dx-column
        data-field="Qty"
        data-type="number"
        format="###,##0"
        :visible="visibleCols.visibleColQty"
      />
      <dx-column
        data-field="CumQty"
        data-type="number"
        format="###,##0"
        :visible="visibleCols.visibleColCumQty"
      />
      <dx-column
        data-field="Px"
        data-type="number"
        format="###,##0.00##"
        :visible="visibleCols.visibleColPx"
      />
      <dx-column
        data-field="Amt"
        data-type="number"
        format="###,##0.00##"
        :visible="visibleCols.visibleColAmt"
      />
      <dx-column
        data-field="FillAmt"
        data-type="number"
        format="###,##0.00##"
        :visible="visibleCols.visibleColFillAmt"
      />

      <dx-summary>
        <dx-total-item column="OrderId" summary-type="count"/>
        <dx-total-item column="Qty" summary-type="sum" value-format="###,##0"/>
        <dx-total-item column="Amt" summary-type="sum" value-format="###,##0.00##"/>
        <dx-total-item column="FillAmt" summary-type="sum" value-format="###,##0.00##"/>
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
      <dx-master-detail :enabled="true" template="fills"/>

      <div slot="fills" slot-scope="detail">
        <dx-data-grid
          :data-source="getDetailGridDataSource(detail.data)"
          :column-auto-width="true"
          :repaint-changes-only="true"
          :two-way-binding-enabled="false"
          :show-borders="true"
        >
          <dx-paging :page-size="5"/>

          <dx-column :allow-sorting="true" data-field="FillId" data-type="number"/>
          <dx-column
            :allow-sorting="true"
            data-field="FillTime"
            data-type="datetime"
            format="HH:mm:ss"
          />
          <dx-column
            :allow-sorting="true"
            data-field="FillQty"
            data-type="number"
            format="###,##0"
          />

          <dx-column
            :allow-sorting="true"
            data-field="FillPx"
            data-type="number"
            format="###,##0.00##"
          />

          <dx-column
            :allow-sorting="true"
            data-field="FillAmt"
            caption="FillAmt"
            data-type="number"
            format="###,##0.00##"
          />

          <dx-summary>
            <dx-total-item column="FillId" summary-type="count"/>
            <dx-total-item column="FillQty" summary-type="sum" value-format="###,##0"/>
            <dx-total-item column="FillAmt" summary-type="sum" value-format="###,##0.00"/>
          </dx-summary>
        </dx-data-grid>
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
  ordersStore,
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
      ordersStore: {
        store: ordersStore,
        reshapeOnPush: true
      },
      focusedRowKey: ""
    };
  },
  created() {
    let cnt = getParamInt("orderCount");
    if (cnt > 0) setOrderCount(cnt);

    let psize = getParamInt("pageSize");
    if (psize > 0) this.pageSize = psize;

    let ufreq = getParamInt("freq");
    if (ufreq > 0) this.updatesPerSecond = ufreq;

    init();    
  },
  methods: {
    getDetailGridDataSource(order) {
      return {
        store: fillsStore,
        reshapeOnPush: true,
        filter: ["OrderId", "=", order.OrderId]
      };
    },
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
    cellPrepared(cellEl, cellInfo) {
      if (cellEl.column.dataField == "CumQty" && cellEl.data) {
        let hasFormatted = false;
        if (cellEl.data.CumQty == cellEl.data.Qty) {
          cellEl.cellElement.style.backgroundColor = "green";
          hasFormatted = true;
        }

        if (hasFormatted) {
          cellEl.cellElement.style.color = "white";
        }
      }
    }
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
.options {
  padding: 2px;
  margin-top: 2px;
  background-color: rgba(191, 191, 191, 0.15);
}

.caption {
  font-size: 12px;
  font-weight: 500;
}

.option {
  margin-top: 10px;
}

.option > span {
  position: relative;
  top: 2px;
  margin-right: 10px;
}

.option > .dx-widget {
  width: 500px;
  display: inline-block;
  vertical-align: middle;
}
.dx-widget {
  font-size: 12px;
}


#gridContainer .inc {
  color: lime;
}
#gridContainer .inc {
  background-color: transparent;
}

#gridContainer .dec {
  color: #f00;
}
.disabled {
  pointer-events: none;
  opacity: 0.6;
}
.dx-datagrid .dx-row > td{
  padding: 3px;  
  vertical-align:middle;
}

.dx-datagrid-content .dx-datagrid-table .dx-row > td {
  vertical-align:middle;
}
</style>
