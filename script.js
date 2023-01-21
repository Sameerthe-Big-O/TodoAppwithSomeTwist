const button = document.querySelector("#enter");
const input = document.querySelector("#usertext");
const parents = document.querySelector("ul");
const counter = document.querySelector("#counter");
const compelete = document.querySelector("#comp-Task");
const clearAll = document.querySelector("#Clear-Task");
const sun=document.querySelector('#sun');
const banner=document.querySelector('.banner');
const image=document.getElementById('next');

//*Dark mode
function toggle(){
  button.classList.toggle('dark');
  document.body.classList.toggle('dark');
  input.classList.toggle('dark');
  banner.classList.toggle('dark');
  const items=document.querySelectorAll('.item');
  items.forEach(function(item){
    item.classList.toggle('dark');
  })
  if(image.classList.contains('img')){
     image.classList.remove('img');
     image.src="/bg-desktop-dark.jpg";
     sun.src="/icon-moon.svg"; 
  }
  else {
    image.classList.add('img');
    image.src="/bg-desktop-light.jpg";
    sun.src="/icon-sun.svg";
  }
}
sun.addEventListener('click',toggle)
//*CLear 
function clearAllData() {
  parents.innerHTML = "";
  counter.innerText="0";
  compelete.innerText="0";
}
//*Check Empty or not
function filedCheck() {
  if (input.value.length > 0) {
    return true;
  } else {
    return false;
  }
}
function emptyInputField() {
  input.value = "";
  input.focus();
}
//*Created the element
function createElementS() {

  if(document.body.className==="dark") 
  {
    const parent = document.createElement("div");
    const id = new Date().getTime();
    parent.id = id;
    parent.classList.add("dark");
    parent.classList.add("item");
    parents.appendChild(parent);
  
    const li = document.createElement("li");
    li.innerText = input.value;
    li.id = id;
    parent.append(li);
  
    const edit = `<i class="bi bi-pen edits" id=${id}></i>`;
    parent.innerHTML += edit;
    const del = `<i class="bi bi-trash3 dels"></i>`;
    parent.innerHTML += del;
    const num = Number(counter.innerText);
    counter.innerText = num + 1;
  
    emptyInputField();
  }
  else { 
  const parent = document.createElement("div");
  const id = new Date().getTime();
  parent.id = id;
  parent.classList.add("item");
  parents.appendChild(parent);

  const li = document.createElement("li");
  li.innerText = input.value;
  li.id = id;
  parent.append(li);

  const edit = `<i class="bi bi-pen edits" id=${id}></i>`;
  parent.innerHTML += edit;
  const del = `<i class="bi bi-trash3 dels"></i>`;
  parent.innerHTML += del;
  const num = Number(counter.innerText);
  counter.innerText = num + 1;

  emptyInputField();
  }
}

function addClick() {
  if (filedCheck() === true) {
    createElementS();
  }
}
function addpresskey(event) {
  if (filedCheck() === true && event.which === 13) {
    createElementS();
  }
}
function deletes(event) {
  if (event.target.classList.contains("dels")) {
    counter.innerText -= 1;
    event.target.parentNode.remove();
    emptyInputField();
  }
}
//*the edit and the save button
function edit(event) {
  if (event.target.classList.contains("edits")) {
    const lis = document.querySelectorAll("li");
    lis.forEach((Element) => {
      if (Element.id === event.target.id) {
        if (filedCheck() === false) {
          input.focus();
          event.target.innerText = "Save";
          input.value = Element.innerText;
        } else {
          event.target.innerText = "";
          Element.innerText = input.value;
          emptyInputField();
        }
      }
    });
  }
}
function streak(e) {
  if (e.target.tagName === "LI") {
    if (!e.target.classList.contains("streak")) {
      e.target.classList.toggle("streak");
      const incrementInComp = Number(compelete.innerText);

      compelete.innerText = 1 + incrementInComp;
    } else {
      compelete.innerText -= 1;
      e.target.classList.toggle("streak");
    }
  }
}
function Themain(event) {
  streak(event);
  deletes(event);
  edit(event);
}

button.addEventListener("click", addClick);
input.addEventListener("keypress", addpresskey);
parents.addEventListener("click", Themain);
clearAll.addEventListener("click", clearAllData);

//*if we have an list of class and we want to check whether certain is present or not in that case we use ClassList otherwise simply ClassName
