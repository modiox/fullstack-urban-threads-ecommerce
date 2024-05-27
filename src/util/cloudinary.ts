export const uploadImageToCloudinary = async (file: File): Promise<string>  => { 
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "urbanthreadsimg")
    formData.append("cloud_name", "dbj7mvsrt")
    formData.append("folder", "urbanthreadsimg")

    try { 
        const response =  await fetch(`https://api.cloudinary.com/v1_1/dbj7mvsrt/image/upload`, { 
            method: "POST", 
            body: formData
        })
        if(!response.ok) {
            throw new Error("Failed to upload image")
        }
        const data = await response.json()
        return data.secure_url
    }
    catch(error) {
        console.error("Error Uploading images to Cloudinary", error)
        throw error 
    }} 
