import { Router } from 'express';
import { Request, Response } from 'express';
import { listProducts } from '../Service/listProducts';


const router = Router();

/**
 * @swagger
 * /api/products:
 *  get:
 *    summary: Rota de teste para listar produtos
 *    description: Esta é uma rota de teste usada para obter uma lista de todos os produtos disponíveis.
 *    responses:
 *      '200':
 *        description: Lista de produtos retornada com sucesso.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  _id:
 *                    type: string
 *                  name:
 *                    type: string
 *                  description:
 *                    type: string
 *                  id_transaction:
 *                    type: integer
 *                  __v:
 *                    type: integer
 *      '500':
 *        description: Erro interno do servidor.
 */

router.get('/api/products', async (req: Request, res: Response) => {
    try {
      let list = await listProducts();
      if (list) {
        res.json(list);
      } else {
        res.status(500).send('Não foi possível obter a lista de produtos');
      }
    } catch (error) {
      console.log(error);
      res.status(500).send('Erro interno do servidor');
    }
  });
export default router;
