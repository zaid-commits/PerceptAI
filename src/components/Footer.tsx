import React from 'react';
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';

const Navigation: React.FC = () => (
    <div>
        <h3 className="text-xl font-bold mb-4">Navigation</h3>
        <nav className="flex flex-col space-y-2">
            {['Home', 'Projects', 'Community', 'Resources', 'Contact', 'Blogs'].map((item) => (
                <a 
                    key={item} 
                    href={`/${item.toLowerCase()}`} 
                    className="text-[#BF40BF] hover:text-purple-700 transition-colors"
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
                    className="text-[#BF40BF] hover:text-purple-700 text-2xl transition-colors"
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
            <a href="/terms" className="text-[#BF40BF] hover:text-purple-700 transition-colors">Terms of Service</a>
            <a href="/privacy" className="text-[#BF40BF] hover:text-purple-700 transition-colors">Privacy Policy</a>
        </nav>
    </div>
);

const Support: React.FC = () => (
    <div>
        <h3 className="text-xl font-bold mb-4">Support</h3>
        <nav className="flex flex-col space-y-2">
            <a href="/faq" className="text-[#BF40BF] hover:text-purple-700 transition-colors">FAQ</a>
            <a href="/support" className="text-[#BF40BF] hover:text-purple-700 transition-colors">Customer Support</a>
            <a href="/feedback" className="text-[#BF40BF] hover:text-purple-700 transition-colors">Feedback</a>
        </nav>
    </div>
);

const Newsletter: React.FC = () => (
    <div>
        <h3 className="text-xl font-bold mb-4">Newsletter</h3>
        <form className="flex flex-col space-y-2">
            <input 
                type="email" 
                placeholder="Enter your email" 
                required 
                className="p-2 rounded bg-white text-black"
            />
            <button 
                type="submit" 
                className="bg-[#BF40BF] text-white p-2 rounded hover:bg-purple-700 transition-colors"
            >
                Subscribe
            </button>
        </form>
    </div>
);

const Footer: React.FC = () => {
    return (
        <footer className="w-full bg-black text-white py-10 px-4 border-t border-gray-700">
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