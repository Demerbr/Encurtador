import { config } from "../config/Constants";
import { Request, Response } from "express";
import shortid from "shortid";
import { URLModel } from "../database/model/URL";



class URLController {
    public async encurta(request: Request, response: Response): Promise<void>{
        const { originURL } = request.body

        const url = await URLModel.findOne({originURL})
        if(url){
            response.json(url)
            return
        }

        const hash = shortid.generate()
        const shortURL = `${config.API_URL}/${hash}`

        //salvar URL no banco

        const newURL = await URLModel.create({originURL, hash, shortURL})


        //retornar URL
        response.json({originURL, hash, shortURL})
    }

    public async redirect(request: Request, response: Response): Promise<void>{

        //pegar hash da url
        const { hash } = request.params
        const url = await URLModel.findOne({hash})

        if(url){
            
            return response.redirect(url.originURL)

        }

        response.status(400).json({error: "URL not found"})


        //encontrar a URL original pelo hash
       
        //redirecionar para a url original de que encontramos no bd




    }
}

// https://www.github.com/fabifelicia/encurtador-urlhttps://www.github.com/fabifelicia/encurtador-url




export { URLController}