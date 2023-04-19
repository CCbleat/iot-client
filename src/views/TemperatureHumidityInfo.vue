<template>
    <RouterLink to="/">back to Home</RouterLink>
    <h1>Temperature and Humidity Info page</h1>
    <p>State of Temperature:  {{ temperatureHumidityInfo.temperature}} Celsius</p>
    <p>State of Humidity:  {{ temperatureHumidityInfo.humidity}} %RH</p>
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
    client.subscribe("humidTemperatureSensor-status-48:55:19:E0:22:35", {qos: 0});
})

// let temperatureHumidityInfo = ref("loading...");
let temperatureHumidityInfo = reactive({
    temperature: "loading...",
    humidity: "loading...",
});

const modifyTemperatureHumidityInfo = (object) => {
    temperatureHumidityInfo.temperature = object.temperature;
    temperatureHumidityInfo.humidity = object.humidity;
}

//收到消息的事件
// client.on('message', (topic, message) => {
//     console.log(topic + '返回的数据：' + message.toString())
// });
client.on('message', (topic, message) => {
    // console.log(topic + '返回的数据：' + message.toString());
    if(topic === "humidTemperatureSensor-status-48:55:19:E0:22:35") {
        // console.log("!!", message.toString());
        modifyTemperatureHumidityInfo(JSON.parse(message.toString()));
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

</script>

<style scoped></style>