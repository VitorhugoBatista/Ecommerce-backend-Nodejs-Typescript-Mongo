import { Product, IProduct } from "../database/schemas/userSchema";

export async function listProducts() {
    try {
        let list = await Product.find();
        return list;


    } catch (error) {
        console.log(error)
    }

}