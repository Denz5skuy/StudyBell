let alarms = JSON.parse(localStorage.getItem("alarms")) || [];

function save(){
localStorage.setItem("alarms", JSON.stringify(alarms));
}

function toggleDays(){
let v = document.getElementById("repeat").value;
document.getElementById("daysBox").classList.toggle("hide", v==="daily");
}

function getDays(){
let arr=[];
document.querySelectorAll("#daysBox input:checked").forEach(x=>{
arr.push(x.value);
});
return arr;
}

function addAlarm(){

let h = parseInt(document.getElementById("hour").value);
let m = parseInt(document.getElementById("minute").value);

if(isNaN(h)||isNaN(m)||h<1||h>12||m<0||m>59){
alert("Jam salah!");
return;
}

let alarm = {
id:Date.now(),
subject:document.getElementById("subject").value,
task:document.getElementById("task").value,
time:`${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`,
period:document.getElementById("period").value,
repeat:document.getElementById("repeat").value,
days:getDays(),
active:true
};

alarms.push(alarm);
save();
render();
}

function deleteAlarm(id){
alarms = alarms.filter(a=>a.id!==id);
save();
render();
}

function toggleAlarm(id){
alarms = alarms.map(a=>{
if(a.id===id) a.active=!a.active;
return a;
});
save();
render();
}

function render(){

let box=document.getElementById("list");
box.innerHTML="";

alarms.forEach(a=>{
box.innerHTML+=`
<div class="alarm">

<b>${a.subject}</b>
<p>${a.task}</p>
<p>⏰ ${a.time} ${a.period}</p>
<p>${a.repeat==="daily"?"Everyday":a.days.join(", ")}</p>

<div class="btns">
<button onclick="toggleAlarm(${a.id})">
${a.active?"ON":"OFF"}
</button>

<button onclick="deleteAlarm(${a.id})">
Hapus
</button>
</div>

</div>
`;
});
}

render();

setInterval(()=>{

let now=new Date();
let h=now.getHours();
let m=now.getMinutes();

let period=h>=12?"PM":"AM";
let h12=h%12||12;

let current=`${String(h12).padStart(2,"0")}:${String(m).padStart(2,"0")}`;

alarms.forEach(a=>{
if(!a.active) return;
if(a.time===current && a.period===period){
alert(`⏰ ${a.subject} - ${a.task}`);
}
});

},10000);