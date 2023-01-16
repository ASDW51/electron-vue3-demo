<template>
index
</template>
<script setup>

let c = () => {
  console.log("点击", window.preload);
  window.preload.aa();
  window.preload.sendTest("this is ipc test");
};
</script>