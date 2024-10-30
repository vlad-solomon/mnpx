import { useData } from "../hooks/useData";
import Grid from "../components/Grid";

export default function Home() {
    const { data, isLoading } = useData();

    if (isLoading) return;

    return <Grid data={data} />;
}
