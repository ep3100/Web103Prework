import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { supabase } from "../client"

export default function EditCreator() {
    const { name } = useParams()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        url: "",
        description: "", 
        imageURL: ""
    })

    useEffect(() => {
        async function fetchCreator() {
            const { data, error } = await supabase.from("creators").select("*").eq("name", name).single()

            if (error) {
                console.error("Error fetching creator: ", error)
            } else {
                setFormData(data)
            }
        }
        fetchCreator()
    }, [name])

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        const { error } = await supabase.from("creators").update(formData).eq("name", name)

        if (error) {
            console.error("Error updating creator: ", error)
        } else {
            navigate(`/creators/${formData.name}`)
        }
    }

    async function handleDelete() {
        const { error } = await supabase.from("creators").delete().eq("name", name)

        if (error) {
            console.error("Error deleting creator:", error)
        } else {
            navigate("/")
        }
    }

    return (
    <div className="form-container">
      <h1>Edit Creator</h1>
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
          <label>URL:</label>
          <input
            type="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
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
            value={formData.imageURL || ""}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>

      <br />
      <button onClick={handleDelete} style={{ color : "red"}}> Delete Creator</button>
    </div>
    )
}