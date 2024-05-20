import React, { useState } from 'react';
import Footer from "@/components/layout/Footer";
import Index from "../routes";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Storage } from 'aws-amplify'
import "@aws-amplify/ui-react/styles.css"



const App: React.FC = () => {
  const [fileUrl, setFileUrl] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null
    if (selectedFile) {
      setFileUrl(URL.createObjectURL(selectedFile))
      setFile(selectedFile)
      setFileName(selectedFile.name)
    }
  }

  const saveFile = async () => {
    if (file) {
      try {
        await Storage.put(fileName, file)
        console.log("Successfully saved image")
        setFileUrl("")
        setFile(null)
        setFileName("")
      } catch (err) {
        console.log("Error uploading the images", err)
      }
    }
  }

  return (
    <div>
      <Index />
      <ToastContainer />
      <Footer />
      <input type="file" onChange={handleChange} />
      {fileUrl && <img src={fileUrl} alt="Preview" />}
      <button onClick={saveFile}>Save file</button>
    </div>
  )
}

export default App




//imageList.tsx

// import React, { useEffect, useState } from "react"
// import { Storage } from "aws-amplify"

// const ImageList: React.FC = () => {
//   const [images, setImages] = useState<string[]>([])

//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const imageKeys = await Storage.list("")
//         const imageUrls = await Promise.all(
//           imageKeys.map(async (key: { key: string }) => {
//             const signedUrl = await Storage.get(key.key)
//             return signedUrl as string
//           })
//         )
//         setImages(imageUrls)
//       } catch (err) {
//         console.error("Error fetching images:", err)
//       }
//     }

//     fetchImages()
//   }, [])

//   return (
//     <div>
//       {images.map((image, index) => (
//         <img key={index} src={image} alt={`image-${index}`} />
//       ))}
//     </div>
//   )
// }

// export default ImageList
