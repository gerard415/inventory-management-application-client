import React,{useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ImageUploader from './ImageUploader';
import { ImageProps } from 'antd';
import { imageProps, productProps } from '../types';
import ModalImageUploader from './ModalImageUploader';
import ModalForm from './ModalForm';
import axios from 'axios';

type EditModalProps = {
  product: productProps,
}

export default function ViewProductModal({product}: EditModalProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState<string>(product.name)
  const [category, setCategory] = useState<string>(product.category)
  const [quantity, setQuantity] = useState<number>(product.quantity)
  const [price, setPrice] = useState<number>(product.price)
  const [description, setDescription] = useState<string>(product.description)
  const [addedPhotos, setAddedPhotos] = useState<imageProps[]>(product.images)

  const resetState = () => {
    setName(product.name)
    setCategory(product.category)
    setQuantity(product.quantity)
    setPrice(product.price)
    setDescription(product.description)
    setAddedPhotos(product.images)
  }

  const closeModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    handleClose()
    resetState()
  }

  return (
    <div>
        <button onClick={handleOpen}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className=' w-[250px] space-y-3 phone:w-[300px]  sm:w-[500px] md:w-[700px] sm:h-[500px] md p-2 sm:p-4 bg-gray-200 border  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]   '>
            <div className='flex justify-end'>
              <button onClick={handleClose}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
              </button>
            </div>
            <div className='sm:flex sm:space-x-6 space-y-2 sm:space-y-0 justify-center'>
              <div className='border flex flex-col border-gray-300 min-h-[100px] sm:min-h-[300px] w-full  space-y-0'>
                  { addedPhotos.length > 0 ? <div><img className={addedPhotos.length > 1 ? 'h-[100px] sm:h-[200px] w-full border' : 'h-[200px] sm:h-full w-full border'}  src={product.images[0]?.filePath } alt="" /></div> : <div className='bg-gray-500 h-[30px] w-full'></div>}
                  { addedPhotos.length > 1 && 
                    <div className='flex'>
                      <img className={addedPhotos.length >3 ? 'h-[100px] sm:h-[148px] w-[33.3%] border' : addedPhotos.length >2 ? 'h-[100px] sm:h-[148px] w-[50%] border' : 'h-[100px] sm:h-[148px] w-[100%] border'}  src={product.images[1]?.filePath } alt="" />
                      {addedPhotos.length>2 && <img className={addedPhotos.length >3 ? 'h-[100px] sm:h-[148px] w-[33.3%] border' : 'h-[100px] sm:h-[148px] w-[50%] border'}  src={product.images[2]?.filePath } alt="" />  }
                      {addedPhotos.length>3 && <img className={'h-[100px] sm:h-[148px] w-[33.3%] border'}  src={product.images[3]?.filePath } alt="" />  }
                    </div>
                  }
                  
              </div>
              <div className='border border-gray-300 min-h-[200px] w-full'>
                  <ModalForm 
                    name={name} 
                    category={category} 
                    quantity={quantity} 
                    price={price} 
                    description={description} 
                    setName={setName}
                    setCategory={setCategory}
                    setQuantity={setQuantity}
                    setPrice={setPrice}
                    setDescription={setDescription}
                  />
              </div>
            </div>
            <div className='flex justify-end space-x-3'>
              <button className='w-[120px] h-[32px] rounded-sm bg-red-500' onClick={(e) => closeModal(e)} >
                  Close
              </button>
            </div>
          </div>
        </Modal>
    </div>
  );
}
