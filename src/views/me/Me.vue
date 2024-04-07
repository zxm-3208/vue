<template>
	<div class="me">
		<div class="me-top" :style="bgPic">
			<div class="menu-box">
				<button class="exit_icon" @click="loginout">
					<i class="iconfont icon-logout"></i>
				</button>
				
				<button class="hello" @click="hello">
					hello
				</button>
			</div>
		</div>
		<div class="me-warp">
			<div class="me-content">
				<div class="info">
					<img src="../../../public/images/head.jpg"/>
					<button class="btn" @click="toRouter">编辑资料</button>
					<button class="btn">+朋友</button>
				</div>
				<div class="des">
					<h2>爱学习的孩子</h2>
					<span>抖音号：123456</span>
					<p>每个人都有一定的理想，这种理想决定着他的努力和判断的方向。</p>
				</div>
				<div class="user-tag">
					<span>26岁</span>
					<span>北京 朝阳</span>
					<span>+添加学校等标签</span>
				</div>
				<div class="user-tag2">
					<span><a>666</a>获赞</span>
					<span><a>6</a>关注</span>
					<span><a>66</a>粉丝</span>
				</div>
				<div class="me-ab">
					好好学习天天向上
				</div>
			</div>
			<div class="me-tab">
				<div class="me-navbar">
					<div class="item" @click="changeTab(0)" :class="indexTab==0?'active':'' ">作品&nbsp;11</div>
					<div class="item" @click="changeTab(1)" :class="indexTab==1?'active':'' ">动态&nbsp;22</div>
					<div class="item" @click="changeTab(2)" :class="indexTab==2?'active':'' ">喜欢&nbsp;33</div>
				</div>
				<div class="tab-wrap">
					<div class="tab-con" v-show="indexTab==0">
						<div class="tab-img">
							<img src="../../../public/images/001.jpg" />
							<img src="../../../public/images/002.jpg" />
							<img src="../../../public/images/003.jpg" />
						</div>
					</div>
					<div class="tab-con" v-show="indexTab==1">
						<div class="tab-img">
							<img src="../../../public/images/001.jpg" />
							<img src="../../../public/images/002.jpg" />
							<img src="../../../public/images/003.jpg" />
						</div>
					</div>
					<div class="tab-con" v-show="indexTab==2">
						<div class="tab-img">
							<img src="../../../public/images/004.jpg" />
							<img src="../../../public/images/005.jpg" />
							<img src="../../../public/images/006.jpg" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import axios from 'axios';

	export default{
		name:"Me",
		data(){
			return{
				bgPic:{
					backgroundImage:'url('+require('../../../public/images/bg.jpg')+')',
					backgroundRepeat:'no-repeat',
					backgroundSize:'100% 100%'
				},
				indexTab:0,
			}
		},
		methods:{
			changeTab(index){
				this.indexTab=index;
			},
			toRouter(){
				this.$router.push('/edit')
			},
			loginout(){
				axios.get('http://localhost:8020/douyin_auth/logout', {
					headers: {
						'Authorization': 'Bearer ' + localStorage.getItem('authorization')
					}
				})
                .then(
                    localStorage.removeItem('authorization'),
					this.$router.push('/sign')
                )
                .catch(error => {
                    console.error(error);
                });
			},
			hello(){
				axios.get('http://localhost:8020/douyin_auth/user/hello', {
					headers: {
						'Authorization': 'Bearer ' + localStorage.getItem('authorization')
					}
				})
                .then((res)=>{
					if(res.data.code=="401"){
						this.$router.push.push('/sign');
						localStorage.removeItem('authorization')
					}
				})
                .catch(error => {
                    console.error(error);
                });
			}
		}
	}
</script>
<style scope>
	.me{position: relative;}
	.me-top{
		height: 160px;
		display: flex;
		justify-content:flex-end;
		padding: 20px;
	}
	.menu-box{
		width: 30px;
		height: 30px;
		border-radius:50% ;
		background: rgba(0,0,0, .3);
		display: flex;
		align-items: center;
		justify-content: center;	
	}
	.menu-icon{
		background: #ffffff;
		border-top:2px solid #ffffff;
		border-bottom:2px solid #ffffff;
		background-clip:content-box;
		width: 18px;
		height: 2px;
		padding: 2px 0;
	}
	.me-warp{
		position: absolute;
		top: 140px;
		width: 100%;
		background: #101821;
		color: #fff;
	}
	.me-content{
		padding: 0 20px;
	}
	.info{
		display: flex;
		align-items: center;
		justify-content: space-between;
		/* padding-bottom:20px; */
	}
	.info img{
		height: 100px; width:100px;
		border-radius: 50%;
		margin-right: 20px;
	}
	.info .btn{
		height: 40px;
		padding: 0 24px;
		background-color:#393842;
		border: none;
		outline: none;
		color: #fff;
	}
	.des{
		padding:20px 0;
	}
	.des h2{
		font-size: 24px;
		font-weight: bold;
	}
	.des span{
		padding: 10px 0 15px 0;
		display: block;
	}
	.des p{
		line-height:24px;
	}
	.user-tag span{
		font-size:14px;
		color: #cccccc;
		margin-right:5px;
		background: rgba(0,0,0,.6);
		padding: 5px 8px;
	}
	.user-tag2{
		padding:20px 0;
	}
	.user-tag2 span{
		font-size: 14px;
		margin-right: 15px;
		color: #cccccc;
	}
	.user-tag2 a{
		margin-right: 5px;
		color: #fff;
	}
	.me-ab{
		background: red;
		text-align: center;
		padding: 10px 0;
		border-radius: 4px;
	}
	.me-tab{
		height: 300px;
	}
	.me-navbar{
		display: flex;
		padding: 0 20px;
		justify-content:space-between;
		align-items: center;
	}
	.me-navbar .item{
		padding: 10px 25px;
		color: #CCCCCC;
	}
	.me-navbar .active{
		border-bottom: 2px solid #ffdf0e;
		color: #FFFFFF;		
	} 
	.tab-img img{
		width: 33.3%;
	}
	.exit_icon{
		height: 40px;
		padding: 0 24px;
		background-color:#393842;
		border: none;
		outline: none;
		color: #fff;
	}
	.hello{
		height: 40px;
		padding: 0 24px;
		background-color:#393842;
		border: none;
		outline: none;
		color: #fff;
	}
	
</style>
