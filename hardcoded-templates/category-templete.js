// =================================== Category Card templete.

function categoryCard(categoryId, categoryName, categoryDesc, taskCount) {

    categoryCardHtml =
        "<div class='card  bg-secondary categoryCard col-md-12 overflow-auto' " +
        "data-id='" + categoryId + "'>" +
        "<div class='card-header'>" +
        "<div><i class='fa fa-paste'></i>" +
        "&nbsp(tasks)&nbspx&nbsp&nbsp" + 
        taskCount + "</div>" +
        "Category: " +
        categoryId +
        " - " + categoryName +
        "</div> " +
        "<div class='card-body'> " +
        "<h6 class='card-title'> " +
        categoryDesc +
        "</h6> " +
        "</div> " +
        "</div>" +
        " ";
   
    return categoryCardHtml;

}

module.exports = categoryCard