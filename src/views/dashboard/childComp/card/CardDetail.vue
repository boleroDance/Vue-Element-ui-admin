<template>
  <div>
    <div class="card-header">
      <span>{{title}}</span>
      <svg t="1652680109588" class="icon" style="width: 12px; height: 12px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4271" width="200" height="200"><path d="M512 64c247.424 0 448 200.576 448 448S759.424 960 512 960 64 759.424 64 512 264.576 64 512 64z m0 88c-198.823 0-360 161.177-360 360s161.177 360 360 360 360-161.177 360-360-161.177-360-360-360z m32 288a8 8 0 0 1 8 8v278a8 8 0 0 1-8 8h-64a8 8 0 0 1-8-8V448a8 8 0 0 1 8-8h64z m-32-160c30.928 0 56 25.072 56 56s-25.072 56-56 56-56-25.072-56-56 25.072-56 56-56z" fill="#000000" fill-opacity=".45" p-id="4272"></path></svg>
    </div>
    <div class="card-content">{{count}}</div>
    <div class="card-charts">
      <slot name="charts"></slot>
    </div>
    <div class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'count', ]
}
</script>

<style scoped>
  .card-header {
    display: flex;
    font-size: 14px;
    justify-content: space-between;
    color:#d9d9d9
  }
  .card-content {
    font-size: 30px;

  }
  .card-charts {
    height: 40px;
    line-height: 40px;
  }
  
  .card-footer {
    border-top: 1px solid #eee;
    padding-top: 10px;
  }
</style>