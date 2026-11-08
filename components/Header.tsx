"use client"

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from "./Header.module.css";

function Header() {
  const pathname = usePathname();
  
  return (
    <Navbar expand="lg" className={`${styles.header} bg-body-tertiary`}>
      <Container>
        <Navbar.Brand as={Link} href="/" className={styles.brand}>統計的星座占い</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;