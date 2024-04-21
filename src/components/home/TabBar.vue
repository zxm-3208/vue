<!-- home组件里的底部导航栏组件，通过底部导航组件进行切换。包括首页，附近，拍摄，消息，我  这5个页面级组件。 -->
<template>
    <div class="tab-bar">
        <div class="item" @click="changeTab(0)">
            <router-link to="/index" tag="span" :class="tabIndex==0?'active':''">首页</router-link>

        </div>

        <div class="item" @click="changeTab(1)">
            <router-link to="/follow" tag="span" :class="tabIndex==1?'active':''">附近</router-link>

        </div>

        <div class="item" @click="changeTab(2)">
            <router-link to="/Upload" tag="span" :class="tabIndex==2?'active':''">
                <img class="add" src="../../../public/images/add.png" alt="">
            </router-link>

        </div>

        <div class="item" @click="changeTab(3)">
            <router-link to="/msg" tag="span" :class="tabIndex==3?'active':''">消息</router-link>

        </div>

        <div class="item" @click="changeTab(4)">
            <router-link to="/me" tag="span" :class="tabIndex==4?'active':''">我</router-link>

        </div>

    </div>
</template>

<script>
    export default{
        data(){
            return{
                tabIndex:0
            }
        },
        methods:{
            changeTab(index){
                this.tabIndex=index;
            }
        }
    }
</script>


<style scoped>
	.tab-bar{
        display: flex;
		height: 50px;
		line-height: 50px;
		width:100%;
		background:#000;
		position: fixed;
		bottom:0;
		color: #cccccc;
		font-size: 16px;
		display: flex;
		justify-items: center;
		z-index: 9;
	}
	.tab-bar .item{
		flex:1;
		text-align: center;
	}
	.tab-bar .item .active{
		color: #ffffff;
	}
	.tab-bar .item .add{
		width: 50px;
		height: 30px;
		padding: 10px 0;
	}
</style>
