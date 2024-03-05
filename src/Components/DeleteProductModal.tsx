import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { productProps } from '../types';
import axios from 'axios';
import { errorNotification, successfulNotification } from '../notifications';

type DeleteModalProps = {
    product: productProps,
    setProducts: React.Dispatch<React.SetStateAction<productProps[] | undefined>>
}

export default function DeleteProductModal({product, setProducts}: DeleteModalProps) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const deleteProduct = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id:string) => {
        e.preventDefault()
        try {
            await axios.delete(`/products/${id}`)
            successfulNotification('product deleted successfully')
            setProducts(products => products?.filter(product => product._id !== id))
        } catch (error) {
            errorNotification('error occured, Please try again later')
            console.log(error)
        }
  
    }

    return (
        <div>
            <button onClick={handleOpen}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className='w-[210px] phone:w-[250px] sm:w-[350px]  sm:h-[100px] rounded-sm bg-gray-200 border flex justify-center items-center  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                    <div className='flex flex-col justify-between p-2 items-center space-y-2 '>
                        <div className='flex items-center justify-center'>
                            <p className='text-[10px] phone:text-[12px] sm:text-[15px] '>
                                Are you sure you want to delete this item?
                            </p>
                        </div>
                        <div className='flex justify-center space-x-3'>
                            <button className='sm:w-[120px] text-[11px] sm:text-[14px] px-6 sm:h-[32px] rounded-sm border border-black' onClick={handleClose} >
                                Cancel
                            </button>
                            <button className='sm:w-[120px] text-[11px] sm:text-[14px] py-1 px-6 sm:h-[32px] bg-red-500 rounded-sm' onClick={(e) => deleteProduct(e, product._id)} >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
