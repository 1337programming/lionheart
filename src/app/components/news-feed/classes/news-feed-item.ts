export class NewsFeedItem {

  itemId:string;
  date:string;
  message:string;

  constructor(data:any) {
    this.itemId = data.id;
    this.message = data.message;
    this.date = data.date;
  }

  // TODO add a focus function

}