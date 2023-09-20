import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

export default function Homepage(){
    const [blog, setBlog] = useState([])
    // const [user, setUser] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/blogs')
        .then((res) => res.json())
        .then ((data) => {
            setBlog(data)
        })
        .catch((error) => {
            console.error('Error fetching Data: ', error)
        })
    }, [])

    return (
        <main>
            <Navbar />
            <div className="landing-page" id="home">
                <h1>Welcome to my Blog!</h1>
                <h2>Just a place for me to dump my thoughts...</h2>
            </div>
            <div id="blogs" className="blogs">
                <h1>My Recent Posts</h1>
                <ul>
                    {blog.map(post => (
                        <li key={post.id}>{post.text}</li>
                    ))}
                </ul>
            </div>
            <div id="thoughts" className="thoughts">
                <h1>My Recent Thoughts</h1>
            </div>
        </main>
    )
}