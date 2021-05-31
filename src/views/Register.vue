<template>
  <h1>Jauna lietotāja reģistrācija</h1>
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
      <div>Vārds:</div>
      <input
        type="text"
        :value="nameInputValue"
        @input="nameInputChange($event.target.value)"
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
    <div class="input-wrapper">
      <div>Parole vēlreiz:</div>
      <input
        type="password"
        :value="passwordConfirmInputValue"
        @input="passwordConfirmInputChange($event.target.value)"
      />
    </div>
    <button @click="register" class="input-wrapper">Reģistrēties</button>
  </div>
  <div
    v-for="(msg, index) in message"
    :key="index"
    style="color: red; margin-top: 0.75rem"
  >
    {{ msg }}
  </div>
  <p style="margin-top: 2rem">vai</p>
  <router-link :to="'login'">
    <button>Ienākt</button>
  </router-link>
</template>

<script>
import axios from "axios";

export default {
  name: "Register",
  data() {
    return {
      emailInputValue: "",
      nameInputValue: "",
      passwordInputValue: "",
      passwordConfirmInputValue: "",
      message: "",
    };
  },
  methods: {
    emailInputChange(value) {
      this.emailInputValue = value;
    },
    nameInputChange(value) {
      this.nameInputValue = value;
    },
    passwordInputChange(value) {
      this.passwordInputValue = value;
    },
    passwordConfirmInputChange(value) {
      this.passwordConfirmInputValue = value;
    },
    register() {
      axios
        .post(`http://localhost:8000/api/auth/register`, {
          email: this.emailInputValue,
          name: this.nameInputValue,
          password: this.passwordInputValue,
          password_confirmation: this.passwordConfirmInputValue,
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
