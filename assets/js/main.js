let eduDiv = document.querySelector(".eduDiv");
let eduDiv1 = document.querySelector(".eduDiv1");
let eduBtn1 = document.querySelector(".eduBtn1");
let eduBtn2 = document.querySelector(".eduBtn2");
let eduImg = document.querySelector(".eduImg");
let eduImg1 = document.querySelector(".eduImg1");


function showMore() {
    eduDiv.classList.toggle("none")
    eduImg.classList.toggle("none")
    eduDiv1.classList.toggle("none")
    eduImg1.classList.toggle("none")
}
eduBtn1.addEventListener("click", showMore);
eduBtn2.addEventListener("click", showMore);

let soldBtn = document.querySelector("#soldOutBtn");
let soldAlert = document.querySelector("#soldOutAlert");
let soldBadge = document.querySelector("#soldOutBadge")
let coworkh1 = document.querySelector("#coworkh1");
let coworkp = document.querySelector("#coworkp");
function soldOutRemove() {
    soldAlert.classList.toggle("none1");
    soldBadge.classList.toggle("none1");
    coworkh1.classList.toggle("linethrough")
    coworkp.classList.toggle("linethrough")
}
soldBtn.addEventListener("click", soldOutRemove);


let textBadge = document.querySelector(".textAreaBadge");
let textBadge1 = document.querySelector(".textAreaBadge1");
let textArea1 = document.querySelector("#textArea1");
let textArea2 = document.querySelector("#textArea2");

function letterNum() {
    textBadge.innerHTML = 300 - textArea1.value.length
}
function letterNum1() {
    textBadge1.innerHTML = 300 - textArea2.value.length
}
textArea1.addEventListener("keyup", letterNum);
textArea2.addEventListener("keyup", letterNum1);
   


