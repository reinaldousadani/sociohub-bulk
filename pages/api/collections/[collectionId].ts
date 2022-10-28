import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import api from "../../../libs/webflowApi";
import { IWebflowCollection } from "../../../types/webflow";

export const collectionFetcher = (url: string): Promise<IWebflowCollection> =>
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
    const collections = await api.collection({ collectionId: query });

    return res.status(200).json(collections);
  } catch (error) {
    console.log(error);
  }
}
