<template>
  <LogoutButton />
  <h1>Pievienot produktu</h1>
  <div class="form-wrapper">
    <div class="input-wrapper">
      <div>Nosaukums:</div>
      <input
        type="text"
        :value="nameInputValue"
        @input="nameInputChange($event.target.value)"
      />
    </div>
    <div class="input-wrapper">
      <div>Apraksts:</div>
      <input
        type="text"
        :value="descriptionInputValue"
        @input="descriptionInputChange($event.target.value)"
      />
    </div>
    <div class="input-wrapper">
      <div>Īpašības:</div>
      <button @click="addAtribute">+</button>
    </div>
    <div class="input-wrapper">
      <div
        v-for="(attribute, index) in attributes"
        :key="index"
        style="display: flex"
      >
        <input
          type="text"
          @input="attributesKeyChange(index, $event.target.value)"
        />
        <input
          type="text"
          @input="attributesValueChange(index, $event.target.value)"
        />
        <button @click="removeAttribute(index)">-</button>
      </div>
    </div>
    <button @click="addProduct" class="input-wrapper">
      Pievienot produktu
    </button>
  </div>
  <div
    v-for="(msg, index) in message"
    :key="index"
    style="color: red; margin-top: 0.75rem"
  >
    {{ msg }}
  </div>
</template>

<script>
import axios from "axios";
import LogoutButton from "@/components/LogoutButton";

export default {
  name: "AddProduct",
  components: { LogoutButton },
  data() {
    return {
      nameInputValue: "",
      descriptionInputValue: "",
      attributes: [],
      message: "",
    };
  },
  methods: {
    nameInputChange(value) {
      this.nameInputValue = value;
    },
    descriptionInputChange(value) {
      this.descriptionInputValue = value;
    },
    attributesKeyChange(index, value) {
      this.attributes[index]["key"] = value;
    },
    attributesValueChange(index, value) {
      this.attributes[index]["value"] = value;
    },
    addAtribute() {
      this.attributes.push({ key: "", value: "" });
    },
    removeAttribute(index) {
      this.attributes.splice(index, 1);
    },
    addProduct() {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${sessionStorage.token}`;
      axios
        .post(`http://localhost:8000/api/products`, {
          name: this.nameInputValue,
          description: this.descriptionInputValue,
          attributes: this.attributes,
        })
        .then(() => {
          this.$router.push(`/`);
        })
        .catch((error) => {
          this.message = error.response.data.message;
        });
    },
  },
};
</script>

<style scoped>
.form-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-wrapper {
  margin-top: 1rem;
}
</style>
