import {NextFunction, Request, Response} from 'express'
import {verify} from 'jsonwebtoken'

interface Payload{
    sub: string;

}

export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
){

    /* Receber o Token */

const authToken = req.headers.authorization;

if(!authToken){
    return res.status(401).end();
}

const [, token] = authToken.split(" ")

try{
    /* Valida o token */
    const { sub } = verify(
        token,
        process.env.JWT_SECRET,

    ) as Payload;
    
    /* Recupera o ID do token e coloca dentro de uma variável dentro do req */

    
    req.user_id = sub;
   return next()


}catch(err){
    return res.status(401).end();
}


}