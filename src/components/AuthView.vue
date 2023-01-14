<template>
  <div class="login-page">
    <div class="form">
      <form @submit.prevent="handleRegister" class="register-form" v-show=showRegister>
        <input type="text" v-model="email" placeholder="email" required />
        <input type="password" v-model="password" placeholder="пароль" required />
        <input type="text" v-model="fullName" placeholder="ФИО" required />
        <button type="submit">создать</button>
        <p class="message">Уже зарегистрированы? <a href="#" @click="changeShow">Вход</a></p>
        <p class="message" v-if="auth_error" style="color:red">Произошла ошибка регистрации - {{ error_message }}</p>
      </form>
      <form @submit.prevent="handleLogin" class="login-form" v-show=!showRegister>
        <input type="text" v-model="email" placeholder="email" required />
        <input type="password" v-model="password" placeholder="пароль" required />
        <button type="submit">войти</button>
        <p class="message">Не зарегистрированы? <a href="#" @click="changeShow">Создать аккаунт</a></p>
        <p class="message" v-if="auth_error" style="color:red">Неверный логин или пароль пользователя</p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const instance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export default {
  data() {
    return {
      showRegister: false,
      email: '',
      password: '',
      fullName: '',
      auth_error: false,
      error_message: ''
    }
  },
  methods: {
    changeShow() {
      this.showRegister = !this.showRegister;
    },

    handleLogin() {
      instance.post('/auth/login', {
        email: this.email,
        password: this.password,
      }).then((response) => {
        this.localStorage.accessToken = response.data.access_token;
        this.localStorage.refreshToken = response.data.refresh_token;
        this.$router.push('/user-cabinet');
      }).catch((error) => {
        console.log(error);
        this.auth_error = true;
        setTimeout(() => {
          this.auth_error = false;
        }, 3000);
      })
    },
    handleRegister() {
      instance.post('/auth/register', {
        email: this.email,
        password: this.password,
        fullName: this.fullName,
      }).then(() => {
        this.$router.push('/register-info');
      }).catch((error) => {
        console.log(error);
        this.auth_error = true;
        this.error_message = error.response.data.message || 'Unknown error';
        setTimeout(() => {
          this.auth_error = false;
        }, 5000);
      })
    },
  },
};

</script>

<style scoped>
.login-page {
  width: 360px;
  padding: 8% 0 0;
  margin: auto;
}

.form {
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}

.form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}

.form button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #4CAF50;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}

.form button:hover,
.form button:active,
.form button:focus {
  background: #43A047;
}

.form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}

.form .message a {
  color: #4CAF50;
  text-decoration: none;
}

.container {
  position: relative;
  z-index: 1;
  max-width: 300px;
  margin: 0 auto;
}

.container:before,
.container:after {
  content: "";
  display: block;
  clear: both;
}

.container .info {
  margin: 50px auto;
  text-align: center;
}

.container .info h1 {
  margin: 0 0 15px;
  padding: 0;
  font-size: 36px;
  font-weight: 300;
  color: #1a1a1a;
}

.container .info span {
  color: #4d4d4d;
  font-size: 12px;
}

.container .info span a {
  color: #000000;
  text-decoration: none;
}

.container .info span .fa {
  color: #EF3B3A;
}

body {
  background: #76b852;
  /* fallback for old browsers */
  background: rgb(141, 194, 111);
  background: linear-gradient(90deg, rgba(141, 194, 111, 1) 0%, rgba(118, 184, 82, 1) 50%);
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>