import React, { useMemo, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import ProductPage from "./ProductPage";
import CartPage from "./CartPage";
import CheckoutPage from "./CheckoutPage";
import SuccessPage from "./SuccessPage";
import ScrollToTop from "./ScrollToTop";

const products = [
  {
    id: 1,
    title: "GHK-CU",
    category: "PEPTIDE",
    price: "110.00 CHF",
    oldPrice: "125.00 CHF",
    badge: "BESTSELLER",
    image: "/GHK-CU.png",
    description:
      "Ein hautverjüngendes Kupfer-Peptid, das die natürliche Regeneration ankurbelt und für sichtbar glattere, festere und gesünder aussehende Haut sorgt.",
    details:
      "Hauptwirkungen von GHK-CU Hautregeneration & Anti-Aging: GHK-Cu strafft die Haut, erhöht die Elastizität, reduziert feine Linien und hellt Pigmentflecken auf. Wundheilung & Narbenreduktion: Es stimuliert Fibroblasten, fördert die Angiogenese (Bildung neuer Blutgefäße) und hemmt die Narbenbildung. Entzündungshemmung & Antioxidativ: Kupferpeptide beruhigen gereizte Haut, reduzieren Rötungen und wirken als Antioxidantien gegen Lichtschäden. Haarwachstum: Es kann die Haarfollikel stimulieren, die Mikrozirkulation der Kopfhaut verbessern und so Haarausfall entgegenwirken.",
    gallery: ["/GHK-CU.png"],
    inStock: true,
  },
  {
    id: 2,
    title: "HGH FRAGMENT 176-191",
    category: "PEPTIDE",
    price: "110.00 CHF",
    oldPrice: "125.00 CHF",
    badge: "BESTSELLER",
    image: "/HGH-FRAG.png",
    description:
      "Ein Peptid, das gezielt den Fettabbau (Lipolyse) unterstützt ohne die typischen Nebenwirkungen des vollständigen Wachstumshormons zu verursachen.",
    details:
      "Hauptwirkungen von HGH Fragment 176-191: Intensiver Fettabbau: Es aktiviert den Abbau von gespeichertem Körperfett, insbesondere in Problemzonen. Hemmung der Fettspeicherung: Es verhindert, dass Nahrungsbestandteile in neues Körperfett umgewandelt werden. Kein Einfluss auf Blutzucker/Wachstum: Da es nur ein Fragment ist, hat es nicht die typischen Nebenwirkungen von HGH wie Insulinresistenz oder gesteigertes Gewebewachstum. Muskelerhalt: Es unterstützt den Erhalt der Muskelmasse während kalorienreduzierter Diäten.",
    gallery: ["/HGH-FRAG.png"],
    inStock: true,
  },
  {
    id: 3,
    title: "RETATRUIDE 10mg",
    category: "PEPTIDE",
    price: "120.00 CHF",
    oldPrice: "130.00 CHF",
    badge: "BESTSELLER",
    image: "/RETA10.png",
    description:
      " Wenn du abnehmen willst bist du hier Richtig. Es reduziert den Appetit, steigert den Energieverbrauch und fördert signifikant die Gewichtsabnahme.",
    details:
      "Hauptwirkungen von Retatrutid: Dreifache Rezeptor-Aktivierung: Retatrutid ahmt die Hormone GLP-1, GIP und Glukagon nach, was zu einer intensiven Stoffwechselregulation führt. Appetitregulation & Sättigung: Die Kombination aus GLP-1 und GIP dämpft den Hunger deutlich stärker und fördert ein früheres Sättigungsgefühl. Erhöhter Kalorienverbrauch: Die Glukagon-Aktivierung kurbelt die Thermogenese an und unterstützt die Fettverbrennung. Blutzuckerkontrolle & Gewichtsabnahme: Es verbessert den HbA1c-Wert und führt in Studien zu einer starken Gewichtsabnahme.",
    gallery: ["/RETA10.png"],
    inStock: true,
  },
  {
    id: 4,
    title: "TIRZEPATIDE 30",
    category: "PEPTIDE",
    price: "160.00 CHF",
    oldPrice: "170.00 CHF",
    badge: "SALE",
    image: "/TIRZE.png",
    description:
      "Willst du Gewicht verlieren? Tirzepatide wirkt auf die Hormone GLP-1 und GIP, senkt dadurch stark den Appetit und verbessert die Insulinwirkung.",
    details:
      "Doppelte Wirkung (GIP & GLP-1): Tirzepatid ahmt die Darmhormone GIP und GLP-1 nach. Blutzuckerkontrolle: Es steigert glukoseabhängig die Insulinsekretion und senkt die Glukagonkonzentration. Gewichtsabnahme: Es hemmt den Appetit und fördert ein schnelleres, längeres Sättigungsgefühl. Körperzusammensetzung: Studien zeigen, dass Tirzepatid den Taillenumfang und die viszerale Fettmasse reduziert.",
    gallery: ["/TIRZE.png"],
    inStock: true,
  },
  {
    id: 5,
    title: "CJC-1295",
    category: "PEPTIDE",
    price: "84.00 CHF",
    oldPrice: "90.00 CHF",
    badge: "SALE",
    image: "/CJC.png",
    description:
      "Erhöhte endogene Wachstumshormon-Ausschüttung, verbesserte Regeneration und Schlafqualität.",
    details:
      "Muskelaufbau: Erhöht den IGF-1-Spiegel und fördert die Muskelprotein-Synthese. Fettverbrennung: Fördert die Lipolyse, besonders an hartnäckigen Stellen. Verbesserte Regeneration: Beschleunigt die Heilung von Muskeln, Sehnen und Bändern. Anti-Aging-Effekte: Kann die Hautqualität verbessern und den Schlaf fördern. Starke Wachstumshormon-Steigerung: Die Wirkung hält aufgrund einer langen Halbwertszeit oft mehrere Tage an.",
    gallery: ["/CJC.png"],
    inStock: true,
  },
  {
    id: 6,
    title: "IPAMORELIN",
    category: "PEPTIDE",
    price: "70.00 CHF",
    oldPrice: "75.00 CHF",
    badge: "SALE",
    image: "/IPA.png",
    description:
      "Ipamorelin steigert gezielt die natürliche Ausschüttung von Wachstumshormon.",
    details:
      "Muskelaufbau & Fettverbrennung: Es wird häufig zur Verbesserung der Körperzusammensetzung eingesetzt. Regeneration & Anti-Aging: Nutzer berichten von einer schnelleren Erholung nach dem Training, besserem Schlaf und positiven Effekten auf Haut und Gelenke. Wirkungsweise: Im Gegensatz zu exogenem HGH regt Ipamorelin den Körper an, seine eigene Produktion zu nutzen. Sicherheit: Es gilt als relativ sicher, da es kaum Einfluss auf Cortisol- oder Prolaktinwerte hat.",
    gallery: ["/IPA.png"],
    inStock: true,
  },
  {
    id: 7,
    title: "THYMOSIN ALPHA",
    category: "PEPTIDE",
    price: "100.00 CHF",
    oldPrice: "109.00 CHF",
    badge: "SALE",
    image: "/THY.png",
    description:
      "Thymosin Alpha-1 stärkt das Immunsystem und verbessert die körpereigene Immunantwort.",
    details:
      "Stärkt angeborene Immunität: Aktiviert dendritische Zellen und NK-Zellen. Fördert Th1-Antwort: Erhöht IFN-γ-Produktion, was besonders bei chronischen Virusinfektionen relevant ist. Schützt Gewebe: Tiermodelle zeigen Zellschutz vor oxidativem Stress in Herz- und Lebergewebe. Fördert Antikörperreifung, weshalb es als Impf-Adjuvans getestet wird.",
    gallery: ["/THY.png"],
    inStock: true,
  },
  {
    id: 8,
    title: "KLOW",
    category: "PEPTIDE",
    price: "170.00 CHF",
    oldPrice: "180.00 CHF",
    badge: "SALE",
    image: "/KLOW.png",
    description:
      "Synthetische Peptid-Mischung aus GHK-Cu, BPC-157, TB-500 und KPV.",
    details:
      "Der Klow Blend Peptide enthält GHK-Cu, BPC-157, TB-500 und KPV und wird zur Regeneration und Entzündungshemmung eingesetzt. Entzündungshemmung: Besonders durch KPV und GHK-Cu. Geweberegeneration: BPC-157 und TB-500 sind für ihre potenzielle Förderung der Heilung bekannt. Haut- und Follikelstimulation: GHK-Cu kann die Kopfhautgesundheit verbessern und Kollagen stimulieren.",
    gallery: ["/KLOW.png"],
    inStock: true,
  },
  {
    id: 9,
    title: "GLOW",
    category: "PEPTIDE",
    price: "125.00 CHF",
    oldPrice: "130.00 CHF",
    badge: "SALE",
    image: "/GLOW.png",
    description:
      "Synthetische Peptid-Mischung zur Geweberegeneration, Hautverjüngung und Heilungsförderung.",
    details:
      "Glow-Peptide zielen darauf ab, die Hautstruktur durch Förderung von Kollagen und Elastin zu verbessern. Verbesserte Hautelastizität & Festigkeit: Peptide aktivieren die Kollagensynthese. Feuchtigkeitszufuhr: Fördert ein pralleres Hautbild. Anti-Aging-Effekt: Reduziert feine Linien und Faltentiefe. Unterstützung der Hautbarriere: Stärkt die Haut gegen äußere Einflüsse. Gelenk- und Gewebegesundheit: Kann positiv auf Sehnen, Bänder und Knorpel wirken.",
    gallery: ["/GLOW.png"],
    inStock: true,
  },
  {
    id: 10,
    title: "AOD-9604",
    category: "PEPTIDE",
    price: "90.00 CHF",
    oldPrice: "99.00 CHF",
    badge: "SALE",
    image: "/AOD.png",
    description:
      "AOD-9604 aktiviert gezielt den Fettstoffwechsel und hemmt die Einlagerung von neuem Fett.",
    details:
      "AOD-9604 ist ein synthetisches Peptidfragment des menschlichen Wachstumshormons. Fettverbrennung: Wird genutzt, um die Fettverbrennung zu steigern. Gewichtsreduktion: Studien deuten darauf hin, dass es bei der Gewichtsabnahme helfen kann. Stoffwechselregulierung: Es soll helfen, den Stoffwechsel zu regulieren. Gelenkgesundheit: Einige Hinweise deuten auf positive Auswirkungen auf die Knorpelreparatur und Gelenkgesundheit hin.",
    gallery: ["/AOD.png"],
    inStock: true,
  },
    {
    id: 11,
    title: "SS-31 10",
    category: "PEPTIDE",
    price: "80.00 CHF",
    oldPrice: "85.00 CHF",
    badge: "SALE",
    image: "/SS.png",
    description:
      "SS-31 bindet an Cardiolipin in der inneren mitochondrialen Membran, verhindert dessen Oxidation und stabilisiert so die Struktur der Mitochondrien.",
    details:
      "Das Peptid SS-31 (auch Elamipretid) wirkt positiv auf die Mitochondrien, indem es deren Energieproduktion verbessert und sie vor oxidativem Stress schützt. Dadurch kann es die Zellfunktion stabilisieren und möglicherweise Ermüdung sowie altersbedingte Schäden reduzieren. Insgesamt wird es vor allem zur Unterstützung von Herz-, Muskel- und Gehirnzellen erforscht.",
    gallery: ["/SS.png"],
    inStock: true,
  },
   {
    id: 12,
    title: "GHRP-2",
    category: "PEPTIDE",
    price: "90.00 CHF",
    oldPrice: "99.00 CHF",
    badge: "SALE",
    image: "/GHRP.png",
    description:
      "GHRP-2 (Growth Hormone Releasing Peptide-2) ist ein synthetisches Peptid, das die Ausschüttung von Wachstumshormon (GH) anregt, indem es die Hypophyse stimuliert.",
    details:
      "Das Peptid GHRP-2 (Growth Hormone Releasing Peptide-2) ist ein synthetisches Peptid, das die Ausschüttung von Wachstumshormon (GH) anregt, indem es die Hypophyse stimuliert. Dadurch kann es Muskelaufbau, Regeneration und Fettabbau unterstützen sowie den Schlaf und die Erholung verbessern. Zusätzlich steigert es oft den Appetit und kann die körpereigene IGF-1-Produktion erhöhen.",
    gallery: ["/GHRP.png"],
    inStock: true,
  },
    {
    id: 13,
    title: "GHRP-6",
    category: "PEPTIDE",
    price: "90.00 CHF",
    oldPrice: "99.00 CHF",
    badge: "SALE",
    image: "/GHRP6.png",
    description:
      "GHRP-6 (Growth Hormone Releasing Peptide-6) ist ein Peptid, das die Freisetzung von Wachstumshormon stark stimuliert. Es kann Muskelaufbau, Fettabbau und Regeneration fördern, wirkt aber besonders deutlich appetitsteigernd.",
    details:
      "Das Peptid GHRP-6 (Growth Hormone Releasing Peptide-6) ist ein Peptid, das die Freisetzung von Wachstumshormon stark stimuliert. Es kann Muskelaufbau, Fettabbau und Regeneration fördern, wirkt aber besonders deutlich appetitsteigernd. Zusätzlich wird es häufig mit verbessertem Schlaf und schnellerer Erholung in Verbindung gebracht.",
    gallery: ["/GHRP6.png"],
    inStock: true,
  },

 {
    id: 14,
    title: "BPC-157",
    category: "PEPTIDE",
    price: "79.00 CHF",
    oldPrice: "85.00 CHF",
    badge: "SALE",
    image: "/BPC.png",
    description:
      "BPC-157 (Body Protection Compound-157) ist ein Peptid, das für seine mögliche heilungsfördernde Wirkung bekannt ist, besonders bei Sehnen, Muskeln und dem Verdauungstrakt.",
    details:
      "BPC-157 (Body Protection Compound-157) ist ein Peptid, das für seine mögliche heilungsfördernde Wirkung bekannt ist, besonders bei Sehnen, Muskeln und dem Verdauungstrakt. Es kann die Geweberegeneration beschleunigen, Entzündungen reduzieren und die Durchblutung verbessern. Deshalb wird es häufig im Kontext von Verletzungen und Magen-Darm-Beschwerden erforscht.",
    gallery: ["/BPC.png"],
    inStock: true,
  },

  {
    id: 15,
    title: "TB-500 10",
    category: "PEPTIDE",
    price: "89.00 CHF",
    oldPrice: "95.00 CHF",
    badge: "SALE",
    image: "/TB500.png",
    description:
      "TB-500 (Thymosin Beta-4) ist ein Peptid, das die Zellmigration und Gewebereparatur fördert, wodurch Heilungsprozesse besonders bei Muskeln, Sehnen und Bändern beschleunigt werden.",
    details:
      "TB-500 (Thymosin Beta-4) ist ein Peptid, das die Zellmigration und Gewebereparatur fördert, wodurch Heilungsprozesse – besonders bei Muskeln, Sehnen und Bändern – beschleunigt werden können. Es kann zudem Entzündungen reduzieren und die Flexibilität des Gewebes verbessern.",
    gallery: ["/TB500.png"],
    inStock: true,
  },

  {
    id: 20,
    title: "TESTOSTERON-ENANTHAT",
    category: "MUSKEL GAIN",
    price: "90.00 CHF",
    image: "/TESTOE.png",
    description:
      "Es steigert die Proteinsynthese, fördert Muskelaufbau, Kraft, Libido und Knochendichte.",
    details:
      "Testosteron Enantat ist ein langwirksames injizierbares Androgen zur Behandlung von Testosteronmangel (TRT). Es steigert die Proteinsynthese, fördert Muskelaufbau, Kraft, Libido und Knochendichte. Die Wirkung tritt schnell ein (innerhalb weniger Tage), erfordert jedoch regelmäßige intramuskuläre Injektionen.",
    gallery: ["/TESTOE.png"],
    inStock: true,
  },
  {
    id: 19,
    title: "TESTOSTERON-PROPIONAT",
    category: "MUSKEL GAIN",
    price: "79.00 CHF",
    image: "/TESTOP.png",
    description:
      "Es steigert die Proteinsynthese, fördert Muskelaufbau, Kraft, Libido und Knochendichte.",
    details:
      "AOD-9604 ist ein synthetisches Peptidfragment des menschlichen Wachstumshormons. Fettverbrennung: Wird genutzt, um die Fettverbrennung zu steigern. Gewichtsreduktion: Studien deuten darauf hin, dass es bei der Gewichtsabnahme helfen kann. Stoffwechselregulierung: Es soll helfen, den Stoffwechsel zu regulieren. Gelenkgesundheit: Einige Hinweise deuten auf positive Auswirkungen auf die Knorpelreparatur und Gelenkgesundheit hin.",
    gallery: ["/TESTOP.png"],
    inStock: true,
  },
  {
    id: 18,
    title: "TESTOSTERON-CYPIONAT",
    category: "MUSKEL GAIN",
    price: "85.00 CHF",
    image: "/TESTOC.png",
    description:
      "Es steigert die Proteinsynthese, fördert Muskelaufbau, Kraft, Libido und Knochendichte.",
    details:
      "AOD-9604 ist ein synthetisches Peptidfragment des menschlichen Wachstumshormons. Fettverbrennung: Wird genutzt, um die Fettverbrennung zu steigern. Gewichtsreduktion: Studien deuten darauf hin, dass es bei der Gewichtsabnahme helfen kann. Stoffwechselregulierung: Es soll helfen, den Stoffwechsel zu regulieren. Gelenkgesundheit: Einige Hinweise deuten auf positive Auswirkungen auf die Knorpelreparatur und Gelenkgesundheit hin.",
    gallery: ["/TESTOC.png"],
    inStock: true,
  },
  {
    id: 17,
    title: "TRENBOLON A",
    category: "MUSKEL GAIN",
    price: "100.00 CHF",
    image: "/TRENA.png",
    description:
      "Trenbolon-Acetat ist ein starkes anaboles Steroid, das Bodybuilder für effektiven Muskelaufbau nutzen.",
    details:
      "Trenbolon ist ein stark wirkendes anaboles Steroid, das im Bodybuilding für extremen Muskelaufbau, Kraftsteigerung und Fettverbrennung genutzt wird. Es wirkt durch starke Bindung an Androgenrezeptoren.",
    gallery: ["/TRENA.png"],
    inStock: true,
  },
  {
    id: 16,
    title: "TRENBOLON E",
    category: "MUSKEL GAIN",
    price: "110.00 CHF",
    image: "/TRENE.png",
    description:
      "Massiver Muskelaufbau: Fördert den Aufbau von Muskelmasse und Kraft.",
    details:
      "Trenbolon ist ein stark wirkendes anaboles Steroid, das im Bodybuilding für extremen Muskelaufbau, Kraftsteigerung und Fettverbrennung genutzt wird. Es wirkt durch starke Bindung an Androgenrezeptoren.",
    gallery: ["/TRENE.png"],
    inStock: true,
  },
  {
    id: 15,
    title: "NANDROLON PP",
    category: "MUSKEL GAIN",
    price: "85.00 CHF",
    image: "/NANDRO.png",
    description:
      "Nandrolon-Phenylpropionat wird von Wettkampfathleten, Bodybuildern und Kraftsportlern genutzt, um Physis und Leistung zu verbessern. Es fördert Muskelwachstum, regt den Appetit an, steigert die Produktion roter Blutkörperchen und verbessert die Knochendichte.",
    details:
      "Nandrolon ist ein anaboles Steroid, das durch seine Bindung an Androgenrezeptoren die Proteinsynthese fördert. Es wird klinisch zur Behandlung von Anämien, Kachexie und bestimmten Formen von Osteoporose eingesetzt, indem es das Wachstum von Muskelmasse und die Knochenmineraldichte erhöht.",
    gallery: ["/NANDRO.png"],
    inStock: true,
  },
  {
    id: 14,
    title: "NANDROLON D",
    category: "MUSKEL GAIN",
    price: "95.00 CHF",
    image: "/NANDROD.png",
    description:
      "Nandrolon-Decanoat ist ein injizierbares anaboles Steroid, das Bodybuilder in 8-12-wöchigen Bulking-Zyklen verwenden, oft in Kombination mit Testosteron. Es gilt als „Klassiker“.",
    details:
      "Nandrolon ist ein anaboles Steroid, das durch seine Bindung an Androgenrezeptoren die Proteinsynthese fördert. Es wird klinisch zur Behandlung von Anämien, Kachexie und bestimmten Formen von Osteoporose eingesetzt, indem es das Wachstum von Muskelmasse und die Knochenmineraldichte erhöht.",
    gallery: ["/NANDROD.png"],
    inStock: true,
  },
  {
    id: 13,
    title: "SUSTANON",
    category: "MUSKEL GAIN",
    price: "95.00 CHF",
    image: "/SUSTA.png",
    description:
      "Sustanon ist eine Mischung aus mehreren Testosteronestern und wird von Athleten aufgrund seiner starken Wirkung bei nur einer Injektion pro Monat sehr geschätzt.",
    details:
      "Sustanon ist ein injizierbares Testosteron-Gemisch aus vier verschiedenen Estern, das eine schnelle und zugleich lang anhaltende Testosteronzufuhr bietet. Es wird medizinisch bei männlichem Hypogonadismus eingesetzt, um Energie, Libido, Stimmung und Muskelmasse zu verbessern.",
    gallery: ["/SUSTA.png"],
    inStock: true,
  },
  {
    id: 12,
    title: "STANOZOLOL",
    category: "MUSKEL GAIN",
    price: "90.00 CHF",
    image: "/STANON.png",
    description:
      "Stanozolol ist bei Bodybuildern sehr beliebt, da es anabole Effekte fördert und Muskelmasse ohne Wassereinlagerungen oder Gewichtszunahme erhält.",
    details:
      "Stanozolol ist ein synthetisches, von Testosteron abgeleitetes anaboles Steroid, das primär den Muskelaufbau fördert, die Kraft steigert und den Appetit anregt. Es wird häufig als Dopingmittel genutzt, da es den Fettabbau unterstützt und die Kollagensynthese erhöht.",
    gallery: ["/STANON.png"],
    inStock: true,
  },
  {
    id: 11,
    title: "DROSTANON P",
    category: "MUSKEL GAIN",
    price: "100.00 CHF",
    badge: "AUSVERKAUFT",
    image: "/DROSTA.png",
    description:
      "Drosta P (Drostanolonpropionat) ist ein stark androgenes, anaboles Steroid mit primär antieostrogenen Eigenschaften.",
    details:
      "Es wirkt stark vermännlichend, fördert den Muskelaufbau, erhöht die Härte und Dichte der Muskeln und wird im Sport häufig in Definitionsphasen verwendet. Aufgrund seiner Eigenschaften wird es im Bodybuilding genutzt, um den Körperfettanteil optisch zu senken und die Muskelmasse härter erscheinen zu lassen.",
    gallery: ["/DROSTA.png"],
    inStock: false,
  },
];
export default function App() {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return products;

    return products.filter((product) => {
      const haystack = [
        product.title,
        product.description,
        product.details,
        product.badge,
        product.category,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [searchTerm]);

  const peptideProducts = filteredProducts.filter(
    (product) => product.category === "PEPTIDE"
  );

  const muscleGainProducts = filteredProducts.filter(
    (product) => product.category === "MUSKEL GAIN"
  );

  const supportProducts = filteredProducts.filter(
    (product) => product.category === "SUPPORT"
  );

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartTotal = cart
    .reduce((sum, item) => sum + item.quantity * parseFloat(item.price), 0)
    .toFixed(2);

  const bestsellers = products.filter((product) => product.badge === "BESTSELLER");

  const addToCart = (product) => {
    if (product.inStock === false) return;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const increaseQty = (productId) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (productId) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  const renderProductCard = (product) => (
    <div className="card" key={product.id}>
      <div className="image-wrap">
        <img
          src={product.image}
          alt={product.title}
          className="card-image"
        />

        {(product.inStock === false || product.badge) && (
          <div
            className={`badge card-badge ${
              product.inStock === false
                ? "badge-out"
                : product.badge === "BESTSELLER"
                ? "badge-bestseller"
                : "badge-default"
            }`}
          >
            {product.inStock === false ? "AUSVERKAUFT" : product.badge}
          </div>
        )}
      </div>

      <div className="card-content">
        <div className="card-meta-row">
          <span className="card-category">{product.category}</span>
        </div>

        <h3>{product.title}</h3>

        <div className="price-row">
          <span className="price">{product.price}</span>
          {product.oldPrice && (
            <span className="old-price">{product.oldPrice}</span>
          )}
        </div>

        <p>{product.description}</p>

        {product.inStock === false && (
          <p className="out-of-stock-text">Nicht verfügbar</p>
        )}

        <div className="card-actions">
          <Link to={`/produkt/${product.id}`}>
            <button className="buy-btn full">Produkt Details</button>
          </Link>

          {product.inStock === false ? (
            <button className="secondary-btn full" disabled>
              Ausverkauft
            </button>
          ) : (
            <button
              className="buy-btn full"
              onClick={() => addToCart(product)}
            >
              In den Warenkorb
              <span className="cart-icon">🛒</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );

return (
  <>
    <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <div className="page">
              <div className="topbar">
                Alle unsere Produkte sind Labor geprüft.
              </div>

              <header className="header">
                <Link to="/" className="brand">
                  <img src="/logo1.png" alt="SwissPharmaLab" className="logo" />
                </Link>
              </header>

              <nav className="nav">
                <a href="#neu" className="nav-link">Neu</a>
                <a href="#peptide" className="nav-link">Peptide</a>
                <a href="#muskel-gain" className="nav-link">Muskel Gain</a>
                <a href="#support" className="nav-link">Support</a>
                <Link to="/warenkorb" className="nav-link cart-link">
                  🛒 Warenkorb ({cartCount})
                </Link>
              </nav>

              <section className="hero-section" id="neu">
                <div className="hero-inner">
                  <div className="hero-badge">
                    Schweizer Qualität • Laborgeprüft • Diskreter Versand
                  </div>

                  <h1 className="hero-title">
                    Premium Performance Produkte
                    <br />
                    mit klarem Fokus auf Qualität
                  </h1>

                  <p className="hero-subtitle">
                    Entdecke ausgewählte Peptide und Performance-Produkte
                    in einem klaren, diskreten und modernen Bestellprozess mit Versand aus der Schweiz
                  </p>

                  <div className="hero-actions">
                    <a href="#peptide" className="hero-btn hero-btn-primary">
                      Bestseller ansehen
                    </a>
                    <Link to="/warenkorb" className="hero-btn hero-btn-secondary">
                      Zum Warenkorb
                    </Link>
                  </div>
                  <div className="card-buttons"></div>

                  <div className="search-bar hero-search">
                    <input
                      type="text"
                      placeholder="Produkte suchen..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </section>
            
        
              {filteredProducts.length === 0 ? (
                <section className="product-section">
                  <h2 className="section-title">SUCHERGEBNIS</h2>
                  <div className="empty-search-box">
                    <h3>Keine Produkte gefunden</h3>
                    <p>
                      Versuche einen anderen Suchbegriff oder prüfe deine Schreibweise.
                    </p>
                  </div>
                </section>
              ) : (
                <>
                  {peptideProducts.length > 0 && (
                    <section className="product-section" id="peptide">
                      <div className="section-heading-wrap">
                        <span className="section-kicker">Kategorie</span>
                        <h2 className="section-title">PEPTIDE</h2>
                      </div>
                      <div className="product-grid">
                        {peptideProducts.map((product) => (
                          <div id={`product-${product.id}`} key={product.id}>
                            {renderProductCard(product)}
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {muscleGainProducts.length > 0 && (
                    <section className="product-section" id="muskel-gain">
                      <div className="section-heading-wrap">
                        <span className="section-kicker">Kategorie</span>
                        <h2 className="section-title">MUSKEL GAIN</h2>
                      </div>
                      <div className="product-grid">
                        {muscleGainProducts.map((product) => (
                          <div id={`product-${product.id}`} key={product.id}>
                            {renderProductCard(product)}
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {supportProducts.length > 0 && (
                    <section className="product-section" id="support">
                      <div className="section-heading-wrap">
                        <span className="section-kicker">Kategorie</span>
                        <h2 className="section-title">SUPPORT</h2>
                      </div>
                      <div className="product-grid">
                        {supportProducts.map((product) => (
                          <div id={`product-${product.id}`} key={product.id}>
                            {renderProductCard(product)}
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </>
              )}
            </div>
          }
        />

        <Route
          path="/produkt/:id"
          element={
            <ProductPage
              products={products}
              addToCart={addToCart}
              cart={cart}
            />
          }
        />

        <Route
          path="/warenkorb"
          element={
            <CartPage
              cart={cart}
              removeFromCart={removeFromCart}
              increaseQty={increaseQty}
              decreaseQty={decreaseQty}
            />
          }
        />

        <Route
          path="/checkout"
          element={<CheckoutPage cart={cart} />}
        />

        <Route
          path="/success"
          element={<SuccessPage />}
        />
      </Routes>

      {isCartOpen && (
        <div className="cart-overlay" onClick={() => setIsCartOpen(false)} />
      )}

      <div className={`cart-drawer ${isCartOpen ? "open" : ""}`}>
        <div className="cart-drawer-content">
          <button className="close-btn" onClick={() => setIsCartOpen(false)}>
            ✕
          </button>

          <h2>Warenkorb</h2>

          {cart.length === 0 ? (
            <div className="cart-drawer-empty">
              <p>Dein Warenkorb ist aktuell leer.</p>
            </div>
          ) : (
            <>
              <div className="cart-drawer-list">
                {cart.map((item) => (
                  <div key={item.id} className="cart-drawer-item">
                    <img src={item.image} alt={item.title} />
                    <div>
                      <p>{item.title}</p>
                      <p>{item.quantity} x {item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-total">
                Gesamt: {cartTotal} CHF
              </div>

              <Link to="/warenkorb">
                <button
                  className="buy-btn full"
                  onClick={() => setIsCartOpen(false)}
                >
                  Zum Warenkorb
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}