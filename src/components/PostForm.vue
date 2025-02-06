<template>
  <div class="container">
    <h2>{{ isEditing ? "게시글 수정" : "새 게시글 작성" }}</h2>
    <input v-model="post.title" placeholder="제목" />
    <textarea v-model="post.content" placeholder="내용"></textarea>
    <button @click="submitPost">{{ isEditing ? "수정" : "등록" }}</button>
  </div>
</template>

<script>
import api from "../api.js";

export default {
  props: ["postData"],
  data() {
    return {
      post: this.postData || { title: "", brand: "", content: "" },
      isEditing: !!this.postData
    };
  },
  methods: {
    async submitPost() {
      if (this.isEditing) {
        await api.updatePost(this.post.id, this.post);
      } else {
        await api.createPost(this.post);
      }
      this.$emit("post-saved");
    }
  }
};
</script>

<style>
.container {
  max-width: 400px;
  margin: auto;
}
textarea, input {
  width: 100%;
  margin-bottom: 10px;
}
</style>
