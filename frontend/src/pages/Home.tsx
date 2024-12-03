import MessageContainer from "../components/messages/MessageContainer";
import Sidebar from "../components/sidebar/Sidebar";

const Home = () => {
  return (
    <div className="flex h-[80vh] w-full overflow-hidden rounded-lg bg-gray-400 bg-opacity-0 bg-clip-padding backdrop-blur-lg backdrop-filter md:h-[550px] md:max-w-screen-md">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};
export default Home;
