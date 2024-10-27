import React, { useEffect } from "react";

// Declare ShopifyBuy as a global property on the window object
declare global {
  interface Window {
    ShopifyBuy: any;
    shopifyClient: any;
  }
}

type PurchaseButtonProps = {
  selectedSize: string;
};

const PurchaseButton: React.FC<PurchaseButtonProps> = ({ selectedSize }) => {
  useEffect(() => {
    const scriptURL =
      "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";

    function loadShopifyBuySDK() {
      if (!document.getElementById("shopify-buy-button-script")) {
        const script = document.createElement("script");
        script.id = "shopify-buy-button-script";
        script.async = true;
        script.src = scriptURL;
        document.head.appendChild(script);
        script.onload = initializeShopifyClient;
      } else if (window.ShopifyBuy) {
        initializeShopifyClient();
      }
    }

    function initializeShopifyClient() {
      if (!window.ShopifyBuy) return;
      window.shopifyClient = window.ShopifyBuy.buildClient({
        domain: "n1h6w2-ma.myshopify.com",
        storefrontAccessToken: "65777bee16917189b12cbcf23a5fac63",
      });
    }

    loadShopifyBuySDK();
  }, []);

  const addToCart = async () => {
    if (!window.ShopifyBuy || !window.shopifyClient) {
      console.error("ShopifyBuy client not initialized");
      return;
    }

    try {
      const productId = "14778825179296";
      const formattedId = btoa(`gid://shopify/Product/${productId}`);
      const product = await window.shopifyClient.product.fetch(formattedId);

      if (product) {
        // Find the variant that matches the selected size
        const selectedVariant = product.variants.find(
          (variant: any) => variant.title === selectedSize
        );

        if (!selectedVariant) {
          console.error("Selected size variant not found");
          return;
        }

        const lineItems = [{ variantId: selectedVariant.id, quantity: 1 }];

        const checkout = await window.shopifyClient.checkout.create();
        await window.shopifyClient.checkout.addLineItems(
          checkout.id,
          lineItems
        );

        // Redirect to the Shopify checkout page
        window.location.href = checkout.webUrl;
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <button
      onClick={addToCart}
      className="bg-highlight text-button text-black w-80 h-14 font-bold"
      style={{
        backgroundColor: "#FFFF01",
        fontFamily: "Work Sans, sans-serif",
      }}
    >
      PRE ORDER
    </button>
  );
};

export default PurchaseButton;
