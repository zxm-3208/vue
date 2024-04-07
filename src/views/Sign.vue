<!-- 手机验证组件 主页面 -->
<template>
    <div class="sign">
        <div class="sign-header">
            <router-link to="/index" tag="span" class="iconfont icon-shanchu"></router-link>
            <span>帮助</span>
        </div>
        <div class="sign-content">
            <div class="des">
                <h2>登录后即可展示自己</h2>
                <p>登录即表明同意<a href="">抖音协议</a>和<a href="">隐私协议</a></p>
            </div>
            <div class="sign-box">
                <div class="sele">
                    <select v-model="telErea" class="sele-controll">
                        <option value="">+86</option>
                    </select>
                </div>
                <!-- 输入手机号 -->
                <div class="inp">
                    <input v-model="phone" @input="changeTel" type="text" class="inp-controll" placeholder="请输入手机号" />
                </div>

            </div>
            <div class="not-sign">
                <p>未注册手机号验证通过后将自动登录</p>
            </div>
            <div class="code-btn">
                <button :disabled="disabled" :class="[btnBg?'active':'']" @click="getCode">获取短信验证码</button>
            </div>
            <div class="other">
                <router-link tag="a" to="/tbsign">密码登录</router-link>
                <span @click="show">其他方式登录</span>
            </div>
        </div>
        <!-- 使用VUE的动态过渡效果 -->
        <transition name="up">
            <!-- 其他登录方式 -->
            <div class="mask" v-if="showMask">
                <div class="oauth">
                    <ul>
                        <li class="oauth-item">
                            <img src="../../public/images/tou.jpg" alt="">
                            <span>今日头条登录</span>
                        </li>
                        <li class="oauth-item">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-QQ"></use>
                            </svg>
                            <span>QQ登录</span>
                        </li>
                        <li class="oauth-item">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-weixin"></use>
                            </svg>
                            <span>微信登录</span>
                        </li>
                        <li class="oauth-item">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-weibo"></use>
                            </svg>
                            <span>微博登录</span>
                        </li>
                        <li class="space"></li>
                        <li class="oauth-item" @click="close">取消</li>
                    </ul>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'Sign',
        data() {
            return {
                telErea: '',
                showMask: false,
                disabled: true,
                btnBg: false,
                phone: ''
            }
        },
        methods: {
            getCode() {
                axios.get('http://localhost:8020/douyin_auth/user/code?phone='+this.phone)
                .then(
                    this.$router.push("/code?phone="+this.phone),
                )
                .catch(error => {
                    console.error(error);
                });
                // this.$router.push("/user/code?"+this.phone) //去密码登陆页面
            },
            show() {
                this.showMask = true;
            },
            close() {
                this.showMask = false;
            },
            changeTel(e) {
                this.phone = e.target.value;
                var reg = /^1[345789]{1}\d{9}$/;
                if (reg.test(this.phone)) {
                    this.btnBg = true;
                    this.disabled = false;
                } else {
                    this.btnBg = false;
                    this.disabled = true;
                }
            }
        }
    }
</script>

<style scoped>
    .sign {
        padding: 30px;
    }

    .sign-header {
        display: flex;
        justify-content: space-between;
    }

    .sign-header .iconfont {
        font-size: 25px;
    }

    .sign-content {
        padding: 40px 10px;
    }

    .des h2 {
        font-size: 24px;
        font-weight: bold;
    }

    .des p {
        line-height: 50px;
        color: #666;
    }

    .des p a {
        color: #628db8;
        padding: 0 5px;
    }

    .sign-box {
        display: flex;
        height: 50px;
        align-items: center;
        background-color: #f9f9f9;
    }

    .sele-controll {
        background-color: #f9f9f9;
        height: 36px;
        font-weight: bold;
        margin-left: 5px;
        border: none;
        outline: none;
    }

    .inp-controll {
        background-color: #f9f9f9;
        height: 36px;
        margin-left: 10px;
        border: none;
        width: 90%;
        outline: none;
    }

    input {
        caret-color: #fe2c55;
    }

    input::-webkit-input-placeholder {
        color: #666;
    }

    .not-sign p {
        color: #666;
        font-size: 14px;
        margin-top: 10;
    }

    .code-btn button {
        margin: 20px 0;
        width: 100%;
        padding: 15px 0;
        border: none;
        color: #fff;
    }

    .code-btn .active {
        color: #fff;
        background-color: #FE2C55;
    }

    .other {
        display: flex;
        justify-content: space-between;
    }

    .other a {
        color: #628db8;
    }

    .mask {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.4);
    }

    .oauth {
        height: 48%;
        width: 100%;
        position: absolute;
        bottom: 0;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        background: #ffffff;
        text-align: center;
    }

    .oauth-item {
        border-bottom: 1px solid #f5f5f5;
        line-height: 62px;
    }

    .oauth-item span {
        margin-left: 5px;
    }

    .oauth-item img {
        width: 2em;
        height: 2em;
        vertical-align: -0.8em;
    }

    .space {
        height: 8px;
        width: 100%;
        background: #ccc;
    }

    /* 阿里图标库 */
    .icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
        font-size: 25px;
    }

    /* 其他登录动画 */
    .up-enter-active,
    .up-leave-active {
        transition: all .5s;
    }

    .up-enter,
    .up-leave-to {
        opacity: 1;
        transform: translateY(100%);
    }
</style>