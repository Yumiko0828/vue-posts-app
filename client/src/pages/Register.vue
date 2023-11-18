<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { genUrl } from "../utils/genUrl";

const data = ref({
  username: "",
  email: "",
  password: "",
});
const error = ref(null);
const router = useRouter();

const handleSubmit = () => {
  console.log(data.value);

  fetch(genUrl("auth/register"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data.value),
  })
    .then(async (res) => {
      const data = await res.json();

      return {
        data,
        status: res.status,
      };
    })
    .then(({ data, status }) => {
      if (status === 200) {
        localStorage.setItem("token", data.token);
        router.push("/");
      }

      if (status === 400) {
        error.value = data.message;
      }
    })
    .catch((e) => {
      error.value = e.message;
    });
};

const handleType = (e) => {
  data.value = { ...data.value, [e.target.name]: e.target.value };
};
</script>

<template>
  <div class="wrapper">
    <form class="form" @submit.prevent="handleSubmit">
      <h1 class="form__title">Register</h1>

      <div v-if="error" class="form__error">{{ error }}</div>

      <div class="form__inputs">
        <label for="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          required
          @input="handleType"
        />
      </div>

      <div class="form__inputs">
        <label for="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          @input="handleType"
        />
      </div>

      <div class="form__inputs">
        <label for="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          @input="handleType"
        />
      </div>

      <p>You have a account? <router-link to="/login">Login</router-link></p>

      <button class="form__btn" type="submit">Accept</button>
    </form>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.form {
  background-color: rgb(0 0 0 / 0.3);
  border-radius: 15px;
  padding: 30px;
  width: 320px;
}

.form__title {
  margin: 0;
  margin-bottom: 20px;
}

.form__error {
  background-color: rgba(255, 0, 0, 0.322);
  border-radius: 10px;
  border: 2px solid red;
  padding: 4px;
  text-align: left;
}

.form__inputs {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 15px;
}

.form__inputs label {
  text-align: left;
}

.form__inputs input {
  padding: 5px;
}

.form__btn {
  background-color: #646cff;
  width: 100%;
  transition: background-color 0.3s;
}

.form__btn:hover {
  background-color: #535bf2;
}
</style>
