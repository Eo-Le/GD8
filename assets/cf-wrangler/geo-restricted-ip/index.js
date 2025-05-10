/*
Only allow request from Dk and No.
Fetch content from the public https://eo-le.github.io/GD8 gh page
and serve it thrugh cloud flare.

wrangler commands
wrangler deploy : For at udgive wrangler metoden
wrangler login: For at logge på cf
wrangler secret: For at oprette secret
wrangler whoami: For at se hvem som er logget på
*/

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


	
	// Strip leading /GD8 if present
	let path = url.pathname;
	if (path.startsWith("/GD8")) {
	  path = path.replace("/GD8", "");
	}

	// Proxy til GitHub Pages
	const githubOrigin = `https://eo-le.github.io/GD8${path}${url.search}`;

    
	//const response = await fetch(githubOrigin); //response returnerer ikke assets korrekt og dermed ingen css
	
	const response = await fetch(githubOrigin, {
	  method: request.method,
	  headers: request.headers,
	  body: request.body,
	  redirect: "follow"
	});
	
// return new Response(response.body, response); // risiko for at overføre hele response objektet inkl. uønskede headers.
	
	const modifiedHeaders = new Headers(response.headers);
	modifiedHeaders.set("X-Proxy-By", "Cloudflare Worker");

	return new Response(response.body, {
	  status: response.status,
	  statusText: response.statusText,
	  headers: modifiedHeaders
	});
  }
}
