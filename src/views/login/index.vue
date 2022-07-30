<template>
    <div>
        <!-- 导航栏 -->
        <van-nav-bar class="page-nav-bar" title="登录">
            <van-icon
                class="close-btn"
                slot="left"
                name="cross"
                @click="$router.back()"
            />
        </van-nav-bar>
        <!-- 导航栏 -->

        <!-- 登录表单 -->
        <van-form @submit="onSubmit" ref="loginForm">
            <van-field
                v-model="user.mobile"
                name="mobile"
                placeholder="请输入手机号"
                :rules="userFormRules.mobile"
                type="number"
                maxlength="11"
            >
                <i slot="left-icon" class="iconfont icon-shouji"></i>
            </van-field>
            <van-field
                v-model="user.code"
                name="code"
                placeholder="请输入验证码"
                :rules="userFormRules.code"
                type="number"
                maxlength="6"
            >
                <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
                <!-- 获取验证码 -->
                <template #button>
                    <!-- 验证码倒计时 -->
                    <van-count-down
                        :time="time"
                        format="ss 秒"
                        v-if="isShowTime"
                        @finish="isShowTime = false"
                    />
                    <van-button
                        class="send-sms-btn"
                        round
                        size="small"
                        type="default"
                        @click="sendSMS"
                        native-type="button"
                        v-else
                        >获取验证码
                    </van-button>
                </template>
            </van-field>
            <div class="login-btn">
                <van-button block type="info" native-type="submit">
                    登录
                </van-button>
            </div>
        </van-form>
        <!-- 登录表单 -->
    </div>
</template>

<script>
import { loginAPI, sendSMSAPI } from "@/api";
export default {
    name: "Login",
    data() {
        return {
            user: {
                // 手机号、
                mobile: "13911111111",
                // 验证码
                code: "246810",
            },
            // 表单校验规则
            userFormRules: {
                mobile: [
                    {
                        required: true,
                        message: "手机号不能为空！",
                    },
                    {
                        pattern: /^1[3|5|7|8]\d{9}$/,
                        message: "手机号格式错误！",
                    },
                ],
                code: [
                    {
                        required: true,
                        message: "请填写验证码！",
                    },
                    {
                        pattern: /^\d{6}$/,
                        message: "验证码格式错误！",
                    },
                ],
            },
            // 发送验证码倒计时
            time: 5 * 1000,
            isShowTime: false,
        };
    },
    methods: {
        async onSubmit() {
            // 获取表单数据
            const user = this.user;

            this.$toast.loading({
                message: "加载中···",
                // 禁用背景点击
                forbidClick: false,
                // 展示时常，为 0 时一直展示
                duration: 0,
            });

            // 表单验证
            try {
                const { data } = await loginAPI(user);
                this.$store.commit("setUser", data.data);
                this.$toast.success("登陆成功！");
                // 登录成功，跳转回原来页面
                this.$router.back();
            } catch (err) {
                // console.log(err);
                if (err.response.status === 400) {
                    console.log("手机号或验证码错误");
                    this.$toast.fail("手机号或验证码错误");
                } else {
                    console.log("登录失败，请稍后重试", err);
                    this.$toast.fail("登录失败，请稍后重试");
                }
            }
        },
        // 发送验证码
        async sendSMS() {
            try {
                await this.$refs.loginForm.validate("mobile");
            } catch (err) {
                return console.log("手机号填写错误！", err);
            }

            // 验证成功后
            try {
                await sendSMSAPI({ mobile: this.user.mobile });
                this.$toast("发送验证码成功！");
                this.isShowTime = true;
            } catch (err) {
                if (err.response.status === 429)
                    this.$toast("发送太频繁了，请稍后重试！");
                else if (err.response.status === 404)
                    this.$toast("手机号不正确");
                else this.$toast("发送验证码失败，请稍后重试！");
            }
        },
    },
};
</script>

<style lang="less">
.page-nav-bar {
    .close-btn {
        font-size: 16px;
        color: #fff;
    }
}
.van-form {
    .iconfont {
        font-size: 19px;
    }
    .send-sms-btn {
        width: 78px;
        height: 23px;
        line-height: 23px;
        font-size: 11px;
        background-color: #ededed;
    }
    .login-btn {
        margin: 27px 14px;
        width: 347px;
        height: 44px;
        .van-button--info {
            background-color: #6db4fb;
            border: 1px solid #6db4fb;
        }
    }
}
</style>
