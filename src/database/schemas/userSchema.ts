
import { UUID } from "mongodb";
import mongoose, { Schema } from "mongoose";


export interface IProduct {
    id: UUID,
    name: string
    description: string,
    id_transaction: number
}

const ProductSchema = new Schema<IProduct>(
    {
        id:UUID,
        name:String,
        description:String,
        id_transaction:Number
    }
)



export const Product = mongoose.model('Product',ProductSchema)