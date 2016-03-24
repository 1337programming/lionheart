export class Content {
	public createdDate: Date;
	public creator: String;

	public modifiedDate: Date;
	public modifier: String;

	constructor(public key: String, public value: String, public description: String) {}
}
