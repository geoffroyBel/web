export class Cart {
	constructor(data) {
		this.cartItems = data.cartItems || [];
		this.totalItems = data.quantity || 0;
	}

	getTotalItems() {
		return this.cartItems.length;
	}
}
