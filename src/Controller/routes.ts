import { Router } from "express";
import { Request, Response } from "express";
import { getBitcoinPrice } from "../Service/bitcoinPriceService";

const router = Router();

/**
* @swagger
* /:
*  get:
*    description: Endpoint para obter o preço do Bitcoin em uma moeda específica(USD,GBP,EUR), exemplo de busca:http://localhost:3000/?currency=USD
*    parameters:
*      - name: currency
*        in: query
*        required: true
*        schema:
*          type: string
*    responses:
*      '200':
*        description: Uma resposta bem sucedida
*      '500':
*        description: Currency inválido
*      '400':
*        description: O parâmetro 'currency' é obrigatório
*/

router.get("/", async (req: Request, res: Response) => {
    const currency = req.query.currency as string
    if (!currency) {
        return res.status(400).json({ message: "O parâmetro 'currency' é obrigatório." });
    }
    try {
        const price = await getBitcoinPrice(currency);
        res.status(200).json({ currency, price });
    } catch (error) {
        res.status(500).json({ message: "Currency inválido", details: error });
    }
})
export default router