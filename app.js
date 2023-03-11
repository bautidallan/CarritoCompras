const botonAñade=document.querySelectorAll('.boton-ad')
const modalBody=document.querySelector('.modal-body');
const finalPrice=document.querySelector('.final-price');
const generalPrice=document.querySelector('.card-text price');

//Array para añadir al carrito;
const modalArray=[];
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
    else{
        modalArray.push(titleName);
        const card=createNewArticle(titleName,price,imagen) //Creo otra funcion,para lograr una mejor modulizacion
        modalBody.append(card); //Si no existe lo agrego 
    }
}

//Funcion que crea el divHTML para añadir al carrito 

function createNewArticle(title, price, imageSrc) {
    // create the elements
    const articleShop = document.createElement('div');
    const image = document.createElement('img');
    const infoDiv = document.createElement('div');
    const productName = document.createElement('p');
    const productPrice = document.createElement('p');
    const quantityInput = document.createElement('input');

    //Event listener de el input en el cart shop
    quantityInput.addEventListener('input',()=>{
    const defPrice=price.replace('$','');
    const quantity=quantityInput.value;
    productPrice.textContent=`Price: $${defPrice*quantity}`;
    })

    const hr = document.createElement('hr');

    // set the classes and attributes for the elements
    articleShop.classList.add('article-shop');
    image.setAttribute('src', imageSrc);
    productName.textContent = `Producto: ${title}`;
    productPrice.textContent = `Price: ${price}$`;
    quantityInput.setAttribute('type', 'number');
    quantityInput.setAttribute('name', 'quantity');
    quantityInput.setAttribute('id', 'quantity');

    // append the child elements to the parent element
    infoDiv.appendChild(productName);
    infoDiv.appendChild(productPrice);
    infoDiv.appendChild(quantityInput);

    articleShop.appendChild(image);
    articleShop.appendChild(infoDiv);
    articleShop.appendChild(hr);

    // return the new element
    return articleShop;
}



//Event listeners

// Como boton es un array de nodos debo usar un forEach para aplicar el evento a todos los nodos
botonAñade.forEach( button=> button.addEventListener('click',getToCart) )










