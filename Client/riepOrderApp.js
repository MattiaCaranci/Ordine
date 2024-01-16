// import axios from "./node_modules/axios/index";
let orderTest = {
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
    <div class="card-text d-flex">
    <span class="d-inline-flex col>${product.name}</span>
    <span class="d-inline-flex col">price ${product.price}</span>
    <span class="d-inline-flex col">x ${p.quantity}</span>
    <span class="d-inline-flex col">${p.amount}$</span>    
    </div>
    `;
        prodTitle.insertAdjacentHTML("afterend", pRow);
    });
    let totalAmount = `
  <div class="d-flex mt-2">
  <h6 class="text-uppercase d-inline-flex col">totale </h6>
  <h6 class="d-inline-flex mx-5 col">${orderTest.totalAmount}$</h6>
  </div>`;
    const addTitle = document.querySelector("#shipAdd-title");
    addTitle.insertAdjacentHTML("beforebegin", totalAmount);
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
            billingInfo += `<span class="card-text">${e[0]}: </span>
      <span class="card-text">${e[1]}</span>`;
            pRow = `
      <div class="d-flex">
      <h5 class="text-danger-emphasis fw-semibold">billing and shipping addresses</h5>
      ${billingInfo}
      </div>
      `;
        });
    }
    else {
        Object.entries(billingAdd).forEach((e) => {
            billingInfo += `<p class="card-text">${e[0]}: ${e[1]}</p>`;
        });
        Object.entries(shippingAdd).forEach((e) => {
            shippingInfo += `<p class="card-text">${e[0]}: ${e[1]}</p>`;
        });
        pRow = `
    <div class="d-flex flex-row">
    <section class="col">
    <p class="text-danger-emphasis fw-semibold">Billing addresses</p>
    ${billingInfo}
    </section>
    <section class="col">
    <p class="text-danger-emphasis fw-semibold">Shipping addresses</p>
    ${shippingInfo}
    </section>
    </div>
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
let button = document.querySelector("#confirm-order-btn");
button.addEventListener("click", sendOrder);
async function sendOrder() {
    const URLendpoint = "http://localhost:8083/api/riepOrder/arrivingOrder";
    let res = await axios.post(URLendpoint, {
        ...orderTest,
    });
    console.log(res);
}
function objToCsv(obj) {
    let riepToCsv = {
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
function getTotalQnt() {
    let total = 0;
    orderTest.orderLineItems.forEach((oli) => {
        total += oli.quantity;
    });
    return total;
}
function getTotalAmount() {
    let total = 0;
    orderTest.orderLineItems.forEach((oli) => {
        total += oli.amount;
    });
    return total;
}
function toCsv(objToCsv) {
    let res = "";
    res += Object.keys(objToCsv).join(",");
    console.log(res);
    res += ",";
    res += Object.values(objToCsv).join(",");
    console.log(res);
    return res;
}
function download(data) {
    const blob = new Blob([data], { type: "text/csv" });
    const click = window.URL.createObjectURL(blob);
    const clickDownload = `<a href="${click}" class="mx-3" download="riepilog.csv">scaricami bello</a>`;
    let button = document.querySelector("#confirm-order-btn");
    button.insertAdjacentHTML("beforebegin", clickDownload);
}
// download(`"prodTotal","totalAmount","firstname","lastname","age","email","phone","locale","street","city","state","postalCode"
// 500,150.5,"John","Doe",33,"john.doe@example.com","3333333","locale","123 Main St","Cityville","CA",12345`)
console.log("bello");
download(toCsv(objToCsv(orderTest)));
export {};
