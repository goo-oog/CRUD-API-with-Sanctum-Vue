<template>
  <h1>Lietotāja autorizācija</h1>
  <div class="form-wrapper">
    <div class="input-wrapper">
      <div>E-pasts:</div>
      <input
        type="text"
        :value="emailInputValue"
        @input="emailInputChange($event.target.value)"
      />
    </div>
    <div class="input-wrapper">
      <div>Parole:</div>
      <input
        type="password"
        :value="passwordInputValue"
        @input="passwordInputChange($event.target.value)"
      />
    </div>
    <button @click="login" class="input-wrapper">Ienākt</button>
  </div>
  <div
    v-for="(msg, index) in message"
    :key="index"
    style="color: red; margin-top: 0.75rem"
  >
    {{ msg }}
  </div>
  <p style="margin-top: 2rem">vai</p>
  <router-link :to="'register'">
    <button>Reģistrēties</button>
  </router-link>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      emailInputValue: "",
      passwordInputValue: "",
      message: "",
    };
  },
  methods: {
    emailInputChange(value) {
      this.emailInputValue = value;
    },
    passwordInputChange(value) {
      this.passwordInputValue = value;
    },
    login() {
      axios
        .post(`http://localhost:8000/api/auth/login`, {
          email: this.emailInputValue,
          password: this.passwordInputValue,
        })
        .then((response) => {
          this.message = response.data.message;
          sessionStorage.token = response.data.token;
          this.$router.push("/");
        })
        .catch((error) => {
          this.message = error.response.data.message;
          sessionStorage.token = "";
        });
    },
  },
};
</script>

<style scoped>
.input-wrapper {
  margin-top: 0.75rem;
}
</style>
