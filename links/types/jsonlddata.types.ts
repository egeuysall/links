type JsonLdContext = "https://schema.org";
// AI GENERATED
// should check
interface JsonLdBase {
  "@context": JsonLdContext;
  "@type": string;
}


interface Organization extends JsonLdBase {
  "@type": "Organization";
  name: string;
  url?: string;
  logo?: string;
  sameAs?: string[];
}

interface Product extends JsonLdBase {
  "@type": "Product";
  name: string;
  image?: string;
  description?: string;
  brand?: { "@type": "Brand"; name: string };
  sku?: string;
  offers?: Offer;
}

interface Offer extends JsonLdBase {
  "@type": "Offer";
  price: string;
  priceCurrency: string;
  availability?: string;
}

interface Article extends JsonLdBase {
  "@type": "Article";
  headline: string;
  author: { "@type": "Person"; name: string };
  datePublished: string;
  publisher?: {
    "@type": "Organization";
    name: string;
    logo?: { "@type": "ImageObject"; url: string };
  };
}

interface Event extends JsonLdBase {
  "@type": "Event";
  name: string;
  startDate: string;
  location: {
    "@type": "Place";
    name: string;
    address: string;
  };
}


export type ProductSchema = {
  "@context": string;
  "@type": "Product";
  name: string;
  image: string;
  description: string;
  url: string;
  offers: {
    "@type": "Offer";
    price: string;
    priceCurrency: string;
    availability: string;
    url: string;
    priceValidUntil: string;
    shippingDetails: {
      "@type": "OfferShippingDetails";
      shippingRate: {
        "@type": "MonetaryAmount";
        value: string;
        currency: string;
      };
      deliveryTime: {
        "@type": "ShippingDeliveryTime";
        handlingTime: {
          "@type": "QuantitativeValue";
          minValue: string;
          maxValue: string;
          unitCode: string;
        };
      };
      shippingDestination: {
        "@type": "DefinedRegion";
        addressCountry: string;
      };
    };
  };
  aggregateRating: {
    "@type": "AggregateRating";
    ratingValue: string;
    reviewCount: string;
  };
  merchantReturnPolicy: {
    "@type": "MerchantReturnPolicy";
    returnPolicyCategory: string;
    merchantReturnDays: number;
    returnMethod: string;
    returnFees: string;
  };
  creator: {
    "@type": "Person";
    name: string;
    jobTitle: string;
    worksFor: {
      "@type": "Organization";
      name: string;
    };
  };
  sameAs: string[];
  dateModified: string;
};


type JsonLdData = Organization | Product | Offer | Article | Event;
