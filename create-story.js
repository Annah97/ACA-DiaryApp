function disableBtn() {
    confirmbtn = getElementById("insertbtn");
    var titleContent = document.getElementById("storytitle").value;
    var bodyContent = document.getElementById("storybody").value;
    if (titleContent=="" | bodyContent=="") {
        confirmbtn.disabled = true;
    } else {
        confirmbtn.disabled = false;
    }
}

let insertBtn = document.querySelector('.insert-btn');
let inputcontainer = document.querySelector('.container');
let textInputs = [...inputcontainer.querySelectorAll('.text-input')];

function validate() {
  let isIncomplete = textInputs.some(input => !input.value);
  insertBtn.disabled = isIncomplete;
  insertBtn.style.cursor = isIncomplete ? 'not-allowed' : 'pointer';
}

inputcontainer.addEventListener('input', validate);
validate();

function insertStory() {
    var storyContent = document.getElementsByTagName('tbody')[0].insertRow(0);
    var storyTitle = storyContent.insertCell(0);
    var storyDate = storyContent.insertCell(1);
    var storyBody = storyContent.insertCell(2);

    var titleContent = document.getElementById("storytitle").value;
    var bodyContent = document.getElementById("storybody").value;

    if (titleContent!=="" && bodyContent!=="") {
        storyTitle.innerHTML=titleContent;
        storyDate.innerHTML=Date();
        storyBody.innerHTML=bodyContent;
    }
}

var btns = document.querySelector('button');
var inputs = document.querySelectorAll('input');
 
btns.addEventListener('click', () => {
    inputs.forEach(input =>  input.value = '');
    inputcontainer.addEventListener('input', validate);
    validate();
});

//sort date
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

document.querySelectorAll("#storyTable th").forEach(headerCell => {
    headerCell.addEventListener("click", () => {
        const tableElement = headerCell.parentElement.parentElement.parentElement;
        const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
        const currentIsAscending = headerCell.classList.contains("th-sort-asc");

        sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
    });
});
