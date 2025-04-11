"use server";

import { NpmSearchApiResponse } from "@/types";

export const searchAPI = async (searchTerm: string): Promise<NpmSearchApiResponse> => {
  try {
    const response = await fetch(
      `https://registry.npmjs.org/-/v1/search?text=${searchTerm}&size=10`
    );
    const data = await response.json();

    return data;
  } catch (err) {
    console.log("Npm search error", err);

    return {
      objects: [],
      total: 0,
      time: "0",
    };
  }
};
