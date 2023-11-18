<script>
import { genUrl } from "./utils/genUrl.js";

export default {
  mounted() {
    fetch(genUrl("users/me"), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 401) return this.posts.pust("/login");

        return res;
      })
      .then((res) => res.json())
      .then((profile) => localStorage.setItem("userId", profile._id))
      .catch(() => this.$router.push("/login"));
  },
};
</script>

<template>
  <router-view></router-view>
</template>
