import axios from 'node_modules/axios';

let orderTest = {
    totalAmount: 150.5,
    orderLineItems: [
        {
            lineItemId: 101,
            quantity: 2,
            amount: 50.25,
            product: {
                code: 2,
                name: "a",
                variants: ["variant1", "variant2"],
                description: "descript",
                price: 2.3,
                retailer: "retailer strano",
            },
        },
        {
            lineItemId: 102,
            quantity: 1,
            amount: 50.0,
            product: {
                code: 1,
                name: "b",
                variants: ["variant3", "variant4"],
                description: "descript",
                price: 2.2,
                retailer: "retailer stranissimo",
            },
        },
    ],
    customer: {
        firstname: "John",
        lastname: "Doe",
        age: 33,
        email: "john.doe@example.com",
        phone: "3333333",
        locale: "locale",
        billingAddress: {
            street: "123 Main St",
            city: "Cityville",
            state: "CA",
            postalCode: "12345",
        },
        shippingAddress: {
            street: "456 Broad St",
            city: "Townsville",
            state: "CA",
            postalCode: "67890",
        },
    },
};


type htmlElem = HTMLElement | null;

function getOLI() {

    const prodTitle: htmlElem = document.querySelector("#prod-title");


    orderTest.orderLineItems.forEach((p) => {
        let product = p.product;
        let pRow = `
          <p class="card-text">${product.name} price ${product.price} description ${product.description}</p>
          `;
        if (prodTitle != null) {
            prodTitle.insertAdjacentHTML("afterend", pRow);
        }
    });

    const addTitle = document.querySelector("#add-title");
}
getOLI();

function getAdds() {
    const addTitle = document.querySelector("#shipAdd-title");
    let pRow = "";
    let billingAdd = orderTest.customer.billingAddress;
    let shippingAdd = orderTest.customer.shippingAddress;
    let billingInfo = "";
    let shippingInfo = "";
    if (isEmpty(billingAdd)) {
        Object.entries(billingAdd).forEach((e) => {
            billingInfo += `<p class="card-text">${e[0]}: ${e[1]}</p>`;
            pRow = `
              <p class="text-danger-emphasis fw-semibold">billing and shipping addresses</p>
                ${billingInfo}
                `;
        });
    } else {
        Object.entries(billingAdd).forEach((e) => {
            billingInfo += `<p class="card-text">${e[0]}: ${e[1]}</p>`;
        });
        Object.entries(shippingAdd).forEach((e) => {
            shippingInfo += `<p class="card-text">${e[0]}: ${e[1]}</p>`;
        });
        pRow = `
            <p class="text-danger-emphasis fw-semibold">billing addresses</p>
              ${billingInfo}
              <p class="text-danger-emphasis fw-semibold">shipping addresses</p>
              ${shippingInfo}
              `;
    }
    if (addTitle != null) {

        addTitle.insertAdjacentHTML("afterend", pRow);
    }
}
getAdds();

function isEmpty(obj : any) {
    for (const prop in obj) {
        if (Object.hasOwn(obj, prop)) {
            return false;
        }
    }

    return true;
}


let button : htmlElem = document.querySelector("#confirm-order-btn");

if(button != null) { button.addEventListener("click", sendOrder); }

async function sendOrder() {
    const URLendpoint = "http://localhost:8083/api/riepOrder/arrivingOrder"
    let res = await axios.post(URLendpoint, {
        ...orderTest
    })

    console.log(res);
}  

// codice sotto da chatgpt

/*
import axios, { AxiosResponse } from 'axios';

interface CreateUserResponse {
  name: string;
  job: string;
  id: string;
  createdAt: string;
}

async function createUser() {
  try {
    const { data, status }: AxiosResponse<CreateUserResponse> = await axios.post(
      'https://reqres.in/api/users',
      { name: 'John Smith', job: 'manager' },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );

    console.log(JSON.stringify(data, null, 4));
    console.log(status);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}

createUser();

*/