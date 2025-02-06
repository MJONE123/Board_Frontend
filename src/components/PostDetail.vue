<template>
  <div class="container">
    <h1>{{ post.title }}</h1>
    <p>{{ post.content }}</p>
    <button @click="$emit('back')">뒤로 가기</button>
  </div>
</template>

<script>
import api from "../api.js";

export default {
  props: ["postId"],
  data() {
    return {
      post: {}
    };
  },
  async created() {
    const response = await api.getPostById(this.postId);
    this.post = response.data;
  }
};
</script>

<style>
.container {
  max-width: 500px;
  margin: auto;
}
</style>
