import Stripe from "stripe";

export async function onRequestPost({ request, env }) {
  try {
    if (!env.STRIPE_SECRET_KEY) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "STRIPE_SECRET_KEY fehlt",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const body = await request.json();

    const {
      orderNumber,
      date,
      cart,
      form,
    } = body;

    if (
      !orderNumber ||
      !Array.isArray(cart) ||
      cart.length === 0
    ) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Bestelldaten fehlen",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const stripe = new Stripe(env.STRIPE_SECRET_KEY);

    const lineItems = cart.map((item) => {
      const price = Number(
        String(item.price)
          .replace(" CHF", "")
          .replace(",", ".")
      );

      return {
        price_data: {
          currency: "chf",
          product_data: {
            name: item.title,
          },
          unit_amount: Math.round(price * 100),
        },
        quantity: item.quantity,
      };
    });

    const baseUrl = new URL(request.url).origin;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      line_items: lineItems,

      customer_email: form?.email || undefined,

      metadata: {
        orderNumber: String(orderNumber),
        date: String(date || ""),
      },

    success_url:
  `${baseUrl}/bestellung-erfolgreich?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url:
        `${baseUrl}/stripe-test-cancel`,
    });

    return new Response(
      JSON.stringify({
        success: true,
        url: session.url,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Stripe Fehler:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Stripe-Fehler",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}