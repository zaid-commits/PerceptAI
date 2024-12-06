import React, { useState } from 'react';
import FloatingNavbar from "../Section1/Navbar/Navbar";
import { toast, Toaster } from 'react-hot-toast';

interface NewsletterForm {
  subject: string;
  heading: string;
  content: string;
}

const Newsletter: React.FC = () => {
  const [newsletterForm, setNewsletterForm] = useState<NewsletterForm>({
    subject: '',
    heading: '',
    content: ''
  });
  const [sending, setSending] = useState(false);
  const [sendMessage, setSendMessage] = useState<string | null>(null);

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
        toast.success("Newsletter sent successfully, will be delivered soon");
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

  return (
    <div className="min-h-screen bg-black text-white">
      <FloatingNavbar />
      <Toaster position="bottom-right" />
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-bold text-center text-purple-500 mb-8">Send Newsletter</h1>
        <div className="mb-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-purple-500">Compose Newsletter</h2>
          <div className="space-y-4">
            <input
              type="text"
              name="subject"
              placeholder="Newsletter Subject"
              value={newsletterForm.subject}
              onChange={handleFormChange}
              className="w-full p-2 rounded bg-gray-800 text-white border border-purple-500"
            />
            <input
              type="text"
              name="heading"
              placeholder="Newsletter Heading"
              value={newsletterForm.heading}
              onChange={handleFormChange}
              className="w-full p-2 rounded bg-gray-800 text-white border border-purple-500"
            />
            <textarea
              name="content"
              placeholder="Newsletter Content"
              value={newsletterForm.content}
              onChange={handleFormChange}
              rows={6}
              className="w-full p-2 rounded bg-gray-800 text-white border border-purple-500"
            />
          </div>
        </div>
        <button
          onClick={handleSendNewsletter}
          className="bg-purple-500 text-white p-2 rounded hover:bg-purple-600 transition-colors inline-block"
          disabled={sending}
        >
          {sending ? 'Sending...' : 'Send Newsletter'}
        </button>
        {sendMessage && <p className="mt-4 text-purple-300">{sendMessage}</p>}
      </div>
    </div>
  );
};

export default Newsletter;