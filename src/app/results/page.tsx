"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Country =
  | "India"
  | "United States"
  | "United Kingdom"
  | "Ireland"
  | "Canada"
  | "Australia"
  | "Germany"
  | "UAE";

type ProductInfo = {
  name: string;
  keywords: string[];
  image: string;
  prices: Record<Country, number>;
};

type StoreResult = {
  id: string;
  store: string;
  rating: string;
  delivery: Record<Country, string>;
  deliveryDays: Record<Country, number>;
  badge?: string;
};

const productCatalog: ProductInfo[] = [
  {
    name: "Samsung S25",
    keywords: [
      "samsung",
      "s25",
      "galaxy s25",
      "samsung galaxy s25",
    ],
    image: "/products/samsung-s25.png",
    prices: {
      India: 69999,
      "United States": 799,
      "United Kingdom": 699,
      Ireland: 799,
      Canada: 1099,
      Australia: 1299,
      Germany: 799,
      UAE: 2999,
    },
  },

  {
    name: "iPhone 16",
    keywords: [
      "iphone",
      "iphone 16",
      "iphone16",
      "apple iphone",
      "apple phone",
    ],
    image: "/products/iphone-16.png",
    prices: {
      India: 69900,
      "United States": 799,
      "United Kingdom": 699,
      Ireland: 829,
      Canada: 1099,
      Australia: 1299,
      Germany: 799,
      UAE: 2999,
    },
  },

  {
    name: "MacBook Air",
    keywords: [
      "macbook",
      "macbook air",
      "mac book",
      "mac book air",
      "macbookair",
      "apple laptop",
      "mac air",
      "laptop",
    ],
    image: "/products/macbook-air.png",
    prices: {
      India: 99900,
      "United States": 999,
      "United Kingdom": 1099,
      Ireland: 1199,
      Canada: 1349,
      Australia: 1599,
      Germany: 1199,
      UAE: 4299,
    },
  },

  {
    name: "Nike Air Max",
    keywords: [
      "nike",
      "nike shoes",
      "nike air max",
      "air max",
      "shoes",
      "shoe",
      "sneakers",
      "sneaker",
    ],
    image: "/products/nike-air-max.png",
    prices: {
      India: 12995,
      "United States": 160,
      "United Kingdom": 145,
      Ireland: 170,
      Canada: 220,
      Australia: 250,
      Germany: 160,
      UAE: 599,
    },
  },
];

const storeResults: StoreResult[] = [
  {
    id: "product-amazon",
    store: "Amazon",
    rating: "4.6",
    delivery: {
      India: "Delivery in 2 days",
      "United States": "Delivery in 2 days",
      "United Kingdom": "Delivery in 2–3 days",
      Ireland: "Delivery in 2–3 days",
      Canada: "Delivery in 3–5 days",
      Australia: "Delivery in 3–5 days",
      Germany: "Delivery in 2–3 days",
      UAE: "Delivery in 2–3 days",
    },
    deliveryDays: {
      India: 2,
      "United States": 2,
      "United Kingdom": 2,
      Ireland: 2,
      Canada: 3,
      Australia: 3,
      Germany: 2,
      UAE: 2,
    },
    badge: "TOP RESULT",
  },

  {
    id: "product-flipkart",
    store: "Flipkart",
    rating: "4.5",
    delivery: {
      India: "Delivery tomorrow",
      "United States": "Delivery in 2–3 days",
      "United Kingdom": "Delivery in 2–3 days",
      Ireland: "Delivery in 2–3 days",
      Canada: "Delivery in 3–5 days",
      Australia: "Delivery in 3–5 days",
      Germany: "Delivery in 2–3 days",
      UAE: "Delivery in 2–3 days",
    },
    deliveryDays: {
      India: 1,
      "United States": 2,
      "United Kingdom": 2,
      Ireland: 2,
      Canada: 3,
      Australia: 3,
      Germany: 2,
      UAE: 2,
    },
    badge: "BEST PRICE",
  },

  {
    id: "product-croma",
    store: "Croma",
    rating: "4.4",
    delivery: {
      India: "Delivery in 3 days",
      "United States": "Delivery in 3–4 days",
      "United Kingdom": "Delivery in 3–4 days",
      Ireland: "Delivery in 3–4 days",
      Canada: "Delivery in 4–5 days",
      Australia: "Delivery in 4–5 days",
      Germany: "Delivery in 3–4 days",
      UAE: "Delivery in 3–4 days",
    },
    deliveryDays: {
      India: 3,
      "United States": 3,
      "United Kingdom": 3,
      Ireland: 3,
      Canada: 4,
      Australia: 4,
      Germany: 3,
      UAE: 3,
    },
  },

  {
    id: "product-ebay",
    store: "eBay",
    rating: "4.3",
    delivery: {
      India: "Delivery in 4 days",
      "United States": "Delivery in 3–5 days",
      "United Kingdom": "Delivery in 3–5 days",
      Ireland: "Delivery in 3–5 days",
      Canada: "Delivery in 4–6 days",
      Australia: "Delivery in 4–6 days",
      Germany: "Delivery in 3–5 days",
      UAE: "Delivery in 3–5 days",
    },
    deliveryDays: {
      India: 4,
      "United States": 3,
      "United Kingdom": 3,
      Ireland: 3,
      Canada: 4,
      Australia: 4,
      Germany: 3,
      UAE: 3,
    },
  },
];

/*
  Prototype store availability by country.
  Later this will come from real store/API availability.
*/
const countryStores: Record<
  Country,
  string[]
> = {
  India: [
    "Amazon",
    "Flipkart",
    "Croma",
    "eBay",
  ],

  "United States": [
    "Amazon",
    "eBay",
  ],

  "United Kingdom": [
    "Amazon",
    "eBay",
  ],

  Ireland: [
    "Amazon",
    "eBay",
  ],

  Canada: [
    "Amazon",
    "eBay",
  ],

  Australia: [
    "Amazon",
    "eBay",
  ],

  Germany: [
    "Amazon",
    "eBay",
  ],

  UAE: [
    "Amazon",
    "eBay",
  ],
};

const countryCurrency: Record<
  Country,
  {
    currency: string;
    locale: string;
  }
> = {
  India: {
    currency: "INR",
    locale: "en-IN",
  },

  "United States": {
    currency: "USD",
    locale: "en-US",
  },

  "United Kingdom": {
    currency: "GBP",
    locale: "en-GB",
  },

  Ireland: {
    currency: "EUR",
    locale: "en-IE",
  },

  Canada: {
    currency: "CAD",
    locale: "en-CA",
  },

  Australia: {
    currency: "AUD",
    locale: "en-AU",
  },

  Germany: {
    currency: "EUR",
    locale: "de-DE",
  },

  UAE: {
    currency: "AED",
    locale: "en-AE",
  },
};

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

function findProduct(query: string) {
  const normalizedQuery =
    normalizeText(query);

  return (
    productCatalog.find((product) =>
      product.keywords.some((keyword) =>
        normalizedQuery.includes(
          normalizeText(keyword)
        )
      )
    ) || null
  );
}

function formatPrice(
  amount: number,
  country: Country
) {
  const info =
    countryCurrency[country];

  return new Intl.NumberFormat(
    info.locale,
    {
      style: "currency",
      currency: info.currency,
      maximumFractionDigits: 0,
    }
  ).format(amount);
}

export default function ResultsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialQuery =
    searchParams.get("q") || "";

  const selectedCountry =
    (searchParams.get(
      "country"
    ) as Country) || "India";

  const [query, setQuery] =
    useState(initialQuery);

  const [sortBy, setSortBy] =
    useState("lowest");

  const [storeFilter, setStoreFilter] =
    useState("All Stores");

  const matchedProduct =
    findProduct(initialQuery);

  const activeProduct =
    matchedProduct || productCatalog[0];

  const storePriceMultipliers: Record<
    string,
    number
  > = {
    Amazon: 1,
    Flipkart: 0.978,
    Croma: 1.012,
    eBay: 1.025,
  };

  /*
    Show only stores available for the selected country.
  */
  const availableStores =
    countryStores[selectedCountry];

  const countryStoreResults =
    storeResults.filter((store) =>
      availableStores.includes(
        store.store
      )
    );

  const storeData =
    countryStoreResults.map((store) => {
      const basePrice =
        activeProduct.prices[
          selectedCountry
        ];

      const multiplier =
        storePriceMultipliers[
          store.store
        ] || 1;

      const calculatedPrice =
        Math.round(
          basePrice * multiplier
        );

      return {
        ...store,
        price: calculatedPrice,
      };
    });

  const lowestPrice = Math.min(
    ...storeData.map(
      (store) => store.price
    )
  );

  const bestStore =
    storeData.find(
      (store) =>
        store.price === lowestPrice
    ) || storeData[0];

  const filteredAndSortedStores =
    useMemo(() => {
      let result = [...storeData];

      if (
        storeFilter !== "All Stores"
      ) {
        result = result.filter(
          (store) =>
            store.store ===
            storeFilter
        );
      }

      if (sortBy === "lowest") {
        result.sort(
          (a, b) =>
            a.price - b.price
        );
      }

      if (sortBy === "rating") {
        result.sort(
          (a, b) =>
            Number(b.rating) -
            Number(a.rating)
        );
      }

      if (sortBy === "delivery") {
        result.sort(
          (a, b) =>
            a.deliveryDays[
              selectedCountry
            ] -
            b.deliveryDays[
              selectedCountry
            ]
        );
      }

      return result;
    }, [
      storeFilter,
      sortBy,
      selectedCountry,
      activeProduct,
    ]);

  const handleSearch = () => {
    if (query.trim()) {
      router.push(
        `/results?q=${encodeURIComponent(
          query.trim()
        )}&country=${encodeURIComponent(
          selectedCountry
        )}`
      );
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white">

      {/* Header */}
      <header className="border-b border-white/10 bg-black/40 backdrop-blur-xl">

        <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-5">

          <button
            onClick={() =>
              router.push("/")
            }
            className="flex items-center gap-3"
          >

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white font-black text-black">
              S
            </div>

            <span className="text-xl font-semibold">
              SearchOnce
            </span>

          </button>

          {/* Search */}
          <div className="flex flex-1 items-center rounded-xl border border-white/10 bg-white/[0.05] p-1">

            <span className="ml-3 mr-2 text-lg text-white/40">
              ⌕
            </span>

            <input
              type="text"
              value={query}
              onChange={(event) =>
                setQuery(
                  event.target.value
                )
              }
              onKeyDown={(event) => {
                if (
                  event.key ===
                  "Enter"
                ) {
                  handleSearch();
                }
              }}
              className="h-10 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/30"
              placeholder="Search products..."
            />

            <button
              onClick={handleSearch}
              className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Search
            </button>

          </div>

          {/* Country */}
          <div className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm md:flex">

            <span>🌍</span>

            <span className="text-white/60">
              {selectedCountry}
            </span>

          </div>

        </div>

      </header>

      {/* Main */}
      <section className="mx-auto max-w-7xl px-6 py-10">

        {/* Heading */}
        <div className="mb-8">

          <p className="text-sm text-white/40">
            Search results
          </p>

          <h1 className="mt-2 text-3xl font-semibold">
            Results for "{initialQuery}"
          </h1>

          <p className="mt-2 text-sm text-white/40">
            Showing results for{" "}
            <span className="text-white/70">
              {selectedCountry}
            </span>
          </p>

          <p className="mt-3 text-xs text-white/30">
            Comparing stores available
            in {selectedCountry}.
          </p>

          {!matchedProduct && (
            <p className="mt-2 text-xs text-white/30">
              No exact prototype match
              found. Showing the default
              prototype item.
            </p>
          )}

        </div>

        {/* Best Deal */}
        <div className="mb-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5">

          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

            <div>

              <p className="text-xs uppercase tracking-[0.18em] text-white/35">
                Best deal found
              </p>

              <p className="mt-2 text-lg font-semibold">
                {bestStore.store}
              </p>

              <p className="mt-1 text-sm text-white/40">
                Lowest price for{" "}
                {activeProduct.name} in{" "}
                {selectedCountry}
              </p>

            </div>

            <div className="text-left sm:text-right">

              <p className="text-2xl font-bold">
                {formatPrice(
                  lowestPrice,
                  selectedCountry
                )}
              </p>

              <p className="mt-1 text-xs text-white/40">
                {availableStores.length}{" "}
                stores compared
              </p>

            </div>

          </div>

        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:flex-row md:items-center md:justify-between">

          <div>

            <p className="text-sm font-medium">
              Compare stores
            </p>

            <p className="mt-1 text-xs text-white/35">
              {filteredAndSortedStores.length}{" "}
              stores shown
            </p>

          </div>

          <div className="flex flex-col gap-3 sm:flex-row">

            {/* Store */}
            <div className="flex items-center gap-2">

              <label className="text-xs text-white/40">
                Store
              </label>

              <select
                value={storeFilter}
                onChange={(event) =>
                  setStoreFilter(
                    event.target.value
                  )
                }
                className="rounded-xl border border-white/10 bg-black px-3 py-2 text-sm text-white outline-none transition hover:border-white/20"
              >
                <option
                  value="All Stores"
                  className="bg-black"
                >
                  All Stores
                </option>

                {availableStores.map(
                  (store) => (
                    <option
                      key={store}
                      value={store}
                      className="bg-black"
                    >
                      {store}
                    </option>
                  )
                )}

              </select>

            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">

              <label className="text-xs text-white/40">
                Sort by
              </label>

              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(
                    event.target.value
                  )
                }
                className="rounded-xl border border-white/10 bg-black px-3 py-2 text-sm text-white outline-none transition hover:border-white/20"
              >

                <option
                  value="lowest"
                  className="bg-black"
                >
                  Lowest Price
                </option>

                <option
                  value="rating"
                  className="bg-black"
                >
                  Highest Rating
                </option>

                <option
                  value="delivery"
                  className="bg-black"
                >
                  Fastest Delivery
                </option>

              </select>

            </div>

          </div>

        </div>

        {/* Product Grid */}
        {filteredAndSortedStores.length > 0 ? (

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            {filteredAndSortedStores.map(
              (store) => {

                const savings =
                  store.price -
                  lowestPrice;

                const isBestDeal =
                  store.price ===
                  lowestPrice;

                return (
                  <div
                    key={store.id}
                    onClick={() =>
                      router.push(
                        `/product/${store.id}?q=${encodeURIComponent(
                          activeProduct.name
                        )}&country=${encodeURIComponent(
                          selectedCountry
                        )}`
                      )
                    }
                    className={`group cursor-pointer rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
                      isBestDeal
                        ? "border-white/30 bg-white/[0.08] shadow-[0_0_35px_rgba(255,255,255,0.06)]"
                        : "border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.07]"
                    }`}
                  >

                    {/* Image */}
                    <div className="flex h-64 items-center justify-center overflow-hidden rounded-2xl bg-white">

                      <img
                        src={
                          activeProduct.image
                        }
                        alt={
                          activeProduct.name
                        }
                        className="h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                      />

                    </div>

                    {/* Store */}
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-2">

                      <span className="text-sm font-semibold text-white/70">
                        {store.store}
                      </span>

                      <div className="flex items-center gap-2">

                        {isBestDeal && (
                          <span className="rounded-full bg-white px-3 py-1 text-[10px] font-bold tracking-wider text-black">
                            BEST DEAL
                          </span>
                        )}

                        {store.badge && (
                          <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[10px] font-semibold tracking-wider text-white/50">
                            {isBestDeal
                              ? "LOWEST PRICE"
                              : store.badge}
                          </span>
                        )}

                      </div>

                    </div>

                    {/* Product Name */}
                    <h2 className="mt-3 text-xl font-semibold">
                      {activeProduct.name}
                    </h2>

                    {/* Price */}
                    <div className="mt-5 flex items-end justify-between">

                      <div>

                        <p className="text-xs text-white/40">
                          Price
                        </p>

                        <p className="mt-1 text-2xl font-bold">
                          {formatPrice(
                            store.price,
                            selectedCountry
                          )}
                        </p>

                        {isBestDeal ? (
                          <p className="mt-2 text-xs font-medium text-white/60">
                            ✓ Lowest price
                          </p>
                        ) : (
                          <p className="mt-2 text-xs text-white/35">
                            {formatPrice(
                              savings,
                              selectedCountry
                            )}{" "}
                            more than the best deal
                          </p>
                        )}

                      </div>

                      {/* Rating + Delivery */}
                      <div className="text-right">

                        <p className="text-sm">
                          ⭐{" "}
                          {store.rating}
                        </p>

                        <p className="mt-1 text-xs text-white/40">
                          {
                            store.delivery[
                              selectedCountry
                            ]
                          }
                        </p>

                      </div>

                    </div>

                    {/* Comparison */}
                    <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">

                      <p className="text-xs text-white/40">
                        Comparison
                      </p>

                      {isBestDeal ? (
                        <p className="mt-1 text-sm font-semibold text-white/80">
                          ✓ Best price among available stores
                        </p>
                      ) : (
                        <p className="mt-1 text-sm font-semibold text-white/60">
                          +{" "}
                          {formatPrice(
                            savings,
                            selectedCountry
                          )}{" "}
                          vs best deal
                        </p>
                      )}

                    </div>

                    {/* Button */}
                    <button
                      onClick={(event) => {
                        event.stopPropagation();

                        router.push(
                          `/product/${store.id}?q=${encodeURIComponent(
                            activeProduct.name
                          )}&country=${encodeURIComponent(
                            selectedCountry
                          )}`
                        );
                      }}
                      className="mt-6 w-full rounded-xl bg-white py-3 text-sm font-semibold text-black transition hover:bg-white/90"
                    >
                      View details →
                    </button>

                  </div>
                );
              }
            )}

          </div>

        ) : (

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">

            <p className="text-lg font-semibold">
              No stores found
            </p>

            <p className="mt-2 text-sm text-white/40">
              Try selecting All Stores.
            </p>

          </div>

        )}

        {/* Notice */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center">

          <p className="text-xs leading-6 text-white/35">
            Prototype data only. Store
            availability, prices, ratings and
            delivery information are sample
            values. Real store availability and
            product data will be connected through
            legitimate APIs and partner feeds.
          </p>

        </div>

      </section>

    </main>
  );
}