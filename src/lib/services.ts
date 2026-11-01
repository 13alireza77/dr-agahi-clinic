import { getCollection } from "astro:content";

export const getServices = async () =>
  (await getCollection("services")).sort((a, b) => a.data.order - b.data.order);

export const serviceUrl = (id: string) => `/services/${id}/`;
