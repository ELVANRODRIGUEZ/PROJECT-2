import axios from "axios";

export default {

  saveChat(chatData) {
    console.log(chatData);
      return axios.post("/api/chat", chatData);
  },
  getSavedChats(taskId) {
    return axios.get(`/api/chat/${taskId}`);
  },
};