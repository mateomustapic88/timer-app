"use client";

import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import devotLogo from "@/assets/devotLogo.svg";
import trackerIcon from "@/assets/trackerIcon.svg";
import historyIcon from "@/assets/historyIcon.svg";
import logoutIcon from "@/assets/logoutIcon.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const isLoginOrRegisterPage =
    pathname === "/login" || pathname === "/register";
  const isTrackersPage = pathname === "/trackers";
  const isHistoryPage = pathname === "/history";

  const handleLogout = async () => {
    await logout();
    toast.success("User logged out");

    setTimeout(() => {
      router.push("/login");
    }, 1000);
  };

  return (
    <header className='header'>
      <div className='header-left'>
        <Image src={devotLogo} alt='Devot Logo' width={162} height={44} />
        <span className='tracking-tool'>Tracking Tool</span>
      </div>
      {!isLoginOrRegisterPage && user && (
        <div className='header-right'>
          <div className={`trackers-link ${isTrackersPage ? "active" : ""}`}>
            <Image
              src={trackerIcon}
              alt='Tracker Icon'
              width={24}
              height={24}
              style={{ marginRight: "8px" }}
            />
            <Link href='/trackers'>Trackers</Link>
          </div>
          <div className={`history-link ${isHistoryPage ? "active" : ""}`}>
            <Image
              src={historyIcon}
              alt='History Icon'
              width={24}
              height={24}
              style={{ marginRight: "8px" }}
            />
            <Link href='/history'>History</Link>
          </div>
          <span onClick={handleLogout} className='logout-link'>
            <Image
              src={logoutIcon}
              alt='Logout Icon'
              width={24}
              height={24}
              style={{ marginRight: "8px" }}
            />
            Logout
          </span>
        </div>
      )}
    </header>
  );
};

export default Header;
