import type { APIRoute } from "astro";
import { TOKEN } from "../../constants";

export const POST: APIRoute = async (ctx) => {
  try {
    ctx.cookies.set(TOKEN, "", {
      httpOnly: true,
      path: "/",
      maxAge: 0,
    });

    return new Response(
      JSON.stringify({
        message: "Your're logged out!",
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);

    return new Response(
      JSON.stringify({
        message: "Logout failed",
      }),
      {
        status: 500,
      }
    );
  }
};
