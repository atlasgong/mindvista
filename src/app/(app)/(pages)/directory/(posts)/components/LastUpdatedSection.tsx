export default function LastUpdatedSection({ updatedAt }: { updatedAt: string }) {
    const date = new Date(updatedAt);
    const formattedDate = date.toISOString().split("T")[0];

    return (
        <div className="mt-6 flex justify-center text-cTextOffset">
            <p>Last updated: {formattedDate}</p>
        </div>
    );
}
