export async function getDirectories() {
  const res = await fetch("/api/directories");
  if (!res.ok) throw new Error("Failed to fetch directories");
  return await res.json();
}
