import { Container } from "@mantine/core";
import { ReactNode } from "react";
import styles from "./Layout.module.css";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Container>
        <main className={styles.main}>{children}</main>
      </Container>
    </>
  );
}
