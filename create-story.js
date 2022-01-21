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

// Select the save button
var button = document.querySelector(".save_button");

// Select the input box
var siteName = document.querySelector("[name='site_name']");
var url = document.querySelector("[name='url']");

// Select the <div> with class="bookmarks"
var bookmarksSection = document.querySelector(".bookmarks");

// Hold bookmarks in local storage
if(typeof(localStorage.bookmark) == "undefined"){
localStorage.bookmark = "";
}
// Select the save button
var button = document.querySelector(".save_button");

// Select the input box
var siteName = document.querySelector("[name='site_name']");
var url = document.querySelector("[name='url']");

// Select the <div> with class="bookmarks"
var bookmarksSection = document.querySelector(".bookmarks");

// Hold bookmarks in local storage
if(typeof(localStorage.bookmark) == "undefined"){
localStorage.bookmark = "";
}
// listen for form submit

button.addEventListener("click", function(e){

    // Prevent the page from reloading when submitting the form
    e.preventDefault();
    
    let patterURL = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    
    let arrayItems, check = false, adr, itemAdr;
        
    // Validating of the form and URL
    
    if(siteName.value === ""){
        alert("please write the name for easy identification");
    } else if(url.value === ""){
        alert("please  fill in the url ");
    } else if(!patterURL.test(url.value)){
        alert("URL invalid please try again!!!");
    } else{
        
        arrayItems = localStorage.bookmark.split(";");
        adr = url.value;
        adr = adr.replace(/http:\/\/|https:\/\//i, "");
        arrayItems.length--;
            
        // Checking if the website is already bookmarked
        for(item of arrayItems){
            itemAdr = item.split(',')[1].replace(/http:\/\/|https:\/\//i,"");
            if(itemAdr == adr){
            check = true;
            }
        }
            
        if(check == true){
            alert("This website is already bookmarked");
        }
        else{
            
            // If all checks are correct,add bookmark to local storage
            localStorage.bookmark += `${siteName.value},${url.value};`;
            addBookmark(siteName.value, url.value);
            siteName.value = "";
            url.value = "";
        }
    }
    });

    // Function to add the bookmark

function addBookmark(name, url){
    let dataLink = url;
    
    
    // a button to visit the link or to delete it
    if(!url.includes("http")){
        url = "//" + url;
    }
    let item = `<div class="bookmark">
                <span>${name}</span>
                <a class="visit" href="${url}" target="_blank"
                    data-link='${dataLink}'>Visit</a>
                <a onclick="removeBookmark(this)"
                    class="delete" href="#">delete</a>
                </div>`;
    bookmarksSection.innerHTML += item;
    }

// function to render the saved bookmarks

(function fetchBoookmark(){
    if(typeof(localStorage.bookmark) != "undefined" && localStorage.bookmark !== ""){
        let arrayItems = localStorage.bookmark.split(";");
        arrayItems.length--;
        for(item of arrayItems){
        let itemSpli = item.split(',');
        addBookmark(itemSpli[0], itemSpli[1]);
        }
    }
    })();

// Function to remove the bookmark

function removeBookmark(thisItem){
    let arrayItems = [],
        index,
        item = thisItem.parentNode,
        itemURL = item.querySelector(".visit").dataset.link,
        itemName = item.querySelector("span").innerHTML;
    arrayItems = localStorage.bookmark.split(";");
        
    for(i in arrayItems){
        if(arrayItems[i] == `${itemName},${itemURL}`){
        index = i;
        break;
        }
    }
        
    //update the localStorage
    index = arrayItems.indexOf(`${itemName},${itemURL}`);
    arrayItems.splice(index,1);
    localStorage.bookmark = arrayItems.join(";");
        
    //update the bookmark Section
    bookmarksSection.removeChild(item);
}
