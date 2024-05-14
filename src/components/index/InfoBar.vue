<template>
	<div class="info-bar">
		<div class="infobar-item"><span>{{ editName }}</span></div>
		<div class="infobar-item"><span>{{ title }}</span></div>
		<div class="infobar-item music-item">
			<span class="iconfont icon-icon-test"></span>
			<div  class="music-name">
				<span data-text="周杰伦">双节棍你好</span>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		props: ['editName', 'title'],
	}
</script>
<style scoped>
	.info-bar{
		color:#ebe5e5;
		font-size: 16px;
		padding-left: 10px;
	}
	.info-bar .infobar-item{
		padding: 2px 0;
	}
	.info-bar .infobar-item .icon-yinfu1{
		margin-right: 5px;
		display: block;
	}
	.music-item{
		display: flex;
	}
	.music-item .music-name{
		width:150px;
		white-space: nowrap;
		overflow: hidden;
		font-size:14px;
	}
	.music-item .music-name span{
		display: inline-block;
		animation: scroll 5s linear infinite;
	}
	.music-item .music-name span::after{
		content:attr(data-text);
		margin-left:30px;
	}
	@keyframes scroll{
	from{
			transform: translateX(0);
		}
	to{
			/* transform: translateX(calc(100%));  */
			transform: translateX(calc(-50% - 20px));
		}
	}
</style>
