import prismaClient from "../../prisma";
import {compare} from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface AuthRequest {
    email: string;
    password: string;
}


class AuthUserService {
    async execute({email, password}: AuthRequest) {
        /* Verifica se o e-mail existe */
        const user = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(!user){
            throw new Error("Usuario ou senha incorretos")
        }

        /* Verifica se a senha está correta */

        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch){
            throw new Error("Usuario ou senha incorretos")
        }

        /* Se deu tudo certo, gerar o token pro usuario  */

        const token = sign(
            {
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '30d'
            }
        )

        /* Gerando token JWT e devolvendo dados do usuario (id, name e email) */



        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
    }
}

export { AuthUserService }