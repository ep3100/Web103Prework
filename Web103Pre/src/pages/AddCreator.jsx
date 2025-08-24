import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../client"
import HomeButton from "../components/HomeButton"

export default function AddCreator() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: "",
        url: "",
        description: "", 
        imageURL: ""
    })

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        const { error } = await supabase.from("creators").insert([formData])

        if (error) {
            console.error("Error adding creator: ", error)
        } else {
            navigate("/")
        }
    }

    return (
        <div className="form-container">
            <HomeButton />
            <h1> Add a New Creator</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Page</label>
                    <textarea 
                         type="url"
                        name="url"
                        value={formData.url}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea 
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Image URL (optional):</label>
                    <input 
                        type="url"
                        name="imageURL"
                        value={formData.imageURL}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Add Creator</button>
            </form>
        </div>
    )
}