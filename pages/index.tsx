import { Button, Group } from "@mantine/core";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";

export default function IndexPage() {
  return (
    <Layout>
      <div style={{margin: 'auto'}}>
        <h1 style={{ marginBottom: "1rem" }}>Mau input apa?</h1>
        <Group position='center'>
          <Link href={"/uploads/seller"} passHref>
            <Button component="a" variant="outline">
              Seller
            </Button>
          </Link>
          <Link href={"/uploads/product"} passHref>
            <Button component="a" variant="outline">
              Product
            </Button>
          </Link>
        </Group>
      </div>
    </Layout>
  );
}
