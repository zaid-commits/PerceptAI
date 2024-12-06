import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';

interface Email {
    email: string;
    subscribedAt: string;
}

interface NewsletterForm {
    subject: string;
    heading: string;
    content: string;
}

const AdminDashboard: React.FC = () => {
    const { user } = useUser();
    const [emails, setEmails] = useState<Email[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sending, setSending] = useState(false);
    const [sendMessage, setSendMessage] = useState<string | null>(null);
    const [newsletterForm, setNewsletterForm] = useState<NewsletterForm>({
        subject: '',
        heading: '',
        content: ''
    });

    const adminEmail = 'rakhangezaid10@gmail.com';

    useEffect(() => {
        if (user?.primaryEmailAddress?.emailAddress !== adminEmail) {
            setError('Access denied');
            setLoading(false);
            return;
        }

        const fetchEmails = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/newsletter/emails');
                const data = await response.json();
                setEmails(data);
            } catch (error) {
                setError('Failed to fetch emails');
            } finally {
                setLoading(false);
            }
        };

        fetchEmails();
    }, [user]);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewsletterForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSendNewsletter = async () => {
        setSending(true);
        setSendMessage(null);
        try {
            const response = await fetch('http://localhost:5000/api/newsletter/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newsletterForm),
            });
            const data = await response.json();
            if (response.ok) {
                setSendMessage('Newsletter sent successfully!');
                setNewsletterForm({ subject: '', heading: '', content: '' });
            } else {
                setSendMessage(data.msg);
            }
        } catch (error) {
            setSendMessage('Failed to send newsletter. Please try again.');
        } finally {
            setSending(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8 bg-black text-white">
            <h1 className="text-4xl font-bold text-center text-purple-900 mb-8">Admin Dashboard</h1>
            
            {/* Newsletter Form */}
            <div className="mb-8 max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-4 text-purple-900">Compose Newsletter</h2>
                <div className="space-y-4">
                    <input
                        type="text"
                        name="subject"
                        placeholder="Newsletter Subject"
                        value={newsletterForm.subject}
                        onChange={handleFormChange}
                        className="w-full p-2 rounded bg-gray-800 text-white"
                    />
                    <input
                        type="text"
                        name="heading"
                        placeholder="Newsletter Heading"
                        value={newsletterForm.heading}
                        onChange={handleFormChange}
                        className="w-full p-2 rounded bg-gray-800 text-white"
                    />
                    <textarea
                        name="content"
                        placeholder="Newsletter Content"
                        value={newsletterForm.content}
                        onChange={handleFormChange}
                        rows={6}
                        className="w-full p-2 rounded bg-gray-800 text-white"
                    />
                </div>
            </div>

            <div className="overflow-x-auto mb-8">
                <table className="min-w-full bg-black text-white">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Subscribed At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emails.map((email) => (
                            <tr key={email.email}>
                                <td className="border px-4 py-2">{email.email}</td>
                                <td className="border px-4 py-2">{new Date(email.subscribedAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <button
                onClick={handleSendNewsletter}
                className="bg-[#BF40BF] text-white p-2 rounded hover:bg-purple-700 transition-colors"
                disabled={sending}
            >
                {sending ? 'Sending...' : 'Send Newsletter'}
            </button>
            {sendMessage && <p className="mt-4">{sendMessage}</p>}
        </div>
    );
};

export default AdminDashboard;