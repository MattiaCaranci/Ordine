import { Order, RiepilogoCsv } from "./commonClasses/classes";
// import axios from "./node_modules/axios/index";
let orderTest: Order = {
  totalAmount: 150.5,
  orderLineItems: [
    {
      product: {
        code: 2,
        name: "a",
        variants: ["variant1", "variant2"],
        description: "descript",
        price: 2.3,
        retailer: "retailer strano",
      },
      quantity: 2,
      amount: 50.25,
    },
    {
      product: {
        code: 1,
        name: "b",
        variants: ["variant3", "variant4"],
        description: "descript",
        price: 2.2,
        retailer: "retailer stranissimo",
      },
      quantity: 1,
      amount: 50.0,
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
      postalCode: 12345,
    },
    shippingAddress: {
      street: "456 Broad St",
      city: "Townsville",
      state: "CA",
      postalCode: 67890,
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
    prodTitle!.insertAdjacentHTML("afterend", pRow);
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
    Object.entries(shippingAdd!).forEach((e) => {
      shippingInfo += `<p class="card-text">${e[0]}: ${e[1]}</p>`;
    });
    pRow = `
    <p class="text-danger-emphasis fw-semibold">billing addresses</p>
    ${billingInfo}
    <p class="text-danger-emphasis fw-semibold">shipping addresses</p>
    ${shippingInfo}
    `;
  }
  addTitle!.insertAdjacentHTML("afterend", pRow);
}
getAdds();

function isEmpty(obj: any) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }

  return true;
}

let button = document.querySelector("#confirm-order-btn");

button!.addEventListener("click", sendOrder);

async function sendOrder() {
  const URLendpoint = "http://localhost:8083/api/riepOrder/arrivingOrder";
  let res = await axios.post(URLendpoint, {
    ...orderTest,
  });

  console.log(res);
}

function objToCsv(obj: Order):RiepilogoCsv {
  let riepToCsv: RiepilogoCsv = {
    prodTotal: getTotalQnt(),
    totalAmount: getTotalAmount(), //metodo total amount
    firstname: orderTest.customer.firstname,
    lastname: orderTest.customer.lastname,
    age: orderTest.customer.age,
    email: orderTest.customer.email,
    phone: orderTest.customer.phone,
    locale: orderTest.customer.locale,
    street: orderTest.customer.billingAddress.street,
    city: orderTest.customer.billingAddress.city,
    state: orderTest.customer.billingAddress.state,
    postalCode: orderTest.customer.billingAddress.postalCode,
  };
  console.log(riepToCsv);
  return riepToCsv;
}

function getTotalQnt(): number {
  let total: number = 0;
  orderTest.orderLineItems.forEach((oli) => {
    total += oli.quantity;
  });
  return total;
}


function getTotalAmount(): number {
  let total: number =0;
  orderTest.orderLineItems.forEach((oli)=>{
    total+=oli.amount
  })
  return total
}

function toCsv(objToCsv:RiepilogoCsv):string{
    let res:string = "";
    res+=Object.keys(objToCsv).join(",")
    console.log(res);
    res+=","
    res+=Object.values(objToCsv).join(",")
    console.log(res);
return res
}

function download(data:string) { 
    const blob = new Blob([data], { type: 'text/csv' }); 
    const click = window.URL.createObjectURL(blob) 
    const clickDownload = `<a href="${click}" download="riepilog.csv">scaricami bello</a>`
    let button = document.querySelector("#confirm-order-btn");
    button!.insertAdjacentHTML("beforebegin",clickDownload)
} 
// download(`"prodTotal","totalAmount","firstname","lastname","age","email","phone","locale","street","city","state","postalCode"
// 500,150.5,"John","Doe",33,"john.doe@example.com","3333333","locale","123 Main St","Cityville","CA",12345`)

download(toCsv(objToCsv(orderTest)))