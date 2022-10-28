import { Button, SimpleGrid } from "@mantine/core";
import { IWebflowField } from "../types/webflow";

//TODO
//1. Create a dynamic form that checks the validation object from Webflow Response
//2. Convert to Webp before submitting to firebase storage
//3. Generate public URL after saving to firebase storage

export default function Forms({
  fields,
  slug,
}: {
  fields: IWebflowField[] | undefined;
  slug: string | undefined;
}) {

  return (
    <SimpleGrid
      cols={1}
      sx={(theme) => {
        return {
          width: "100%",
          overflow: "hidden",
          borderRadius: "0.75rem",
          boxShadow: "0px 9px 50px -11px rgba(255,255,255,0.2)",
          border: "0.5px solid " + theme.colors.blue[9],
          paddingLeft: "2rem",
          paddingRight: "2rem",
          paddingTop: "2rem",
          paddingBottom: "2rem",
        };
      }}
    >
      {slug === "sellers" ? <p>Seller Form Here</p> : slug === "products" ? <p>Products Form Here</p> : <p>Collection not found!</p>}
    </SimpleGrid>
  );
}
