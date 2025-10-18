import { Suspense } from "react";
import ConfirmationClient from "./ConfirmationClient";

// keep this dynamic (avoids static export issues with search params)
export const dynamic = "force-dynamic";

export default function ConfirmationPage() {
  return (
    <main>
      <Suspense fallback={<div className="p-6">Loading confirmation…</div>}>
        <ConfirmationClient />
      </Suspense>
    </main>
  );
}
