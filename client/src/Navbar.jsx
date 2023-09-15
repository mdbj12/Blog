import React, { useEffect, useState } from "react";

export default function Navbar() {
    const [isAllowed, setIsAllowed] = useState(false)

    useEffect(() => {
        // Get request to the Flask API Endpoint
        fetch('http://localhost:5000/validate-ip')
        .then((res) => res.json())
        .then((data) => {
            setIsAllowed(data.allowed)
        })
        .catch((error) => {
            console.error('Error fetching Data: ', error)
        })
    }, [])

    return (
        <nav className="navbar">
            <ul>
                <li>HOME</li>
                <li>BLOGS</li>
                <li>
                    <div>
                        {isAllowed ? (
                            <button onClick='button clicked'>LOGIN</button>
                        ) : (
                            <p></p>
                        )}
                    </div>
                </li>
            </ul>
        </nav>
    )
}