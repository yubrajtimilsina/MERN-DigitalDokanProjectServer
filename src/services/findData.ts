import { query } from "express"


const findData = async ( model:any,data:string)=>{
    const [result] = await model.findAll({
        where : {
           email : query
        }
    })
    return result
}

export default findData