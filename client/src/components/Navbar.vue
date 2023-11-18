<script>
import { url } from "gravatar";
import { genUrl } from "../utils/genUrl";

export default {
  data() {
    return {
      username: "",
      avatarURL: "",
    };
  },
  created() {
    fetch(genUrl("users/me"), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
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
          this.username = data.username;
          this.avatarURL = url(data.email);
        }

        if (status === 401) {
          localStorage.clear();
          this.$router.push("/login");
        }
      });
  },
  methods: {
    logOut() {
      localStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>

<template>
  <nav class="navbar">
    <router-link to="/" class="navbar__title">Posts App</router-link>
    <div class="navbar__items">
      <div class="profile">
        <img :src="avatarURL" :alt="username" class="profile__img" />
        <router-link to="/profile" class="profile__name">{{
          username
        }}</router-link>
        <button @click="logOut">Log Out</button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  padding: 10px;
  background-color: rgb(0 0 0 / 0.3);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}

.navbar__title {
  display: inline-block;
  font-size: 1.5rem;
  color: #fff;
}

.navbar__items {
  display: flex;
  gap: 10px;
}

.navbar__items button {
  background-color: rgb(255 255 255 / 0.05);
}

.profile {
  display: flex;
  place-items: center;
  gap: 10px;
  margin-left: 20px;
}

.profile a {
  color: #fff;
  text-decoration: underline;
}

.profile__img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}
</style>
