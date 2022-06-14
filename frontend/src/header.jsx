//@ts-check
import * as React from "react";
  
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { NavLink } from "react-router-dom";
import './styles/header.css'
  
export default function Header() {
  return (
      <AppBar position="static" sx={{background:'seagreen'}}>
        <Toolbar className="HeaderRow">
              <div>Adoba</div>
              <div className="Links">
                <NavLink to="/shop" className="Link">Shop</NavLink>
                <NavLink to="/manager" className="Link">Manager</NavLink>
              </div>
        </Toolbar>
      </AppBar>
  );
}