import { SearchBuilt, SearchByName, SearchFollowup, SearchHero, SearchPreview } from "@/components/searchmed";

export default function SearchMedicinePage() {
    return (
        <main>
            <SearchHero />
            <SearchByName />
            <SearchPreview />
            <SearchFollowup />
            <SearchBuilt />
        </main>
    )
}