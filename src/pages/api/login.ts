import type { APIRoute } from "astro";
import { nanoid } from "nanoid";
import { SignJWT } from "jose";
import { SECRET, TOKEN } from "../../constants";

export const POST: APIRoute = async (ctx) => {
  try {
    const token = await new SignJWT({})
      .setProtectedHeader({ alg: "HS256" })
      .setJti(nanoid())
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(SECRET);

    // set cookies
    ctx.cookies.set(TOKEN, token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 2, // 2 hours in seconds
    });

    return new Response(
      JSON.stringify({
        message: "You're logged in!",
      }),
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error(err);

    return new Response(
      JSON.stringify({
        message: "Something went wrong.",
      }),
      {
        status: 500,
      }
    );
  }
};
