
type CollectionType = {
    _id: string,
    title: string,
    discription: string,
    image: string,
    products: ProductType[],
    createdAt: Date,
    updatedAt: Date
}


type ProductType ={
    _id: string
    title: string,
    discription: string,
    media: [string],
    price: string,
    pay: string,
    sizes: [string],
    category: [string],
    collections:[string],
    colors: [string],
    tags: [string],
    brand: string,
    createdAt: Date,
    updatedAt: Date
}