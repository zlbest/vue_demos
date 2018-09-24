<template>
    <div class="container">
        <ul class="img-list" ref="list">
            <li v-for="(item, index) in imgList" :key="index" ref="pics">
               <img :src="item.url" alt="轮播图片">
            </li>
        </ul>
        <ul class="dots">
            <li v-for="(item, index) in imgList" :key="index" :class="['dot', {'active': index == mark}]">
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "carousel",
        props: {
            imgList: {
                type: Array,
                require: true
            }
        },
        data() {
            return {
                offsetX:[],
                mark: 0,
                position: {},
                clientWidth: document.body.clientWidth || document.documentElement.clientWidth,
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                this.$el.style.width = this.clientWidth + 'px';
                this.$refs.list.style.width = this.imgList.length*this.clientWidth + 'px';
                this.$refs.pics.forEach((v) => {
                    v.style.width = this.clientWidth + 'px';
                });
                this.imgList.forEach((v,i) => {
                    this.offsetX[i] = this.clientWidth*i;
                });
                this.$el.addEventListener('touchstart', this.touchStart, false);
                this.$el.addEventListener('touchmove', this.touchMove, false);
                this.$el.addEventListener('touchend', this.touchEnd, false);
            },
            touchStart(e) {
                this.position = {
                    x: e.targetTouches[0].clientX,
                    y: e.targetTouches[0].clientY
                };
            },
            touchMove(e) {
                let moveX = e.targetTouches[0].clientX - this.position.x;
                let moveY = e.targetTouches[0].clientY - this.position.y;
                if(this.mark == this.imgList.length-1 && moveX < 0){
                    e.preventDefault();
                    return;
                }else if(this.mark == 0 && moveX > 0){
                    e.preventDefault();
                    return;
                }
                if(Math.abs(moveX) > Math.abs(moveY)){
                    e.preventDefault();
                    this.transform(this.offsetX[this.mark]-moveX);
                }
            },
            touchEnd(e) {
                let distanceX = e.changedTouches[0].clientX - this.position.x;
                if(distanceX < -100){
                    if(this.mark == this.imgList.length-1) return;
                    this.mark ++;
                } else if(distanceX > 100){
                    if(this.mark == 0) return;
                    this.mark --;
                }
                this.transform(this.offsetX[this.mark]);
            },
            transform(offsetX) {
                this.$refs.list.style.transform = `translateX(${-offsetX}px)`;
            }
        },
        beforeDestroy() {
            this.$el.removeEventListener('touchstart', this.touchStart, false);
            this.$el.removeEventListener('touchmove', this.touchMove, false);
            this.$el.removeEventListener('touchend', this.touchEnd, false);
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../style/mixin";
    .container {
        position: relative;
        height: 500px;
        overflow: hidden;
        z-index: 1;
        .img-list {
            @include flex-row(center,center);
            height: 100%;
            transition: all .3s;
            img {
                width: 100%;
                height: 500px;
            }
        }
        .dots {
            position: absolute;
            bottom: 10px;
            left: 0;
            width: 100%;
            @include flex-row(center,center);
            .dot {
                width: 20px;
                height: 20px;
                margin: 5px;
                border-radius: 100%;
                background-color: rgba(211, 211, 211, 0.5);
            }

        }
        .active {
            background-color: red !important;
        }
    }

</style>
