import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import api from "../../../libs/webflowApi";

export const collectionFetcher = (url: string) =>
  axios.get(url).then((res) => res.data);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let query = "";
  const { collectionId } = req.query;

  if (typeof collectionId === "string") {
    query = collectionId;
  }

  try {
    const sellerCollection = await api.collection({ collectionId: query });

    console.log("SellerCol: ", sellerCollection);

    return res.status(200).json({ hola: "World" });
  } catch (error) {
    console.log(error);
  }
}
