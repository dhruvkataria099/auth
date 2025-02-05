import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import { BASE_URL } from './info'

const FileUploads = ({formData}) => {

    const [files, setfiles] = useState([])
    const [images, setImage] = useState([])

    const handleFileChange = (e) => {
        try {
            const { files } = e.target
            const conv = Array.from(files)
            console.log(conv);
            setfiles(conv || [])
            
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleSub = async () => {
        try {

            const fileData = new FormData()
            files.forEach(file => {
                fileData.append("files", file)
            })

            const res = await axios.post(`${BASE_URL}/`,fileData)
            
            fetchData()
            console.log(res);
            
        } catch (error) {
            console.log(error.message);
            
        }
    }

    const fetchData = async () => {
        try {
            const res = await axios.get('${BASE_URL}/getfiles')
            console.log(res.data,'kkkkkkk');
            
            setImage(res.data.data);   

        } catch (error) {
            console.log(error.message)
            
        }
    }

    useEffect(() => {
        fetchData()
    },[])

    const thing = useMemo(() => {
        console.log('hhhhhh');
    }, [formData])

    console.log(thing);
    

  return (
    <div>
      <input type="file" accept='*' multiple onChange={e => handleFileChange(e)} />
        {
            images.map(info => (
                <>
                    <img src={`${BASE_URL}/u/${info}`} className='w-10 h-10' alt="" />
                </>
            ))
        }
      <button onClick={() => handleSub()} >sub</button>
    </div>
  )
}

export default FileUploads
