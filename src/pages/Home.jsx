import { useData } from "../hooks/useData";
import Grid from "../components/Grid";
import Header from "../components/Header";

export default function Home() {
    const { data, isLoading } = useData();

    if (isLoading) return;

    return (
        <>
            <Header />
            <Grid data={data} />
        </>
    );
}
