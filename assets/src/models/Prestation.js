export class Prestation {
	constructor(data) {
		(this.id = data.id || Math.floor(Math.random(1) * 999999)),
			(this.name = data.name || "no");
		this.description = data.description || "no";
		this.company = data.company || null;
		this.tarifs = data.tarifs || [];
		this.horaires = data.horaires || [];
		this.categories = data.categories || [];
		this.images = data.images || [];
		this.subscription = data.subscription || [];
	}
}
