export async function allPostsQuery() {
  const response = await fetch(import.meta.env.WORDPRESS_API_URL, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `{
                posts {
                    edges {
                      node {
                        id
                        slug
                        title
                        content
                      }
                    }
                  }
              }
            `,
    }),
  });
  const { data } = await response.json();
  return data.posts.edges;
}

export async function getPostBySlug(slug) {
  const posts = await allPostsQuery();
  return posts.find((post) => post.node.slug === slug);
}
