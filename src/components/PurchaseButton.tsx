import React, { useEffect } from "react";

// Declare ShopifyBuy as a global property on the window object
declare global {
  interface Window {
    ShopifyBuy: any;
  }
}

const PurchaseButton: React.FC = () => {
  useEffect(() => {
    const scriptURL =
      "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";

    // Load the script only if it hasn't been loaded already
    function loadScript() {
      if (!document.getElementById("shopify-buy-button-script")) {
        const script = document.createElement("script");
        script.id = "shopify-buy-button-script";
        script.async = true;
        script.src = scriptURL;
        document.head.appendChild(script);
        script.onload = ShopifyBuyInit;
      } else {
        ShopifyBuyInit();
      }
    }

    // Initialize Shopify Buy Button
    function ShopifyBuyInit() {
      if (window.ShopifyBuy) {
        const client = window.ShopifyBuy.buildClient({
          domain: "n1h6w2-ma.myshopify.com",
          storefrontAccessToken: "65777bee16917189b12cbcf23a5fac63",
        });

        // Clear any existing component to prevent duplication
        const productComponent = document.getElementById(
          "product-component-1730069069545"
        );
        if (productComponent) {
          productComponent.innerHTML = "";
        }

        window.ShopifyBuy.UI.onReady(client).then((ui: any) => {
          ui.createComponent("product", {
            id: "14778825179296", // Replace with your actual product ID
            node: document.getElementById("product-component-1730069069545"),
            moneyFormat: "%24%7B%7Bamount%7D%7D",
            options: {
              product: {
                contents: {
                  img: false, // Hide product image
                  title: false, // Hide product title
                  price: false, // Hide product price
                  description: false, // Hide product description
                  button: true, // Only show the purchase button
                },
                styles: {
                  button: {
                    color: "#000000",
                    ":hover": {
                      color: "#000000",
                      backgroundColor: "#e4e600",
                    },
                    backgroundColor: "#fdff00",
                    ":focus": {
                      backgroundColor: "#e4e600",
                    },
                    borderRadius: "0px",
                  },
                },
                text: {
                  button: "PRE ORDER", // Customize the button text
                },
              },
              cart: {
                styles: {
                  button: {
                    color: "#000000",
                    ":hover": {
                      color: "#000000",
                      backgroundColor: "#e4e600",
                    },
                    backgroundColor: "#fdff00",
                    ":focus": {
                      backgroundColor: "#e4e600",
                    },
                    borderRadius: "0px",
                  },
                },
                text: {
                  total: "Subtotal",
                  button: "Checkout",
                },
              },
            },
          });
        });
      }
    }

    // Check if ShopifyBuy is already loaded, else load it
    if (window.ShopifyBuy) {
      if (window.ShopifyBuy.UI) {
        ShopifyBuyInit();
      } else {
        loadScript();
      }
    } else {
      loadScript();
    }
  }, []);

  return (
    <div
      id="product-component-1730069069545"
      className="purchase-button-container"
    >
      {/* Only the PURCHASE NOW button will be injected here */}
    </div>
  );
};

export default PurchaseButton;
