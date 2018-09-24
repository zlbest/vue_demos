<template>
    <header class="header">
        <div @click="goBack" class="back"><span>返回</span></div>
        <h3 class="title">{{ headerTitle }}</h3>
        <div><slot name="right"></slot></div>
    </header>
</template>

<script>
    export default {
        props: {
            headerTitle: {
                type: String,
                require: true
            },
            backUrl: {
                type: String,
                require: false
            }
        },
        methods: {
            goBack() {
                if(this.backUrl) {
                    this.$router.push(this.backUrl);
                } else {
                    this.$router.length > 0 ? this.$router.go(-1) : this.$router.push('/');
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../style/mixin";
    .header {
        @include wh(100%, 100px);
        position: fixed;
        top: 0;
        left: 0;
        @include flex-row();
        padding: 0 20px;
        box-sizing: border-box;
        background-color: white;
        z-index: 2;
        .back {
            @include flex-row(flex-start, center);
            font-size: 30px;
            &::before {
                display: inline-block;
                content: '';
                @include icon(back);
                margin-right: 10px;
            }
        }
        .title {
            font-size: 32px;
            font-weight: bold;
        }
    }

</style>
