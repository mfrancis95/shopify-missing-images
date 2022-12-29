async function main() {
    const response = await fetch(`https://${SHOPIFY_HOST}/admin/api/2022-10/graphql.json`, {
        body: JSON.stringify({
            query: `mutation {
                bulkOperationRunQuery(
                    query: """
                    {
                        products {
                            edges {
                                node {
                                    id
                                    images {
                                        edges {
                                            node {
                                                id
                                            }
                                        }
                                    }
                                    variants {
                                        edges {
                                            node {
                                                id
                                                sku
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    """
                )
                {
                    bulkOperation {
                        id
                        status
                    }
                    userErrors {
                        field
                        message
                    }
                }
            }`
        }),
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN
        },
        method: 'POST'
    });
    return response.json();
}