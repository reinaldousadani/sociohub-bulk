// Limiting to Products and Seller collections

import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import api from "../../libs/webflowApi";

enum CollectionsAccepted {
  sellers = "sellers",
  products = "products",
}

export type CollectionsResponse = {
  name: string;
  id: string;
};

export const collectionsFetcher = (url: string) => axios.get(url).then(res => res.data)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CollectionsResponse[]>
) {
  try {
    const collections = await api.collections({
      siteId: process.env.WEBFLOW_SITE_ID ?? "",
    });
    const collectionsResponse = collections
      .map((collection) => {
        return {
          name: collection.slug,
          id: collection._id,
        };
      })
      .filter(
        (collection) =>
          collection.name === CollectionsAccepted.sellers ||
          collection.name === CollectionsAccepted.products
      );
    return res.status(200).json(collectionsResponse);
  } catch (error) {
    console.log(error);
  }
}
