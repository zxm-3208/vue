<template>
	<div class="rightBar">
		<div class="rightBar-item">
			<div class="avatar-border">
				<img src="../../../public/images/head.jpg" alt="">
					
					<span v-if="pfollowFlag==-1" @click="follow"></span>
					<span v-if="pfollowFlag==0" @click="follow" class="iconfont icon-wuuiconxiangjifangda"></span>
					<span v-if="pfollowFlag==1" @click="follow" class="iconfont icon-jian"></span>	
					
			</div>
		</div>
		<!-- 点赞 -->
		<div class="item-icon"  @click="clickLike">
			<span v-if="plikeFlag==-1" class="iconfont icon-aixin"></span>
			<span v-if="plikeFlag==1" class="iconfont icon-aixin" id="redAiXin">
			</span>
			<p>{{this.plikeCount}}</p>
		</div>
		<!-- 评论 -->
		<!-- 当单击评论和评论图标时，将弹出评论信息 -->
		<div class="item-icon" @click.stop="showCom($event)">
			<span class="iconfont icon-pinglun"></span>
			<p>{{this.pcommentCount}}</p>
		</div>
		<!-- 分享 -->
		<div class="item-icon">
			<span class="iconfont icon-fenxiang"></span>
			<p>{{this.pforwardCount}}</p>
		</div>

		<div class="rightBar-item1">
			<div class="right-music">
				<img src="../../../public/images/head.jpg" alt="">
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		name:"RightBar",
		data(){
			return{
			}
		},
		props: ['pindex', 'plikeCount', 'plikeFlag', 'pforwardCount', 'pcommentCount', 'pfollowFlag'],
		created(){
			this.getIndex();
		},
		methods:{
			showCom(e){
				e.preventDefault();
				this.$emit('changeCom')
			},
			clickLike(){
				// icon变化
				this.$emit('changeLike')
			},
			getIndex(){
				this.$emit('changeIndex')
			},
			follow(){
				this.$emit('changeFollow')
			}
		}
	}
</script>
<style scoped>
	.rightBar{
		width: 80px;
		text-align: center;
	}
	.rightBar rightBar-item{
		height: 60px;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.avatar-border{
		height: 50px;
		border-radius: 50%;
		position: relative;
		text-align: center;
	}
	.avatar-border img{
		width: 49px;
		height: 49px;
		border-radius: 50%;
	}
	.avatar-border .icon-wuuiconxiangjifangda{
		color:#FE2C5A;
		position: absolute;
		top:40px;
		left:0;
		right:0;
	}
	.rightBar .item-icon{
		height: 60px;
		text-align: center;
		padding-top: 12px;
	}
	.item-icon .iconfont{
		color: #ffffff;
		font-size: 30px;
	}
	.item-icon p{
		color:#ffffff;
		font-size: 14px;
		padding-top: 5px;
	}
	.rightBar-item1{
		padding-top: 30px;
	}
	.rightBar-item1 .right-music{
		
		height: 54px;
		width: 54px;
		background: #1B1B1B;
		border-radius: 50%;
		display: flex;
		justify-content: center;  /* 水平居中 */
		align-items:center;       /* 垂直居中 */
		margin:0 auto;
		animation: round 6s linear infinite;
	}
	.right-music img{
		height: 30px;
		width: 30px;
		border-radius: 50%;
	}
	#redAiXin{
		color: #ff0000;
	}
	.avatar-border .icon-jian{
		color:#FE2C5A;
		position: absolute;
		top:40px;
		left:0;
		right:0;
	}
	
	@keyframes round{
		0%{transform: rotate(0deg);}
		100%{transform: rotate(360deg);}
	}
</style>
