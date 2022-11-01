import { Button, Group } from "@mantine/core";
import Link from "next/link";
import useSWR from "swr";
import Layout from "../components/Layout";

export default function IndexPage() {
  return (
    <Layout>
      <div style={{ margin: "auto" }}>
        <h1 style={{ marginBottom: "1rem" }}>Mau Input Apa?</h1>
        <Group position="center">
          <Link href={`/sellers`} passHref>
            <Button component="a" variant="outline">
              Sellers
            </Button>
          </Link>
          <Link href={`/products`} passHref>
            <Button component="a" variant="outline">
              Products
            </Button>
          </Link>
        </Group>
      </div>
    </Layout>
  );
}
