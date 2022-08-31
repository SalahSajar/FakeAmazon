export const useProductSearchFetch = () => {
  let productSearchResult = null;
  let error = false;
  let loading = true;

  const productSearchFetch__HANDLER = async (keyword) => {
    // const options = {
    //   method: "GET",
    //   headers: {
    //     "X-RapidAPI-Key":
    //       process.env.NEXT_PUBLIC_RAPIDAPI_KEY ||
    //       process.env.NEXT_PUBLIC_VERCEL_RAPIDAPI_KEY,
    //     "X-RapidAPI-Host": "amazon-data-scraper6.p.rapidapi.com",
    //   },
    // };

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '8ccbc63729mshc51ef54ef0f2f29p188c45jsn963399d87f0b',
        'X-RapidAPI-Host': 'amazon-data-scraper6.p.rapidapi.com'
      }
    };

    try {
      error = false;
      loading = true;

//       # f871cacba1afede62474516ccfae136d
      // # 977c36656438366bf9d34cc870f99c22
      // # 16e8a0391d250b1bb02b79751c286816
      // # 548851825ac43f460f8ec20f2c8ab823
      // # d1a8234e072f8b7503c43956aa11e281
      // # e04e076ea42c6875d5951aeb6393fc9a
      // # cbbbe7a7bcece324df7cca2f86c550cf

      const req = await fetch(`https://amazon-data-scraper6.p.rapidapi.com/search/${encodeURI(
          keyword
        )}?api_key=${process.env.NEXT_PUBLIC_HOME_SCAPPERAPI_KEY || process.env.NEXT_PUBLIC_VERCEL_HOME_SCAPPERAPI_KEY}`, options)
      
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
