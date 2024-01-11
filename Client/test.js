
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
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
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

function getOLI() {
  const prodTitle = document.querySelector("#prod-title");

  orderTest.orderLineItems.forEach((p) => {
    let product = p.product;
    let pRow = `
        <p class="card-text">${product.name} price ${product.price} description ${product.description}</p>
        `;
    prodTitle.insertAdjacentHTML("afterend", pRow);
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
  addTitle.insertAdjacentHTML("afterend", pRow);
}
getAdds();

function isEmpty(obj) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }

  return true;
}

// let button = document.querySelector("#confirm-order-btn");

// button.addEventListener("click", sendOrder());

// function sendOrder() {
//     axios.post()
// }
