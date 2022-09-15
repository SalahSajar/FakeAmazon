export const useProductSearchFetch = () => {
  let productSearchResult = null;
  let error = false;
  let loading = true;

  const productSearchFetch__HANDLER = async (keyword) => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '8ccbc63729mshc51ef54ef0f2f29p188c45jsn963399d87f0b',
        'X-RapidAPI-Host': 'bth-amazon-data-scraper.p.rapidapi.com'
      }
    };

    try {
      error = false;
      loading = true;
      
      const req = await fetch(`https://bth-amazon-data-scraper.p.rapidapi.com/search/${encodeURI(
        keyword
      )}?api_Key=${process.env.NEXT_PUBLIC_HOME_SCAPPERAPI_KEY || process.env.NEXT_PUBLIC_VERCEL_HOME_SCAPPERAPI_KEY}`, options);

      if (!req.ok) {
        throw Error("Something is not right ");
      }

      const results = await req.json();

      if (!!results.error) {
        throw Error("Something is not right");
      }

      productSearchResult = results.results;
      error = false;
      loading = false;
    } catch (err) {
      error = true;
      loading = false;
    }

    return {
      error,
      loading,
      productSearchResult,
    };
  };

  return {
    productSearchFetch__HANDLER,
  };
};
