self.fallback=async a=>{let{destination:e,url:c}=a,n={document:"/~offline",image:"/fallback.webp",audio:"/fallback.mp3",video:"/fallback.mp4",font:"/fallback-font.woff2"}[e];return n?caches.match(n,{ignoreSearch:!0}):""===e&&c.match(/\/_next\/data\/.+\/.+\.json$/i)?caches.match("/_next/data/_Jo0fKvPuISVHwn0_1kjA/_next/data/fallback.json",{ignoreSearch:!0}):Response.error()};