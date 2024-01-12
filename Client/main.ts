
interface Product {
    code: string;
    name: string;
    variants: string[];
    description: string;
    price: number;
    retailer: string;
}

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
}];

function mostraProdotto(): void {
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
                increaseButton.style.borderRadius='40%';
                increaseButton.style.marginLeft = '10px';
                increaseButton.classList.add('btn', 'btn-secondary');
                increaseButton.textContent = '+';
                productElement.appendChild(increaseButton);

                //bottone per diminuire la quantità
                const decreaseButton = document.createElement('button');
                decreaseButton.type = 'button';
                decreaseButton.style.borderRadius='40%';
                decreaseButton.style.marginLeft = '10px';
                decreaseButton.classList.add('btn', 'btn-secondary');
                decreaseButton.textContent = '-';
                productElement.appendChild(decreaseButton);

                //bottone per aggiungere il prodotto
                const button = document.createElement('button');
                button.type = 'button';
                button.classList.add('btn', 'btn-primary');
                button.style.marginLeft = '15px';
                button.style.borderRadius='50%';
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

                button.addEventListener('click', () => {
                    const selectedProductElement = document.createElement('div');
                    selectedProductElement.classList.add('product');

                    const selectedLabel = document.createElement('label');

                    //variante selezionata
                    const selectedVariant = variantSelect.value;
                    selectedLabel.textContent = `${product.name} - ${selectedVariant} - Quantità: ${currentQuantity} - ${product.price * currentQuantity}$`;
                    selectedProductElement.appendChild(selectedLabel);

                    // X per rimuovere prodotto selezionato
                    const selectedCross = document.createElement('p');
                    selectedCross.classList.add('cross');
                    selectedCross.textContent = 'X';
                    selectedCross.style.fontSize = '20px';
                    selectedProductElement.appendChild(selectedCross);

                    selectedCross.onclick = () => {
                        selectedProductsContainer.removeChild(selectedProductElement);
                    };

                    currentQuantity = 1;
                    quantityElement.textContent = `Quantità: ${currentQuantity}`;

                    selectedProductsContainer.appendChild(selectedProductElement);
                });

                productsContainer.appendChild(productElement);
            }
        } else {
            console.error('Nessun prodotto presente nella lista o mancano i container.');
        }
    } catch (error) {
        console.error('Errore durante la visualizzazione.');
    }
}

function createSelect(options: string[]): HTMLSelectElement {
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





//checkbox che se cliccata stampa l prodotto
// checkbox.addEventListener('change', (event) => {
//     if ((event.target as HTMLInputElement).checked) {
//         const selectedProductElement = document.createElement('div');
//         selectedProductElement.classList.add('product');
//         const selectedLabel = document.createElement('label');
//         selectedLabel.textContent = product.name + " - " + product.price + "$";
//         selectedProductElement.appendChild(selectedLabel);
//         const selectedCross = document.createElement('p');
//         selectedCross.classList.add('cross');
//         selectedCross.textContent = "X";
//         selectedProductElement.appendChild(selectedCross);
//         selectedCross.onclick = (e) => {
//             selectedProductsContainer?.removeChild(selectedProductElement);
//             checkbox.checked = false;
//         }
//         selectedProductsContainer?.appendChild(selectedProductElement);
//     } else {
//         selectedProductsContainer?.querySelector(`label[for="${checkbox.id}"]`)?.parentElement?.remove();
//     }
// });

