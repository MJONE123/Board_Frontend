import axios from "axios";

const API_URL = "http://localhost:8080/api/posts";

export default {
  getAllPosts() {
    return axios.get(API_URL);
  },
  createPost(postData) {
    return axios.post(API_URL, {
      title: postData.title,
      content: postData.content // ✅ 필요한 데이터만 전송
    });
  },
  updatePost(id, postData) {
    return axios.put(`${API_URL}/${id}`, {
      title: postData.title,
      content: postData.content // ✅ 불필요한 필드 삭제
    });
  },
  deletePost(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
};
