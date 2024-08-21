'use client'
import React,{useState,useEffect} from 'react'
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { formUrlQuery } from '@/lib/utils';
import { removeKeysFromQuery } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { getAllCategories } from '@/lib/actions/category.actions';
import { ICategory } from '@/lib/database/models/category.model';
function CategoryFilter() {
    const [categories, setCategories] = useState<ICategory[]>([])

    const searchParams = useSearchParams();
    const router = useRouter()
    

    useEffect(()=>{
        const getCategories = async ()=>{
            const categoryList = await getAllCategories()
            categoryList && setCategories(categoryList as ICategory[])
        }
       getCategories();
    },[])

    const onSelectCategory = (category:string)=>{
        let newUrl = ''
        if(categories && category !== 'All'){
            newUrl = formUrlQuery({
                params:searchParams.toString(),
                key:'category',
                value:category
            })
        }else{
            newUrl = removeKeysFromQuery({
                params:searchParams.toString(),
                keysToRemove:['category']
            })
        }
        router.push(newUrl,{scroll:false})
    }
  return (
   <Select onValueChange={(value:string) => onSelectCategory(value)}>
    <SelectTrigger className='select-field'>
        <SelectValue placeholder="Category"></SelectValue>
    </SelectTrigger>
    <SelectContent>
        <SelectItem value='All' className='select-item p-regular-14'>All</SelectItem>
        {categories.map((category:any)=>(
            <SelectItem value={category.name} key={category._id} className='select-item p-regular-14'>{category.name}</SelectItem>
        ))}
    </SelectContent>
   </Select>
  )
}

export default CategoryFilter