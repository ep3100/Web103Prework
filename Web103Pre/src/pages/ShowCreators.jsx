import { Link } from "react-router-dom"
import CreatorCard from "../components/CreatorCard"
import HomeButton from "../components/HomeButton"

export default function ShowCreators({ creators }) {
    return (
        <div>
            <HomeButton />
            <h1>Content Creators</h1>
            <Link to="/new">
                <button>Add a Creator</button>
            </Link>

            {creators.length === 0 ? (
                <p>No content creators found</p>
            ) : (
                <div className="creators-container">
                    {creators.map((c, index) => (
                        <CreatorCard key={index} creator={c} />
                    ))}
                </div>
            )}
        </div>
    )
}