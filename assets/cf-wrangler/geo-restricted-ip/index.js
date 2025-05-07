export default {
  async fetch(request) {
    const country = request.cf?.country || "XX";
    const allowed = ["DK", "NO"];
    const url = new URL(request.url);

    // DEBUG: ?debug
    if (url.searchParams.has("debug")) {
      const msg = `🌍 Country: ${country}\n✅ Allowed: ${allowed.includes(country)}\n➡️ Path: ${url.pathname}`;
      return new Response(msg, { status: 200, headers: { "Content-Type": "text/plain" } });
    }

    // Block countries not in list
    if (!allowed.includes(country)) {
      return new Response("<h1>403 – Adgang nægtet</h1><p>Kun DK og NO IP'er er tilladt.</p>", {
        status: 403,
        headers: { "Content-Type": "text/html" }
      });
    }

    // Proxy til GitHub Pages
    const githubOrigin = `https://eo-le.github.io/GD8${url.pathname}${url.search}`;
    const response = await fetch(githubOrigin);

    return new Response(response.body, response);
  }
}
