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
					<!-- <span><a>0</a>获赞</span> -->
					<span><a>{{this.followCount}}</a>关注</span>
					<span><a>{{this.fansCount}}</a>粉丝</span>
				</div>
				<div class="me-ab">
					好好学习天天向上
				</div>
			</div>
			<div class="me-tab">
				<div class="me-navbar">
					<div class="item" @click="changeTab(0)" :class="indexTab==0?'active':'' ">作品&nbsp;{{publistNum}}</div>
					<div class="item" @click="changeTab(1)" :class="indexTab==1?'active':'' ">草稿&nbsp; </div>
					<div class="item" @click="changeTab(2)" :class="indexTab==2?'active':'' ">喜欢&nbsp;{{likeNum}}</div>
				</div>
				<div class="tab-wrap">
					<div class="tab-con" v-show="indexTab==0">
						<div class="tab-img">
							<img mode="widthFix" class="img" v-for="(item, index) in publist" :key="index" :src="item"  @load="onImgLoad" @click="handleClick(index)"/>
						</div>
					</div>
					<div class="tab-con" v-show="indexTab==1">
						<!-- <div class="tab-img">
							<img class="img" src="../../../public/images/001.jpg" />
							<img class="img" src="../../../public/images/002.jpg" />
							<img class="img" src="../../../public/images/003.jpg" />
						</div> -->
					</div>
					<div class="tab-con" v-show="indexTab==2">
						<div class="tab-img">
							<img mode="widthFix" class="img" v-for="(item, index) in likeList" :key="index" :src="item"  @load="onImgLoad" @click="handleClickToLike(index)"/>
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
				lastId: 0,
				offset: 0,
				LikelastId: 0,
				Likeoffset: 0,

				bgPic:{
					backgroundImage:'url('+require('../../../public/images/bg.jpg')+')',
					backgroundRepeat:'no-repeat',
					backgroundSize:'100% 100%'
				},
				indexTab: 0,
				imgHeight: 0,
				
				publist: [],
				publistNum: 0,

				collectList: [],
				collectNum: 0,

				likeList: [],
				likeNum: 0,

				followCount: 0,
				fansCount: 0,
			}
		},
		created(){
			this.getPublistImg();
			this.getLikeListImg();
			this.initFollowCount();
			this.initFansCount();
		},
		methods:{
			changeTab(index){
				this.indexTab=index;
				if(index==0){
					this.getPublistImg()
				}
				else if(index==1){

				}
				else if(index==2){
					this.getLikeListImg()
				}
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
					localStorage.removeItem('userId'),
					this.$router.push('/sign')
                )
                .catch(error => {
                    console.error(error);
                });
			},
			async getPublistImg(){
				this.lastId = Date.parse(new Date());
				try{
					console.info("publistImg:",localStorage.getItem('userId'), this.lastId, this.offset);
					let res = await axios.post('http://localhost:8020/douyin_publish/showlist/publist',{
						"userId": localStorage.getItem('userId'),
						"lastId": this.lastId,
						"offset": this.offset,
					}
					,
					{
						headers: {
							'Authorization': 'Bearer ' + localStorage.getItem('authorization')
						}
					})
					// console.info("publistImg:",res);
					if(res.data.code=="200"){
						this.publistNum = res.data.data.mediaCount;
						this.publist = res.data.data.url;
						// this.lastId = res.data.data.minTime;
						// this.offset = res.data.data.offset;
					}
					else{
						this.$toast('获取发布视频数据失败！')

					}
				}catch(err){
					console.error(err);
				}
			},
			async getLikeListImg(){
				this.LikelastId = Date.parse(new Date());
				try{
					let res = await axios.post('http://localhost:8020/douyin_publish/showlist/likeList',{
						"userId": localStorage.getItem('userId'),
						"lastId": this.LikelastId,
						"offset": this.Likeoffset,
						}
						,
						{
							headers: {
								'Authorization': 'Bearer ' + localStorage.getItem('authorization')
							}
						})
					console.info("res:",res);
					if(res.data.code=="200"){
						this.likeNum = res.data.data.mediaCount;
						this.likeList = res.data.data.url;
						// this.LikelastId = res.data.data.minTime;
						// this.Likeoffset = res.data.data.offset;
					}
					else{
						this.$toast('获取发布视频数据失败！')
					}
				}catch(err){
					console.error(err);
				}
			},
			async initFollowCount(){
				this.LikelastId = Date.parse(new Date());
				try{
					var userId = localStorage.getItem('userId')
					let res = await axios.get('http://localhost:8020/douyin_user/follow/getFollowCount?userId='+userId,
						{
							headers: {
								'Authorization': 'Bearer ' + localStorage.getItem('authorization')
							}
						})
					console.info("follow:",res);
					if(res.data.code=="200"){
						this.followCount = res.data.data
					}
					else{
						this.$toast('获取发布视频数据失败！')
					}
				}catch(err){
					console.error(err);
				}
			},
			async initFansCount(){
				this.LikelastId = Date.parse(new Date());
				try{
					var userId = localStorage.getItem('userId')
					let res = await axios.get('http://localhost:8020/douyin_user/follow/getFansCount?userId='+userId,
						{
							headers: {
								'Authorization': 'Bearer ' + localStorage.getItem('authorization')
							}
						})
					console.info("fans:",res);
					if(res.data.code=="200"){
						this.fansCount = res.data.data
					}
					else{
						this.$toast('获取发布视频数据失败！')
					}
				}catch(err){
					console.error(err);
				}
			},
			onImgLoad(e) {
				// 当图片加载完成后，获取图片的原始宽度和高度，并根据宽度计算出高度
				this.imgHeight = (e.target.height / e.target.width) * 100; // 高度 = 原始高度 / 原始宽度 * 100
			},
			handleClick(index){
				this.$router.push({ path:"/UserPublist", query:{index: index}});
			},
			handleClickToLike(index){
				this.$router.push({ path:"/UserLikeList", query:{index: index}});
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
	.tab-img{
		max-width: 100%;
		display: flex;
		flex-wrap: wrap;
		background: #000000;
		object-fit: contain;
		/* height: 250px;
		background: #f2f2f2;
		justify-content: center;
		align-items: center; */
	}
	.img{
		width: calc(33.33% - 4px);
		margin: 2px;
		max-height: 100%;
		background: #000000;
		object-fit: contain;
	}
	.tab-con{
		max-width: 100%;
		max-height: 100%;
		display: flex;
		justify-content: left;
		align-items: left;
	}
	.tab-wrap{
		height: auto;
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
