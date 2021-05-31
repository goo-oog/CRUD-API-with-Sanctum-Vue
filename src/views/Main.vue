<template>
  <LogoutButton />
  <h1>Visi produkti</h1>
  <div class="wrapper">
    <router-link :to="'/product/create'">
      <button style="margin-bottom: 1rem">Pievienot produktu</button>
    </router-link>
    <table>
      <tr v-if="products">
        <th>ID</th>
        <th>Nosaukums</th>
        <th>Apraksts</th>
      </tr>
      <tr v-for="(product, index) in products" :key="index">
        <td>{{ product.id }}</td>
        <td style="text-align: left">{{ product.name }}</td>
        <td style="text-align: left">{{ product.description }}</td>
        <td>
          <router-link :to="`/product/${product.id}`">
            <button>-></button>
          </router-link>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import LogoutButton from "@/components/LogoutButton";

export default {
  name: "Main",
  components: { LogoutButton },
  data() {
    return {
      message: "",
      products: [],
    };
  },
  beforeMount() {
    this.getAllProducts();
  },
  methods: {
    getAllProducts() {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${sessionStorage.token}`;
      axios
        .get(`http://localhost:8000/api/products`)
        .then((response) => {
          this.products = response.data;
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
  flex-direction: column;
  align-items: center;
}

table {
  border-collapse: collapse;
}

td,
th {
  padding: 0.1rem 0.25rem 0.1rem 0.25rem;
  border: 1px solid black;
  vertical-align: top;
}
</style>
