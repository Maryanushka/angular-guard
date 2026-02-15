import groq from 'groq';

export const getProductsQuery = groq`*[_type == "product" && (!defined($category) || $category == "" || (defined(tag) && $category in tag))] | order(_createdAt desc)[$offset...$end]{
  "_slug": slug.current,
  title,
  description,
  "cover": metaImage.asset->{url, "width": metadata.dimensions.width, "height": metadata.dimensions.height},
  "categories": coalesce(categories[]->{"_slug": slug.current, title}, []),
  tag,
  price
}`;

export const getProductCountQuery = groq`count(*[_type == "product" && (!defined($category) || $category == "" || (defined(tag) && $category in tag))])`;

export const getSingleProductQuery = groq`*[_type == "product" && slug.current == $slug][0]{
  "_slug": slug.current,
  title,
  "description": pt::text(description),
  price,
  "cover": select(defined(metaImage.asset) => [metaImage.asset->{url, "width": metadata.dimensions.width, "height": metadata.dimensions.height}], []),
  "categories": coalesce(categories[]->{"_slug": slug.current, title}, []),
  "content": [{"body": pt::text(description)}],
  "seo": select(defined(seo) => {
    "title": seo.metaTitle,
    "description": seo.metaDescription,
    "social_media_image": seo.metaImage.asset->{url, "width": metadata.dimensions.width, "height": metadata.dimensions.height}
  }, null),
  "tabs": coalesce(sections[_type == "productTabs"][0].tabs[] { label, "content": pt::text(content) }, []),
  "video": select(defined(sections[_type == "youtube"][0].youtube_id) => {
    "embedUrl": "https://www.youtube.com/embed/" + sections[_type == "youtube"][0].youtube_id,
    "posterUrl": "https://img.youtube.com/vi/" + sections[_type == "youtube"][0].youtube_id + "/hqdefault.jpg"
  }, null)
}`;

export const getCategoriesQuery = groq`*[_type == "categories"][0].category_list[]{
  title,
  tag
}`;
