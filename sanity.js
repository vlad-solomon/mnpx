import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
    projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
    dataset: import.meta.env.VITE_SANITY_DATASET,
    useCdn: true,
    apiVersion: import.meta.env.VITE_API_VERSION,
});

export async function getPhotos() {
    const photos = await client.fetch(
        "*[_type == 'photo' && archived == false] | order(date desc){location{lng,lat},image{asset{_ref}},slug{current},tags,date}"
    );
    return photos;
}

const builder = imageUrlBuilder(client);

export function urlFor(source) {
    return builder.image(source);
}
