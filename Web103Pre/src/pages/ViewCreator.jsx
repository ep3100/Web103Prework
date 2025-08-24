import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { supabase } from "../client" 
import HomeButton from "../components/HomeButton"

export default function ViewCreator() {
    const { name } = useParams()
    const [creator, setCreator] = useState(null)

    useEffect(() => {
        async function fetchCreator() {
            const { data, error } = await supabase.from("creators").select("*").eq("name", name).single()

            if (error) {
                console.error("Error fetching creator: ", error)
            } else {
                setCreator(data)
            }
        }
        fetchCreator()
    }, [name])

    if (!creator) {
        return <p>Loading creator...</p>
    }

    return (
        <div>
            <HomeButton />
            <br />
            <br />
            {creator.imageURL && (
                <img src={creator.imageURL} alt={creator.name} />
            )}
            <h2>{creator.name}</h2>
            <p>{creator.description}</p>
            <a href={creator.url} target="_blank" rel="noopener noreferrer">
                {creator.url}
            </a>
            <br />
            <Link to={`/creators/${creator.name}/edit`}>
                <button>Edit</button>
            </Link>
        </div>
    )
}