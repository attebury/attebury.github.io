export default {
  layout: "post.njk",
  tags: "posts",
  eleventyComputed: {
    permalink(data) {
      const date = new Date(data.date);
      const slug = data.page.fileSlug;
      const y = date.getUTCFullYear();
      const m = String(date.getUTCMonth() + 1).padStart(2, "0");
      const d = String(date.getUTCDate()).padStart(2, "0");
      return `/${y}/${m}/${d}/${slug}/`;
    },
  },
};
