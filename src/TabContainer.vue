<template>
  <div>
    <div id="longtabs">
      <dx-tabs
        :data-source="tabs"
        :selected-index.sync="selectedIndex"
        @onSelectionChanged="onSelectionChanged"
      />
      <order-list v-if="selectedIndex==0"></order-list>
      <positions v-if="selectedIndex==1"></positions>
      <collaterals v-if="selectedIndex==2"></collaterals>
    </div>
  </div>
</template>
<script>

import DxSelectBox from 'devextreme-vue/select-box';
import DxTabs from 'devextreme-vue/tabs';
import OrderList from './OrderList.vue';
import Positions from './Positions.vue';
import Collaterals from './Collaterals.vue';

export default {
  components: {
    DxSelectBox,
    DxTabs,
    OrderList,
    Positions,
    Collaterals
  },
  data() {
    return {
      selectedIndex: 0,
      tabs: ["OrderList", "Positions", "Collaterals"]      
    };
  },
  watch: {
    selectedIndex: function() {
      if(this.selectedIndex == 1){

      }
    }
  },
  methods: {
    onSelectionChanged : function(event){
      debugger;
    }
  }
};
</script>
<style>
.dx-tab {
  padding: 1px;
}
</style>