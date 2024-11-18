import React, { useState } from 'react';

interface Post {
    title: string;
    content: string;
    author: string;
    replies?: Reply[];
}

interface Reply {
    content: string;
    author: string;
}

const initialPosts: Post[] = [
    {
        title: "How to implement object detection?",
        content: "Can anyone share their experience with implementing object detection using YOLO?",
        author: "Alice",
        replies: [
            {
                content: "You can start by reading the YOLO paper and then implement it using a deep learning framework like TensorFlow or PyTorch.",
                author: "John"
            }
        ]
    },
    {
        title: "Best practices for data annotation",
        content: "What are the best practices for annotating data for training models?",
        author: "Bob"
    },
];

const CommunityForum: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>(initialPosts);
    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostContent, setNewPostContent] = useState('');
    const [newReplyContent, setNewReplyContent] = useState('');

    const handlePostSubmit = () => {
        if (newPostTitle && newPostContent) {
            const newPost: Post = {
                title: newPostTitle,
                content: newPostContent,
                author: "You" // Replace with actual user data if available
            };
            setPosts([...posts, newPost]);
            setNewPostTitle('');
            setNewPostContent('');
        }
    };

    const handleReplySubmit = (index: number) => {
        if (newReplyContent) {
            const updatedPosts = [...posts];
            updatedPosts[index].replies = updatedPosts[index].replies || [];
            updatedPosts[index].replies.push({
                content: newReplyContent,
                author: "You" // Replace with actual user data if available
            });
            setPosts(updatedPosts);
            setNewReplyContent('');
        }
    };

    return (
        <div className="bg-gray-900 py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-white text-center mb-12">Community Forum</h2>
                <div className="mb-8">
                    <h3 className="text-2xl font-semibold text-white mb-4">Create a New Post</h3>
                    <input
                        type="text"
                        placeholder="Post Title"
                        value={newPostTitle}
                        onChange={(e) => setNewPostTitle(e.target.value)}
                        className="w-full p-3 mb-2 rounded bg-gray-800 text-white border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <textarea
                        placeholder="Post Content"
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        className="w-full p-3 mb-4 rounded bg-gray-800 text-white border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button onClick={handlePostSubmit} className="bg-purple-800 hover:bg-purple-700 text-white py-2 px-4 rounded">
                        Submit Post
                    </button>
                </div>
                <div className="space-y-4">
                    {posts.map((post, index) => (
                        <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold text-purple-400">{post.title}</h3>
                            <p className="text-gray-400 mt-2">{post.content}</p>
                            <p className="text-gray-500 mt-2">Posted by: {post.author}</p>
                            {post.replies && (
                                <div className="mt-4">
                                    <h4 className="text-lg font-semibold text-white mb-2">Replies</h4>
                                    {post.replies.map((reply, replyIndex) => (
                                        <div key={replyIndex} className="bg-gray-700 p-2 rounded-lg mt-2">
                                            <p className="text-gray-400">{reply.content}</p>
                                            <p className="text-gray-500 mt-1">By: {reply.author}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="mt-4">
                                <textarea
                                    placeholder="Add a reply..."
                                    value={newReplyContent}
                                    onChange={(e) => setNewReplyContent(e.target.value)}
                                    className="w-full p-3 rounded bg-gray-800 text-white border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                <button onClick={() => handleReplySubmit(index)} className="mt-2 bg-purple-800 hover:bg-purple-700 text-white py-2 px-4 rounded">
                                    Reply
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CommunityForum;