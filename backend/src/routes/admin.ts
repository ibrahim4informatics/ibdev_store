import { Application, Request, Response, Router } from "express";
import { AuthRequest } from "../utils/auth.utils";

const router = Router();


//* users model crude operations
router.get('/users', (req: AuthRequest, res: Response) => {
    return res.send("here is users for admin");
})

router.post('/users', (req: AuthRequest, res: Response) => {
    return res.send("here is creating user account");
})
router.get('/users/:id', (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    return res.send(`here is user with id ${id}`);
})


router.patch('/users/:id', (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    return res.send(`here is updating user with id ${id}`);
})

router.delete('/users/:id', (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    return res.send(`here is deleting user with id ${id}`);
})


//* product model crud operations
router.get('/products', (req: AuthRequest, res: Response) => {
    return res.send("here is products for admin");
})

router.post('/products', (req: AuthRequest, res: Response) => {
    return res.send("here is creating products account");
})
router.get('/products/:id', (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    return res.send(`here is products with id ${id}`);
})


router.patch('/products/:id', (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    return res.send(`here is updating products with id ${id}`);
})

router.delete('/products/:id', (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    return res.send(`here is deleting products with id ${id}`);
})
export default router;