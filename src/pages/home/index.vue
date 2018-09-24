<template>
    <div>
        <!--<section class="test">
            <button class="btn" @click="send()">发送请求</button>
            <p class="text">{{responseMsg || '请求展示内容'}}</p>
        </section>-->
        <router-link :to="{name: 'demo'}">
            <div class="test2">去我的主页</div>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return {
                responseMsg: ''
            }
        },
        created: function () {

        },
        methods: {
            //发送请求
            send() {
                this.$http.get('/api/data/sk/101110101.html')
                    .then(function (response) {
                        console.log(response);
                        this.responseMsg = JSON.stringify(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../style/mixin";
    .test2 {
        width: 100%;
        padding: 50px;
        margin: 0 auto;
        font-size: 32px;
        text-align: center;
    }
    .test {
        @include wh(100%, auto);
        margin: 0 auto;
        .btn {
            @include wh(200px,80px);
            @include sc(20px, #fff);
            line-height: 80px;
            text-align: center;
            margin: 20px;
            background-color: #29d6a3;
            border-radius: 10px;
        }
        .text {
            @include sc(20px, black);
            padding: 20px;
        }
    }
</style>
