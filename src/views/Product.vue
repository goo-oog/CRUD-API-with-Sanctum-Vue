<template>
  <LogoutButton />
  <h1>Produkts</h1>
  <div class="wrapper">
    <table>
      <tr>
        <td style="text-align: right">ID:</td>
        <td style="text-align: left">{{ product.id }}</td>
      </tr>
      <tr>
        <td style="text-align: right">Nosaukums:</td>
        <td style="text-align: left">{{ product.name }}</td>
      </tr>
      <tr>
        <td style="text-align: right">Apraksts:</td>
        <td style="text-align: left">{{ product.description }}</td>
      </tr>
      <tr>
        <td style="text-align: right">Īpašības:</td>
        <td>
          <div v-for="(attribute, index) in product.attributes" :key="index">
            <div class="attributes-wrapper">
              <div style="margin-right: 5rem">{{ attribute.key }}:</div>
              <div>{{ attribute.value }}</div>
            </div>
          </div>
        </td>
      </tr>
    </table>
  </div>
  <br />
  <router-link :to="`/product/${$route.params.id}/edit`">
    <button>Labot</button>
  </router-link>
  <br /><br />
  <button @click="deleteProduct">Dzēst produktu</button>
</template>

<script>
import axios from "axios";
import LogoutButton from "@/components/LogoutButton";

export default {
  name: "Product",
  components: { LogoutButton },
  data() {
    return {
      product: {},
    };
  },
  beforeMount() {
    this.getProduct();
  },
  methods: {
    getProduct() {
      if (!this.$route.params.id) {
        return;
      }
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${sessionStorage.token}`;
      axios
        .get(`http://localhost:8000/api/products/${this.$route.params.id}`)
        .then((response) => {
          this.product = response.data;
        })
        .catch((error) => {
          this.message = error.response.data.message;
        });
    },
    deleteProduct() {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${sessionStorage.token}`;
      axios
        .delete(`http://localhost:8000/api/products/${this.$route.params.id}`)
        .then(() => {
          this.$router.push("/");
        })
        .catch((error) => {
          this.message = error.response.data.message;
        });
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

.attributes-wrapper {
  display: flex;
  justify-content: space-between;
}
</style>
