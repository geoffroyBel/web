class Company {
	constructor(id, name, accountID, url, status = null, owner = null) {
		this.id = id;
		this.name = name;
		this.accountID = accountID;
		this.url = url;
		this.status = status;
		this.owner = owner;
	}
}
export default Company;
