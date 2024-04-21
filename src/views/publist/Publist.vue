
<template>
	<div class="edit">
		<myheader title="编辑资料" hasLeft="true" rightTxt="false" @changeBack="toBack"></myheader>
		<div class="edit-wrap">
      <div class="ava-box">
        <div class="introduction">
          <textarea v-model="textarea" placeholder="请输入 ... "></textarea>
        </div>
        
        <el-upload
            action="#" 
            list-type="picture-card"  
            :file-list="fileArr"   
            :http-request="handleChange"
          >
          <i class="el-icon-plus"></i>
          <!-- <div slot="tip" class="el-upload__tip">限制上传一张, 只能上传jpg/png文件，且不超过500kb</div> -->
          <el-button size="medium" type="primary">上传文件</el-button>
        </el-upload>


        
			</div>
			<div class="edit-box">
				<div class="edit-item">
					<span class="label">名字</span>
					<span class="label">名字
						<span class="iconfont icon-arrow-right"></span>
					</span>
				</div>
				<div class="edit-item">
					<span class="label">抖音号</span>
					<span class="label">1234546789
						<span class="iconfont icon-arrow-right"></span>
					</span>
				</div>
				<div class="edit-item">
					<span class="label">简介</span>
					<span class="label">失败是成功之母
						<span class="iconfont icon-arrow-right"></span>
					</span>
				</div>
				<div class="edit-item">
					<span class="label">学校</span>
					<span class="label">点击设置
						<span class="iconfont icon-arrow-right"></span>
					</span>
				</div>
				<div class="edit-item">
					<span class="label">性别</span>
					<span class="label">女
						<span class="iconfont icon-arrow-right"></span>
					</span>
				</div>
				<div class="edit-item">
					<span class="label">生日</span>
					<span class="label">1991-1-1
						<span class="iconfont icon-arrow-right"></span>
					</span>
				</div>
				<div class="edit-item">
					<span class="label">地区</span>
					<span class="label">中国 北京
						<span class="iconfont icon-arrow-right"></span>
					</span>
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
	export default{
		name:'Edit',
    data () {
      return {
        textarea: "",
        icon_url: this.$route.query.coverURL,
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
    width: 80px;
    height: 100px;
  }
	.edit-wrap{
		padding: 0 10px;
		box-sizing: border-box;
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
</style>
