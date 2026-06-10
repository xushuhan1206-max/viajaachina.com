export default async function handler(request, response) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const mapResponse = await fetch("https://geojson.cn/api/china/100000.json", {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        "User-Agent": "viajaachina-map-proxy/1.0",
      },
    });

    if (!mapResponse.ok) {
      return response.status(mapResponse.status).json({
        error: "Unable to fetch China GeoJSON",
      });
    }

    const geojson = await mapResponse.json();
    response.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate=604800");
    return response.status(200).json(geojson);
  } catch (error) {
    return response.status(502).json({
      error: error instanceof Error ? error.message : "China map proxy failed",
    });
  } finally {
    clearTimeout(timeout);
  }
}
