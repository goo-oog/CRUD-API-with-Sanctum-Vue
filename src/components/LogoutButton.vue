<template>
  <button @click="logout" style="position: absolute; top: 10px; right: 20px">
    Iziet
  </button>
</template>

<script>
import axios from "axios";

export default {
  name: "LogoutButton",
  beforeMount() {
    if (!sessionStorage.token) {
      this.$router.push("/login");
    }
  },
  methods: {
    logout() {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${sessionStorage.token}`;
      axios.post(`http://localhost:8000/api/auth/logout`).then(() => {
        sessionStorage.token = "";
        this.$router.go();
      });
    },
  },
};
</script>

<style scoped></style>
