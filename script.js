let tasks=[]
let currentTaskIndex=0
let interval
let timeLeft=0

// MANUAL TASK

function addManualTask(){

let name=document.getElementById("taskName").value
let day=document.getElementById("taskDay").value
let date=document.getElementById("taskDate").value
let time=document.getElementById("taskTime").value
let duration=document.getElementById("taskDuration").value

tasks.push({

name:name,
day:day,
date:date,
start:time,
duration:duration

})

renderTasks()

}

// AI GENERATOR

function startAI(){

let goal=prompt("What do you want to achieve?")
let hours=prompt("How many hours can you work daily?")
let workout=prompt("Do you want workout? (yes/no)")
let sleep=prompt("What time do you sleep?")

generateSchedule(goal,hours,workout,sleep)

}

function generateSchedule(goal,hours,workout,sleep){

tasks=[]

let today=new Date()

let studyHours=parseInt(hours)

for(let i=0;i<studyHours;i++){

tasks.push({

name:goal+" Session "+(i+1),

day:"Today",

date:today.toISOString().split("T")[0],

start:(9+i)+":00",

duration:60

})

}

if(workout=="yes"){

tasks.push({

name:"Workout",

day:"Today",

date:today.toISOString().split("T")[0],

start:"18:00",

duration:30

})

}

renderTasks()

}

function renderTasks(){

let list=document.getElementById("taskList")

list.innerHTML=""

tasks.forEach((t)=>{

let li=document.createElement("li")

li.innerHTML=`

<b>${t.name}</b><br>

📅 ${t.day} | ${t.date}<br>

⏰ ${t.start}<br>

⏳ ${t.duration} min

`

list.appendChild(li)

})

}

// FOCUS MODE

function enableFocus(){

if(tasks.length==0){

alert("Create tasks first")

return

}

currentTaskIndex=0

startTask()

}

function startTask(){

let task=tasks[currentTaskIndex]

timeLeft=task.duration*60

document.getElementById("currentTask").innerText=task.name

document.getElementById("taskDateShow").innerText=

task.day+" "+task.date+" "+task.start

document.getElementById("lockScreen").style.display="flex"

updateTimer()

interval=setInterval(()=>{

timeLeft--

updateTimer()

if(timeLeft<=0){

clearInterval(interval)

currentTaskIndex++

if(currentTaskIndex<tasks.length){

startTask()

}else{

document.getElementById("lockScreen").style.display="none"

}

}

},1000)

}

function updateTimer(){

let m=Math.floor(timeLeft/60)
let s=timeLeft%60

document.getElementById("timer").innerText=

`${m}:${s<10?"0":""}${s}`

}

function simulateCall(){

alert("Emergency Call Allowed")

}
