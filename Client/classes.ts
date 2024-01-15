export interface Product {
  code: number;
  name: string;
  variants: Array<string>;
  description: string;
  price: number;
  retailer: string;
}

export interface Order {
  orderNumer?: number;
  orderDate?: Date;
  totalAmount: number;
  orderLineItems: Array<OrderLineItems>;
  customer: Customer;
}
export interface Address {
  id?: number;
  street: string;
  city: string;
  state: string;
  postalCode: number;
}
export interface Customer {
  customerId?: number;
  firstname: string;
  lastname: string;
  age: number;
  email: string;
  phone: string;
  locale: string;
  billingAddress: Address;
  shippingAddress?: Address;
}
export interface OrderLineItems {
  id?: number;
  order?: Order;
  product: Product;
  amount: number;
  quantity: number;
}

export interface RiepilogoCsv{
  prodTotal: number;
  totalAmount: number;
  customerId?: number;
  firstname: string;
  lastname: string;
  age: number;
  email: string;
  phone: string;
  locale: string;
  street: string;
  city: string;
  state: string;
  postalCode: number;


}
