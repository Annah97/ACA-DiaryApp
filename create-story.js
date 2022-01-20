
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

