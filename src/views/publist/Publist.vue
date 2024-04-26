
<template>
	<div class="edit">
		<myheader title="编辑资料" hasLeft="true" rightTxt="false" @changeBack="toBack"></myheader>
		<div class="edit-wrap">
			<div class="ava-box">
				<div class="introduction">
					<textarea id="textAreaIntroduction" rows="10" cols="20" v-model="textarea" placeholder="添加作品描述 ... "></textarea>
				</div>
				
				<div class="upload">
					<el-upload
						action="#" 
						list-type="picture-card"  
						:file-list="fileArr"   
						:http-request="handleChange"
						:limit="1"
						
						:auto-upload="false"
						:on-change="onChange"
					>
					<i class="el-icon-plus"></i>
					<div slot="tip" class="el-upload__tip">限制上传一张, 只能上传jpg/png文件，且不超过500kb</div>
					<!-- <el-button size="medium" type="primary">上传文件</el-button> -->
					</el-upload>
				</div>
			</div>
			<div class="edit-box">
				<div class="draft">
					<el-button @click="onDraft">保存到草稿箱</el-button>
				</div>
				<div class="publish">
					<el-button @click="onPublish">发布作品</el-button>
				</div>	
			</div>
		</div>
	</div>
</template>
<script>
  import {
    uploadCoverFile
  } from "./index.js";
	import Myheader from '../../components/header/Myheader.vue';
  import SparkMD5 from "spark-md5";
  import axios from 'axios';
	export default{
		name:'Edit',
    data () {
      return {
        textarea: "",
        icon_url: this.$route.query.coverURL,
		introduction_text: "",
      }
    },
    computed:{
      headers() {
        // 上传图片添加请求头header
        return {
          'Content-Type': 'multipart/form-data',
          'authorization': localStorage.getItem('authorization') // 从本地获取token就行
        }
      }, 
      fileArr() {
			// 上传图片 显示默认图片
			return this.icon_url ? [{ url: this.icon_url }] : []
		}
		},
		components:{
			Myheader,
		},

		methods:{
			toBack(){
					this.$router.push('/Upload')
				},
			//文件上传
			async handleChange(file) {
				console.info("======");
				let mediaId = this.$route.query.mediaId;
				console.info(mediaId);
				console.info("======");
				let formData = new FormData();
				let spark = new SparkMD5.ArrayBuffer();
				let fileMd5 = spark.end();
				formData.append("file", file.file); // 使用FormData可以将blob文件转成二进制binary
				formData.append("name", file.file.name);
				formData.append("md5", fileMd5);
				formData.append("mediaId", mediaId);
				console.info(file);
				console.info(file.file);
				console.info(file.file.name);
				console.info(fileMd5);
				console.info(mediaId);
				const res = await uploadCoverFile(formData);
				console.info(res);
				if (res.data.resultCode === 200) {
				console.log("封面上传成功");
				}
			},
			onChange(file, fileList) {
				// 限制大小在10MB之内
      			let isLt10M = file.size / 1024 < 500;
				if(!isLt10M) {
        			this.$message.error("上传文件大小不能超过 500KB!");
					if(fileList.length > 1) {
						this.fileList = [fileList[fileList.length - 1]];
					}
      			}
			},
			onDraft(){
				this.$toast('该功能还未实现！')
			},
			async onPublish(){
				this.introduction_text = document.getElementById("textAreaIntroduction").value;
				try{
					let res = await axios.post('http://localhost:8020/douyin_publish/publish/editPublist',{
						"userId": localStorage.getItem('userId'),
						"title": this.introduction_text,
						"mediaId": this.$route.query.mediaId,
						"coverUrl": this.icon_url,
						"mediaUrl": this.$route.query.mediaUrl,
					})
					console.info(res)
					if(res.data.resultCode=="200"){
						// 跳转到首页或其他需要登录的页面
						this.$router.push({ path:"/me"})
					}
					else{
						this.$toast('发布作品出错！')

					}
				}catch(err){
					console.error(err);
				}
			}
		}
	}
</script>
<style scoped>
	.edit{
		background: #101821;
		height: 100vh;
	}
	.introduction{
		color: #ffffff;
		width: 80%;
		height: 60%;
	}
	.edit-wrap{
		padding: 0 10px;
		box-sizing: border-box;
		overflow: hidden;
	}
	.ava-box{
		color: #cccccc;
		text-align: center;
		padding: 20px;
    	display: flex;
	}
	.edit-box{
		border-top: 1px solid #292831;
		color:#cccccc;
		padding: 10%;
		display: flex;
	}
	.draft{
		padding: 8%;
		text-align: center;
		/* display: flex; */
	}
	.publish{
		padding: 8%;
		text-align: center;
		display: flex;
	}
	
	.el-upload--picture-card {
	    height: 120px !important;
	    line-height:110px !important;
	
	}
	
	.el-icon-plus:before {
	    content: "\A\E6D9\A上传封面" !important;
	    font-size:20px !important;
	    white-space:pre !important;
	}
	.upload{
		float: right;
	}
	textarea {
		padding: 10px;
		line-height: 1.5;
		border-radius: 5px;
		border: 1px solid #ccc;
		box-shadow: 1px 1px 1px #999;
	}
</style>
