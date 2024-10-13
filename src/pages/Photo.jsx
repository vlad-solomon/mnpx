import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useData } from "../hooks/useData";
import Map from "../components/Map";
import Controls from "../components/Controls";
import PhotoBig from "../components/PhotoBig";
import { useEffect } from "react";
import { urlFor } from "../../sanity";

export default function Photo() {
    const { slug } = useParams();
    const { data, isLoading } = useData();

    if (isLoading) {
        return "loading...";
    }

    const photo = data.find((item) => item.slug.current === slug);
    const prevPhoto = data.find(
        (_, index, arr) => arr[index - 1]?.slug.current === slug
    );
    const nextPhoto = data.find(
        (_, index, arr) => arr[index + 1]?.slug.current === slug
    );

    return (
        <div className="flex flex-col max-w-[550px] m-auto h-[100dvh] justify-center">
            <Controls next={nextPhoto} prev={prevPhoto} />
            <PhotoBig src={photo.image.asset._ref} alt={slug} />
        </div>
    );
}
