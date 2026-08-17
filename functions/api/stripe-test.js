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
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const body = await request.json();

    const { orderNumber, date, cart, form, total } = body;

    if (!orderNumber || !Array.isArray(cart) || cart.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Bestelldaten fehlen",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const stripe = new Stripe(env.STRIPE_SECRET_KEY);

const finalTotal = Number(total);

if (!Number.isFinite(finalTotal) || finalTotal <= 0) {
  return new Response(
    JSON.stringify({
      success: false,
      error: "Ungültiger Endbetrag",
    }),
    {
      status: 400,
      headers: { "Content-Type": "application/json" },
    }
  );
}

const lineItems = [
  {
    price_data: {
      currency: "chf",
      product_data: {
        name: `Bestellung ${orderNumber}`,
      },
      unit_amount: Math.round(finalTotal * 100),
    },
    quantity: 1,
  },
];

    const baseUrl = new URL(request.url).origin;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      line_items: lineItems,

      customer_email: form?.email || undefined,

      metadata: {
        orderNumber: String(orderNumber),
        date: String(date || ""),

        firstName: String(form?.firstName || ""),
        lastName: String(form?.lastName || ""),
        country: String(form?.country || ""),
        street: String(form?.street || ""),
        addressExtra: String(form?.addressExtra || ""),
        city: String(form?.city || ""),
        zip: String(form?.zip || ""),
        email: String(form?.email || ""),
        phone: String(form?.phone || ""),
        notes: String(form?.notes || ""),
      },

      success_url:
        `${baseUrl}/bestellung-erfolgreich?session_id={CHECKOUT_SESSION_ID}`,

   cancel_url:
  `${baseUrl}/checkout`,
    });

    return new Response(
      JSON.stringify({
        success: true,
        url: session.url,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
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
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}