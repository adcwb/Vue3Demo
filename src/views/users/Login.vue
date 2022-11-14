<template>
  <div class="main">
    <div class="login_box">
      <div class="title">
        <p>微信公众平台</p>
      </div>
      <div class="inp">
        <input
            v-model="username"
            type="text"
            placeholder="用户名"
            class="user"
        />
        <input
            v-model="password"
            type="password"
            name=""
            class="pwd"
            placeholder="密码"
        />

        <div class="rember">

          <a-checkbox @change="onChange" class="no"> 记住密码 </a-checkbox>

        </div>
        <a-button
            class="login_btn"
            @click="login"
            type="primary"
            :loading="loginIng"
        >
          登录
        </a-button>
      </div>
<!--      <a-button @click="loginSuccess">登录成功</a-button>-->
    </div>
  </div>
</template>

<script>
import { message } from 'ant-design-vue';
import { ref } from 'vue'
import {useRouter} from 'vue-router'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  setup() {
    const username = ref("")
    const password = ref("")
    const loginIng = ref(false)
    const router = useRouter()
    const login = () => {
      loginIng.value = true
      message.success('This is a success message');
      loginIng.value = false
      router.push("/home")
    };

    return {
      username,
      password,
      loginIng,
      login,
    }
  },

  data() {
    return {
      login_type: 0,
      account: "18126192471",
      password2: "123456",
      age: "",
      mobiles: "",
      sms_code: "",
      email: "",
      remember: false,
    };
  },

  methods: {
    onChange(val){
      this.remember=val.target.checked
    },
    // login() {
    //   //  向后端发送登录请求，此处应该判断本地是否有token，若有的话直接进入后台管理页面
    //   this.loginIng = true;
    //   this.loginSuccess()
    //   this.loginIng = false;
    //   // this.$router.replace("/");
    //   // this.$router.go(-1); // 跳转到上一页
    //
    //   // this.$axios.post("", {
    //   //       method: "User.login",
    //   //       params: {
    //   //         account: this.account,
    //   //         password: this.password,
    //   //       },
    //   //     })
    //   //     .then((res) => {
    //   //       if (this.remember) {
    //   //         localStorage.token = res.data.result.access_token;
    //   //         localStorage.username = res.data.result.username;
    //   //         localStorage.id = res.data.result.id;
    //   //         sessionStorage.removeItem("token");
    //   //         sessionStorage.removeItem("username");
    //   //         sessionStorage.removeItem("id");
    //   //       } else {
    //   //         sessionStorage.token = res.data.result.access_token;
    //   //         sessionStorage.username = res.data.result.username;
    //   //         sessionStorage.id = res.data.result.id;
    //   //         localStorage.removeItem("token");
    //   //         localStorage.removeItem("username");
    //   //         localStorage.removeItem("id");
    //   //       }
    //   //       this.loginIng = false;
    //   //
    //   //       this.$router.replace("/");
    //   //       // this.$router.go(-1); // 跳转到上一页
    //   //     })
    //   //     .catch(() => {
    //   //       this.loginIng = false;
    //   //
    //   //       this.$alert("用户名或密码错误，登录失败");
    //   //     });
    // },

    // 手机号校验接口
    checkPhone() {
      let phoneNumber = this.mobile;
      // 前端
      let reg = /^1[3-9][0-9]{9}$/;
      console.log(reg.test(phoneNumber));
      if (reg.test(phoneNumber)) {
        this.$message.error("手机号 格式 error");
        return false;
      }
      // 发送请求
      this.$axios
          .post("", {
            method: "User.mobile",
            params: {
              mobiles: this.mobiles,
            },
          }) // request.GET.get(phone)
          .then((res) => {
            if (res.data.result.errno != "1000") {
              alert(JSON.stringify(res.data.result.errmsg));
            }
            console.log(res.data.result.errmsg);
          })
          .catch((error) => {
            this.$message.error(error.response.data.error_msg);
          });
    },

    // 注册接口
    registerHandler() {
      this.$axios
          .post("", {
            method: "User.register",
            params: {
              username: this.username,
              mobiles: this.mobiles,
              email: this.email,
              age: this.age,
              password: this.password,
              password2: this.password2,
              sms_code: this.sms_code,
            },
          })
          .then((res) => {
            sessionStorage.token = res.data.token;
            sessionStorage.username = res.data.username;
            sessionStorage.id = res.data.id;
            this.$router.push("/");
          })
          .catch((error) => {
            console.log(error.response);
          });
    },

    // 点击获取验证码
    getSmsCode() {
      this.$axios
          .post("", {
            method: "User.sms",
            params: {
              mobiles: this.mobiles,
            },
          })
          .then(() => {
            if (!this.flag) {
              this.flag = setInterval(() => {
                if (this.interval_time > 0) {
                  this.interval_time--;
                  this.btn_msg = `${this.interval_time}秒后重新获取`;
                } else {
                  this.interval_time = 60;
                  this.btn_msg = "点击发送验证码";
                  clearInterval(this.flag);
                  this.flag = false;
                }
              }, 1000);
            }
          })
          .catch((error) => {
            this.$message.error(error.response.data.msg);
          });
    },
  },
};
</script>

<style scoped>
.main {
  width: 100%;
  height: 100vh;
  background: url("../../assets/users/login-bg.jpg");
  background-size: 100% 100%;
  padding-top: 10%;
}

.box img {
  width: 100%;
  min-height: 100%;
}

.box .login {
  width: 500px;
  height: 400px;
  margin: auto;
  right: 0;
  bottom: 0;
  top: -338px;
}

.login .login-title {
  width: 100%;
  text-align: center;
}

.login-title img {
  width: 190px;
  height: auto;
}

.login-title p {
  font-family: PingFangSC-Regular;
  font-size: 18px;
  color: #fff;
  letter-spacing: 0.29px;
  padding-top: 10px;
  padding-bottom: 50px;
}
.no {
  color: #fff;
}
.login_box {
  width: 400px;
  height: auto;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  margin-left: auto;
  margin-right: 20%;
}

.login_box .title {
  font-size: 20px;
  color: #fff;
  font-weight: 600;
  letter-spacing: 0.32px;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-around;
  padding: 50px 60px 0 60px;
  margin-bottom: 20px;
  cursor: pointer;
}

.login_box .title span:nth-of-type(1) {
  color: #4a4a4a;
  border-bottom: 2px solid #396fcc;
}

.inp {
  width: 350px;
  margin: 0 auto;
}

.inp input {
  border: 0;
  outline: 0;
  width: 100%;
  height: 45px;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  text-indent: 20px;
  font-size: 14px;
  background: #fff !important;
}

.inp input.user {
  margin-top: 16px;
  margin-bottom: 16px;
}

.inp input.mobile {
  margin-top: 16px;
  margin-bottom: 16px;
  width: 50%;
  height: 45px;
}

.inp .rember {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.inp .rember p:first-of-type {
  font-size: 12px;
  color: #4a4a4a;
  letter-spacing: 0.19px;
  margin-left: 22px;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
}

.inp .rember p:nth-of-type(2) {
  font-size: 14px;
  color: #9b9b9b;
  letter-spacing: 0.19px;
  cursor: pointer;
}

.inp .rember input {
  outline: 0;
  width: 30px;
  height: 45px;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  text-indent: 20px;
  font-size: 14px;
  background: #fff !important;
}

.inp .rember p span {
  display: inline-block;
  font-size: 12px;
  width: 100px;
  color: #fff;
}

#geetest {
  margin-top: 20px;
}

.login_btn {
  width: 100%;
  height: 45px;
  background: #396fcc;
  border-radius: 5px;
  font-size: 16px;
  color: #fff;
  letter-spacing: 0.26px;
  margin-top: 30px;
  margin-bottom: 30px;
}

.inp .go_login {
  text-align: center;
  font-size: 14px;
  color: #9b9b9b;
  letter-spacing: 0.26px;
  padding-top: 20px;
}

.inp .go_login span {
  color: #84cc39;
  cursor: pointer;
}
</style>
