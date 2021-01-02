import React from 'react'
import { Link } from 'react-router-dom'

export default function Post({ post }) {

    return (
        <div className="room">
            <Link to={`/blog/${post.slug}`}>
                <div className="image-container">
                    <img
                        src={post.thumbnail}
                        alt={post.title}
                        height="250"
                    />
                </div>
            </Link>
            <div className="title">
                <h3>
                    <Link to={`/blog/${post.slug}`}>
                        {post.title}
                    </Link>
                </h3>
            </div>

        </div>
    )
}
