import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async ({ request, redirect, next }) => {
    console.log('Middleware onRequest');
    const url = new URL(request.url);

    // Rutas que requieren autenticación
    const protectedRoutes = ['/admin', '/admin/', '/profile', '/profile/', '/blog/edit', '/blog/new'];   

    // Verificar si la ruta actual necesita autenticación
    const requiresAuth = protectedRoutes.some(route => url.pathname.startsWith(route));

    console.log(url.pathname);
    if (requiresAuth) {
        const cookies = request.headers.get('cookie');   
        const hasToken = cookies?.includes('token='); 

        if (!hasToken) {
            console.log('Redirect to login' + url.pathname);
            return redirect(`/auth/login?returnUrl=${encodeURIComponent(url.pathname)}`);
        }
    }
    // Permite que la solicitud continúe
    return new Response(null, { status: 200 });
 
});
