<script>
import { genUrl } from "../utils/genUrl";

export default {
  data() {
    return {
      showModal: false,
      content: null,
    };
  },
  props: {
    addPost: Function,
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    },
    handleSubmit() {
      fetch(genUrl("posts"), {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: this.content,
        }),
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
            this.toggleModal();
            this.addPost(data);
          }

          if (status === 401) {
            localStorage.clear();
            this.$router.push("/login");
          }
        });
    },
    onTyping(e) {
      this.content = e.target.value;
    },
  },
};
</script>

<template>
  <button class="post-btn" @click="toggleModal">New Post</button>

  <div class="post-modal" :class="{ show: showModal }">
    <div class="modal">
      <div class="modal__header">
        <span>New Post</span>
        <button @click="toggleModal">Cancel</button>
      </div>
      <form class="modal__body" @submit.prevent="handleSubmit">
        <label for="content">Content:</label>
        <textarea
          id="content"
          placeholder="Type the content here..."
          @input="onTyping"
        />
        <button type="submit">Create</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.post-btn {
  display: block;
  margin: 30px auto;
}

.post-modal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0 / 0.3);
  backdrop-filter: blur(10px);
  pointer-events: none;
  visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: visibility 0.5s;
}

.post-modal.show {
  pointer-events: all;
  visibility: visible;
}

.modal {
  background-color: #121212;
  border-radius: 15px;
  padding: 20px;
  max-width: 300px;
  width: 100%;
}

.modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal__header span {
  font-size: 1.2rem;
}

.modal__body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.modal__body label {
  display: block;
  text-align: left;
  width: 100%;
}

.modal__body textarea {
  width: 100%;
  height: auto;
  resize: none;
}

.modal__body button {
  margin-top: 5px;
}
</style>
