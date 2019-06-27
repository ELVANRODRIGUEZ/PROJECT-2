// =================================== Category Card templete.

function categoryCard(projectId, projectName, projectDescription) {

    categoryCardHtml =
        "<div class='card bg-secondary text-white categoryCard'" +
        "style='margin:5px' data-id='" + data[item].category_id + "' >" +
        "<div class='card-body'>" +
        "<h5 class='card-title'>" +
        data[item].category_name + "</h5>" +
        "<h6 class='card-subtitle mb-2 text-white'>" + data[item].category_description + "</h6>" +
        "</div>" +
        "</div>";

    return categoryCardHtml;

}

module.exports = categoryCard