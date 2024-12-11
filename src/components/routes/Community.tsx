import FloatingNavbar from "../Section1/Navbar/Navbar";
import Footer from "../Footer";
import Chat from "../Community/Chat";
const Community = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <FloatingNavbar />

      <div className="flex-grow bg-black text-purple-800 p-4 py-24 flex justify-center items-center overflow-auto" style={{ maxHeight: 'calc(100vh - 128px)' }}>
        <Chat />
      </div>
      <Footer />
    </div>
  );
};

export default Community;