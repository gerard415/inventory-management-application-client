import React, {useState} from 'react'
import { FileProps, imageProps } from '../types';
import axios from 'axios';

type ImageUploaderProps = {
    addedPhotos: imageProps[],
    setAddedPhotos: React.Dispatch<React.SetStateAction<imageProps[]>>
}

const ModalImageUploader = ({addedPhotos, setAddedPhotos}: ImageUploaderProps) => {
    const [dragActive, setDragActive] = useState<boolean>(false);
    const [uploading, setUploading] = useState<boolean>(false)

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>, files:FileList | null) => {
        stopReload(e);
        if(files === null) {
            return;
        }
        setDragActive(false);
        setUploading(true)
        const data = new FormData()
        for(let i = 0; i<files.length; i++){
          data.append('images', files[i])
        }
        try {
            const {data:images} = await axios.post('/products/upload', data, {
            headers: {'Content-Type':'multipart/form-data'}
            })
            setUploading(false)
            setAddedPhotos(prevState => [...prevState, ...images])
            console.log(addedPhotos)
        } catch (error) {
            console.log(error)
        }
    };
    
    const removeImage = (i:string) => {
        setAddedPhotos(addedPhotos.filter(x => x.fileName !== i));
    }

    const handleDragEvent = (e: React.DragEvent<HTMLDivElement>) => {
        handleImageUpload(e, e.dataTransfer.files);
    };

    const stopReload = (e: React.DragEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }

    const handleDrag = function(e: React.DragEvent<HTMLLabelElement>) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
          setDragActive(true);
        } else if (e.type === "dragleave") {
          setDragActive(false);
        }
    };

    const removeAll = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setAddedPhotos([])
    }

    return (
        <div className=" space-y-3 p-4 max-h-[200px] ">
            <div className=""
                onDrop={(e) => handleDragEvent(e)}
            > 
                <label
                    onDragEnter={(e) => handleDrag(e)}
                    onDragLeave={(e) => handleDrag(e)}
                    onDragOver={(e) => handleDrag(e)}
                    className={dragActive ? "relative cursor-pointer flex max-h-[100px] p-1 sm:h-[170px] sm:p-12 sm:max-h-[500px] items-center justify-center rounded-md border-2 border-dashed  border-blue-400 text-center bg-gray-200" 
                    : "relative cursor-pointer flex max-h-[100px] p-1 sm:h-[170px] sm:p-12 sm:max-h-[500px]  items-center justify-center rounded-md border-2 border-dashed  border-gray-300 text-center" }
                >
                    <div>
                        <div className='flex items-center justify-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.8} stroke="currentColor" className="sm:w-[100px] w-[30px]   sm:h-[50px]"> 
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                        </div>
                        <div className='flex items-center justify-center text-[10px] sm:text-[14px] '>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-5 mr-2 text-blue-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                            </svg>
                            Drop Files here or <span className='text-blue-400 ml-1' >Browse</span>
                        </div>
                        
                    </div>
                    <input type="file" onChange={(e) => handleImageUpload(e, e.target.files)} name="image" className="hidden" multiple={true} />
                </label>
            </div>

            <div className=" rounded-md sm:h-[110px] ">
                <div className="flex flex-col items-center justify-between">
                    {addedPhotos.map((photo) => {
                        return (
                            <div key={photo.filePath} className='w-full flex items-center justify-between mb-1'>
                                <div className="flex flex-row items-center gap-2">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="sm:w-6 w-4 h-3 sm:h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                        </svg>
                                    </div>
                                    <span className="text-[11px] sm:text-[14px] ">{photo.fileName}</span>
                                </div>
                                <button onClick={() => { removeImage(photo.fileName) }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="sm:w-6 w-4 h-3 sm:h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>    
                        )
                    })}

                    
                </div>
            </div>

            <div className='flex justify-end space-x-4 text-[11px] sm:text-[14px] '>
                <p> {uploading? 'Upload in progress' : ''}</p>
                {addedPhotos.length > 0 && 
                    <button onClick={(e) => removeAll(e)}>
                        remove all
                    </button>
                }
                
            </div>
        </div>
    )
}

export default ModalImageUploader