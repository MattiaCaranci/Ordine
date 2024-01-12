"use strict";
const productJSON = [{
        "name": "prodotto1",
        "variants": ["variant1", "variant2"],
        "description": "descript",
        "price": 2.3,
        "retailer": "retailer strano"
    },
    {
        "name": "prodotto2",
        "variants": ["variant3", "variant4"],
        "description": "descript",
        "price": 2.2,
        "retailer": "retailer stranissimo"
    },
    {
        "name": "prodotto3",
        "variants": ["variant5", "variant6"],
        "description": "descript",
        "price": 6.6,
        "retailer": "retailer costoso"
    }];
function mostraProdotto() {
    try {
        const productsContainer = document.getElementById('products-container');
        const selectedProductsContainer = document.getElementById('selected-products-container');
        if (productJSON.length > 0 && productsContainer && selectedProductsContainer) {
            for (const product of productJSON) {
                const productElement = document.createElement('div');
                productElement.classList.add('product');
                //casella prodotto
                const label = document.createElement('label');
                label.textContent = product.name;
                label.style.marginRight = '10px';
                productElement.appendChild(label);
                //pickList per scegliere la variante del prodotto
                const variantSelect = createSelect(product.variants);
                variantSelect.style.marginRight = '10px';
                productElement.appendChild(variantSelect);
                //selezione della quantità
                const quantityElement = document.createElement('span');
                quantityElement.textContent = 'Quantità: 1'; // Imposta un valore predefinito
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
                    const selectedText = `${product.name} - ${selectedVariant}`;
                    const existingProductElement = findExistingProductElement(selectedVariant);
                    if (existingProductElement) {
                        const existingQuantity = parseInt(existingProductElement.getAttribute('data-quantity') || '1', 10);
                        const newQuantity = existingQuantity + currentQuantity;
                        existingProductElement.setAttribute('data-quantity', newQuantity.toString());
                        const label = existingProductElement.querySelector('label');
                        if (label) {
                            label.textContent = `${selectedText} - Quantità: ${newQuantity} - ${Math.floor(product.price * newQuantity)}$`;
                        }
                    }
                    else {
                        selectedLabel.textContent = `${selectedText} - Quantità: ${currentQuantity} - ${Math.floor(product.price * currentQuantity)}$`;
                        selectedProductElement.appendChild(selectedLabel);
                        const selectedCross = document.createElement('p');
                        selectedCross.classList.add('cross');
                        selectedCross.textContent = 'X';
                        selectedProductElement.appendChild(selectedCross);
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
mostraProdotto();
var prodotto = ;
const next = document.getElementById('next');
next === null || next === void 0 ? void 0 : next.addEventListener('click', () => {
    location.replace('prova.html');
});
