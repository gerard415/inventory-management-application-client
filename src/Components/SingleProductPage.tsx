import React, {useEffect, useState} from 'react'
import DashboardHeader from '../Components/DashboardHeader'
import {Link} from 'react-router-dom'
import { productProps } from '../types'
import axios from 'axios'
import Loading from '../Components/Loading'
import { categories } from '../data'

const SingleProductsPage = () => {
    const [products, setProducts] = useState<productProps[]>([])
    const [loading, setLoading] = useState(false)
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [sort, setSort] = useState('')
  
    useEffect(() => {
      setLoading(true)
      getProducts()
      setLoading(false)
  
    }, [category, sort, price])
  
    const getProducts = async () => {
      let products: productProps[]
      const {data} = await axios.get('/products')
      products = data.products
  
      if(category){
        products = products.filter(product => product.category === category)
      }
  
      if(sort){
        if(sort === 'ascending') products = products.sort((a, b) => (a.name.localeCompare(b.name)))
  
        if(sort === 'descending') products = products.sort((a, b) => (a.name.localeCompare(b.name))).reverse()
  
        if(sort === 'date') products = products.sort((a, b) => (a.createdAt.localeCompare(b.createdAt)))
      }
  
      if(price){
        if(price === '100')  products = products.filter(product => product.price < 100)
  
        if(price === '1000') products = products.filter(product => product.price < 1000)
  
        if(price === '1001') products = products.filter(product => product.price > 1000)
      }
  
      setProducts(products)
    }
  
  
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      e.preventDefault()
      setCategory(e.target.value)
    }
  
    const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
      e.preventDefault()
      setSort(e.target.value)
    }
  
    const handlePriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      e.preventDefault()
      setPrice(e.target.value)
    }
  
    let view
  
    view =  products.map((product) => (
              <div  className='border border-gray-200 h-[40px] space-x-4 rounded-b flex text-[13px] items-center px-3'>
                <div className='w-[300px] space-x-4 flex'>
                  <div>
                    {product.images.length > 0 ? <div><img className='h-[30px] w-[30px]'  src={product.images[0].filePath } alt="" /></div> : <div className='bg-gray-300 h-[30px] w-[30px]'></div> }
                     
                  </div>
                  <p>
                    {product.name.length<30 ? product.name : (product.name.slice(0, 30) + '...')}
                  </p>
                  
                </div>
                <p className='w-[135px]'>{product.category.length<30 ? product.category : (product.category.slice(0, 30) + '...')}</p>
                <p className='w-[94px] overflow-auto'>{product.price}</p>
                <p className='w-[110px] overflow-auto'>{product.quantity}</p>
                <p className='w-[250px]'>{product.description.length< 30 ? product.description : (product.description.slice(0, 30) + '...')}</p>
                <p className=''>
                  <button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                    </svg>
                  </button>
                </p>
              </div>
            ))
      
    
  
    return (
      <div className='bg-gray-100 w-full ml-[290px] min-h-screen'>
        <div className='bg-white sticky top-0 z-10'>

        </div>
        <div className='p-5 flex justify-center items-center min-h-[647px]'>
          <div className='bg-white min-h-[600px] w-full rounded-md flex flex-col p-5 px-[30px]  text-gray-600 '>
            <div>
              <span>SIngle Product</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default SingleProductsPage