<template>
    <div :class="[isFull ? 'full':'normal']">
        <video ref="video" class="video" @click="controlBar($event)" :src="videoSrc" :poster="poster" playsinline webkit-playsinline preload="auto"></video>
        <section class="control-bar" v-if="showBar">
            <div class="control-play">
                <img :src="playIcon" alt="play" @click="play"/>
                <span>{{currentTime | timeStamp}}</span>
            </div>
            <div class="progress-bar">
                <input type="range" class="progress-time" :style="{backgroundSize: (currentTime/allTime)*100 + '% 100%'}" min="0" :max="allTime" step="any" v-model="currentTime" @input="dragProgress($event)"/>
            </div>
            <div class="full-screen">
                <span>{{allTime | timeStamp}}</span>
                <img src="../../images/icons/full.png" alt="fullScreen" @click="isFull=!isFull"/>
            </div>
        </section>
        <div class="big-btn" v-if="showBigPlay" @click="play">
            <img src="../../images/icons/play.png" alt="bigPlay"/>
        </div>
        <div class="loading" v-if="loading"></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                playIcon: require('../../images/icons/play.png'),
                isFull: false,
                currentTime: 0,
                allTime: 0,
                showBigPlay: true,
                showBar: false,
                loading: false,
                isEnd: false
            }
        },
        props: ['videoSrc','poster'],
        filters: {
            timeStamp: function (value) {
                let time = Number(value);
                let minutes = parseInt(time/60);
                let seconds = parseInt(time%60);
                minutes = minutes < 10 ? '0' + minutes : minutes;
                seconds = seconds < 10 ? '0' + seconds : seconds;
                return minutes+':'+seconds;
            }
        },
        mounted() {
            let video = this.$refs.video;
            video.addEventListener('loadedmetadata', () => {
                this.allTime = Number(video.duration);
            });
            video.addEventListener('timeupdate', () => {
                this.currentTime = Number(video.currentTime);
            });
            video.addEventListener('ended', () => {
                this.playIcon = require("../../images/icons/restart.png");
                this.showBar = true;
                this.isEnd = true;
            });
            /*video.addEventListener('waiting', () => {
                this.loading = true;
            });
            video.addEventListener('playing', () => {
                this.loading = false;
            });*/
            //发生错误
            video.addEventListener("error", () => {
                switch(video.error.code) {
                    case 1:
                        this.$toast("视频的下载过程被中止");
                        break;
                    case 2:
                        this.$toast("网络发生故障，视频的下载过程被中止");
                        break;
                    case 3:
                        this.$toast("解码失败");
                        break;
                    case 4:
                        this.$toast("不支持播放的视频格式");
                        break;
                    default:
                        this.$toast("发生未知错误");
                }
            },false);
        },
        methods: {
            dragProgress(e) {
                this.$refs.video.currentTime = this.currentTime;
                if(this.isEnd && (this.currentTime != this.allTime)){
                    this.playIcon = require("../../images/icons/play.png");
                }
            },
            play() {
                let video = this.$refs.video;
                if(this.isEnd){
                    video.play();
                    this.isEnd = false;
                    this.playIcon = require("../../images/icons/pause.png");
                    setTimeout(() => {
                        this.showBar = false;
                    }, 5000);
                    return false;
                }
                if(video.paused){
                    this.showBigPlay = false;
                    video.play();
                    this.playIcon = require("../../images/icons/pause.png");
                }else {
                    video.pause();
                    this.playIcon = require("../../images/icons/play.png");
                }
                return false;
            },
            controlBar(e) {
                e.preventDefault();
                if(this.$refs.video.paused){
                    this.showBar = true;
                    return false;
                }
                if(this.showBar) {
                    this.showBar = false;
                }else {
                    this.showBar = true;
                    setTimeout(() => {
                        this.showBar = false;
                    }, 5000);
                }
                return false;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../style/mixin";
    .normal {
        position: relative;
        width: 100%;
        height: 500px;
    }
    .full {
        position: relative;
        width: 100vh;
        height: 100vw;
        transform: rotate(90deg) translate(-100px, -100vw);
        transform-origin: left top;
        z-index: 9;
    }
    .video {
        @include wh(100%, 100%);
        object-fit: fill;
    }
    .control-bar {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 70px;
        @include flex-row();
        box-sizing: border-box;
        background: rgba(0, 0, 0, 0.5);
        font-size: 24px;
        color: #fff;
        z-index: 22;
        transition: height .8s ease;
        .control-play {
            @include wh(18%, 75%);
            @include flex-row(center,center);
            img {
                margin-right: 10px;
                height: 100%;
            }
        }
        .progress-bar {
            @include wh(63%, 70%);
            @include flex-row(center,center);
        }
        .full-screen {
            @include wh(18%, 60%);
            @include flex-row(center,center);
            img {
                margin-left: 15px;
                height: 100%;
            }
        }
        input[type=range] {
            -webkit-appearance: none;
            width: 100%;
            border-radius: 10px;
            background: #fff -webkit-linear-gradient(#FFA500, #FFA500) no-repeat;
            background-size: 0% 100%;
        }
        input[type=range]::-webkit-slider-runnable-track {
            height: 6px;
            border-radius: 10px;
        }
        input[type=range]:focus {
            outline: none;
        }
        input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
            @include wh(30px, 30px);
            margin-top: -12px;
            border-radius: 50%;
            background: orange;
            box-shadow: 0 0 0 5px rgba(255,165,0,0.5);
        }
    }
    .big-btn {
        position: absolute;
        @include wh(100px, 100px);
        @include allcenter;
        @include flex-row(center, center);
        background: orange;
        box-shadow: 0 0 0 12px rgba(255,165,0,0.6);
        border-radius: 100%;
        img {
            margin-left: 8px;
            @include wh(60%, 60%);
        }
    }
    .loading {
        position: absolute;
        top: 50%;
        left: 50%;
        @include wh(85px, 85px);
        margin-left: -42.5px;
        margin-top: -42.5px;
        background: url("../../images/icons/loading.png") no-repeat center;
        background-size: 100% 100%;
        animation: rotate 1s infinite ease;
    }
    @keyframes rotate {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>
