<template>
  <div class="container">
    <h1>📌 전체 게시판</h1>

    <!-- 검색창 -->
    <div class="search-bar">
      <input v-model="searchQuery" placeholder="검색어 입력" />
      <button @click="searchPosts">검색</button>
    </div>

    <p>총 게시글 수 ({{ posts.length }}건)</p>

    <!-- 글쓰기 & 삭제 버튼 -->
    <div class="actions">
      <button @click="navigateToForm(null)">글쓰기</button>
      <button @click="deleteSelectedPosts">삭제</button>
    </div>

    <!-- 게시글 목록 테이블 -->
    <table>
      <thead>
        <tr>
          <th><input type="checkbox" v-model="selectAll" @change="toggleAll" /></th>
          <th>번호</th>
          <th>제목</th>
          <th>내용</th> <!-- ✅ content 추가 -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts" :key="post.id">
          <td><input type="checkbox" v-model="selectedPosts" :value="post.id" /></td>
          <td>{{ post.id }}</td>
          <td @click="viewPost(post.id)">{{ post.title }}</td>
          <td>{{ post.content }}</td> <!-- ✅ content 표시 -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from "../api.js";

export default {
  data() {
    return {
      posts: [],
      searchQuery: "",
      selectedPosts: [],
      selectAll: false
    };
  },
  methods: {
    async fetchPosts() {
      const response = await api.getAllPosts();
      this.posts = response.data;
    },
    async searchPosts() {
      this.posts = this.posts.filter(post =>
        post.title.includes(this.searchQuery) || post.content.includes(this.searchQuery)
      );
    },
    toggleAll() {
      this.selectedPosts = this.selectAll ? this.posts.map(post => post.id) : [];
    },
    async deleteSelectedPosts() {
      for (let id of this.selectedPosts) {
        await api.deletePost(id);
      }
      this.selectedPosts = [];
      this.fetchPosts();
    },
    navigateToForm(post) {
      this.$emit("edit-post", post);
    },
    viewPost(id) {
      this.$emit("view-post", id);
    }
  },
  created() {
    this.fetchPosts();
  }
};
</script>

<style>
.container {
  max-width: 800px;
  margin: auto;
  text-align: center;
}
.search-bar {
  margin-bottom: 10px;
}
.actions {
  margin-bottom: 10px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}
th {
  background-color: #f2f2f2;
}
td {
  cursor: pointer;
}
button {
  margin: 5px;
}
</style>
