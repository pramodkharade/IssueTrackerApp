document.getElementById('issueInputForm').addEventListener('submit', saveTssue);// To submit form

document.getElementById("currentYear").innerHTML = new Date().getFullYear();//To get Current Year
/**To Save form data in localStorage***/
function saveTssue(e) {
    var issueDesc = document.getElementById('issueDescInput').value;
    var issueSeverity = document.getElementById('issueSeverityInput').value;
    var issueAssingedTo = document.getElementById('issueAssignedToInput').value;
    var issueId = chance.guid();
    var issueStatus = 'Open';
    var issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssingedTo,
        status: issueStatus
    };
    if (localStorage.getItem('issues') == null) {
        var issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    } else {
        var issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues))
    }
    document.getElementById('issueInputForm').reset();
    getAllIssues();
    e.preventDefault();
}
/**To change the status of Issue**/
function setStatusClosed(id) {
    var issues = JSON.parse(localStorage.getItem('issues'));
    for (var i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
            issues[i].status = 'Closed';
        }
        localStorage.setItem('issues', JSON.stringify(issues));
        getAllIssues();
    }
}
/**To change the delete of Issue**/
function deleteIssue(id) {
    var issues = JSON.parse(localStorage.getItem('issues'));
    for (var i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
            issues.splice(i, 1);
        }
        localStorage.setItem('issues', JSON.stringify(issues));
        getAllIssues();
    }
}
/** To list all Issue**/
function getAllIssues() {
    var issues = JSON.parse(localStorage.getItem('issues'));
    var issueList = document.getElementById('issueList');
    issueList.innerHTML = '';
    for (var i = 0; i < issues.length; i++) {
        var id = issues[i].id;
        var desc = issues[i].description;
        var severity = issues[i].severity;
        var assignedTo = issues[i].assignedTo;
        var status = issues[i].status;
        console.log('Status is: ', status);
        issueList.innerHTML += '<div class="well"' +
            '<h6> Issue ID:' + id + '</h6>' +
            '<p><span class="label label-info">' + status + '</span></p>' +
            '<h3>' + desc + '</h3>' +
            '<p><span class="glyphicon glyphicon-time"></span> ' + severity + '</p>' +
            '<p><span class="glyphicon glyphicon-user"></span> ' + assignedTo + '</p>' +
            '<a href="#" onclick="setStatusClosed(\'' + id + '\')" class="btn btn-warning">Close</a>' +
            ' <a href="#" onclick="deleteIssue(\'' + id + '\')" class="btn btn-danger">Delete</a>' +
            '</div>';
    }
}