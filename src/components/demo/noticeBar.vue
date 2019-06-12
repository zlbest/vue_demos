<template>
    <div class="notice" v-if="show">
        <ul v-if="direction=='vertical'" :style="{transform: moveAnimate}" class="list-vertical" :class="{unAnimate: counts==0}">
            <li class="item" v-for="(item, index) in notice" :key="index">{{ item }}</li>
        </ul>
        <ul v-else ref="notice" :style="{animate: hAnimate}" class="list-level">
            <li class="item level" v-for="(item, index) in notice" :key="index">{{ item }}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "notice-bar",
        inheritAttrs: false,
        props: {
            /* 滚动方向 */
            direction: {
                type: String,
                default: 'vertical',
            },
            /* 垂直滚动速度,多少ms滚动一条 */
            vSpeed: {
                type: Number,
                default: 5000, 
            },
            /* 水平滚动速度, px/s */
            hSpeed: {
                type: Number,
                default: 50, 
            },
            /* 消息列表 */
            noticeList: {
                type: Array,
                required: true, 
            },

        },
        data() {
            return {
                counts: 0,
                scrollTextFn: null,
                show: false,
                hAnimate: '',
                notice: this.noticeList
            }
        },
        computed: {
            moveAnimate: function() {
                if(this.direction == 'vertical'){
                    return `translateY(-${1.33333*this.counts}rem`;
                }
            }
        },
        watch: {
            noticeList: {
                handler (newV, oldV){
                    if(!Array.isArray(newV) || newV.length == 0){
                        this.show = false;
                        return;
                    }
                    this.init();
                },
                deep: true
            }
        },
        methods: {
            //消息滚动初始化
            init() {
                this.show = true;
                this.$nextTick(() => {
                    if(this.direction == 'vertical'){
                        this.notice = [...this.noticeList, this.noticeList[0]];
                        this.scrollTextFn = setInterval(() => {
                            if(this.counts < this.notice.length - 1){
                                this.counts++;
                            }else {
                                this.counts = 0;
                                setTimeout(() => {
                                    this.counts ++;
                                }, 50);
                            }
                        }, this.vSpeed);
                    }else if(this.direction == 'horizontal'){
                        this.notice = [...this.noticeList, ...this.noticeList];
                        let duration = this.$refs.notice.getBoundingClientRect().width / this.hSpeed;
                        this.hAnimate = `play ${10}s linear infinite`;
                    }
                })
            }
        },
        beforeDestroy() {
            clearInterval(this.scrollTextFn);
        }
            
    }
</script>

<style lang="scss" scoped>
    @import "../../style/mixin";
    .notice {
        @include wh(100vw, 100px);
        padding-left: 20px;
        overflow: hidden;
        box-sizing: border-box;
        background: #fffacda1;
    }
    .list-vertical {
        transition: transform .5s;
    }
    .list-level {
        white-space: nowrap;
    }
    .unAnimate {
        transition: none;
    }
        
    .item {
        height: 100px;
        line-height: 100px;
        white-space: nowrap;
        @include sc(28px, #ff0000bf);
        &.level {
            display: inline-block;
            padding-right: 60px;
            box-sizing: border-box;
        }
    }
    @keyframes play {
        to { transform: translateX(-100%); }
    }
</style>
