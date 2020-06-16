<template>
  <div :class="{ inc: cellData.data.change > 0, dec: cellData.data.change < 0 }">
    <span class="current-value">{{ cellData.text }}</span>
    <span class="arrow"/>
    <span class="diff">{{ cellData.percentChange.toFixed(2) }}%</span>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  props: {
    cellData: {
      type: Object,
      default: () => {}
    }
  }
};
</script>
