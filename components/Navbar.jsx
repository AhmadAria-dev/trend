import { nav, logo } from "./Navbar.module.css";
import Link from "next/link";
import Menu from "./Menu";
export default function Navbar() {
  return (
    <nav className={nav}>
      <div className={logo}>
        <Link href="/">ترند</Link>
      </div>
      <Menu />
    </nav>
  );
}
