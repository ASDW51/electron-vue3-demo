<template>
    login
    <button type="primary" @click="go">go</button>
</template>
<script setup>
import {useRouter} from "vue-router"
const router = useRouter()
const go = ()=>{
    console.log("go")
    router.push("/index")
}
</script>