import { Request, Response, Router } from "express";
import { Readable } from "stream"
import readline from "readline"

import multer from "multer";
import { client } from "./database/client";

const multerConfig = multer();

const router = Router();

interface Product {
    funcionario: string;
    funcao: string;
    atividade: string;
    quantidadeS: number;
    peso: number;
    quantidade_Palets: number;
}

router.post(
    "/products",
     multerConfig.single("file"),
     async (request: Request, response: Response) => {    
        const { file } = request
        if (file !== undefined){

            const { buffer } = file
            const readableFile = new Readable();
            readableFile.push(buffer);
            readableFile.push(null);
    
            const productsLine = readline.createInterface({
                input: readableFile
            })

            const products: Product[] = [];
    
            for await(let line of productsLine) {
                const productLineSplit = line.split(";");
                const pesoP = productLineSplit[4].replace("," , ".")

                products.push({
                    funcionario: productLineSplit[0].toUpperCase(),
                    funcao: productLineSplit[1],
                    atividade: productLineSplit[2],
                    quantidadeS: Number(productLineSplit[3]),
                    peso: Number(pesoP),
                    quantidade_Palets: Number(productLineSplit[5])
                })
            }

            for await ( let {funcionario, funcao, atividade, quantidadeS, peso, quantidade_Palets} of products) {
                await client.products.create({
                    data: {
                        funcionario,
                        funcao,
                        atividade,
                        quantidadeS,
                        peso,
                        quantidade_Palets,
                    },
                })
            }
            return response.json(products)
        }
        
    }
);

export { router};