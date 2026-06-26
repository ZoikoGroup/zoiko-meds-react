import { SavedControls, SavedCreate, SavedHero, SavedManage, SavedSearch, SavedWork } from "@/components/saved-searches";


export default function SavedSearchesPage() {
    return (
        <main>
            <SavedHero />
            <SavedSearch />
            <SavedWork />
            <SavedManage />
            <SavedControls />
            <SavedCreate />
        </main>
    )
}