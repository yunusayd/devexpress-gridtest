<template>
  <div :class="{ inc: cellData.data.MarketPx.Change > 0, dec: cellData.data.MarketPx.Change < 0 }">
    <span>{{ cellData.data.MarketPx.Px }}</span>
  </div>
</template>

<script>
export default {
  props: {
    cellData: {
      type: Object,
      default: () => {}
    }
  }
};
</script>
