<template>
    <div>
        <my-header header-title="我的主页">
            <span slot="right" class="h-right">右侧内容</span>
        </my-header>
        <div class="test">
            <carousel :imgList="imgList"></carousel>
        </div>
        <loadmore :loading="loading" @loadMore="getList()" class="list" :distance="0">
            <ul>
                <li class="item" v-for="(item, index) in list" :key="index">
                    <img v-lazy="item.pic">
                    <span>{{item.content}}</span>
                </li>
            </ul>
        </loadmore>
    </div>
</template>

<script>
    import myHeader from '../../components/demo/header'
    import carousel from '../../components/demo/carousel'
    import Loadmore from "../../components/demo/loadmore";
    export default {
        data() {
            return {
                imgList: [
                    {
                        url: require('@/images/boys.jpg')
                    },
                    {
                        url: require('@/images/love.jpg')
                    },
                    {
                        url: require('@/images/green.jpeg')
                    },
                    {
                        url: require('@/images/sun.jpeg')
                    }
                ],
                loading: true,
                list: [],
                total: 50,
                pageSize: 10,
                pageIndex: 0

            }
        },
        components: {
            Loadmore,
            myHeader,
            carousel
        },
        mounted() {
            this.getList();
        },
        methods: {
            getList() {
                for(let i = this.pageIndex*this.pageSize; i < (this.pageIndex+1)*this.pageSize; i++){
                    if(i >= this.total) {
                        this.loading = false;
                        return;
                    }
                    this.list.push({pic: 'https://i.loli.net/2017/11/09/5a046546a2a1f.jpg', content: '测试数据000'+i});
                }
                this.pageIndex ++;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../style/mixin";
    .h-right {
        font-size: 30px;
    }
    .test {
        position: relative;
        top: 100px;
        left: 0;
    }
    .list {
        position: relative;
        top: 100px;
        width: 100%;
        height: auto;
    }
    .item {
        @include flex-row(flex-start, center);
        width: 100%;
        height: 200px;
        box-sizing: border-box;
        list-style: none;
        font-size: 50px;
        padding: 0 30px;
        border-bottom: 2px solid lightgray;
        & > img {
            width: 150px;
            height: 150px;
            border-radius: 10px;
            margin-right: 20px;
        }
    }
</style>
