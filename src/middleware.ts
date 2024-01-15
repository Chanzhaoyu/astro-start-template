import { errors, jwtVerify } from "jose";
import { defineMiddleware } from "astro/middleware";
import { TOKEN, PUBLIC_ROUTES, SECRET } from "./constants";

const verifyAuth = async (token?: string) => {
  if (!token) {
    return {
      status: "unauthorized",
      msg: "please pass a request token",
    };
  }

  try {
    const jwtVerifyResult = await jwtVerify(token, SECRET);
    return {
      status: "authorized",
      payload: jwtVerifyResult.payload,
      msg: "successfully verified auth token",
    };
  } catch (err) {
    if (err instanceof errors.JOSEError) {
      return { status: "error", msg: err.message };
    }
    return { status: "error", msg: "could not validate auth token" };
  }
};

export const onRequest = defineMiddleware(async (context, next) => {
  const token = context.cookies.get(TOKEN)?.value;
  const validationResult = await verifyAuth(token);

  context.locals.auth = validationResult.status === "authorized";

  if (PUBLIC_ROUTES.includes(context.url.pathname)) {
    return next();
  }

  switch (validationResult.status) {
    case "authorized":
      return next();

    case "error":
    case "unauthorized":
      if (context.url.pathname.startsWith("/api/")) {
        return new Response(
          JSON.stringify({
            message: validationResult.msg,
          }),
          {
            status: 401,
          }
        );
      }
      return Response.redirect(new URL("/", context.url));

    default:
      return Response.redirect(new URL("/", context.url));
  }
});
