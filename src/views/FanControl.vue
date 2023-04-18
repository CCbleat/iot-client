<template>
    <RouterLink to="/">back to Home</RouterLink>
    <h1>AutoFan control page</h1>
    <div class="flex justify-center align-center">
        <button class="bg-blue-100 border-2 border-purple-400 px-4 py-1 rounded-md" @click="changeLightState">{{
            fanContent.tag }}</button>
    </div>
    <p>State of Fan: {{ fanStateInfo }}</p>
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
//     console.log('连接成功', e)
// })
client.on('connect', e => {
    console.log('连接成功', e);
    client.subscribe("autoFan-status-C8:C9:A3:5D:12:24", {qos: 0});
})

let fanStateInfo = ref("off");

const modifyFanStateInfo = (str) => {
    fanStateInfo.value = str;
}

//收到消息的事件
// client.on('message', (topic, message) => {
//     console.log(topic + '返回的数据：' + message.toString())
// });
client.on('message', (topic, message) => {
    if(topic === "autoFan-status-C8:C9:A3:5D:12:24") {
        console.log(message.toString());
        modifyFanStateInfo(message.toString());
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


let fanContent = reactive({
    tag: 'Open Fan',
    state: 1,
});
const changeLightState = () => {
    switchLight();
    if (fanContent.tag === "Open Fan") {
        fanContent.tag = 'Close Fan';
        fanContent.state = 0;
    } else {
        fanContent.tag = 'Open Fan';
        fanContent.state = 1;
    }
}
const switchLight = async () => {
    // console.log(await Post({
    //     url: 'led',
    //     data: {
    //         status: fanContent.state,
    //     }
    // }));
    // client.publish("topic/led", JSON.stringify({ status: fanContent.state }), { qos: 2, retain: true });
    client.publish("autoFan-C8:C9:A3:5D:12:24", fanContent.state + "", { qos: 0, retain: false });
}
</script>

<style scoped></style>