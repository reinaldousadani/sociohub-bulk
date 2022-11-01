import {  SimpleGrid } from "@mantine/core";

export default function Forms({
  collectionId
}: {
  collectionId: string
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
      <h1>{collectionId}</h1>
    </SimpleGrid>
  );
}
