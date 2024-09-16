import { paginationfunction } from "./pagination.js";

export class API_Features{

    constructor(query,mongoosequery){
        this.query=query
        this.mongoosequery=mongoosequery
    }

    pagination({page,size}){
        const{limit,skip}=paginationfunction({page,size})
        this.mongoosequery=this.mongoosequery.limit(limit).skip(skip)
        return this
    }
    
}