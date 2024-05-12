<!-- 视频列表组件，保护视频播放组件 -->
<template>
	<div class="video-list">
		<myheader class="header" title="作品列表" hasLeft="true" rightTxt="false" @changeBack="toBack"></myheader>
		<swiper :options="swiperOption">
			<!-- 幻灯内容 -->
			<swiper-slide v-for="(item,index) in dataList" :key="index">
				<div  class="vedioParent">
					<videos class="vedioChild" ref="videos" :videoList="item" :index="index"></videos>
				</div>

				<!-- 底部说明 -->
				<div class="infobar_warp">
					<info-bar></info-bar>
				</div>

				<!-- 右侧列表 -->
				<div class="right_warp">
					<!-- 父组件接收子组件的方法 -->
					<right-bar @changeCom="showCom" @changeLike="clickLike" @changeIndex="getIndex" @changeFollow="changeFollow" :plikeCount="likeCount" :pforwardCount="forwardCount" :pcommentCount="commentCount" :plikeFlag="likeFlag" :pfollowFlag="isFollow" ></right-bar>
				</div>
			</swiper-slide>   
		</swiper>
		<!-- 评论 -->
		<transition name="up">
		<div class="comment-warp-box" v-if="showComment">
			<div class="comment-warp">
				<div class="comment-list">
					<div class="comment-top">
						<div class="number">15.0w条评论</div>
						<div class="close" @click="close"><span class="iconfont icon-shanchu"></span></div>
					</div>
					<div class="comment-body">
						<div class="comment-box">
							<div class="comment-item">
								<div class="user-pic">
									<img src="../../../public/images/head1.jpg" alt="">
								</div>
								<div class="item-info">
									<div class="reply">
										<p class="name">安安</p>
										<p class="reply-des">要加班今晚要加班要加班今晚要加班要加班今晚要加班要加班今晚要加班<span class="time">05-20</span></p>
									</div>
									<div class="zan">
										<span class="iconfont icon-aixin"></span>
										<p>200</p>
									</div>
								</div>
							</div>
							<!-- 回复 -->
							<div class="sub-comment-item">
								<div class="user-pic">
									<img src="../../../public/images/head1.jpg" alt="">
								</div>
								<div class="item-info">
									<div class="reply">
										<p class="name">拉西</p>
										<p class="reply-des">
											<span>回复</span>
											<span class="re-name">安安：</span>
											<span>123</span>
											<span class="time">05-20</span>
										</p>
									</div>
									<div class="zan">
										<span class="iconfont icon-aixin"></span>
										<p>200</p>
									</div>
								</div>
							</div>
							<!-- 回复条数 -->
							<div class="more">展开更多回复</div>
							
							<div class="comment-item">
								<div class="user-pic">
									<img src="../../../public/images/head1.jpg" alt="">
								</div>
								<div class="item-info">
									<div class="reply">
										<p class="name">安安</p>
										<p class="reply-des">要加班今晚要加班要加班今晚要加班要加班今晚要加班要加班今晚要加班<span class="time">05-20</span></p>
									</div>
									<div class="zan">
										<span class="iconfont icon-aixin"></span>
										<p>200</p>
									</div>
								</div>
							</div>
							<!-- 回复 -->
							<div class="sub-comment-item">
								<div class="user-pic">
									<img src="../../../public/images/head1.jpg" alt="">
								</div>
								<div class="item-info">
									<div class="reply">
										<p class="name">拉西</p>
										<p class="reply-des">
											<span>回复</span>
											<span class="re-name">安安：</span>
											<span>123</span>
											<span class="time">05-20</span>
										</p>
									</div>
									<div class="zan">
										<span class="iconfont icon-aixin"></span>
										<p>200</p>
									</div>
								</div>
							</div>
							<!-- 回复条数 -->
							<div class="more">展开更多回复</div>
							
							<div class="comment-item">
								<div class="user-pic">
									<img src="../../../public/images/head1.jpg" alt="">
								</div>
								<div class="item-info">
									<div class="reply">
										<p class="name">安安</p>
										<p class="reply-des">要加班今晚要加班要加班今晚要加班要加班今晚要加班要加班今晚要加班<span class="time">05-20</span></p>
									</div>
									<div class="zan">
										<span class="iconfont icon-aixin"></span>
										<p>200</p>
									</div>
								</div>
							</div>
							<!-- 回复 -->
							<div class="sub-comment-item">
								<div class="user-pic">
									<img src="../../../public/images/head1.jpg" alt="">
								</div>
								<div class="item-info">
									<div class="reply">
										<p class="name">拉西</p>
										<p class="reply-des">
											<span>回复</span>
											<span class="re-name">安安：</span>
											<span>123</span>
											<span class="time">05-20</span>
										</p>
									</div>
									<div class="zan">
										<span class="iconfont icon-aixin"></span>
										<p>200</p>
									</div>
								</div>
							</div>
							<!-- 回复条数 -->
							<div class="more">展开更多回复</div>
							
							<!-- 评论框 -->
							<div class="reply-input">
								<input type="text" id="" placeholder="留下你精彩的评论">
								<span class="emoji">@</span>
								<span class="iconfont icon-pinglun"></span>
							</div>
						</div>
							
					</div>
				</div>	
			</div>
		</div>
		</transition>
	</div>

</template>
<script>
    import { Swiper, SwiperSlide } from 'vue-awesome-swiper'    //导入组件
    import 'swiper/swiper-bundle.css'
	import axios from 'axios'
	import Videos from '../../components/index/Videos'
	import InfoBar from '../../components/index/InfoBar.vue'
	import RightBar from '../../components/index/RightBar.vue'
	import Myheader from '../../components/header/Myheader.vue'
	export default{
        name:'videoList',
        components: {
            SwiperSlide,          //定义组件
            Swiper,
			Videos,
			InfoBar,
			RightBar,
			Myheader,
        },
        data(){
            return {
				lastId: 0,
				offset: 0,

				showComment:false,
				page:1,
                swiperOption: {
                    direction:"vertical",
                    grabCursor: true, 
                    setWrapperSize: true, 
                    autoHeight: true, //自动高度。设置为true时，wrapper和container会随着当前slide的高度而发生变化
                    slidesPerView: 1,
                    mousewheel: true, 
                    mousewheelControl: true, 
                    height: window.innerHeight,  //高度设置，占满设备高度
                    resistanceRatio: 0, 
                    observeParents: true, 
					// 实现暂停功能
					on:{
						tap:()=>{
							this.playAction(this.page - 1)
						},
						//详见：https://www.swiper.com.cn/api/event/290.html
						slideNextTransitionStart:()=>{
						this.page +=1;
							this.nextVideo(this.page - 1)
						},
						slidePrevTransitionEnd: ()=>{
						if(this.page>1){
								this.page -=1;
								this.preVideo(this.page - 1)
							}
						},
					}
                },
				dataList:[],
				mediaIdList:[],
				mediaindex: 0,
				userId:'',
				likeCount: 0,
				commentCount: 0,
				forwardCount: 0,
				likeFlag: -1,
				authorIdList: [],
				titleList: [],
				isFollow: [],
            }
            
        },
        created(){
			this.getPublistUrl();
		},
        methods:{
			toBack(){
				this.$router.push('/me')
			},
			playAction(index){
				this.$refs.videos[index].playOrStop()
			},
			// 上滑
			preVideo(index){
				this.mediaindex = this.mediaindex - 1
				this.getLikeCount()
				this.getInitLikeFlag()
				this.getInitFollow();
				this.$refs.videos[index+1].stop()
				this.$refs.videos[index].play()
			},
			// 下滑
			nextVideo(index){
				this.mediaindex = this.mediaindex + 1
				this.getLikeCount()
				this.getInitLikeFlag()
				this.getInitFollow();
				this.$refs.videos[index-1].stop()
				this.$refs.videos[index].play()
			},
			
			// 弹出评论框
			showCom(){
				this.showComment=true;
			},
			async getIndex(){
				// this.mediaindex = this.mediaindex + 1
				this.getLikeCount()
				this.getInitLikeFlag()
				this.getInitFollow();
			},
			async clickLike(){
				try{
					let res = await axios.post('http://localhost:8020/douyin_user/likes/mediaLike',{
						"userId": this.userId, 
						"mediaId": this.mediaIdList[this.mediaindex]
					})
				}
				catch(err){
					console.error(err);
				}
				this.getLikeCount();
				this.getInitLikeFlag();
			},
			async getLikeCount(){
				try{
					let res = await axios.post('http://localhost:8020/douyin_user/likes/getLikeCount',{
						"userId": this.userId,
						"mediaId": this.mediaIdList[this.mediaindex]
					},
					{
						headers: {
							'Authorization': 'Bearer ' + localStorage.getItem('authorization')
						}
					})
					if(res.data.code=="200"){
						this.likeCount = res.data.data
					}
					else{
						this.$toast('获取视频点赞数量失败！')
					}
				}catch(err){
					console.error(err);
				}
			},
			async getInitLikeFlag(){
				try{
					let res = await axios.post('http://localhost:8020/douyin_user/likes/initLikeFlag',{
						"userId": this.userId,
						"mediaId": this.mediaIdList[this.mediaindex]
					},
					{
						headers: {
							'Authorization': 'Bearer ' + localStorage.getItem('authorization')
						}
					})
					if(res.data.code=="200"){
						this.likeFlag = res.data.data
					}
					else{
						this.$toast('获取视频是否点赞失败！')
					}
				}catch(err){
					console.error(err);
				}
			},
			async changeFollow(){
				console.info("change:", this.userId, this.authorIdList[this.mediaindex], this.isFollow )
				try{
					let res = await axios.post('http://localhost:8020/douyin_user/follow/authorFollow',{
						"userId": this.userId, 
						"authorId": this.authorIdList[this.mediaindex],
						"isFollow": this.isFollow,
					})
					console.info("changeFollow:",res);
				}
				catch(err){
					console.error(err);
				}
				this.getInitFollow();
			},
			async getInitFollow(){
				try{
					let res = await axios.post('http://localhost:8020/douyin_user/follow/isFollow',{
						"userId": this.userId, 
						"authorId": this.authorIdList[this.mediaindex],
					})
					if(res.data.code=="200"){
						this.isFollow = res.data.data
					}
				}
				catch(err){
					console.error(err);
				}
			},
			// 关闭评论框
			close(){
				this.showComment=false;
			},
			async getPublistUrl(){
				this.lastId = Date.parse(new Date());
				try{
					this.userId = localStorage.getItem('userId')
					let res = await axios.post('http://localhost:8020/douyin_feed/defaultFeed/getUserUrl',{
						"userId": this.userId,
						"lastId": this.lastId,
						"offset": this.offset,
					}
					,
					{
						headers: {
							'Authorization': 'Bearer ' + localStorage.getItem('authorization')
						}
					})
					if(res.data.code=="200"){
						this.mediaIdList = res.data.data.mediaId;
						this.titleList = res.data.data.mediaTitle;
						this.lastId = res.data.data.minTime;
						this.offset = res.data.data.offset;
						for(var i = 0; i < res.data.data.url.length; i++) {
							this.dataList.push(res.data.data.url[i]);
							this.authorIdList.push(res.data.data.userId[res.data.data.url.length - 1 - i])
						}
					}
					else{
						this.$toast('获取发布视频数据失败！')

					}
				}catch(err){
					console.error(err);
				}
				this.getLikeCount();
				this.getInitLikeFlag();
			},
			// async headleLoadingMedia(){
			// 	try{
			// 		let res = await axios.post('http://localhost:8020/douyin_feed/defaultFeed/getUserUrl',{
			// 			"userId": this.userId,
			// 			"lastId": this.lastId,
			// 			"offset": this.offset,
			// 		}
			// 		,
			// 		{
			// 			headers: {
			// 				'Authorization': 'Bearer ' + localStorage.getItem('authorization')
			// 			}
			// 		})
			// 		if(res.data.code=="200"){
			// 			console.info("res:",res)
			// 			// this.mediaIdList = res.data.data.mediaId;
			// 			this.lastId = res.data.data.minTime;
			// 			this.offset = res.data.data.offset;
			// 			for(var i = 0; i < res.data.data.url.length; i++) {
			// 				this.dataList.push(res.data.data.url[i]);
			// 			}
			// 		}
			// 		else{
			// 			this.$toast('获取发布视频数据失败！')

			// 		}
			// 	}catch(err){
			// 		console.error(err);
			// 	}
			// 	this.getLikeCount();
			// 	this.getInitLikeFlag();
			// }
			
		}
		
     }
</script>

<style scoped>
    .video-list{
		background: #000000;
    	height:100%;
    }
    .swiper-container{
		height:100%;
		position: relative;
    }
    .infobar_warp{
		position: absolute;
		bottom: 55px;
		left: 0;
	}
	.right_warp{
		position: absolute;
		bottom: 60px;
		right: 0;
	}
	/* 评论部分样式 */
	/* 点击评论  向上滑动的动画 */
	.up-enter-active, .up-leave-active {
	transition: all .5s;
	}
	.up-enter, .up-leave-to{
	opacity: 1;
	transform: translateY(100%);
	}
	
	.comment-warp-box{
		position: fixed;
		bottom: 0;
		left: 0;
		height: 500px;
		width: 100%;
		z-index: 88;
		background: #ffffff;
	}
	.comment-warp{
		position: fixed;
		bottom: 55px;
		left: 0;
		height: 500px;
		width: 100%;
		background: #ffffff;
		border-top-left-radius:10px;
		border-top-right-radius:10px;
		z-index: 99;
		padding: 10px 10px;
		box-sizing: border-box;
	}
	.comment-top{
		display: flex;
		align-items: center;
	}
	.number{
		flex:1;
		text-align: center;
	}
	.close{
		padding-right:10px;
		font-size: 20px;
		color:#666;
	}
	.comment-body{
		max-height: 450px;
		overflow: scroll;
		margin-top: 20px;
	}
	.comment-item{
		display: flex;
	}
	.user-pic{
		width: 33px;
		height: 33px;
	}
	.user-pic img{
		width: 33px!important;
		height: 33px;
		border-radius: 50%;
	}
	.item-info{
		margin-left: 10px;
		display: flex;
		flex:1;
	}
	.reply{
		width: 90%;
	}
	.reply-des{
		line-height:24px;
	}
	.reply .name{
		color: #666;
		font-size: 14px;
		margin-bottom:10px;
	}
	.reply .time{
		color: #666;
	}
	.zan .iconfont{
		font-size: 20px;
		color: #CCCCCC;
		margin: 0 10px;
	}
	.zan p{
		color: #cccccc;
		margin-top: 5px;
	}
	.sub-comment-item{
		display: flex;
		margin-left:33px ;
		margin-top: 10px;
	}
	.re-name{
		padding: 0 10px;
		color:#666;
	}
	.more{
		margin-top: 20px;
		text-align: center;
	}
	.reply-input{
		width: 100%;
		height: 50px;
		position: fixed;
		bottom: 0;
		left: 0;
		background: #FFFFFF;
		align-items: center;
		display: flex;
	}
	.reply-input input{
		line-height: 40px;
		width: 70%;
		border: none;
		outline:none; 
		padding: 0 10px;
	}
	.reply-input .emoji{
		font-size: 26px;
		color: #cccccc;
		margin-right: 6%;
	}
	.reply-input .iconfont{
		font-size: 26px;
		color: #cccccc;
		
	}
	.vedioParent{
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}
	.vedioChild{
		flex: 1;
	}
	.xxxx{
		color: #CCCCCC;
	}
</style>
