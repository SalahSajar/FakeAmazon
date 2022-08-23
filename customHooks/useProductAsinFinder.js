import React from 'react'

export const useProductAsinFinder = () => {

    const findProductAsin__HANDLER = (productUrl) => {
        if (productUrl.includes("dp/")) {
            const productASIN = productUrl.split("/dp/")[1].split("/")[0];

            return productASIN;
        }

        if (productUrl.includes("slredirect/") || productUrl.includes("sspa/")) {
            const productRedirectionUrl = new URL(productUrl).searchParams.get("url");

            const productASIN = productRedirectionUrl.split("/dp/")[1].split("/")[0];

            return productASIN;
        }
    }
  return {
    findProductAsin__HANDLER
  }
}
