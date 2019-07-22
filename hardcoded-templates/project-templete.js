// =================================== Project Card templete.

function projectCard(projectId, projectName, projectDescription) {

    projectHtml =
        "<div className='card  bg-secondary projectCard col-md-12 overflow-auto' " +
        "data-id='" + projectId + "'>" +
        "<div className='card-header'>Project: " +
        projectId +
        " - " + projectName +
        "</div> " +
        "<div className='card-body'> " +
        "<h6 className='card-title'> " +
        projectDescription +
        "</h6> " +
        "</div> " +
        "</div>" +
        " ";

    return projectHtml;

}


function userNameTag(UserName) {

    userNameTagHtml =
        "<b>Team Organizer™</b>" +
        "&nbsp;&nbsp;&nbs;&nbsp;&nbsp;&nbsp" +
        "Welcome: " + UserName +
        " ";

    return userNameTagHtml;

}

module.exports = {
    projectCard: projectCard,
    userNameTag: userNameTag
}