<script setup>
import Navbar from "../components/Navbar.vue";
import CreatePost from "../components/CreatePost.vue";
</script>

<script>
import { genUrl } from "../utils/genUrl";
import { url } from "gravatar";
import { format } from "timeago.js";
const userId = localStorage.getItem("userId");

export default {
  data() {
    return {
      posts: [],
    };
  },
  mounted() {
    this.getPosts().then(({ data, status }) => {
      if (status === 200) {
        this.posts.push(...data);
      }

      if (status === 401) {
        this.$router.push("/login");
      }
    });
  },
  methods: {
    getPosts() {
      return fetch(genUrl("posts"), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }).then(async (res) => {
        const data = await res.json();

        return {
          data,
          status: res.status,
        };
      });
    },
    addPost(data) {
      this.posts.push(data);
    },
  },
};
</script>

<template>
  <Navbar />
  <CreatePost :addPost="addPost" />

  <div class="posts">
    <div v-for="post in posts.sort(() => -1)" key="{{post._id}}" class="post">
      <div class="post__img-container">
        <img :src="url(post.author.email)" :alt="post.author.username" />
      </div>
      <div class="post__content">
        <div class="post__header">
          <span class="username">
            {{ post.author.username }}
          </span>
          <span class="timestamp">
            {{ format(post.createdAt) }}
          </span>
        </div>
        <div class="post__body">
          {{ post.content }}
        </div>
        <div v-if="post.author._id === userId" class="post__footer">
          <button>Update</button>
          <button>Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.posts {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 15px;
  max-width: 450px;
  width: 100%;
  margin: 0 auto;
}

.post {
  background-color: rgb(0 0 0 /0.3);
  border-radius: 15px;
  width: 100%;
  overflow: hidden;
  display: flex;
}

.post__content {
  width: 100%;
  padding-right: 10px;
}

.post__img-container {
  padding: 10px;
}

.post__img-container img {
  border-radius: 50%;
  width: 50px;
  height: 50px;
}

.post__header {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
}

.post__header .username {
  font-weight: bold;
}

.post__header .timestamp {
  color: #b9b9b9;
}
</style>
