const formCreate = document.getElementById('form-create')
const formEdit = document.getElementById('form-edit')
const listGroupTodo = document.getElementById('list-group-todo')
// const messageCreate = document.getElementById('message-create')
const time = document.getElementById('time')
const modal = document.getElementById('modal')
const overlay = document.getElementById('overlay')
/* time elements */
const fullDay = document.getElementById('full-day')
const hourEl = document.getElementById('hour')
const minuteEl = document.getElementById('minute')
const secondEl = document.getElementById('second')
const closeEl = document.getElementById('close')

//check
let todos = JSON.parse(localStorage.getItem('list'))
 ?JSON.parse(localStorage.getItem('list'))
 :[]
 if (todos.length){showtodos()}
//set todos to local storage
function addLocalStorage(){
    localStorage.setItem('list',JSON.stringify(todos))
}
//month
const monthlist = [
    'yanvar',
    'fevral',
    'mart',
    'aprel',
    'may',
    'iyun',
    'iyul',
    'avgust',
    'sentabr',
    'oktabr',
    'noyabr',
    'deyabr',
]
//time
function getTime(){
    const date = new Date()
    const day = date.getDate() < 10 ? '0'+ date.getDate():date.getDate()
    const month = date.getMonth() < 10 ? '0'+ (date.getMonth()+1):(date.getMonth()+1)
    const year = date.getFullYear()
    const time = date.getHours() < 10 ? '0'+ date.getHours():date.getHours()
    const minute = date.getMinutes() < 10 ? '0'+ date.getMinutes():date.getMinutes()
    const secont = date.getSeconds() < 10 ? '0'+ date.getSeconds():date.getSeconds()


    const month1 = date.getMonth()
    fullDay.textContent = `${day} ${monthlist[month1]} ${year}`
    hourEl.textContent = time
    minuteEl.textContent = minute
    secondEl.textContent  = secont

    return `${time}:${minute}:${secont}  ${day}.${month}.${year}`
}

setInterval(getTime,1000);

//show todos
function showtodos(){
    const todoss = JSON.parse(localStorage.getItem('list'))
    listGroupTodo.innerHTML = ''
    todoss.forEach((item, i)=>{
        listGroupTodo.innerHTML += `
        <li ondblclick = (setCompleted(${i})) class="list-group-item d-flex justify-content-between ${item.complated==true? 'complated':''}">${item.text}
          <div class="todo-icons">
            <span class="opacity-50 me-2">${item.time}</span>
            <img onclick= (editTodo(${i}))  src="img/edit.svg" alt="edit icon" width="25" height="25"/>
            <img onclick = (deleteTodo(${i})) src="img/delete.svg" alt="delete icon" width="25" height="25"/>
          </div>
        </li>
        `
    })
}


//show error
function showEnter(where,message) {
    document.getElementById(where).textContent = message
    setTimeout(()=>{
        document.getElementById(where).textContent = ''
    },2500)
}
//get todos

formCreate.addEventListener('submit',(e)=>{
    e.preventDefault()
    const todotext = formCreate['input-create'].value.trim()
    formCreate.reset()
    if (todotext.length){
        todos.push({text:todotext, time:getTime(), complated:false})
        addLocalStorage()
        showtodos()
    }
    else {
        showEnter('message-create','Please create some text ...')
    }
    
})

function deleteTodo(id){
    const deletetodos = todos.filter((item,i)=>{
        return i!==id
    })    
    todos = deletetodos
    addLocalStorage()
    showtodos()
}
function setCompleted(id){
    const Opasity = todos.map((item,i)=>{
        if (id==i){
            return {...item, complated: item.complated==true? false:true}
        }
        else{
            return {...item}
        }
    })
    todos = Opasity
    addLocalStorage()
    showtodos()
}

function open(){
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
}
function close(){
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
}
const closebutton = closeEl.addEventListener('click',close)
document.addEventListener('keypress',(e)=>{
    if(e.whitch==27){
        close()
    }
})

function editTodo(id){
    open()
    formEdit.addEventListener('submit',(e)=>{
        e.preventDefault()
        const inputqiy = formEdit['input-edit'].value.trim()
        formEdit.reset()
        if (inputqiy.length){
            todos.splice(id,1,{text:inputqiy, time:getTime(), complated:false})
            addLocalStorage()
            showtodos()
            close()
            }
        else (
            showEnter('message-edit','hech nima kiritilmadi')
            )
    })
}
