export type MapLocation = { label: string | null; address: string; url: string };

export function mapsSearchUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/**
 * Tách một chuỗi địa chỉ có thể chứa nhiều cơ sở thành từng điểm riêng trên bản đồ.
 * VD: "Cơ sở 1: Đường A, Thị Nghè; Cơ sở 2: Đường B, Tân Bình - TP.HCM"
 *   → [{label:"Cơ sở 1", address:"Đường A, Thị Nghè"}, {label:"Cơ sở 2", address:"Đường B, Tân Bình - TP.HCM"}]
 * Phần tỉnh/thành ghi chung ở cuối (sau " - ") được thêm vào từng địa chỉ khi tìm trên Google Maps.
 */
export function parseLocations(raw: string | null | undefined): MapLocation[] {
  if (!raw?.trim()) return [];
  const parts = raw
    .split(/;|\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => {
      const m = p.match(/^(cơ sở\s*\d+|cs\s*\d+)\s*[:\-–]\s*(.+)$/i);
      return m ? { label: m[1].replace(/^cs/i, "Cơ sở"), address: m[2].trim() } : { label: null, address: p };
    });

  const tail = parts.length > 1 ? parts[parts.length - 1].address.split(/\s+-\s+/) : [];
  const sharedCity = tail.length > 1 ? tail[tail.length - 1].trim() : null;

  return parts.map(({ label, address }) => {
    const hasCity = sharedCity && address.toLowerCase().includes(sharedCity.toLowerCase());
    const query = sharedCity && !hasCity ? `${address}, ${sharedCity}` : address.replace(/\s+-\s+/g, ", ");
    return { label, address, url: mapsSearchUrl(query) };
  });
}

/** Địa chỉ ngắn gọn cho thẻ: 1 cơ sở → nguyên địa chỉ; nhiều cơ sở → "2 cơ sở: Thị Nghè · Tân Bình". */
export function shortAddress(raw: string | null | undefined): string | undefined {
  const locations = parseLocations(raw);
  if (locations.length > 1) {
    return `${locations.length} cơ sở: ${locations
      .map((l) => l.address.split(/\s+-\s+/)[0].split(",").pop()!.trim())
      .join(" · ")}`;
  }
  return locations[0]?.address;
}
