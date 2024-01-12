var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var orderTest = {
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
function getOLI() {
    var prodTitle = document.querySelector("#prod-title");
    orderTest.orderLineItems.forEach(function (p) {
        var product = p.product;
        var pRow = "\n          <p class=\"card-text\">".concat(product.name, " price ").concat(product.price, " description ").concat(product.description, "</p>\n          ");
        if (prodTitle != null) {
            prodTitle.insertAdjacentHTML("afterend", pRow);
        }
    });
    var addTitle = document.querySelector("#add-title");
}
getOLI();
function getAdds() {
    var addTitle = document.querySelector("#shipAdd-title");
    var pRow = "";
    var billingAdd = orderTest.customer.billingAddress;
    var shippingAdd = orderTest.customer.shippingAddress;
    var billingInfo = "";
    var shippingInfo = "";
    if (isEmpty(billingAdd)) {
        Object.entries(billingAdd).forEach(function (e) {
            billingInfo += "<p class=\"card-text\">".concat(e[0], ": ").concat(e[1], "</p>");
            pRow = "\n              <p class=\"text-danger-emphasis fw-semibold\">billing and shipping addresses</p>\n                ".concat(billingInfo, "\n                ");
        });
    }
    else {
        Object.entries(billingAdd).forEach(function (e) {
            billingInfo += "<p class=\"card-text\">".concat(e[0], ": ").concat(e[1], "</p>");
        });
        Object.entries(shippingAdd).forEach(function (e) {
            shippingInfo += "<p class=\"card-text\">".concat(e[0], ": ").concat(e[1], "</p>");
        });
        pRow = "\n            <p class=\"text-danger-emphasis fw-semibold\">billing addresses</p>\n              ".concat(billingInfo, "\n              <p class=\"text-danger-emphasis fw-semibold\">shipping addresses</p>\n              ").concat(shippingInfo, "\n              ");
    }
    if (addTitle != null) {
        addTitle.insertAdjacentHTML("afterend", pRow);
    }
}
getAdds();
function isEmpty(obj) {
    for (var prop in obj) {
        if (Object.hasOwn(obj, prop)) {
            return false;
        }
    }
    return true;
}
var button = document.querySelector("#confirm-order-btn");
if (button != null) {
    button.addEventListener("click", sendOrder);
}
function sendOrder() {
    return __awaiter(this, void 0, void 0, function () {
        var URLendpoint, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    URLendpoint = "http://localhost:8083/api/riepOrder/arrivingOrder";
                    return [4 /*yield*/, axios.post(URLendpoint, __assign({}, orderTest))];
                case 1:
                    res = _a.sent();
                    console.log(res);
                    return [2 /*return*/];
            }
        });
    });
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
