"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const router = useRouter();

  function handleNavigate(route: string) {
    router.push(`/${route}`);
  }

  return (
    <aside className={styles.sidebar}>
      {/* Div no canto superior direito */}
      <div className={styles.topRightBox}>
        <Image src="/User-(1).svg" alt="Usuário" width={26} height={26} />
        <Image src="/arrow.svg" alt="Seta" width={24} height={27} />
      </div>

      <div className={styles.logo}>
        <Image src="/logo.svg" alt="Logo" width={157} height={44} />
      </div>

      <div className={styles.navigationHeader}>Navegação</div>

      <nav className={styles.navLinks}>
        <a
          href="#"
          className={`${styles.navLink} ${styles.active}`}
          onClick={(e) => {
            e.preventDefault();
            handleNavigate("dashboard");
          }}
        >
          <svg
            className={styles.icon}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            style={{ color: "inherit" }}
          >
            <path
              d="M8 11H5C3.343 11 2 9.657 2 8V5C2 3.343 3.343 2 5 2H8C9.657 2 11 3.343 11 5V8C11 9.657 9.657 11 8 11Z"
              fill="currentColor"
            />
            <path
              opacity="0.35"
              d="M19 11H16C14.343 11 13 9.657 13 8V5C13 3.343 14.343 2 16 2H19C20.657 2 22 3.343 22 5V8C22 9.657 20.657 11 19 11Z"
              fill="currentColor"
            />
            <path
              opacity="0.35"
              d="M8 22H5C3.343 22 2 20.657 2 19V16C2 14.343 3.343 13 5 13H8C9.657 13 11 14.343 11 16V19C11 20.657 9.657 22 8 22Z"
              fill="currentColor"
            />
            <path
              opacity="0.35"
              d="M19 22H16C14.343 22 13 20.657 13 19V16C13 14.343 14.343 13 16 13H19C20.657 13 22 14.343 22 16V19C22 20.657 20.657 22 19 22Z"
              fill="currentColor"
            />
            <path
              d="M5.00001 14.5C5.00001 15.33 4.33001 16 3.50001 16C2.89001 16 2.36001 15.63 2.14001 15.11C2.43001 14.17 3.17001 13.43 4.11001 13.14C4.63001 13.36 5.00001 13.89 5.00001 14.5Z"
              fill="currentColor"
            />
            <path
              d="M10.86 15.11C10.64 15.63 10.11 16 9.5 16C8.67 16 8 15.33 8 14.5C8 13.89 8.37 13.36 8.89 13.14C9.83 13.43 10.57 14.17 10.86 15.11Z"
              fill="currentColor"
            />
            <path
              d="M5.00001 20.5C5.00001 21.11 4.63001 21.64 4.11001 21.86C3.17001 21.57 2.43001 20.83 2.14001 19.89C2.36001 19.37 2.89001 19 3.50001 19C4.33001 19 5.00001 19.67 5.00001 20.5Z"
              fill="currentColor"
            />
            <path
              d="M10.86 19.89C10.57 20.83 9.83 21.57 8.89 21.86C8.37 21.64 8 21.11 8 20.5C8 19.67 8.67 19 9.5 19C10.11 19 10.64 19.37 10.86 19.89Z"
              fill="currentColor"
            />
            <path
              d="M6.5 19C7.32843 19 8 18.3284 8 17.5C8 16.6716 7.32843 16 6.5 16C5.67157 16 5 16.6716 5 17.5C5 18.3284 5.67157 19 6.5 19Z"
              fill="currentColor"
            />
            <path
              d="M21.71 14.71L14.71 21.71C14.09 21.41 13.59 20.91 13.29 20.29L20.29 13.29C20.91 13.59 21.41 14.09 21.71 14.71Z"
              fill="currentColor"
            />
            <path
              d="M17.42 13L13 17.42V16C13 14.34 14.34 13 16 13H17.42Z"
              fill="currentColor"
            />
            <path
              d="M22 17.58V19C22 20.66 20.66 22 19 22H17.58L22 17.58Z"
              fill="currentColor"
            />
          </svg>
          Dashboard
        </a>
        <a
          href="#"
          className={styles.navLink}
          onClick={(e) => {
            e.preventDefault();
            handleNavigate("relatorios");
          }}
        >
          <svg
            className={styles.icon}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            style={{ color: "inherit" }}
          >
            <path
              opacity="0.35"
              d="M18 21H6C4.343 21 3 19.657 3 18V6C3 4.343 4.343 3 6 3H18C19.657 3 21 4.343 21 6V18C21 19.657 19.657 21 18 21Z"
              fill="currentColor"
            />
            <path
              d="M21 15V18C21 19.657 19.657 21 18 21H6C4.343 21 3 19.657 3 18V15H7.342C8.143 15 8.924 15.431 9.235 16.169C9.69 17.246 10.755 18 12 18C13.245 18 14.31 17.246 14.765 16.169C15.076 15.431 15.856 15 16.658 15H21Z"
              fill="currentColor"
            />
          </svg>
          Relatórios
        </a>
      </nav>
    </aside>
  );
}
