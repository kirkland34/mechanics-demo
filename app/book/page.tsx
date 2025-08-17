export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

import BookClient from "./BookClient";

export default function Page() {
  return <BookClient />;
}
