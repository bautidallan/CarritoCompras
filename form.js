const form=document.querySelector('.buy-form');
const formName=document.getElementById('exampleInputName');
const formEmail=document.getElementById('exampleInputEmail1');

formName.addEventListener('input',()=>{
    if(formName.value.length<4){
        formName.style.border ='1px solid red';
    }
    else{
        formName.style.border='';
    }
})



