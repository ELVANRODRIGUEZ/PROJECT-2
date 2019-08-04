import axios from "axios";

export default {

  saveChat(chatData) {
    console.log(chatData);
      return axios.post("/api/chat", chatData);
  },
  getSavedChats(taskId) {
    return axios.get(`/api/chat/${taskId}`);
  },

  saveMail(mailData) {
    console.log(mailData)
    return axios.post("/api/mail", mailData);
  },
  getSavedMails(taskId) {
    return axios.get(`/api/mail/${taskId}`);
  },
};
