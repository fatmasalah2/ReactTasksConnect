// دالة تجيب بيانات الـ directories من API أو JSON
export async function getDirectories() {
  // هنا ممكن تغير اللينك للـ API الفعلي
  const res = await fetch("/api/directories");
  if (!res.ok) throw new Error("Failed to fetch directories");
  return await res.json();
}
