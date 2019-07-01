function userList(userId, userName) {

    var userListHtml =
        "<option class='taksUsersArr' userId=" +
        userId + ">" + userName + "</option>" +
        " ";

    return userListHtml;

}

module.exports = {
    userList: userList
};