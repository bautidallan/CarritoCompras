//Selectores de HTML
const botonAñade=document.querySelectorAll('.boton-ad')
const modalBody=document.querySelector('.modal-body');
const generalPrice=document.querySelector('.card-text price');

//Array para no duplicar productos ;
const modalArray=[];

const total=0;

//Funcion que busca todos los datos necesarios para añadir al carrito
function getToCart(event){
    
    const button=event.target;
    
    // Selectores del botton que ha sido clickeado 
    const modalBody=document.querySelector('.modal-body');
    const divItem=button.closest('.card');
    const titleName=divItem.querySelector('.card .card-title').textContent;
    const price = divItem.querySelector('.card .price').textContent;
    const imagen=divItem.querySelector('.card .card-img-top').src;  //Si pongo 'card' espacio y la clase q busco, pongo q busque la clase price dentro de card


    //Bloque de codigo para no repetir elementos en el cart shop;
    const def=modalArray.includes(titleName); //Cheque si el elemento existe en el array
    if (def){
        alert(`You already add ${titleName} to the cart shop`)
    }
    else{ //Si no existe lo agrego
        modalArray.push(titleName);
        const card=createNewArticle(titleName,price,imagen,total) //Creo otra funcion,para lograr una mejor modulizacion
        modalBody.append(card);
        
        const finalPrice=document.querySelector('.total-price');
        total=total+parseInt(price);
        finalPrice.innerHTML=`Total :$${total.toFixed(2)}`;
    }
    
    
}




//Funcion que crea el divHTML para añadir al carrito 
function createNewArticle(title, price, imageSrc,total) {
    // create the elements
    const articleShop = document.createElement('div');
    const image = document.createElement('img');
    const infoDiv = document.createElement('div');
    const productName = document.createElement('p');
    const productPrice = document.createElement('p');
    const quantityInput = document.createElement('input');
    const deleteButton=document.createElement('button');

    //Event listener de el input en el cart shop para calcular el precio en base a la cantidad
    quantityInput.addEventListener('input',()=>{
    const defPrice=price.replace('$','');
    const quantity=quantityInput.value;
    const newPrice=defPrice*quantity
    productPrice.textContent=`Price: $ ${newPrice}`;

    const finalPrice=document.querySelector('.total-price').textContent;
    total=total+newPrice;
    console.log(total.toFixed(2));
    finalPrice.innerHTML=`Total :$${total.toFixed(2)}`;
    })

    //Event listener del botton que remueve del cart shop
    deleteButton.addEventListener('click',(e)=>{
        
        const getClosest=e.target;
        const removeDiv=getClosest.closest('.article-shop');
        removeDiv.remove();

        //Lo saca del array para luego poder volver a añadirlo
        const indice=modalArray.indexOf(title); //Busca el indice y lo elimina
        modalArray.splice(indice,1); 

        const finalPrice=document.querySelector('.total-price').textContent;
        const defPrice=parseInt(price.replace('$',''));
        const quantity=quantityInput.value;
        total=total-price;
        finalPrice.innerHTML=`Total :$${total.toFixed(2)}`;
    })

    const hr = document.createElement('hr');

    // set the classes and attributes for the elements
    articleShop.classList.add('article-shop');
    image.setAttribute('src', imageSrc);
    productName.textContent = `Producto: ${title}`;
    productPrice.textContent = `Price: ${price}`;
    productPrice.classList.add('article-price');
    quantityInput.setAttribute('type', 'number');
    quantityInput.setAttribute('name', 'quantity');
    quantityInput.setAttribute('id', 'quantity');
    deleteButton.setAttribute('type','button')
    deleteButton.textContent='X';
    deleteButton.classList.add('btn');
    deleteButton.classList.add('btn-danger');

    // append the child elements to the parent element
    infoDiv.appendChild(productName);
    infoDiv.appendChild(productPrice);
    infoDiv.appendChild(quantityInput);
    infoDiv.appendChild(deleteButton);

    articleShop.appendChild(image);
    articleShop.appendChild(infoDiv);
    articleShop.appendChild(hr);


    // return the new element
    return articleShop;
}


//Event listeners

// Como boton es un array de nodos debo usar un forEach para aplicar el evento a todos los nodos
botonAñade.forEach( button=> button.addEventListener('click',getToCart) )





