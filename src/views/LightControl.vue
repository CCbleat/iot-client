<template>
    <div class="flex justify-center align-center">
        <button class="bg-blue-100 border-2 border-purple-400 px-4 py-1 rounded-md" @click="changeLightState">{{
            lightContent.tag }}</button>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { Post } from '@/service';

let lightContent = reactive({
    tag: 'Open',
    state: 0,
});
const changeLightState = () => {
    switchLight();
    if (lightContent.tag === "Open") {
        lightContent.tag = 'Close';
        lightContent.state = 1;
    } else {
        lightContent.tag = 'Open';
        lightContent.state = 0;
    }
}
const switchLight = async () => {
    console.log(await Post({
        url: 'led',
        data: {
            status: lightContent.state,
        }
    }));
}
</script>

<style scoped></style>