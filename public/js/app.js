console.log('This text is from client side');


const weatherForm=document.querySelector('form')
const searchElement=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messagetwo=document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=searchElement.value
    messageOne.textContent='loading....'
        messagetwo.textContent=''
    fetch('http://localhost:3000/weather/?address='+location).then((response)=>{
response.json().then((data)=>{
    if(data.error){
        messageOne.textContent=data.error
        messagetwo.textContent=''
        console.log(data.error)
    }else{
        messageOne.textContent=data.Place
        messagetwo.textContent=data.forecast
        console.log(data.Place)
        console.log(data.forecast)
    }
})
})
})
