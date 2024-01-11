
interface Product {
    code: string;
    name: string;
    variants: string[];
    description: string;
    price: number;
    retailer: string;
}

const productJSON = `[{
    "name":"prodotto1",
    "variants":["variant1","variant2"],
    "description": "descript",
    "price":2.3,
    "retailer":"retailer strano"
},
{
    "name":"prodotto2",
    "variants":["variant3","variant4"],
    "description": "descript",
    "price":2.2,
    "retailer":"retailer stranissimo"
}]`;

function parseProductJSON(jsonString: string): Product[] {
    return JSON.parse(jsonString) as Product[];
}

var products: Product[] = parseProductJSON(productJSON);

function mostraDatiProto(): void {
    try {
        const productsContainer = document.getElementById('products-container');
        const selectedProductsContainer = document.getElementById('selected-products-container');

        if (products.length > 0) {
            for (const product of products) {
                const productElement = document.createElement('div');
                productElement.classList.add('product');

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                productElement.appendChild(checkbox);

                const label = document.createElement('label');
                label.textContent = product.name ;
                productElement.appendChild(label);

                // const picklist= document.createElement('div');
                // picklist.classList.add('btn-group');

                // const buttondp=document.createElement('button');
                // buttondp.classList.add('btn btn-secondary btn-sm dropdown-toggle');

                // const dropMenu= document.createElement('ul');
                // dropMenu.classList.add('dropdown-menu');


                // picklist.appendChild(buttondp);
                // picklist.appendChild(dropMenu);

              
                
                

                

                checkbox.addEventListener('change', (event) => {
                    if ((event.target as HTMLInputElement).checked) {
                        const selectedProductElement = document.createElement('div');
                        selectedProductElement.classList.add('product');



                        const selectedLabel = document.createElement('label');
                        selectedLabel.textContent = product.name + " - " + product.price + "$";
                        selectedProductElement.appendChild(selectedLabel);

                        const selectedCross= document.createElement('p');
                        selectedCross.classList.add('cross');
                        selectedCross.textContent="X";
                        selectedProductElement.appendChild(selectedCross);
                        selectedCross.onclick=(e)=>{
                            selectedProductsContainer?.removeChild(selectedProductElement);
                            checkbox.checked=false;
                        }




                        selectedProductsContainer?.appendChild(selectedProductElement);
                    } else {
                        selectedProductsContainer?.querySelector(`label[for="${checkbox.id}"]`)?.parentElement?.remove();
                    }
                });

                if (productsContainer) {
                    productsContainer.appendChild(productElement);
                }
            }
        } else {
            console.error('Nessun prodotto presente nella lista.');
        }
    } catch (error) {
        console.error('Errore durante la visualizzazione.');
    }
}

mostraDatiProto();