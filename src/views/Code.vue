<!-- 验证码登陆组件 -->
<!-- 包括60秒倒计时 

输入正确验证码后，登录按钮变激活状态

点击登录后，进入个人信息页面 -->

<template>
	<div class="sign">
		<div class="sign-header">
			<router-link to="/sign" tag="span" class="iconfont icon-jiantou3"></router-link>
			<span>帮助</span>
		</div>
		<div class="sign-content">
			<div class="des">
				<h2>请输入验证码</h2>
				<p>验证码已通过短信发送至+86 {{this.$route.query.phone}}</p>
			</div>
			<div class="sign-box">
				<div class="inp">
					<input @input="changeCode" v-model="code" type="text" class="inp-controll" placeholder="请输入手机验证码" />
				</div>
				<div class="sele">
					{{time}}
				</div>
			</div>
			<div class="code-btn">
				<button @click="clickFun" :disabled="disabled" :class="[btnBg?'active':'']" class="load-btn"><div class="loads" v-if="loading"></div>登录</button>
			</div>
		</div>
	</div>
</template>
<script>
	import axios from 'axios';

	export default{
		name:"Tbsign",
		data(){
			return{
				time:60,
				code:'',
				disabled:true,
				btnBg:false,
				loading:false
			}
		},
		created(){
			this.timer();
		},
		methods:{
			// 检测验证码是否一致
			changeCode(){
				if(this.code.length==6){
					this.disabled=false,
					this.btnBg=true;
					// this.loading=true;  //验证码正确才显示loading
				}else{
					this.disabled=true,
					this.btnBg=false;
					// this.loading=false;
				}	
			},
			async clickFun(){
				// 登录请求处理
				try{
					let res = await axios.post('http://localhost:8020/douyin_auth/user/login',{
						"phone": this.$route.query.phone,
						"code": this.code
					})
					console.info(res)
					if(res.data.code=="200"){
						// 登录成功，将Token和用户ID存储在内存中
						localStorage.setItem('authorization',"Bearer "+res.data.data.authorization)
						localStorage.setItem('userId', res.data.data.userId)
						// 跳转到首页或其他需要登录的页面
						this.$router.push({ path:"/me"})
					}
					else{
						this.$toast('验证码错误！')

					}
				}catch(err){
					console.error(err);
				}
			},
			// 60秒 倒计时
			timer(){
				if(this.time>0){
					this.time--;
					setTimeout(this.timer,1000);
				}else{
					console.log(1)
				}
			}
		}
	}
</script>

<style scoped>
	.sign{
		padding: 30px;
	}
	.sign-header{
		display: flex;
		justify-content:space-between;
	}
	.sign-header .iconfont{
		font-size: 25px;
	}
	.sign-content{
		padding: 40px 10px;
	}
	.des{
		margin-bottom: 15px;
	}
	.des h2{
		font-size:24px;
		font-weight: bold;
		color: #000000;
	}
	.des p{
		line-height:40px;
		color: #666;
		font-size:14px;
	}
	.des p a{
		color: #628db8;
	}
	.sign-box{
		display: flex;
		height: 50px;
		align-items: center;
		background-color: #f9f9f9;
		margin-top: 12px;
		justify-content: space-between;
	}
	.sele{
		margin-right: 20px;
		color: #666;
	}
	.inp-controll{
		background-color: #f9f9f9;
		height: 36px;
		margin-left:10px;
		border: none;
		width: 90%;
		outline: none;
	}
	input{
		caret-color: #fe2c55;
	}
	input::-webkit-input-placeholder{
		color:#666;
	}
	
	.code-btn button{
		margin: 20px 0;
		width: 100%;
		padding: 15px 0;
		border: none;
		color: #f9f9f9;
	}
	.code-btn .active{
		color:#fff;
		background-color: #FE2C55;
	}
	.load-btn{
		display: flex;
		justify-content: center;
	}
	.loads{
		width: 14px;
		height: 14px;
		border: 3px solid #fff;
		border-bottom: 3px solid #ccc;
		border-radius: 50%;
		animation:load 1s infinite linear;
		margin-right: 5px;
	}
	@keyframes load{
		from{
			transform: rotate(0deg);
		}
		to{
			transform: rotate(360deg);
		}
	}
</style>

