import { Router } from 'express';
import multer from 'multer';
import { CreateUserController } from "./controllers/user/CreateUserController"
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailUserController } from './controllers/user/DetailUserController'

import { CreateCategoryController } from './controllers/category/CreateCategoryController'
import { ListCategoryController } from './controllers/category/ListCategoryController'
 
import { CreateProductController} from './controllers/products/CreateProductController'
import { ListByCategoryController} from './controllers/products/ListByCategoryController'

import { CreateOrderController } from './controllers/order/CreateOrderController'
import { RemoveOrderController } from './controllers/order/RemoveOrderController'

import { AddItemController } from './controllers/order/AddItemController'
import { RemoveItemController } from './controllers/order/RemoveItemController'

import { SendOrderController } from './controllers/order/SendOrderController'
import { ListOrderController } from './controllers/order/ListOrderController'
import { DetailOrderController } from './controllers/order/DetailOrderController'
import { FinishOrderController } from './controllers/order/FinishOrderController'

import { isAuthenticated } from './middlewares/isAuthenticated'

import uploadConfig from './config/multer'


const router = Router();

/* const upload = uploadConfig.upload("../tmp").storage; */
const upload = multer(uploadConfig.upload("./tmp"));

/* ---- Rotas Usuários ---- */
router.post('/users', new CreateUserController().handle)

router.post('/session', new AuthUserController().handle)
/* Usa middleware para validar se está correta a autenticação */
router.get('/me', isAuthenticated, new DetailUserController().handle)

/* ---- Rotas Categorias ---- */
router.post('/category', isAuthenticated,  new CreateCategoryController().handle)
router.get('/category', isAuthenticated,  new ListCategoryController().handle)

/* ---- Rotas Produtos ---- */
router.post('/product', isAuthenticated, upload.single('file'),  new CreateProductController().handle)
router.get('/category/product', isAuthenticated,  new ListByCategoryController().handle)

/* --- Rotas de Order (Pedidos) --- */
router.post('/order', isAuthenticated, new CreateOrderController().handle)
router.delete('/order', isAuthenticated, new RemoveOrderController().handle)

router.post('/order/add', isAuthenticated, new AddItemController().handle)
router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle)
router.put('/order/send', isAuthenticated, new SendOrderController().handle)
router.get('/orders', isAuthenticated,  new ListOrderController().handle)
router.get('/order/detail', isAuthenticated,  new DetailOrderController().handle)
router.put('/order/finish', isAuthenticated, new FinishOrderController().handle)



export {router};