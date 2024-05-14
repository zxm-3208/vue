<template>
	<div class="edit">
		<myheader title="编辑资料" hasLeft="true" rightTxt="false" @changeBack="toBack"></myheader>
		<div class="edit-wrap">
			<div class="ava-box">
				<div class="avatar">
					<img  :src="iconUrl" alt="">
					<span class="iconfont icon-xiangji"></span>
					<input type="file" ref="iconUpload" @change="refreshIcon">
				</div>
				<p>点击更换头像</p>
			</div>
			<div class="edit-box">
				<div class="edit-item">
					<span class="label">名字</span>
					<div class="label">
						<!-- <input  v-model="editName" @change="changeName" type="text" class="inp-controll" /> -->
						<input  v-model="editName" @change="changeName" type="text" class="inp-controll" />
					</div>
				</div>
				<div class="edit-item">
					<span class="label">抖音号</span>
					<span class="label">{{userId}}
					</span>
				</div>
				<div class="edit-item">
					<span class="label">简介</span>
					<div class="label">
						<!-- <input  v-model="editIntro" @change="changeIntro" type="text"  class="inp-controll"/> -->
						<input  v-model="editIntro" type="text"  class="inp-controll"/>
					</div>
				</div>
				<div class="edit-item">
					<span class="label">性别</span>
					<select v-model="gender" class="inp-controll">
						<option class="inp-controll" value="">请选择一个选项</option>
						<option v-for="(item, index) in items" :value="item.value" :key="index" class="inp-controll">{{item.text}}</option>
					</select>
				</div>
				<div class="edit-item">
					<span class="label">生日</span>
					<input type="date" :value="birthday" class="inp-controll">
				</div>
			</div>
			<div class="onSubmit">
				<el-button v-if="disabled"  @click="onSubmit">提交信息</el-button>
			</div>	
		</div>
	</div>
</template>
<script>
	import Myheader from '../../components/header/Myheader.vue'
	import axios from 'axios';
	export default{
		name:'Edit',
		data(){
            return {
				iconUrl: '',
				editName: "姓名",
				userId: "1111",
				editIntro: "简介",
				items:[{text:'男',value:'0'},{text:'女',value:'1'},{text:'保密',value:'2'}],//下拉选数据
            	gender:'1', //下拉选值
				birthday: '',
				disabled: true,
			}
		},
		components:{
			Myheader
		},
		mounted(){
			this.getInitInf();
		},
		methods:{
			toBack(){
				this.$router.push('/me')
			},
			formatDate(date) {
				const year = date.getFullYear();
				const month = ('0' + (date.getMonth() + 1)).slice(-2);
				const day = ('0' + date.getDate()).slice(-2);
				
				return `${year}-${month}-${day}`;
			},
			async getInitInf(){	// 获取初始信息
				try{
					this.userId = localStorage.getItem('userId');
					let res = await axios.get('http://localhost:8020/douyin_user/edit/getAttribute?userId='+this.userId,
					{
						headers: {
							'Authorization': 'Bearer ' + localStorage.getItem('authorization')
						}
					})
					console.info("edit:",res);
					if(res.data.code=="200"){
						this.icon = res.data.data.icon;
						this.editName = res.data.data.editName;
						this.userId = res.data.data.userId;
						this.editIntro = res.data.data.editIntro;
						this.gender = res.data.data.gender;
						this.birthday = this.formatDate(new Date(res.data.data.birthday*1));
						if(this.icon!=null && this.icon!=''){
							this.iconUrl = this.icon
						}else{
							this.iconUrl = 'https://p.qqan.com/up/2018-3/15217745038903395.jpg'
						}
					}
					else{
						this.$toast('获取初始化信息失败！')
					}
				}catch(err){
					console.error(err);
				}
			},
			refreshIcon(event){
				const file = this.$refs.iconUpload.files[0]; // 获取选中的文件
				if (!file) {
					return;
				}
				// 创建一个FileReader对象来读取文件
				const reader = new FileReader();
				// 使用readAsDataURL方法读取文件为DataURL，这样就可以在<img>标签中显示了
							reader.onload = (e) => {
					// 当文件读取完成时，将结果赋值给previewImageUrl
					this.iconUrl = e.target.result;
				};
				reader.readAsDataURL(file);
			},
			changeName(){	// 检查name格式
				const regex = /^[a-zA-Z0-9_]{6,30}$/;
				if (!regex.test(this.editName)) {
					this.disabled = false;
					this.$toast('用户名必须是6到30个字符的字母、数字和下划线组合!')
				} else {
					this.disabled = true;
				}
			},
			async onSubmit(){		// 提交编辑信息
				try{
					this.userId = localStorage.getItem('userId');
					let formData = new FormData();
					if (this.$refs.iconUpload.files.length > 0) {
						formData.append("file", this.$refs.iconUpload.files[0]); // 修正为获取files数组的第一个元素
						formData.append("defaultIcon", '0');
					}else{
						formData.append("defaultIcon", this.iconUrl);
					}
					console.info(new Date(this.birthday).getTime());
					formData.append("editName", this.editName);
					formData.append("userId", this.userId);
					formData.append("editIntro", this.editIntro);
					formData.append("gender", this.gender);
					formData.append("birthday", new Date(this.birthday).getTime());
					let res = await axios.post('http://localhost:8020/douyin_user/edit/submitEdit',formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
							'authorization': localStorage.getItem('authorization')
						}
					})
					console.info("submit:",res);
					if(res.data.code=="200"){
						this.icon = res.data.data.icon;
						if(this.icon!=null){
							this.iconUrl = this.icon
						}
						this.$toast('用户资料编辑成功！')
					}
					else{
						this.$toast('上传初始化信息失败！')
					}
				}catch(err){
					console.error(err);
				}
			},
		}
	}
</script>
<style scoped>
	.edit{
		background: #101821;
		height: 100vh;
	}
	.edit-wrap{
		padding: 0 10px;
		box-sizing: border-box;
	}
	.ava-box{
		color: #cccccc;
		text-align: center;
		padding: 20px;
	}
	.avatar{position:relative;}
	.avatar img{
		height: 100px;
		width: 100px;
		border-radius:50px;
		margin-bottom: 16px;
		opacity: .6;
	}
	.avatar .iconfont{
		position: absolute;
		left: 50%;
		top: 40%;
		transform:translate(-50%,-50%) ;
		font-size: 26px;
		color: #FFFFFF;
	}
	.avatar input{
		position: absolute;
		left: 50%;
		top:40%;
		width: 50%;
		transform:translate(-50%,-50%);
		opacity:0;
	}
	.edit-box{
		border-top: 1px solid #292831;
		color:#cccccc;
	}
	.edit-item{
		display: flex;
		justify-content: space-between;
		line-height: 55px;
	}
	.edit-item .label{
		color: #FFFFFF;
	}
	.edit-item .iconfont{
		margin-right: 10px;
	}
	.inp-controll {
        background-color: #101821;
        height: 36px;
        margin-left: 40px;
		margin-right: 0px;
		text-align: right;
		font-size: 16px;
        border: none;
        width: 80%;
        outline: none;
		color: #FFFFFF;
    }
	.inp-selec{
		background-color: #101821;
	}
	.onSubmit{
		text-align: center
	}
</style>
