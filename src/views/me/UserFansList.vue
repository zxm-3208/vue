<template>
	<div class="msg">
		<div class="msg-warp">
			<div>
				<div>
					<myheader @changeBack="toBack" class="header" title="粉丝列表" hasLeft="true" rightTxt="false" ></myheader>
				</div>
				<!-- 消息列表 -->
				<div class="msg-list-box">
					<div class="msg-list">
						<img src="../../../public/images/head2.jpg" alt="">
						<div class="user-des">
							<div class="top">
								<span>抖音小助手</span>
								<span>12：20</span>
							</div>
							<div class="top top-msg">
								<span>抖音安全课堂</span>
								<span class="no-see"></span>
							</div>
						</div>
					</div>
					<div class="msg-list">
						<img src="../../../public/images/head1.jpg" alt="">
						<div class="user-des">
							<div class="top">
								<span>抖音小助手</span>
								<span>2：20</span>
							</div>
							<div class="top top-msg">
								<span>在干嘛？</span>
								<span class="no-see"></span>
							</div>
						</div>
					</div>
					<div class="msg-list">
						<img src="../../../public/images/head1.jpg" alt="">
						<div class="user-des">
							<div class="top">
								<span>路人甲</span>
								<span>2：22</span>
							</div>
							<div class="top top-msg">
								<span>在干嘛？</span>
								<span class="no-see"></span>
							</div>
						</div>
					</div>
					<div class="msg-list">
						<img src="../../../public/images/head1.jpg" alt="">
						<div class="user-des">
							<div class="top">
								<span>路人甲</span>
								<span>2：22</span>
							</div>
							<div class="top top-msg">
								<span>在干嘛？</span>
								<span class="no-see"></span>
							</div>
						</div>
					</div>
					<div class="msg-list">
						<img src="../../../public/images/head1.jpg" alt="">
						<div class="user-des">
							<div class="top">
								<span>路人甲</span>
								<span>2：22</span>
							</div>
							<div class="top top-msg">
								<span>在干嘛？</span>
								<span class="no-see"></span>
							</div>
						</div>
					</div>
				</div>	
			</div>
		</div>
	</div>
</template>
<script>
	import Myheader from '../../components/header/Myheader.vue'
	export default{
		name:"",
		components:{
			Myheader
		},
		methods:{
			toBack(){
				this.$router.push('/me')
			},	
		}
	}
</script>
<style scoped>
	.msg-warp{
		padding:0 20px;
		color: #ffffff;
		height: 100%;
		background-color: #101821;
		/* 填满剩下的空间 */	
		height:-webkit-fill-available;
	}
	.mag-nav{
	padding:20px 5px;
	display: flex;
	justify-content:space-between;
	}
	.mag-nav-item{
	text-align: center;
	}
	.mag-nav-item p{
		text-align: center;
	}
	.icon-box{
	height:40px;
	width:40px;
	border-radius: 5px;
	margin-bottom: 5px;
	}
	.icon{
	width: 1em;
	height: 1em;
	vertical-align: -0.15em;
	fill: currentColor;
	overflow: hidden;
	font-size: 40px;
	}
    .msg{
        background-color: #101821;
    
    }
	.msg-ab{
		padding: 20px 0;
		border-top:1px solid #242630;
		border-bottom:1px solid #242630;
		
	}
	.msg-ab img{
		height: 120px;
		width: 100%;
	}
	.down{
		padding: 20px 0;
		color: #cccccc;
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #242630;
	}
	.down .btn{
		padding: 8px 25px;
		border: none;
		outline: none;
		background-color: #FE2C55;
		color: #FFFFFF;
		border-radius:2px;
		
	}
	.msg-list-box{
		padding-top:30px ;
	}
	.msg-list{
		display: flex;
		padding: 10px 0;
	}
	.msg-list img{
		width: 50px;
		height: 50px;
		border-radius:50%;
	}
	.user-des{
		flex: 1;
		height: 60px;
	}
	.user-des .top{
		font-size: 14px;
		margin-left: 10px;
		display: flex;
		justify-content: space-between;
		line-height: 25px;
	}
	.top-msg{
		color: #666;
		align-items:center;
	}
	.no-see{
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background-color:#face15;
	}
</style>
