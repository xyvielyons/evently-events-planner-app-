import { Schema, model, models,Document } from "mongoose"

export interface IEVENT extends Document{
  _id: string;
  title: string;
  description?: string;
  location?: string;
  createdAt: Date;
  imageUrl: string;
  startDateTime: Date;
  endDateTime: Date;
  price: string | any;
  isFree: boolean | string | any;
  url?: string;
  category: { _id: string, name: string }
  organizer: { _id: string, firstName: string, lastName: string }
}


const EventsSchema = new Schema({
    title:{type:String,required:true},
    description:{type:String},
    location:{type:String},
    createdAt:{type:Date,default:Date.now},
    imageUrl:{type:String,required:true},
    startDateTime:{type:Date,default:Date.now},
    endDateTime:{type:Date,default:Date.now},
    price:{type:String},
    isFree:{type:String},
    url:{type:String},
    category:{type:Schema.Types.ObjectId,ref:'Category'},
    organizer:{type:Schema.Types.ObjectId,ref:'User'}

})

const Event = models.Event || model('Event',EventsSchema)

export default Event;