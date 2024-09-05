import { z } from "zod";


export const ProductValidation ={
    title: '',
    discription: '',
    media: [],
    price: '',
    pay: '' ,
    sizes: [],
    category: [],
    collections:[],
    colors: [],
    tags: [],
    brand: ''
}

export const formSchema = z.object({
    title: z.string().max(30, {
        message: "Title must be at least 30 characters."
    }).min(2, {
      message: "Title must be at least 2 characters.",
    }),
    discription: z.string().max(700, {
        message: "Title must be at least 700 characters."
    }).min(100, {
      message: "Title must be at least 2 characters.",
    }),
    media: z.array(z.string().url()),
    price: z.string().min(2, {message: 'Price must be at least 2 digits'}).max(6, {message: "Price must be at least 6 digits"}),
    tags: z.array(z.string()),
    category: z.array(z.string()),
    collections: z.array(z.string()),
    brand: z.string(),
    colors: z.array(z.string()),
    sizes: z.array(z.string()),
    pay: z.string().min(2, {message: 'Price must be at least 2 digits'}).max(6, {message: "Price must be at least 6 digits"})
  })