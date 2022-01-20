let story = [
{
title: 'School',
date: '02/05/2020',
body: 'I love School',
},
{
title: 'ACA',
date: '17/01/2022',
body: 'I joined ACA',
},
{
title: 'Presentation',
date: '21/01/2022',
body: 'Presentation day',
},
];
const addBtn = document.querySelector('.btn-submit');
const clearAllBtn = document.querySelector('.btn-clear');
const tBody = document.querySelector('tbody');
const tableRows = tBody.getElementsByTagName('tr');
function updateTable() {
const tableData = story
.map((item) => {
return `
<tr>
<td>${item.title}</td>
<td>${item.date}</td>
<td>${item.body}</td>
<td><i class="fas fa-times-circle"></i></td>
</tr>
`;
})
.join('');
tBody.innerHTML = tableData;
toggleDeleteBtn();
}
updateTable();
function addItem() {
const title = document.querySelector('#title');
const date = document.querySelector('#date');
const body = document.querySelector('#body');
const obj = {};
if(title.value !== '' && date.value !== '' && body.value !== ''){
obj.title = title.value;
obj.date = date.value;
obj.body = body.value;
story.push(obj);
updateTable();
title.value = '';
date.value = '';
body.value = '';
}
toggleDeleteBtn();
}
function clearAllItem() {
for(let i = tableRows.length - 1; i >= 0; i--){
tableRows[i].remove();
}
food = [];
}
function deleteItem() {
this.parentElement.parentElement.remove();
const children = this.parentElement.parentElement.children;
const getObj = {};
getObj.title = children[0].innerText;
getObj.date = children[1].innerText;
getObj.body = children[2].innerText;
const deleteIndex = story.findIndex((obj) => {
return obj.title === getObj.title && obj.date === getObj.date && obj.body === getObj.body;
});
story.splice(deleteIndex, 1);
}
function toggleDeleteBtn() {
for(let tr of tableRows){
const deleteIcon = tr.querySelector('.fa-times-circle');
tr.addEventListener('mouseover', () => {
deleteIcon.classList.add('showDeleteIcon');
});
tr.addEventListener('mouseleave', () => {
deleteIcon.classList.remove('showDeleteIcon');
});
deleteIcon.addEventListener('click', deleteItem);
}
}
addBtn.addEventListener('click', addItem);
clearAllBtn.addEventListener('click', clearAllItem);

//soting code
function sortTableByColumn(table, column, asc = true) {
    const dirModifier = asc ? 1 : -1;
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll("tr"));

    // Sort each row
    const sortedRows = rows.sort((a, b) => {
        const aColText = a.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();
        const bColText = b.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();

        return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
    });

    // Remove all existing TRs from the table
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }

    // Re-add the newly sorted rows
    tBody.append(...sortedRows);

    // Remember how the column is currently sorted
    table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
    table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-asc", asc);
    table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-desc", !asc);
}

document.querySelectorAll(".view-story th").forEach(headerCell => {
    headerCell.addEventListener("click", () => {
        const tableElement = headerCell.parentElement.parentElement.parentElement;
        const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
        const currentIsAscending = headerCell.classList.contains("th-sort-asc");

        sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
    });
});
