<template>
    <div class="flex justify-center align-center">
        <button class="bg-blue-100 border-2 border-purple-400 px-4 py-1 rounded-md" @click="changeLightState">{{
            lightContent.tag }}</button>
    </div>
</template>

<script setup>
import mqtt from "mqtt/dist/mqtt";
import { ref, reactive } from 'vue';
import { Post } from '@/service';

const options = {
    // MQTT 服务器的用户名
    username: 'user',
    // 密码
    password: '123456',
    keepalive: 60,
    // 端口
    port: 8083,
    // port: 8083,
    // 客户端id
    clientId: 'mqtt_' + Math.random()
}

//连接
// 139.224.56.89 cloud server open ip address
// let client = mqtt.connect('ws://139.224.56.89', options);
let client = mqtt.connect('ws://localhost/', options);

client.on('connect', e => {
    console.log('连接成功', e)
})
//收到消息的事件
client.on('message', (topic, message) => {
    console.log(topic + '返回的数据：' + message.toString())

});
// 重连事件
client.on('reconnect', (error) => {
    console.log('正在重连：' + error)
})
// 错误事件
client.on('error', (error) => {
    console.log('连接失败：' + error)
})


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
    // console.log(await Post({
    //     url: 'led',
    //     data: {
    //         status: lightContent.state,
    //     }
    // }));
    client.publish("topic/led", JSON.stringify({ status: lightContent.state }), { qos: 2, retain: true });
}
</script>

<style scoped></style>