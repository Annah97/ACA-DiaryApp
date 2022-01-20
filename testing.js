let food = [
{
name: 'French Toast',
price: 7.99,
popularity: '★★',
},
{
name: 'Hawaiian Pancake',
price: 9.99,
popularity: '★★★',
},
{
name: 'Omelet',
price: 5.99,
popularity: '★★',
},
];
const addBtn = document.querySelector('.btn-outline-primary');
const clearAllBtn = document.querySelector('.btn-outline-danger');
const tBody = document.querySelector('tbody');
const tableRows = tBody.getElementsByTagName('tr');
function updateTable() {
const tableData = food
.map((item) => {
return `
<tr>
<td>${item.name}</td>
<td>$${item.price}</td>
<td>${item.popularity}</td>
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
const name = document.querySelector('#name');
const price = document.querySelector('#price');
const popularity = document.querySelector('#popularity');
const obj = {};
if(name.value !== '' && price.value !== '' && popularity.value !== ''){
obj.name = name.value;
obj.price = price.value;
obj.popularity = popularity.value;
food.push(obj);
updateTable();
name.value = '';
price.value = '';
popularity.value = 'Select Popularity';
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
getObj.name = children[0].innerText;
getObj.price = children[1].innerText;
getObj.popularity = children[2].innerText;
const deleteIndex = food.findIndex((obj) => {
return obj.name === getObj.name && `$${obj.price}` === getObj.price && obj.popularity === getObj.popularity;
});
food.splice(deleteIndex, 1);
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


//sorting data


 //get variables
 var fname= data.map(function(obj){
      return obj.name;
 });
 
 $('div').text(JSON.stringify(dates));
alert(JSON.stringify(dates));
 
 //fix date and remove /
 function fixDate (date) {
   var d = date.split('/');   
  d =  d.reverse().join('/');
    //console.log('date:'+ date+" === formatetedDate:"+ d);
   return d;
 }
 

 //sort stories and return sorted stories
 var sortedDates = dates.sort(function(a,b){
    a=  fixDate(a);
    b = fixDate(b);
    
    return a>b ? 1: a<b ? -1 : 0;
 });
 
  $('#sorted').text(JSON.stringify(sortedDates));