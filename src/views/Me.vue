<template>
  <LogoutButton />
  <h1>Lietotājs</h1>
  <div class="wrapper">
    <table>
      <tr>
        <td style="text-align: right">ID:</td>
        <td style="text-align: left">{{ user.id }}</td>
      </tr>
      <tr>
        <td style="text-align: right">E-pasts:</td>
        <td style="text-align: left">{{ user.email }}</td>
      </tr>
      <tr>
        <td style="text-align: right">Vārds:</td>
        <td style="text-align: left">{{ user.name }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import LogoutButton from "@/components/LogoutButton";
import axios from "axios";

export default {
  name: "Me",
  components: { LogoutButton },
  data() {
    return {
      message: "",
      user: {},
    };
  },
  beforeMount() {
    this.getUserData();
  },
  methods: {
    getUserData() {
      if (sessionStorage.token) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${sessionStorage.token}`;
        axios
          .get(`http://localhost:8000/api/me`)
          .then((response) => {
            this.user = response.data;
          })
          .catch((error) => {
            this.message = error.response.data.message;
          });
      }
    },
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
}

table {
  border-collapse: collapse;
}

td {
  padding: 1rem;
  border: 1px solid black;
  vertical-align: top;
}
</style>
