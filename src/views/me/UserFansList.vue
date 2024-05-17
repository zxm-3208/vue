<template>
	<div class="msg">
		<div class="msg-warp">
			<div>
				<div>
					<myheader @changeBack="toBack" class="header" title="粉丝列表" hasLeft="true" rightTxt="false"></myheader>
				</div>
				<!-- 消息列表 -->
				<div class="msg-list-box">
					<div class="msg-list" v-for="(item,index) in userIdList" :key="index">
						<img :src="iconList[index]" alt="" @click="gotoUserHomePage(userIdList[index])">
						<div class="user-des"> 
							<div class="top">
								<span>{{nameList[index]}}</span>
								<span v-if="flag" ></span>
								<span v-if="followFlagList[index]=='1'"  @click="handleFollow(index)" >已关注</span>
								<span v-if="followFlagList[index]=='0'" @click="handleFollow(index)" >关注</span>
							</div>
							<div class="top top-msg">
								<span>{{introductionList[index]}}</span>
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
	import axios from 'axios'
	export default{
		data(){
			return {
				iconUrl: '',

				lastId: 0,
				offset: 0,

				userId: '',
				iconList: [],
				nameList: [],
				introductionList: [],

				userIdList: [],
				followFlagList: [],
				flag: 0,
			}
		},
		name:"",
		components:{
			Myheader
		},
		created(){
			this.initFans();
		},
		methods:{
			toBack(){
				this.$router.push('/me')
			},	
			async initFans(){
				this.userId = this.$route.query.userId;
				let res = '';
				if(this.userId == localStorage.getItem('userId')){
					this.lastId = Date.parse(new Date());
					res = await axios.post('http://localhost:8020/douyin_user/fansList/getFansList',{
						"userId": this.$route.query.userId,
						"lastId": this.lastId,
						"offset": this.offset,
					},
					{
						headers: {
							'Authorization': 'Bearer ' + localStorage.getItem('authorization')
						}
					})
				}
				else{
					this.lastId = Date.parse(new Date());
					res = await axios.post('http://localhost:8020/douyin_user/fansList/getOtherUserFansList',{
						"userId": this.$route.query.userId,
						"lastId": this.lastId,
						"offset": this.offset,
						'realUserId': localStorage.getItem('userId'),
					},
					{
						headers: {
							'Authorization': 'Bearer ' + localStorage.getItem('authorization')
						}
					})
				}
				console.info("fansList:",res);
				if(res.data.code=="200"){
					this.userIdList = res.data.data.userIdList
					this.iconList = res.data.data.iconList
					this.nameList = res.data.data.nameList
					this.introductionList = res.data.data.introductionList
					this.followFlagList = res.data.data.followFlagList
					for(var i = 0; i < this.userIdList.length; i++){
						if(this.iconList[i]==null || this.iconList[i]==''){
							this.iconList[i] = 'https://p.qqan.com/up/2018-3/15217745038903395.jpg'
						}
						if(localStorage.getItem('userId') == this.userIdList[i]){
							this.followFlagList[i] = '-1';
						}
					}
					console.info(this.iconList)
				}
				else{
					this.$toast('获取初始化信息失败！')
				}
			},

			async handleFollow(index){
				try{
					let res = await axios.post('http://localhost:8020/douyin_user/follow/authorFollow',{
						"userId": localStorage.getItem('userId'),
						"authorId": this.userIdList[index],
						"isFollow": this.followFlagList[index],
					})
					if(res.data.code == "200"){
						if(this.followFlagList[index]=='1'){
							this.followFlagList[index] = '0'
							this.flag = '1'
						}
						else if(this.followFlagList[index]=='0'){
							this.followFlagList[index] = '1'
							this.flag = '0'
						}
					}
				}
				catch(err){
					console.error(err);
				}
			},
			gotoUserHomePage(userId){
				this.$router.push("/homePage?userId="+userId)
			}
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
