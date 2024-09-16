
export const paginationfunction=({size=5,page=1})=>{

    if(size<1) size=1
    if(page<1) page=1

    const limit=+size
    const skip= limit * (+page-1)

    return(limit,skip)
}