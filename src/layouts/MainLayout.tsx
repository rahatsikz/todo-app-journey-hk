import { Outlet } from "react-router-dom";
import bgImage from "../assets/bg.png";

const MainLayout = () => {
  return (
    <div
      className='min-h-screen bg-repeat-round '
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className='bg-[#2e2e2e] bg-opacity-60 min-h-screen'>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default MainLayout;
