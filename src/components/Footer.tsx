import React, { useState } from 'react';
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

const Navigation: React.FC = () => (
    <div>
        <h3 className="text-xl font-bold mb-4">Navigation</h3>
        <nav className="flex flex-col space-y-2">
            {['Home', 'Projects', 'Community', 'Resources', 'Contact', 'Blogs'].map((item) => (
                <a
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    className="text-purple-800 hover:text-purple-500 transition-colors"
                >
                    {item}
                </a>
            ))}
        </nav>
    </div>
);

const SocialMedia: React.FC = () => (
    <div>
        <h3 className="text-xl font-bold mb-4">Social Media</h3>
        <div className="flex space-x-4">
            {[
                { Icon: FaGithub, link: 'https://github.com/zaid-commits' },
                { Icon: FaTwitter, link: 'https://twitter.com/zaid_suiii' },
                { Icon: FaLinkedin, link: 'https://linkedin.com/in/zaidrakhange' },
                { Icon: FaInstagram, link: 'https://instagram.com/zaid_suiii' },
            ].map(({ Icon, link }) => (
                <a
                    key={link}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-800 hover:text-purple-500 text-2xl transition-colors"
                >
                    <Icon />
                </a>
            ))}
        </div>
    </div>
);

const Contact: React.FC = () => (
    <div>
        <h3 className="text-xl font-bold mb-4">Contact</h3>
        <div className="space-y-2">
            <p>Email: contact@perceptai.com</p>
            <p>Phone: +1 (123) 456-7890</p>
            <p>Address: 123 AI Street, Tech City</p>
        </div>
    </div>
);

const Legal: React.FC = () => (
    <div>
        <h3 className="text-xl font-bold mb-4">Legal</h3>
        <nav className="flex flex-col space-y-2">
            <a href="/terms" className="text-purple-800 hover:text-purple-500 transition-colors">Terms of Service</a>
            <a href="/privacy" className="text-purple-800 hover:text-purple-500 transition-colors">Privacy Policy</a>
        </nav>
    </div>
);

const Support: React.FC = () => (
    <div>
        <h3 className="text-xl font-bold mb-4">Support</h3>
        <nav className="flex flex-col space-y-2">
            <a href="/faq" className="text-purple-800 hover:text-purple-500 transition-colors">FAQ</a>
            <a href="/support" className="text-purple-800 hover:text-purple-500 transition-colors">Customer Support</a>
            <a href="/feedback" className="text-purple-800 hover:text-purple-500 transition-colors">Feedback</a>
        </nav>
    </div>
);

const Newsletter: React.FC = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('https://ts-backend-6swe.onrender.com/api/newsletter/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (response.ok) {
                toast.success('Subscribed successfully!');
            } else {
                toast.error(data.msg);
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    required
                    className="p-2 rounded bg-white text-black"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-purple-700 text-white p-2 rounded hover:bg-purple-700 transition-colors"
                >
                    Subscribe
                </button>
            </form>
            <Toaster position='bottom-right' />
        </div>
    );
};

const Footer: React.FC = () => {
    return (
        <footer className="w-full bg-[#050505] text-white py-10 px-4 border-t border-gray-700 rounded-[4rem]">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    <Navigation />
                    <Contact />
                    <Legal />
                    <Support />
                    <SocialMedia />
                    <Newsletter />
                </div>
                <div className="text-center mt-8 border-t border-gray-700 pt-4">
                    &copy; {new Date().getFullYear()} PerceptAI. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;