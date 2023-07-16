class User {
	constructor(data) {
		this.id = data.id;
		this.username = data.username || "geoff";
		this.name = data.username || "geoff";
		this.email = data.email;
		this.cartId = data.cart?.id || null;
		this.abonnements = data.abonnements["hydra:member"] || [];

		/*
?.filter(
				(a) => a.paymentStatus === "success"
			) 
			*/
	}
}
export default User;
