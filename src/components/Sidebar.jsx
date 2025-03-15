import React from "react";
import { auth } from "../firebase";
import { mindpath } from '../assets';
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  Cog6ToothIcon,
  PowerIcon,
  UserGroupIcon,
  HandRaisedIcon,
} from "@heroicons/react/24/solid";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location path

  async function handleLogout() {
    localStorage.removeItem('authUser');
    const authChannel = new BroadcastChannel('authChannel');
    authChannel.postMessage('logout');
    try {
      await auth.signOut();
      navigate("/LoginPage");
      console.log("User logged out successfully");
    } catch (error) {
      console.log("Error logging out: ", error.message);
    }
  }

  const getLinkClass = (path) => (
      location.pathname === path ? "bg-[#f3f4f6]" : "text-gray-700"
  );

  return (
      <Card className="h-[calc(100vh)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 flex flex-col justify-between">
        <div className="mb-2 p-4">
          <img
              src={mindpath}
              alt="MindPath"
              className="w-[150px] h-[49px] object-contain"
          />
        </div>

        <div className="flex-1">
          <List>
            <ListItem className={`font-poppins ${getLinkClass("/Dashboard")}`}>
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Link to="/Dashboard">
                Dashboard
              </Link>
            </ListItem>
            <ListItem className={`font-poppins ${getLinkClass("/Appointment")}`}>
              <ListItemPrefix>
                <ShoppingBagIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Link to="/Appointment">
                Appointments
              </Link>
              <ListItemSuffix>
                <Chip size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
              </ListItemSuffix>
            </ListItem>
            <ListItem className={`font-poppins ${getLinkClass("/ServiceProviders")}`}>
              <ListItemPrefix>
                <HandRaisedIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Link to="/ServiceProviders">
                Service Providers
              </Link>
              <ListItemSuffix>
                <Chip size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
              </ListItemSuffix>
            </ListItem>
            <ListItem className={`font-poppins ${getLinkClass("/Administrators")}`}>
              <ListItemPrefix>
                <UserGroupIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Link to="/Administrators">
                Administrators
              </Link>
              <ListItemSuffix>
                <Chip size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
              </ListItemSuffix>
            </ListItem>
          </List>
        </div>
        <div className="pb-4">
          <List>
            <ListItem className={`font-poppins ${getLinkClass("/Settings")}`}>
              <ListItemPrefix>
                <Cog6ToothIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Link to="/Settings" >
                Settings
              </Link>
            </ListItem>
            <ListItem className="font-poppins text-gray-700" onClick={handleLogout}>
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Link>
                Logout
              </Link>
            </ListItem>
          </List>
        </div>
      </Card>
  );
};

export default Sidebar;