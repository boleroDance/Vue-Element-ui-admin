<template>
  <div class="footer">
    <p>电子邮箱: veiiki@qq.com &nbsp;
      <a href="https://beian.miit.gov.cn/">蜀ICP备2022008301号</a>
    </p>
  </div>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>
  .footer {
    height: 50px;
    background:#fff;
    box-shadow: 1px -1px 4px rgba(0,21,41,.08);
    position: absolute;
    width: 100%;
    bottom: 0;
  }
  .footer p{
    font-size: 12px;
    color: #5a5e66;
    text-align: center;
  }
</style>