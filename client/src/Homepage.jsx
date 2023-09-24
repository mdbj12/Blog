import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import THREE_D_OBJECT from './THREE_D_OBJECT'

export default function Homepage(){
    const [blog, setBlog] = useState([])
    const [thought, setThought] = useState([])

    // fetching the blog data from the back end
    useEffect(() => {
        fetch('http://localhost:5000/blogs')
        .then((res) => res.json())
        .then ((data) => {
            setBlog(data)
        })
        .catch((error) => {
            console.error('Error fetching blogs: ', error)
        })
    }, [])

    // fetching the thought data from the back end
    useEffect(() => {
        fetch('http://localhost:5000/thoughts')
        .then((res) => res.json())
        .then((data) => {
            setThought(data)
        })
        .catch((error) => {
            console.error('Error fetching thoughts: ', error)
        })
    }, [])

    return (
        <main>
            <Navbar />
            <THREE_D_OBJECT />
            <div className="landing-page" id="home">
                <h1>Welcome to my Blog!</h1>
                <h2>Just a place for me to dump my thoughts...</h2>
                <p>Scroll down to see the Book move!</p>
                <p>Controls: Click and Drag</p>
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
                <ul>
                    {thought.map(post => (
                        <li key={post.id}>{post.text}</li>
                    ))}
                </ul>
            </div>
        </main>
    )
}