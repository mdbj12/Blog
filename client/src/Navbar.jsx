import React, { useEffect, useState } from "react";

export default function Navbar() {
    const [isAllowed, setIsAllowed] = useState(false)

    // useEffect(() => {
    //     // Get request to the Flask API Endpoint
    //     fetch('http://localhost:5000/validate-ip')
    //     .then((res) => res.json())
    //     .then((data) => {
    //         setIsAllowed(data.allowed)
    //     })
    //     .catch((error) => {
    //         console.error('Error fetching Data: ', error)
    //     })
    // }, [])

    return (
        <nav>
            <div>
                <a href="#home">HOME</a>
                <a href="#blogs">BLOGS</a>
                <a href="#thoughts">THOUGHTS</a>
            </div>
            <div>
                <a href="contact">CONTACT ME!</a>
            </div>
        </nav>
    )
}