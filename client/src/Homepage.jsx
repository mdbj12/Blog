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
            <header>Welcome to my Blog!</header>
            <div>
                <h1>My Recent Posts</h1>
                <ul>
                    {blog.map(post => (
                        <li key={post.id}>{post.text}</li>
                    ))}
                </ul>
            </div>
        </main>
    )
}