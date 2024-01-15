let productsssstest = [
    {
        code: 11,
        name: "hajsdkhasdkja",
        variants: ["variant1", "variant2"],
        description: "descript",
        price: 12.3,
        retailer: "retailer strano",
    },
    {
        code: 12,
        name: "prodakjshdkuct2",
        variants: ["variant3", "variant4"],
        description: "descript",
        price: 2.2,
        retailer: "retailer stranissimo",
    },
];
let ordervuoto = {
    totalAmount: 0,
    orderLineItems: [],
    customer: {
        firstname: "",
        lastname: "",
        age: 0,
        email: "",
        phone: "",
        locale: "",
        billingAddress: {
            street: "",
            city: "",
            state: "",
            postalCode: 0
        }
    }
};
setOrder(productsssstest);
console.log(ordervuoto.orderLineItems);
// console.log(ordervuoto.orderLineItems[0].product+"gvhgcvhgc");
var counter = 0;
function mostraProdotto() {
    try {
        const productsContainer = document.getElementById('products-container');
        const selectedProductsContainer = document.getElementById('selected-products-container');
        if (ordervuoto.orderLineItems.length > 0 && productsContainer && selectedProductsContainer) {
            for (const lineItem of ordervuoto.orderLineItems) {
                //div 
                const productElement = document.createElement('div');
                productElement.classList.add('product');
                productElement.id = `${counter}`;
                // console.log(productElement.id);
                console.log(ordervuoto.orderLineItems[counter].product);
                counter++;
                //casella prodotto
                const label = document.createElement('label');
                label.textContent = lineItem.product.name;
                label.style.marginRight = '10px';
                productElement.appendChild(label);
                //pickList per scegliere la variante del prodotto
                const variantSelect = createSelect(lineItem.product.variants);
                variantSelect.style.marginRight = '10px';
                productElement.appendChild(variantSelect);
                //selezione della quantità
                const quantityElement = document.createElement('span');
                quantityElement.textContent = `Quantità: 1`;
                productElement.appendChild(quantityElement);
                //bottone per aumentare la quantità
                const increaseButton = document.createElement('button');
                increaseButton.type = 'button';
                increaseButton.style.borderRadius = '40%';
                increaseButton.style.marginLeft = '10px';
                increaseButton.classList.add('btn', 'btn-secondary');
                increaseButton.textContent = '+';
                productElement.appendChild(increaseButton);
                //bottone per diminuire la quantità
                const decreaseButton = document.createElement('button');
                decreaseButton.type = 'button';
                decreaseButton.style.borderRadius = '40%';
                decreaseButton.style.marginLeft = '10px';
                decreaseButton.classList.add('btn', 'btn-secondary');
                decreaseButton.textContent = '-';
                productElement.appendChild(decreaseButton);
                //bottone per aggiungere il prodotto
                const button = document.createElement('button');
                button.type = 'button';
                button.classList.add('btn', 'btn-primary');
                button.style.marginLeft = '15px';
                button.style.borderRadius = '50%';
                button.textContent = 'Add';
                productElement.appendChild(button);
                let currentQuantity = 1;
                increaseButton.addEventListener('click', () => {
                    currentQuantity++;
                    quantityElement.textContent = `Quantità: ${currentQuantity}`;
                });
                decreaseButton.addEventListener('click', () => {
                    if (currentQuantity > 1) {
                        currentQuantity--;
                        quantityElement.textContent = `Quantità: ${currentQuantity}`;
                    }
                });
                function findExistingProductElement(variant) {
                    const existingElements = selectedProductsContainer === null || selectedProductsContainer === void 0 ? void 0 : selectedProductsContainer.getElementsByClassName('product');
                    for (const element of existingElements || []) {
                        const dataVariant = element.getAttribute('data-variant');
                        if (dataVariant === variant) {
                            return element;
                        }
                    }
                    return null;
                }
                button.addEventListener('click', () => {
                    const selectedProductElement = document.createElement('div');
                    selectedProductElement.classList.add('product');
                    const selectedLabel = document.createElement('label');
                    const selectedVariant = variantSelect.value;
                    const selectedText = `${lineItem.product.name} - ${selectedVariant}`;
                    //id dei prodotti inseriti
                    const pscounterClass = ` psclass-${productElement.id}`;
                    // selectedProductElement.classList.add(pscounterClass);
                    const existingProductElement = findExistingProductElement(selectedVariant);
                    if (existingProductElement) {
                        const existingQuantity = parseInt(existingProductElement.getAttribute('data-quantity') || '1', 10);
                        const newQuantity = existingQuantity + currentQuantity;
                        existingProductElement.setAttribute('data-quantity', newQuantity.toString());
                        const label = existingProductElement.querySelector('label');
                        // label!.classList.add(pscounterClass);
                        if (label) {
                            //prodotti selezionati se ce ne sta più di uno
                            let tam = lineItem.product.price * newQuantity;
                            label.textContent = `${selectedText} - Quantità: ${newQuantity} - ${Math.floor(tam)}$ - ${pscounterClass} `;
                            ordervuoto.totalAmount = tam;
                            console.log(productElement.id);
                            ordervuoto.orderLineItems[parseInt(productElement.id)].quantity = newQuantity;
                            ordervuoto.orderLineItems[parseInt(productElement.id)].amount = Math.floor(tam);
                        }
                    }
                    else {
                        //prodotti selezionati con uno solo
                        let tcm = lineItem.product.price * currentQuantity;
                        selectedLabel.textContent = `${selectedText} - Quantità: ${currentQuantity} - ${Math.floor(tcm)}$ - ${pscounterClass}`;
                        selectedProductElement.appendChild(selectedLabel);
                        ordervuoto.totalAmount = tcm;
                        //X rossa
                        const selectedCross = document.createElement('p');
                        selectedCross.classList.add('cross');
                        selectedCross.textContent = 'X';
                        selectedProductElement.appendChild(selectedCross);
                        ordervuoto.orderLineItems[parseInt(productElement.id)].quantity = currentQuantity;
                        ordervuoto.orderLineItems[parseInt(productElement.id)].amount = Math.floor(tcm);
                        //rimuovi prodotto
                        selectedCross.onclick = () => {
                            selectedProductsContainer.removeChild(selectedProductElement);
                        };
                        selectedProductElement.setAttribute('data-quantity', currentQuantity.toString());
                        selectedProductElement.setAttribute('data-variant', selectedVariant);
                        selectedProductsContainer.appendChild(selectedProductElement);
                    }
                    currentQuantity = 1;
                    quantityElement.textContent = `Quantità: ${Math.floor(currentQuantity)}`;
                });
                productsContainer.appendChild(productElement);
            }
        }
        else {
            console.error('Nessun prodotto presente nella lista o mancano i container.');
        }
    }
    catch (error) {
        console.error('Errore durante la visualizzazione.');
    }
}
function createSelect(options) {
    const selectElement = document.createElement('select');
    selectElement.classList.add('variant-select');
    for (const option of options) {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        selectElement.appendChild(optionElement);
    }
    return selectElement;
}
const nextButton = document.getElementById('next');
const confirmModal = document.getElementById('modale');
const confirmModalContent = document.getElementById('testom');
const confirmModalConfirmBtn = document.getElementById('confirmModalConfirmBtn');
const confirmModalCancelBtn = document.getElementById('confirmModalCancelBtn');
//dati da inviare
if (nextButton) {
    nextButton.addEventListener('click', () => {
        //modale
        confirmModalContent.textContent = `Confermi l'invio dell'ordine?`;
        confirmModal.style.display = 'block';
    });
    // Chiusura modale con click su annulla
    confirmModalCancelBtn.addEventListener('click', () => {
        confirmModal.style.display = 'none';
    });
    //  annulla conferma modale
    confirmModalCancelBtn.addEventListener('click', () => {
        confirmModal.style.display = 'none';
    });
    // Conferma e passa alla pagina successiva quando l'utente clicca su "Conferma" nel modale di conferma
    confirmModalConfirmBtn.addEventListener('click', () => {
        // window.location.href = 'prova.html';
        console.log(ordervuoto);
    });
}
mostraProdotto();
//popolare un order
function setOrder(productsssstest) {
    productsssstest.forEach(prodotto => {
        ordervuoto.orderLineItems.push({
            product: prodotto,
            amount: 0,
            quantity: 0
        });
    });
    console.log("order: " + ordervuoto);
}
export {};
// let orderTest: Order = {
//     totalAmount: 150.5,
//     orderLineItems: [
//         {
//             product: {
//                 code: 1,
//                 name: "product1",
//                 variants: ["variant1", "variant2"],
//                 description: "descript",
//                 price: 12.3,
//                 retailer: "retailer strano",
//             },
//             quantity: 2,
//             amount: 0,
//         },
//         {
//             product: {
//                 code: 2,
//                 name: "product2",
//                 variants: ["variant3", "variant4"],
//                 description: "descript",
//                 price: 2.2,
//                 retailer: "retailer stranissimo",
//             },
//             quantity: 1,
//             amount: 0,
//         },
//     ],
//     customer: {
//         firstname: "John",
//         lastname: "Doe",
//         age: 33,
//         email: "john.doe@example.com",
//         phone: "3333333",
//         locale: "locale",
//         billingAddress: {
//             street: "123 Main St",
//             city: "Cityville",
//             state: "CA",
//             postalCode: 12345,
//         },
//         shippingAddress: {
//             street: "456 Broad St",
//             city: "Townsville",
//             state: "CA",
//             postalCode: 67890,
//         },
//     },
// };
