import { Link } from "react-router-dom"

export default function CreatorCard({ creator }) {
    return (
        <div className="creator-card">
            {creator.imageURL && (
                <img
                    src={creator.imageURL} alt={creator.name}
                />
            )}
            <h2>
                <Link to={`/creators/${creator.name}`}>{creator.name}</Link>
            </h2>
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