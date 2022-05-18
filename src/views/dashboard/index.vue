<template>
<div>
  <card></card>
  <sale></sale>
  <observe></observe>
</div>
</template>

<script>
import Card from './childComp/card/Card.vue'
import Observe from './childComp/observe/Observe.vue'
import Sale from './childComp/sale/Sale.vue'

export default {
  components: { Card, Sale, Observe },
  name: 'Dashboard',
  computed: { 
  }
}
</script>

<style scoped>

</style>
