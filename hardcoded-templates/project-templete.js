// =================================== Project Card templete.

function projectCard(projectId, projectName, projectDescription) {

    projectHtml =
        "<div class='card  bg-secondary projectCard col-md-12 overflow-auto' " +
        "data-id='" + projectId + "'>" +
        "<div class='card-header'>Project: " +
        projectId +
        " - " + projectName +
        "</div> " +
        "<div class='card-body'> " +
        "<h6 class='card-title'> " +
        projectDescription +
        "</h6> " +
        // "<p class='card-text'> " +
        // "<small class='text-dark'> " +
        // "Last updated 3 mins ago" +
        // "</small> " +
        // "</p> " +
        "</div> " +
        "</div>" +
        " ";

    return projectHtml;

}


function userNameTag(UserName) {

    userNameTagHtml =
        "<b>Team Organizer™</b>" +
        "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
        "Welcome: " + UserName +
        " ";

    return userNameTagHtml;

}

module.exports = {
    projectCard: projectCard,
    userNameTag: userNameTag
}