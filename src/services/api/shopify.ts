/**
 * Shopify API Service
 * 
 * Client for Shopify Storefront API.
 */

import { getEnv } from '@/config/env';
import { Logger } from '@/shared/lib/logger';

const logger = Logger.createLogger('ShopifyApi');

interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: {
        url: string;
      };
    }>;
  };
}

interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
  lines: {
    edges: Array<{
      node: {
        id: string;
        quantity: number;
        merchandise: {
          product: ShopifyProduct;
        };
      };
    }>;
  };
}

class ShopifyClient {
  private storefrontUrl: string;
  private accessToken: string;

  constructor() {
    const env = getEnv();
    this.storefrontUrl = `https://${env.SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`;
    this.accessToken = env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  }

  private async query<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
    try {
      const response = await fetch(this.storefrontUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': this.accessToken,
        },
        body: JSON.stringify({ query, variables }),
      });

      const result = await response.json();

      if (result.errors) {
        logger.error('Shopify GraphQL errors', result.errors);
        throw new Error(result.errors[0]?.message || 'Shopify query failed');
      }

      return result.data;
    } catch (error) {
      logger.error('Shopify request failed', error);
      throw error;
    }
  }

  async getProducts(first: number = 10): Promise<ShopifyProduct[]> {
    const query = `
      query getProducts($first: Int!) {
        products(first: $first) {
          edges {
            node {
              id
              title
              description
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 1) {
                edges {
                  node {
                    url
                  }
                }
              }
            }
          }
        }
      }
    `;

    const data = await this.query<{
      products: { edges: Array<{ node: ShopifyProduct }> };
    }>(query, { first });

    return data.products.edges.map((edge) => edge.node);
  }

  async createCart(): Promise<ShopifyCart> {
    const query = `
      mutation cartCreate {
        cartCreate {
          cart {
            id
            checkoutUrl
            totalQuantity
            cost {
              totalAmount {
                amount
                currencyCode
              }
            }
            lines(first: 100) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      product {
                        id
                        title
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const data = await this.query<{ cartCreate: { cart: ShopifyCart } }>(query);
    return data.cartCreate.cart;
  }

  async addToCart(
    cartId: string,
    variantId: string,
    quantity: number = 1
  ): Promise<ShopifyCart> {
    const query = `
      mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            id
            checkoutUrl
            totalQuantity
            cost {
              totalAmount {
                amount
                currencyCode
              }
            }
            lines(first: 100) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      product {
                        id
                        title
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const data = await this.query<{ cartLinesAdd: { cart: ShopifyCart } }>(query, {
      cartId,
      lines: [{ merchandiseId: variantId, quantity }],
    });

    return data.cartLinesAdd.cart;
  }
}

export const shopifyClient = new ShopifyClient();
export default shopifyClient;

