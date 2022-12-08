import {
  menu,
  hideMenu,
  profile,
  profileInfo,
  profilePicture,
  menuItems,
  icon,
  signIn,
} from "./Menu.module.css";

import Button from "./Button";

import {
  IoIosSettings,
  IoIosAddCircle,
  IoIosInformationCircle,
} from "react-icons/io";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Menu() {
  const [showMenu, setShowMenu] = useState(false);
  const [link, setLink] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleMenu = () => setShowMenu(!showMenu);
  const handleMenuLeave = () => setShowMenu(false);
  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
  };

  useEffect(() => {
    setLink(!user && router.pathname != "/Authentication");
  }, [user, router.pathname]);

  return (
    <>
      {link && (
        <Link href="/Authentication" className={signIn}>
          ورود
        </Link>
      )}

      {!link && user && (
        <menu
          className={showMenu ? menu : hideMenu}
          onMouseLeave={handleMenuLeave}
        >
          <div className={profile}>
            {showMenu && (
              <div className={profileInfo}>
                <p>{user ? user.username : ""}</p>
                <p>{user ? user.email : ""}</p>
              </div>
            )}
            <div className={profilePicture} onClick={handleMenu}></div>
          </div>
          {showMenu && (
            <>
              {" "}
              <ul className={menuItems}>
                <li>
                  <IoIosSettings className={icon} />
                  تنظمیات
                </li>
                <li>
                  <IoIosAddCircle className={icon} />
                  افزودن ودیو
                </li>
                <li>
                  <IoIosInformationCircle className={icon} />
                  درباره
                </li>
              </ul>
              <Button cls="btnRed" handleClick={handleLogout}>
                خروج
              </Button>
            </>
          )}
        </menu>
      )}
    </>
  );
}
