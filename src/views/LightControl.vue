<template>
    <RouterLink to="/">back to Home</RouterLink>
    <h1>AutoLight control page</h1>
    <div class="flex justify-center align-center">
        <button class="bg-blue-100 border-2 border-purple-400 px-4 py-1 rounded-md" @click="changeLightState">{{
            lightContent.tag }}</button>
    </div>
    <p>State of Light: {{ lightStateInfo }}</p>
</template>

<script setup>
import mqtt from "mqtt/dist/mqtt";
import { ref, reactive } from 'vue';
import { Post } from '@/service';

const options = {
    // MQTT 服务器的用户名
    // username: 'user',
    // 密码
    // password: '123456',
    keepalive: 10,
    // 端口
    port: 8080,
    // port: 8083, 
    // port: 8083,
    // 客户端id
    clientId: 'mqtt_' + Math.random()
}

//连接
// 139.224.56.89 cloud server open ip address
// let client = mqtt.connect('ws://139.224.56.89', options);
let client = mqtt.connect('ws://test.ranye-iot.net', options);

// client.on('connect', e => {
//     console.log('连接成功', e);
// })
client.on('connect', e => {
    console.log('连接成功', e);
    client.subscribe("autoLight-status-5C:CF:7F:18:B6:7C", {qos: 0});
})

let lightStateInfo = ref("off");

const modifyLightStateInfo = (str) => {
    lightStateInfo.value = str;
}

//收到消息的事件
// client.on('message', (topic, message) => {
//     console.log(topic + '返回的数据：' + message.toString())
// });
client.on('message', (topic, message) => {
    // console.log(topic + '返回的数据：' + message.toString());
    if(topic === "autoLight-status-5C:CF:7F:18:B6:7C") {
        console.log(message.toString());
        modifyLightStateInfo(message.toString());
    } else {
        console.log("what a pity")
    }
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
    tag: 'Open Light',
    state: 1,
});

const changeLightState = () => {
    switchLight();
    if (lightContent.tag === "Open Light") {
        lightContent.tag = 'Close Light';
        lightContent.state = 0;
    } else {
        lightContent.tag = 'Open Light';
        lightContent.state = 1;
    }
}
const switchLight = async () => {
    // console.log(await Post({
    //     url: 'led',
    //     data: {
    //         status: lightContent.state,
    //     }
    // }));
    // client.publish("topic/led", JSON.stringify({ status: lightContent.state }), { qos: 2, retain: true });
    client.publish("autoLight-5C:CF:7F:18:B6:7C", lightContent.state + "", { qos: 0, retain: false });
}

</script>

<style scoped></style>