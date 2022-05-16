<template>
<div>
  <card></card>
  <sale></sale>
</div>
</template>

<script>
import Card from './childComp/card/Card.vue'
import Sale from './childComp/sale/Sale.vue'

export default {
  components: { Card, Sale },
  name: 'Dashboard',
  computed: { 
  }
}
</script>

<style scoped>

</style>
