<template>
  <div>
    <PostForm v-if="isEditing" :postData="selectedPost" @post-saved="handlePostSaved" />
    <PostList v-else @edit-post="handleEditPost" />
  </div>
</template>

<script>
import PostList from "./components/PostList.vue";
import PostForm from "./components/PostForm.vue";

export default {
  components: { PostList, PostForm },
  data() {
    return {
      isEditing: false,
      selectedPost: null
    };
  },
  methods: {
    handleEditPost(post) {
      this.isEditing = true;
      this.selectedPost = post;
    },
    handlePostSaved() {
      this.isEditing = false;
      this.selectedPost = null;
    }
  }
};
</script>
