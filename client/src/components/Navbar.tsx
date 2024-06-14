import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  isShowSearch: boolean;
}
const Navbar: React.FC<NavbarProps> = ({ isShowSearch }) => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };
  return (
    <AppBar position="static" className="!bg-transparent !shadow-none">
      <Toolbar className="flex justify-between items-center">
        <div className="flex items-center cursor-pointer" onClick={goHome}>
          <div className="mr-4">
            <Box component="img" alt="hoome" className="w-10" src="/vite.svg" />
          </div>
          <h1 className="text-black text-xl font-semibold">My Recipes</h1>
        </div>
        {isShowSearch && (
          <div className="flex items-center">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="text-gray-500" />
              </div>
              <InputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                className="pl-10 pr-4 py-2 w-64 rounded-lg border text-white"
              />
            </div>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
