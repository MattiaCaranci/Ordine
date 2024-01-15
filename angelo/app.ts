import { Order } from "./classes";

let ordervuoto:Order = {
    totalAmount: 0,
    orderLineItems:[],
    customer:{
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

}

let inputFirstname = (document.querySelector("#inputFirstname")! as HTMLInputElement);
let inputLastname = (document.querySelector("#inputLastname")! as HTMLInputElement);
let inputAge = (document.querySelector("#inputAge")! as HTMLInputElement);
let inputEmail = (document.querySelector("#inputEmail")! as HTMLInputElement);
let inputPhone = (document.querySelector("#inputPhone")! as HTMLInputElement);
let inputLocal = (document.querySelector("#inputLocale")! as HTMLInputElement);
let inputCity = (document.querySelector("#inputCity")! as HTMLInputElement);
let inputStreet = (document.querySelector("#inputStreet")! as HTMLInputElement);
let inputState = (document.querySelector("#inputState")! as HTMLInputElement);
let inputPostalCode = (document.querySelector("#inputPostalCode")! as HTMLInputElement);

let buttonAngelo = document.querySelector("#angeloBottoneConferma");
let buttonCheckButton = document.querySelector("#gridCheck");

buttonAngelo!.addEventListener("click", plsSomeBodyHelpsMe)
function plsSomeBodyHelpsMe(){
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
    if(!(buttonCheckButton as HTMLInputElement).checked){
        let inputCity = (document.querySelector("#inputCityShipping")! as HTMLInputElement);
        let inputStreet = (document.querySelector("#inputStreetShipping")! as HTMLInputElement);
        let inputState = (document.querySelector("#inputStateShipping")! as HTMLInputElement);
        let inputPostalCode = (document.querySelector("#inputPostalCodeShipping")! as HTMLInputElement);
        
        ordervuoto.customer.shippingAddress!.city = inputCity.value;
        ordervuoto.customer.shippingAddress!.street = inputStreet.value;
        ordervuoto.customer.shippingAddress!.state = inputState.value;
        ordervuoto.customer.shippingAddress!.postalCode = parseInt(inputPostalCode.value);
    }
    console.log(ordervuoto);
}

buttonCheckButton!.addEventListener("change", helpMePls);


function helpMePls(){
    let shippingAddressContainer = (document.querySelector("#shippingAddressContainer")! as HTMLLIElement);
    if((buttonCheckButton as HTMLInputElement).checked){
        shippingAddressContainer.innerHTML=" "
    }else{
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
        <input type="postalCode" class="form-control" id="inputPostalCodeShipping">`

        shippingAddressContainer.insertAdjacentHTML("afterbegin", apritisesamo)

    }
    
}



