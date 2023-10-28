import { Outlet } from "react-router-dom";
import bgImage from "../assets/bg.png";

const MainLayout = () => {
  return (
    <div
      className='min-h-screen bg-repeat-round'
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <Outlet></Outlet>
    </div>
  );
};

export default MainLayout;
