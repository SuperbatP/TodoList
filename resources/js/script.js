const inputBox = document.getElementById("input-box");
const listContainer = document.getElementsByClassName("list-container")[0];
const userDday = document.querySelector(".userDday");
const timerlist = document.querySelector(".timer");

let toastBox = document.getElementById("toastBox");
let alertMsg = '<i class="fas fa-regular fa-circle-exclamation"></i> 내용을 입력하세요.'
let alertTime = '<i class="fas fa-regular fa-circle-exclamation"></i> 시간을 설정하세요.'

// 경고창
function f_showToast(msg){
   let toast = document.createElement('div');
   toast.classList.add('toast');
   toast.innerHTML = msg;
   toastBox.appendChild(toast);

   setTimeout(()=>{
    toast.remove();
   },2000);
}

//메모 작성
function f_addTask(){
    if(inputBox.value === ''){
        f_showToast(alertMsg);
    }else{
        let ul = document.createElement("ul");
        listContainer.appendChild(ul);
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        ul.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

//메모리스트 기능
listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }else if(e.target.tagName === "SPAN"){
        e.target.parentElement.parentElement.remove();
        saveData();
    }
},false);

//메모 데이터 저장 및 불러오기
function saveData(){
    localStorage.setItem("ToDoData",listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("ToDoData");
}

showTask();

// calendar
let date =  new Date();
let dayNum = date.getDay();
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

let day = date.getDate();
let month = months[date.getMonth()];
let year = date.getFullYear();

let active = document.querySelector(".week li:nth-child("+dayNum+")");
active.classList.add("current");

let h1 = document.createElement('h1');
h1.innerHTML = day;
active.appendChild(h1);

let h5 = document.createElement('h5');
h5.innerHTML = month;
active.appendChild(h5);

let h3 = document.createElement('h3');
h3.innerHTML = year;
active.appendChild(h3);

//d-day
let setting = document.getElementById("setDate");
// 오늘을 기점으로 과거 날짜 선택 불가 | max의 경우 미래 날짜 선택 불가.
setting.min = new Date().toISOString().split("T")[0];

let userDate;
let v_times = [];

function addTime(){
    userDate = new Date(setting.value).getTime();
    
    if(userDate === undefined || isNaN(userDate)){
        f_showToast(alertTime);
        document.querySelector(".timer").style.display = "none";
    } else{
        //사용자가 선택한 값(미래)
    userDate = new Date(setting.value).getTime();
    saveTime();
    }
}

function saveTime(){
    //각 시간을 배열로 저장
    v_times.push(userDate);
    localStorage.setItem("Time",JSON.stringify(v_times));
}

function addDay(){
// "userDday" 클래스를 가진 div 요소를 생성합니다.
const userDdayDiv = document.createElement("div");
userDdayDiv.className = "userDday";

// 필요한 구조를 생성하기 위한 루프를 만듭니다.
const elements = ["days", "hours", "minutes", "seconds"];

elements.forEach((element) => {
    // div 요소를 만듭니다.
    const div = document.createElement("div");
    
    // 값을 위한 단락 요소를 만듭니다.
    const p = document.createElement("p");
    p.className = element; // 클래스 이름을 기반으로 클래스를 설정합니다.
    div.appendChild(p);
    
    // 레이블을 위한 스팬 요소를 만듭니다.
    const span = document.createElement("span");
    span.textContent = element.charAt(0).toUpperCase() + element.slice(1); // 클래스 이름을 첫 글자 대문자로 설정합니다.
    div.appendChild(span);
    
    // div를 "userDday" 컨테이너에 추가합니다.
    userDdayDiv.appendChild(div);
    //localstroage에 이 userDaydiv 저장

    // "userDday" 컨테이너를 타이머 컨테이너에 추가합니다.
    timerlist.appendChild(userDdayDiv);
});
    if(userDate == undefined || isNaN(userDate)){
       // userDday.style.display = "none";
    } else {
        calcTime();        
        localStorage.setItem("TimeData",timerlist.innerHTML);
    }

}

function calcTime(){
    let x = setInterval(()=>{
        //실시간 값이 변해야 하니까, 현재의 값을 변하게 해야함.
        let now = new Date().getTime();

        for(let i=0; i<v_times.length; i++){

        let d_day = v_times[i] - now;
        let days = Math.floor(d_day/(1000*60*60*24));
        let hours = Math.floor((d_day%(1000*60*60*24))/(1000*60*60));
        let minutes = Math.floor((d_day%(1000*60*60))/(1000*60));
        let seconds = Math.floor((d_day%(1000*60))/(1000));

        document.getElementsByClassName("days")[i].innerHTML = days;
        document.getElementsByClassName("hours")[i].innerHTML = hours;
        document.getElementsByClassName("minutes")[i].innerHTML = minutes;
        document.getElementsByClassName("seconds")[i].innerHTML = seconds;
            
        if(d_day<0){
            clearInterval(x);
            document.getElementsByClassName("days")[i].innerHTML = "00";
            document.getElementsByClassName("hours")[i].innerHTML = "00";
            document.getElementsByClassName("minutes")[i].innerHTML = "00";
            document.getElementsByClassName("seconds")[i].innerHTML = "00";
        } 
    }
    }, 1000);
}


function showTime(){
    timerlist.innerHTML = localStorage.getItem("TimeData");
}
 
if(localStorage.getItem("TimeData") != null){
    showTime();
    calcTime();
}









