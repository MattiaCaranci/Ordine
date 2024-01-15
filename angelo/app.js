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
        },
        shippingAddress: {
            street: "",
            city: "",
            state: "",
            postalCode: 0
        },
    }
};
let inputFirstname = document.querySelector("#inputFirstname");
let inputLastname = document.querySelector("#inputLastname");
let inputAge = document.querySelector("#inputAge");
let inputEmail = document.querySelector("#inputEmail");
let inputPhone = document.querySelector("#inputPhone");
let inputLocal = document.querySelector("#inputLocale");
let inputCity = document.querySelector("#inputCity");
let inputStreet = document.querySelector("#inputStreet");
let inputState = document.querySelector("#inputState");
let inputPostalCode = document.querySelector("#inputPostalCode");
let buttonAngelo = document.querySelector("#angeloBottoneConferma");
let buttonCheckButton = document.querySelector("#gridCheck");
buttonAngelo.addEventListener("click", plsSomeBodyHelpsMe);
function plsSomeBodyHelpsMe() {
    ordervuoto.customer.firstname = inputFirstname.value;
    ordervuoto.customer.lastname = inputLastname.value;
    ordervuoto.customer.age = parseInt(inputAge.value);
    ordervuoto.customer.email = inputEmail.value;
    ordervuoto.customer.phone = inputPhone.value;
    ordervuoto.customer.locale = inputLocal.value;
    ordervuoto.customer.billingAddress.city = inputCity.value;
    ordervuoto.customer.billingAddress.street = inputStreet.value;
    ordervuoto.customer.billingAddress.state = inputState.value;
    ordervuoto.customer.billingAddress.postalCode = parseInt(inputPostalCode.value);
    if (!buttonCheckButton.checked) {
        let inputCity = document.querySelector("#inputCityShipping");
        let inputStreet = document.querySelector("#inputStreetShipping");
        let inputState = document.querySelector("#inputStateShipping");
        let inputPostalCode = document.querySelector("#inputPostalCodeShipping");
        ordervuoto.customer.shippingAddress.city = inputCity.value;
        ordervuoto.customer.shippingAddress.street = inputStreet.value;
        ordervuoto.customer.shippingAddress.state = inputState.value;
        ordervuoto.customer.shippingAddress.postalCode = parseInt(inputPostalCode.value);
    }
    console.log(ordervuoto);
}
buttonCheckButton.addEventListener("change", helpMePls);
function helpMePls() {
    let shippingAddressContainer = document.querySelector("#shippingAddressContainer");
    if (buttonCheckButton.checked) {
        shippingAddressContainer.innerHTML = " ";
    }
    else {
        //qui aggiungo come figlio la stringa al padre shippingAddressContainer
        let apritisesamo = `
        <label for="inputShippingAddress2" class="form-label">Shipping Address</label>
        <input type="address" class="form-control" id="inputShippingAddress">
        <label for="cityAddress" class="form-label">Street</label>
        <input type="city" class="form-control" id="inputCityShipping">
        <label for="streetAddress" class="form-label">City</label>
        <input type="street" class="form-control" id="inputStreetShipping">
        <label for="stateAddress" class="form-label">State</label>
        <input type="state" class="form-control" id="inputStateShipping">
        <label for="postalCodeAddress" class="form-label">Postal code</label>
        <input type="postalCode" class="form-control" id="inputPostalCodeShipping">`;
        shippingAddressContainer.insertAdjacentHTML("afterbegin", apritisesamo);
    }
}
export {};
