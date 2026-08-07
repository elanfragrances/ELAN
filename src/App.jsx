import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";
import {
  ShoppingBag, X, Plus, Minus, Instagram, Send, Sparkles, Check, ChevronRight,
  Crown, Menu, Truck, Gift, ShieldCheck, Quote, Wand2, ArrowRight, ArrowLeft, Percent,
  Snowflake, Sun, Cookie, Wind, Flame, Heart, Star
} from "lucide-react";

/* ---------------------------------------------------------
   ÉLAN — warm beige luxury tokens
--------------------------------------------------------- */
const C = {
  bg: "#F6EFE2",
  surface: "#FBF6EC",
  line: "#E2D5B8",
  ink: "#241809",
  inkHi: "#3A2712",
  text: "#3B2A1C",
  muted: "#8C7A61",
  gold: "#9C7A3C",
  goldHi: "#B99048",
  wood: "#4A3221",
};

// Hinweis: "No. XX" sind frei gewählte Platzhalter-Codes, kein festes System —
// beim echten Rollout einfach durch eure tatsächliche Nummerierung ersetzen.
const FAMILIES = ["Würzig", "Honig & Gourmand", "Holzig", "Blumig", "Frisch & Zitrus", "Orientalisch", "Leder"];
const OCCASIONS = ["Sommer", "Winter", "Allrounder", "Date Night", "Büro & Alltag"];
const GENDERS = ["Damen", "Herren", "Unisex"];
const SIZES = [30, 50, 100];
const PRICE = { 30: 25, 50: 35, 100: 45 };

const PRODUCTS = [{"id":1,"code":"No. 001","insp":"riecht wie: Granatapfel","note":"fruchtigfrisch","gender":"Unisex","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":2,"code":"No. 002","insp":"riecht wie: of Dubai","note":"holzig-würzig","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":3,"code":"No. 003","insp":"riecht wie: Colonia Oud","note":"würzig-holzig","gender":"Herren","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":4,"code":"No. 004","insp":"riecht wie: Blu Mediterraneo Fico di Amalfi","note":"frisch-zitrisch","gender":"Unisex","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":5,"code":"No. 005","insp":"riecht wie: Blu Mediterraneo - Mandorlo di Sicilia","note":"süß-gourmandig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":6,"code":"No. 006","insp":"riecht wie: Reflection Man","note":"süß-blumig","gender":"Herren","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":7,"code":"No. 007","insp":"riecht wie: Ishq","note":"süß-fruchtig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":8,"code":"No. 008","insp":"riecht wie: Salam","note":"süßblumig","gender":"Unisex","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":9,"code":"No. 009","insp":"riecht wie: Acqua di Giò","note":"frisch-aquatisch","gender":"Herren","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":10,"code":"No. 010","insp":"riecht wie: Acqua di Giò Profumo","note":"frisch-aquatisch","gender":"Herren","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":11,"code":"No. 011","insp":"riecht wie: Armani Code","note":"würzig-süß","gender":"Herren","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":12,"code":"No. 012","insp":"riecht wie: Stronger With You","note":"würzig-süß","gender":"Herren","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":13,"code":"No. 013","insp":"riecht wie: Stronger With You Intensely","note":"süß-gourmandig","gender":"Herren","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":14,"code":"No. 014","insp":"riecht wie: Stronger With You Tobacco","note":"würzig-süß","gender":"Herren","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":15,"code":"No. 015","insp":"riecht wie: Oud Save The King","note":"süß-holzig","gender":"Herren","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":16,"code":"No. 016","insp":"riecht wie: Tulipe Noire","note":"blumig-würzig","gender":"Unisex","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":17,"code":"No. 017","insp":"riecht wie: Gris Charnel","note":"würzig-cremig","gender":"Unisex","family":"Würzig","occasion":"Büro & Alltag","bestseller":false},{"id":18,"code":"No. 018","insp":"riecht wie: Pas Ce Soir","note":"fruchtig-süß","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":19,"code":"No. 019","insp":"riecht wie: Pas Ce Soir Extrait","note":"fruchtig-süß","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":20,"code":"No. 020","insp":"riecht wie: Dirty Heaven","note":"süß-würzig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":21,"code":"No. 021","insp":"riecht wie: Man In Black","note":"würzig-holzig","gender":"Herren","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":22,"code":"No. 022","insp":"riecht wie: Bal d'Afrique","note":"blumigfruchtig","gender":"Unisex","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":23,"code":"No. 023","insp":"riecht wie: Chronic Rouge Extreme","note":"süß-fruchtig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":24,"code":"No. 024","insp":"riecht wie: Mula Mula","note":"süß-fruchtig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":25,"code":"No. 025","insp":"riecht wie: Allure Homme","note":"würzig-holzig","gender":"Herren","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":26,"code":"No. 026","insp":"riecht wie: Allure Homme Sport","note":"frisch-zitrisch","gender":"Herren","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":27,"code":"No. 027","insp":"riecht wie: Bleu de Chanel","note":"frisch-holzig","gender":"Herren","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":28,"code":"No. 028","insp":"riecht wie: Égoïste","note":"würzig-holzig","gender":"Herren","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":29,"code":"No. 029","insp":"riecht wie: Milk +","note":"süß-cremig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":30,"code":"No. 030","insp":"riecht wie: Blonde Amber","note":"süß-würzig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":31,"code":"No. 031","insp":"riecht wie: No. 1 for Men","note":"blumig-pudrig","gender":"Herren","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":32,"code":"No. 032","insp":"riecht wie: Aventus","note":"frisch-fruchtig","gender":"Herren","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":true},{"id":33,"code":"No. 033","insp":"riecht wie: Aventus Zitrus","note":"zitrisch-fruchtig","gender":"Herren","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":true},{"id":34,"code":"No. 034","insp":"riecht wie: Aventus Absolu","note":"fruchtig-zitrisch","gender":"Herren","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":true},{"id":35,"code":"No. 035","insp":"riecht wie: Centaurus","note":"würzig-süß","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":36,"code":"No. 036","insp":"riecht wie: Delphinus","note":"süß-cremig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":37,"code":"No. 037","insp":"riecht wie: Silver Mountain Water","note":"frisch-zitrisch","gender":"Unisex","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":38,"code":"No. 038","insp":"riecht wie: Virgin Island Water","note":"frisch-zitrisch","gender":"Unisex","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":39,"code":"No. 039","insp":"riecht wie: Viking","note":"würzig-frisch","gender":"Herren","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":40,"code":"No. 040","insp":"riecht wie: Amber Nuit","note":"würzig-holzig","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":41,"code":"No. 041","insp":"riecht wie: Bois d'Argent","note":"pudrig-holzig","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":42,"code":"No. 042","insp":"riecht wie: Élixir Précieux - Ambre","note":"orientalisch-würzig","gender":"Unisex","family":"Orientalisch","occasion":"Winter","bestseller":false},{"id":43,"code":"No. 043","insp":"riecht wie: Fahrenheit","note":"würzig-ledrig","gender":"Herren","family":"Leder","occasion":"Winter","bestseller":false},{"id":44,"code":"No. 044","insp":"riecht wie: Homme","note":"holzig-frisch","gender":"Herren","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":45,"code":"No. 045","insp":"riecht wie: Homme Intense","note":"pudrig-süß","gender":"Herren","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":46,"code":"No. 046","insp":"riecht wie: Homme Sport","note":"frisch-zitrisch","gender":"Herren","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":47,"code":"No. 047","insp":"riecht wie: Sauvage","note":"würzigfrisch","gender":"Herren","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":true},{"id":48,"code":"No. 048","insp":"riecht wie: Sauvage Elixir","note":"würzig-holzig","gender":"Herren","family":"Holzig","occasion":"Allrounder","bestseller":true},{"id":49,"code":"No. 049","insp":"riecht wie: The One for Men","note":"süß-würzig","gender":"Herren","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":50,"code":"No. 050","insp":"riecht wie: Bodylotion","note":"cremig-pudrig","gender":"Unisex","family":"Würzig","occasion":"Büro & Alltag","bestseller":false},{"id":51,"code":"No. 051","insp":"riecht wie: Cloud of Caramel","note":"gourmandig-süß","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":52,"code":"No. 052","insp":"riecht wie: Raspberry Lemon Whoopie Pie","note":"fruchtig-gourmand","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":53,"code":"No. 053","insp":"riecht wie: Tres Leches","note":"gourmandig-süß","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":54,"code":"No. 054","insp":"riecht wie: Vanilla Lemon Gelato","note":"zitrisch-süß","gender":"Unisex","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":55,"code":"No. 055","insp":"riecht wie: J'Ose","note":"Süß-holzig","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":56,"code":"No. 056","insp":"riecht wie: Escentric 02","note":"frisch-holzig","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":57,"code":"No. 057","insp":"riecht wie: Blue Talisman","note":"frisch-fruchtig","gender":"Unisex","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":58,"code":"No. 058","insp":"riecht wie: Fleur Narcotique","note":"blumig-fruchtig","gender":"Unisex","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":59,"code":"No. 059","insp":"riecht wie: Cocaïne","note":"würzig-blumig","gender":"Unisex","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":60,"code":"No. 060","insp":"riecht wie: Sugar","note":"süß-gourmandig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":61,"code":"No. 061","insp":"riecht wie: Bianco Latte","note":"süß-gourmand","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":62,"code":"No. 062","insp":"riecht wie: Ambassador","note":"süßfruchtig","gender":"Herren","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":63,"code":"No. 063","insp":"riecht wie: Titanium","note":"süß-würzig","gender":"Herren","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":64,"code":"No. 064","insp":"riecht wie: Gentleman","note":"süß-pudrig","gender":"Herren","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":65,"code":"No. 065","insp":"riecht wie: Gentleman Society","note":"süß-pudrig","gender":"Herren","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":66,"code":"No. 066","insp":"riecht wie: Pi","note":"süß-orientalisch","gender":"Herren","family":"Orientalisch","occasion":"Winter","bestseller":false},{"id":67,"code":"No. 067","insp":"riecht wie: Guilty","note":"holzig-blumig","gender":"Herren","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":68,"code":"No. 068","insp":"riecht wie: Angélique Noire","note":"süß-blumig","gender":"Unisex","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":69,"code":"No. 069","insp":"riecht wie: Cuir Béluga","note":"süß-pudrig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":70,"code":"No. 070","insp":"riecht wie: L'Homme Idéal","note":"süß-gourmandig","gender":"Herren","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":71,"code":"No. 071","insp":"riecht wie: Spiritueuse Double Vanille","note":"gourmandig-süß","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":72,"code":"No. 072","insp":"riecht wie: Ambre Narguilé","note":"süß-gourmandig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":73,"code":"No. 073","insp":"riecht wie: Terre d'Hermès","note":"holzig-erdig","gender":"Herren","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":74,"code":"No. 074","insp":"riecht wie: Bottled","note":"frisch-fruchtig","gender":"Herren","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":75,"code":"No. 075","insp":"riecht wie: Bottled Elixir","note":"holzig-würzig","gender":"Herren","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":76,"code":"No. 076","insp":"riecht wie: The Scent","note":"würzig-süß","gender":"Herren","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":77,"code":"No. 077","insp":"riecht wie: Absolute Aphrodisiac","note":"süß-gourmandig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":78,"code":"No. 078","insp":"riecht wie: Musk Therapy","note":"cremig-frisch","gender":"Unisex","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":79,"code":"No. 079","insp":"riecht wie: Narcotic Delight","note":"süß-würzig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":80,"code":"No. 080","insp":"riecht wie: Oud for Greatness","note":"würzig-holzig","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":81,"code":"No. 081","insp":"riecht wie: Oud for Greatness Neo","note":"würzig-orientalisch","gender":"Unisex","family":"Orientalisch","occasion":"Winter","bestseller":false},{"id":82,"code":"No. 082","insp":"riecht wie: Rehab","note":"süß-würzig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":83,"code":"No. 083","insp":"riecht wie: Side Effect","note":"süß-würzig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":84,"code":"No. 084","insp":"riecht wie: L'Eau d'Issey pour Homme Intense","note":"würzig-zitrisch","gender":"Herren","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":85,"code":"No. 085","insp":"riecht wie: Gaultier 2","note":"süß-orientalisch","gender":"Unisex","family":"Orientalisch","occasion":"Winter","bestseller":false},{"id":86,"code":"No. 086","insp":"riecht wie: Le Beau Paradise Garden","note":"süß-frisch","gender":"Herren","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":87,"code":"No. 087","insp":"riecht wie: Le Mâle","note":"süß-orientalisch","gender":"Herren","family":"Orientalisch","occasion":"Winter","bestseller":false},{"id":88,"code":"No. 088","insp":"riecht wie: Le Mâle Elixir","note":"süß-gourmandig","gender":"Herren","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":89,"code":"No. 089","insp":"riecht wie: Ultra Mâle","note":"süß-fruchtig","gender":"Herren","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":90,"code":"No. 090","insp":"riecht wie: Scandal pour Homme","note":"süß-synthetisch","gender":"Herren","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":91,"code":"No. 091","insp":"riecht wie: Oud & Bergamot","note":"holzig-zitrisch","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":92,"code":"No. 092","insp":"riecht wie: Wood Sage & Sea Salt","note":"frisch-holzig","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":93,"code":"No. 093","insp":"riecht wie: Homme","note":"süß-orientalisch","gender":"Herren","family":"Orientalisch","occasion":"Winter","bestseller":false},{"id":94,"code":"No. 094","insp":"riecht wie: Nightflight","note":"frisch-zitrisch","gender":"Herren","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":95,"code":"No. 095","insp":"riecht wie: Pistachio Gelato","note":"süß-cremig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":96,"code":"No. 096","insp":"riecht wie: Oudgasm Vanilla Oud","note":"süß-würzig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":97,"code":"No. 097","insp":"riecht wie: Vanilla Candy","note":"süß-gourmand","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":98,"code":"No. 098","insp":"riecht wie: Apple Brandy on the Rocks","note":"süß-fruchtig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":99,"code":"No. 099","insp":"riecht wie: Angels' Share","note":"süß-gourmandig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":true},{"id":100,"code":"No. 100","insp":"riecht wie: Back to Black Aphrodisiac","note":"süß-gourmandig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":101,"code":"No. 101","insp":"riecht wie: Black Phantom","note":"süß-gourmandig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":102,"code":"No. 102","insp":"riecht wie: Intoxicated","note":"süß-würzig","gender":"Herren","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":103,"code":"No. 103","insp":"riecht wie: Love Don't Be Shy","note":"süß-gourmandig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":104,"code":"No. 104","insp":"riecht wie: Old Fashioned","note":"süß-würzig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":105,"code":"No. 105","insp":"riecht wie: Vodka on the Rocks","note":"würzig-frisch","gender":"Unisex","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":106,"code":"No. 106","insp":"riecht wie: Tonkade","note":"süß-würzig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":107,"code":"No. 107","insp":"riecht wie: Õud Bouquet","note":"süß-orientalisch","gender":"Unisex","family":"Orientalisch","occasion":"Winter","bestseller":false},{"id":108,"code":"No. 108","insp":"riecht wie: Santal 33","note":"holzig-würzig","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":109,"code":"No. 109","insp":"riecht wie: No 7 Sekushi","note":"fruchtig-süß","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":110,"code":"No. 110","insp":"riecht wie: Blanche Bête","note":"cremig-süß","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":111,"code":"No. 111","insp":"riecht wie: Van Py Rhum","note":"süß-gourmand","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":112,"code":"No. 112","insp":"riecht wie: Teint de Neige","note":"pudrigblumig","gender":"Unisex","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":113,"code":"No. 113","insp":"riecht wie: Afternoon Swim","note":"frisch-zitrisch","gender":"Unisex","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":114,"code":"No. 114","insp":"riecht wie: Imagination","note":"frisch-zitrisch","gender":"Herren","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":115,"code":"No. 115","insp":"riecht wie: Les Sables Roses","note":"blumig-holzig","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":116,"code":"No. 116","insp":"riecht wie: L'immensité","note":"frisch-zitrisch","gender":"Herren","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":117,"code":"No. 117","insp":"riecht wie: LV Lovers","note":"holzig-grün","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":118,"code":"No. 118","insp":"riecht wie: Météore","note":"frisch-zitrisch","gender":"Herren","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":119,"code":"No. 119","insp":"riecht wie: Nuit de Feu","note":"ledrig-rauchig","gender":"Unisex","family":"Leder","occasion":"Winter","bestseller":false},{"id":120,"code":"No. 120","insp":"riecht wie: On The Beach","note":"frisch-zitrisch","gender":"Unisex","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":121,"code":"No. 121","insp":"riecht wie: Ombre Nomade","note":"holzig-rauchig","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":122,"code":"No. 122","insp":"riecht wie: Pacific Chill","note":"fruchtig-frisch","gender":"Unisex","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":123,"code":"No. 123","insp":"riecht wie: Sur la Route","note":"frisch-zitrisch","gender":"Herren","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":124,"code":"No. 124","insp":"riecht wie: Stellar Times","note":"süß-cremig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":125,"code":"No. 125","insp":"riecht wie: Symphony","note":"frisch-zitrisch","gender":"Unisex","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":126,"code":"No. 126","insp":"riecht wie: Baccarat Rouge 540","note":"süß-holzig","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":true},{"id":127,"code":"No. 127","insp":"riecht wie: Baccarat Rouge 540 Extr.","note":"süß-blumig","gender":"Unisex","family":"Blumig","occasion":"Büro & Alltag","bestseller":true},{"id":128,"code":"No. 128","insp":"riecht wie: Grand Soir","note":"süß-harzig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":129,"code":"No. 129","insp":"riecht wie: Oud Satin Mood","note":"süßblumig","gender":"Unisex","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":130,"code":"No. 130","insp":"riecht wie: Hibiscus MahaJad","note":"blumig-süß","gender":"Unisex","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":131,"code":"No. 131","insp":"riecht wie: Oud Maracuja","note":"fruchtig-ledrig","gender":"Unisex","family":"Leder","occasion":"Winter","bestseller":false},{"id":132,"code":"No. 132","insp":"riecht wie: Escapade Gourmande","note":"gourmand-süß","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":133,"code":"No. 133","insp":"riecht wie: Gold Noir","note":"würzig-süß","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":134,"code":"No. 134","insp":"riecht wie: Black Vanilla","note":"süß-blumig","gender":"Unisex","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":135,"code":"No. 135","insp":"riecht wie: Cedrat Boise","note":"holzig-fruchtig","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":136,"code":"No. 136","insp":"riecht wie: Coco Vanilla","note":"süß-fruchtig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":137,"code":"No. 137","insp":"riecht wie: Hindukush","note":"würzig-holzig","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":138,"code":"No. 138","insp":"riecht wie: Instant Crush","note":"süß-blumig","gender":"Unisex","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":139,"code":"No. 139","insp":"riecht wie: Red Tobacco","note":"süß-würzig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":140,"code":"No. 140","insp":"riecht wie: Tonka Cola","note":"süß-würzig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":141,"code":"No. 141","insp":"riecht wie: Ganymede","note":"würzig-holzig","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":142,"code":"No. 142","insp":"riecht wie: Orange Flamingo","note":"frisch-blumig","gender":"Unisex","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":143,"code":"No. 143","insp":"riecht wie: Private Garden","note":"frisch-süß","gender":"Unisex","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":144,"code":"No. 144","insp":"riecht wie: Vanilla Powder","note":"süß-cremig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":145,"code":"No. 145","insp":"riecht wie: African Leather","note":"würzig-ledrig","gender":"Unisex","family":"Leder","occasion":"Winter","bestseller":false},{"id":146,"code":"No. 146","insp":"riecht wie: Arabians Tonka","note":"süß-orientalisch","gender":"Unisex","family":"Orientalisch","occasion":"Winter","bestseller":false},{"id":147,"code":"No. 147","insp":"riecht wie: Blue Amber","note":"würzig-orientalisch","gender":"Unisex","family":"Orientalisch","occasion":"Winter","bestseller":false},{"id":148,"code":"No. 148","insp":"riecht wie: Dark Vanilla","note":"ledrig-orientalisch","gender":"Unisex","family":"Leder","occasion":"Winter","bestseller":false},{"id":149,"code":"No. 149","insp":"riecht wie: Honey Aoud","note":"süß-orientalisch","gender":"Unisex","family":"Orientalisch","occasion":"Winter","bestseller":false},{"id":150,"code":"No. 150","insp":"riecht wie: Intense Cafe","note":"süß-gourmandig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":151,"code":"No. 151","insp":"riecht wie: Intense Pepper","note":"würzig-holzig","gender":"Herren","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":152,"code":"No. 152","insp":"riecht wie: Infinity","note":"süß-fruchtig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":153,"code":"No. 153","insp":"riecht wie: Mukhallat","note":"süß-synthetisch","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":154,"code":"No. 154","insp":"riecht wie: Roses Musk","note":"süß-blumig","gender":"Unisex","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":155,"code":"No. 155","insp":"riecht wie: Sweet Vanilla","note":"süß-gourmandig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":156,"code":"No. 156","insp":"riecht wie: White Musk","note":"pudrig-blumig","gender":"Unisex","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":157,"code":"No. 157","insp":"riecht wie: Dubai Turath","note":"orientalisch-fruchtig","gender":"Unisex","family":"Orientalisch","occasion":"Winter","bestseller":false},{"id":158,"code":"No. 158","insp":"riecht wie: For Him Bleu Noir Parfum","note":"pudrig-süß","gender":"Herren","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":159,"code":"No. 159","insp":"riecht wie: Black Afgano","note":"würzig-holzig","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":160,"code":"No. 160","insp":"riecht wie: Ani","note":"süß-würzig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":161,"code":"No. 161","insp":"riecht wie: Hacivat","note":"frischfruchtig","gender":"Herren","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":162,"code":"No. 162","insp":"riecht wie: Nefs","note":"süß-würzig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":163,"code":"No. 163","insp":"riecht wie: Papilefiko","note":"würzig","gender":"Unisex","family":"Würzig","occasion":"Büro & Alltag","bestseller":false},{"id":164,"code":"No. 164","insp":"riecht wie: Tero","note":"süß-würzig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":165,"code":"No. 165","insp":"riecht wie: Wulong Cha","note":"frisch-zitrisch","gender":"Unisex","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":166,"code":"No. 166","insp":"riecht wie: Sun","note":"cremigblumig","gender":"Unisex","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":167,"code":"No. 167","insp":"riecht wie: Megamare","note":"würzig-aquatisch","gender":"Unisex","family":"Würzig","occasion":"Büro & Alltag","bestseller":false},{"id":168,"code":"No. 168","insp":"riecht wie: 1 Million","note":"süß-würzig","gender":"Herren","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":169,"code":"No. 169","insp":"riecht wie: 1 Million Elixir","note":"süßfruchtig","gender":"Herren","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":170,"code":"No. 170","insp":"riecht wie: 1 Million Privé","note":"süß-würzig","gender":"Herren","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":171,"code":"No. 171","insp":"riecht wie: Invictus","note":"süß-synthetisch","gender":"Herren","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":172,"code":"No. 172","insp":"riecht wie: Phantom","note":"süß-synthetisch","gender":"Herren","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":173,"code":"No. 173","insp":"riecht wie: Althair","note":"süß-gourmandig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":174,"code":"No. 174","insp":"riecht wie: Carlisle","note":"süß-würzig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":175,"code":"No. 175","insp":"riecht wie: Greenley","note":"frisch-grün","gender":"Unisex","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":176,"code":"No. 176","insp":"riecht wie: Herod","note":"süß-würzig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":177,"code":"No. 177","insp":"riecht wie: Layton","note":"süß-würzig","gender":"Herren","family":"Honig & Gourmand","occasion":"Date Night","bestseller":true},{"id":178,"code":"No. 178","insp":"riecht wie: Oajan","note":"süß-gourmandig","gender":"Herren","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":179,"code":"No. 179","insp":"riecht wie: Pegasus","note":"süß-würzig","gender":"Herren","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":180,"code":"No. 180","insp":"riecht wie: Percival","note":"würzig-frisch","gender":"Herren","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":181,"code":"No. 181","insp":"riecht wie: The Tragedy of Lord George","note":"würzig-holzig","gender":"Herren","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":182,"code":"No. 182","insp":"riecht wie: The World According To Arthur","note":"süß-würzig","gender":"Herren","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":183,"code":"No. 183","insp":"riecht wie: L'Homme","note":"frisch-pudrig","gender":"Herren","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":184,"code":"No. 184","insp":"riecht wie: L'Homme intense","note":"süß-pudrig","gender":"Herren","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":185,"code":"No. 185","insp":"riecht wie: Luna Rossa","note":"frisch-würzig","gender":"Herren","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":186,"code":"No. 186","insp":"riecht wie: Acqua e Zucchero","note":"süß-gourmandig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":187,"code":"No. 187","insp":"riecht wie: Acqua e Sale","note":"aquatisch-frisch","gender":"Unisex","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":188,"code":"No. 188","insp":"riecht wie: Soul of Oud","note":"holzig-würzig","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":189,"code":"No. 189","insp":"riecht wie: Amber Aoud","note":"holzig-orientalisch","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":190,"code":"No. 190","insp":"riecht wie: Elysium pour Homme","note":"frisch-zitrisch","gender":"Herren","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":191,"code":"No. 191","insp":"riecht wie: Oligarch","note":"würzig-zitrisch","gender":"Herren","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":192,"code":"No. 192","insp":"riecht wie: Isola Blu","note":"frisch-zitrisch","gender":"Unisex","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":193,"code":"No. 193","insp":"riecht wie: Bergamot, Tea Leaf, Scandal Wood","note":"zitrisch-frisch","gender":"Unisex","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":194,"code":"No. 194","insp":"riecht wie: Leisure in Paradise","note":"süß-fruchtig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":195,"code":"No. 195","insp":"riecht wie: Malibu - Party in the Bay","note":"zietrischfrisch","gender":"Unisex","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":196,"code":"No. 196","insp":"riecht wie: Mandorla di Noto","note":"süß-gourmandig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":197,"code":"No. 197","insp":"riecht wie: Vicebomb","note":"süß-fruchtig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":198,"code":"No. 198","insp":"riecht wie: Shaghaf Oud","note":"süß-orientalisch","gender":"Unisex","family":"Orientalisch","occasion":"Winter","bestseller":false},{"id":199,"code":"No. 199","insp":"riecht wie: Shaghaf Oud Tonka","note":"süß-gourmandig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":200,"code":"No. 200","insp":"riecht wie: Al Contrario","note":"gourmand-süß","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":201,"code":"No. 201","insp":"riecht wie: Casanova","note":"würzig-blumig","gender":"Unisex","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":202,"code":"No. 202","insp":"riecht wie: Cassiopea","note":"fruchtig-blumig","gender":"Unisex","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":203,"code":"No. 203","insp":"riecht wie: Dionisio","note":"süß-holzig","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":204,"code":"No. 204","insp":"riecht wie: Kirkè","note":"süß-fruchtig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":205,"code":"No. 205","insp":"riecht wie: Kuma","note":"fruchtig-blumig","gender":"Unisex","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":206,"code":"No. 206","insp":"riecht wie: Rosso Pomei","note":"fruchtig-zitrisch","gender":"Unisex","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":207,"code":"No. 207","insp":"riecht wie: Azure Lime","note":"frisch-zitrisch","gender":"Unisex","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":208,"code":"No. 208","insp":"riecht wie: Bitter Peach","note":"süß-fruchtig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":209,"code":"No. 209","insp":"riecht wie: Black Lacquer","note":"rauchig-würzig","gender":"Unisex","family":"Würzig","occasion":"Büro & Alltag","bestseller":false},{"id":210,"code":"No. 210","insp":"riecht wie: Black Orchid","note":"blumig-orientalisch","gender":"Unisex","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":211,"code":"No. 211","insp":"riecht wie: Cherry Smoke","note":"fruchtig-rauchig","gender":"Unisex","family":"Würzig","occasion":"Büro & Alltag","bestseller":false},{"id":212,"code":"No. 212","insp":"riecht wie: Costa Azzurra","note":"frisch-zitrisch","gender":"Unisex","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":213,"code":"No. 213","insp":"riecht wie: Electric Cherry","note":"fruchtig-süß","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":214,"code":"No. 214","insp":"riecht wie: Fucking Fabulous","note":"süß-würzig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":215,"code":"No. 215","insp":"riecht wie: Lost Cherry","note":"süß-fruchtig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":true},{"id":216,"code":"No. 216","insp":"riecht wie: Mandarino di Amalfi","note":"frisch-zitrisch","gender":"Unisex","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":217,"code":"No. 217","insp":"riecht wie: Neroli Portofino","note":"frisch-zitrisch","gender":"Unisex","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":218,"code":"No. 218","insp":"riecht wie: Noir","note":"würzig-orientalisch","gender":"Herren","family":"Orientalisch","occasion":"Winter","bestseller":false},{"id":219,"code":"No. 219","insp":"riecht wie: Noir de Noir","note":"würzig-blumig","gender":"Unisex","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":220,"code":"No. 220","insp":"riecht wie: Noir Extreme","note":"süß-gourmandig","gender":"Herren","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":221,"code":"No. 221","insp":"riecht wie: Oud Wood","note":"würzig-holzig","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":222,"code":"No. 222","insp":"riecht wie: Ombré Leather (2018)","note":"ledrig-würzig","gender":"Unisex","family":"Leder","occasion":"Winter","bestseller":false},{"id":223,"code":"No. 223","insp":"riecht wie: Soleil Blanc","note":"süß-cremig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":224,"code":"No. 224","insp":"riecht wie: Tuscan Leather","note":"rauchig-ledrig","gender":"Unisex","family":"Leder","occasion":"Winter","bestseller":false},{"id":225,"code":"No. 225","insp":"riecht wie: Tobacco Vanille","note":"süß-würzig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":226,"code":"No. 226","insp":"riecht wie: Vanilla Sex","note":"süß-cremig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":227,"code":"No. 227","insp":"riecht wie: Bois Doré","note":"süß-holzig","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":228,"code":"No. 228","insp":"riecht wie: Valentino Uomo Born In Roma","note":"süß-synthetisch","gender":"Herren","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":229,"code":"No. 229","insp":"riecht wie: Valentino Uomo","note":"süß-orientalisch","gender":"Herren","family":"Orientalisch","occasion":"Winter","bestseller":false},{"id":230,"code":"No. 230","insp":"riecht wie: Valentino Uomo Intense","note":"pudrig-ledrig","gender":"Herren","family":"Leder","occasion":"Winter","bestseller":false},{"id":231,"code":"No. 231","insp":"riecht wie: Eros","note":"süßfrisch","gender":"Herren","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":232,"code":"No. 232","insp":"riecht wie: Eros Flame","note":"süß-würzig","gender":"Herren","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":233,"code":"No. 233","insp":"riecht wie: Spicebomb","note":"süß-würzig","gender":"Herren","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":234,"code":"No. 234","insp":"riecht wie: Spicebomb Extreme","note":"süß-würzig","gender":"Herren","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":235,"code":"No. 235","insp":"riecht wie: Faces of Francis","note":"süß-orientalisch","gender":"Unisex","family":"Orientalisch","occasion":"Winter","bestseller":false},{"id":236,"code":"No. 236","insp":"riecht wie: / AJ Arabia London","note":"ledrigfruchtig","gender":"Unisex","family":"Leder","occasion":"Winter","bestseller":false},{"id":237,"code":"No. 237","insp":"riecht wie: 40 Knots","note":"würzig-holzig","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":238,"code":"No. 238","insp":"riecht wie: Accento","note":"blumig-fruchtig","gender":"Unisex","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":239,"code":"No. 239","insp":"riecht wie: Alexandria II","note":"holzig-orientalisch","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":240,"code":"No. 240","insp":"riecht wie: Cruz del Sur II","note":"süß-fruchtig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":241,"code":"No. 241","insp":"riecht wie: Erba Pura","note":"süß-fruchtig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":242,"code":"No. 242","insp":"riecht wie: Erba Gold","note":"süß-fruchtig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":243,"code":"No. 243","insp":"riecht wie: Erba Pura Magica","note":"süß-fruchtg","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":244,"code":"No. 244","insp":"riecht wie: Gran Ballo","note":"blumig-süß","gender":"Unisex","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":245,"code":"No. 245","insp":"riecht wie: Italica","note":"süß-gourmandig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":246,"code":"No. 246","insp":"riecht wie: La Capitale","note":"süß-fruchtig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":247,"code":"No. 247","insp":"riecht wie: Lira","note":"süß-gourmandig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":248,"code":"No. 248","insp":"riecht wie: Mefisto","note":"frisch-zitrisch","gender":"Herren","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":249,"code":"No. 249","insp":"riecht wie: More Than Words","note":"holzig-orientalisch","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":250,"code":"No. 250","insp":"riecht wie: MV Agusta","note":"ledrig-würzig","gender":"Unisex","family":"Leder","occasion":"Winter","bestseller":false},{"id":251,"code":"No. 251","insp":"riecht wie: Naxos","note":"süß-würzig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":252,"code":"No. 252","insp":"riecht wie: Opera","note":"würzig-blumig","gender":"Unisex","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":253,"code":"No. 253","insp":"riecht wie: Purple Accento","note":"fruchtig-blumig","gender":"Unisex","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":254,"code":"No. 254","insp":"riecht wie: Renaissance","note":"zitrischfrisch","gender":"Unisex","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":255,"code":"No. 255","insp":"riecht wie: Richwood","note":"holzig-würzig","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":256,"code":"No. 256","insp":"riecht wie: Starlight","note":"würzig-süß","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":257,"code":"No. 257","insp":"riecht wie: Torino 21","note":"frisch-zitrisch","gender":"Unisex","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":258,"code":"No. 258","insp":"riecht wie: Tony Iommi","note":"süß-würzig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":259,"code":"No. 259","insp":"riecht wie: Uden","note":"frisch-zitrisch","gender":"Unisex","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":260,"code":"No. 260","insp":"riecht wie: Vibrato","note":"zitrisch-frisch","gender":"Unisex","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":261,"code":"No. 261","insp":"riecht wie: White on White","note":"cremig-süß","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":262,"code":"No. 262","insp":"riecht wie: XXY","note":"fruchtig-würzig","gender":"Unisex","family":"Würzig","occasion":"Büro & Alltag","bestseller":false},{"id":263,"code":"No. 263","insp":"riecht wie: Zafar","note":"holzig-rauchig","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":264,"code":"No. 264","insp":"riecht wie: Babycat","note":"süß-rauchig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":265,"code":"No. 265","insp":"riecht wie: Bleu Électrique","note":"würzig-süß","gender":"Herren","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":266,"code":"No. 266","insp":"riecht wie: Kouros","note":"süß-würzig","gender":"Herren","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":267,"code":"No. 267","insp":"riecht wie: La Nuit de L'Homme","note":"süß-würzig","gender":"Herren","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":268,"code":"No. 268","insp":"riecht wie: Myslf","note":"synthetischfrisch","gender":"Herren","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":269,"code":"No. 269","insp":"riecht wie: Tuxedo","note":"würzig-holzig","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":270,"code":"No. 270","insp":"riecht wie: The Muse","note":"frisch-synthetisch","gender":"Unisex","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":271,"code":"No. 271","insp":"riecht wie: Black Pepper & Amber, Neroli","note":"orientalisch-würzig","gender":"Unisex","family":"Orientalisch","occasion":"Winter","bestseller":false},{"id":272,"code":"No. 272","insp":"riecht wie: Code","note":"süß-blumig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":273,"code":"No. 273","insp":"riecht wie: My Way","note":"süß-blumig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":274,"code":"No. 274","insp":"riecht wie: Si","note":"süß-fruchtig","gender":"Damen","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":275,"code":"No. 275","insp":"riecht wie: Sì Passione","note":"blumigfruchtig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":276,"code":"No. 276","insp":"riecht wie: Rouge Smoking","note":"süß-fruchtig","gender":"Damen","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":277,"code":"No. 277","insp":"riecht wie: Goddess","note":"süß-gourmandig","gender":"Damen","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":278,"code":"No. 278","insp":"riecht wie: Jasmin Noir","note":"blumig-holzig","gender":"Damen","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":279,"code":"No. 279","insp":"riecht wie: Omnia","note":"würzig-orientalisch","gender":"Damen","family":"Orientalisch","occasion":"Winter","bestseller":false},{"id":280,"code":"No. 280","insp":"riecht wie: Omnia Crystalline","note":"frisch-blumig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":281,"code":"No. 281","insp":"riecht wie: Herrera Good Girl","note":"süß-blumig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":282,"code":"No. 282","insp":"riecht wie: Herrera Good Girl Blush","note":"blumig-süß","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":283,"code":"No. 283","insp":"riecht wie: Allure","note":"blumig-pudrig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":284,"code":"No. 284","insp":"riecht wie: Chance","note":"frischblumig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":285,"code":"No. 285","insp":"riecht wie: Chance Eau Tendre","note":"frischblumig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":286,"code":"No. 286","insp":"riecht wie: Chance Eau Fraîche","note":"frisch-zitrisch","gender":"Damen","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":287,"code":"No. 287","insp":"riecht wie: Coco","note":"würzig-orientalisch","gender":"Damen","family":"Orientalisch","occasion":"Winter","bestseller":false},{"id":288,"code":"No. 288","insp":"riecht wie: Coco Mademoiselle","note":"süß-blumig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":289,"code":"No. 289","insp":"riecht wie: N°5","note":"blumig-pudrig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":290,"code":"No. 290","insp":"riecht wie: Chloè","note":"würzig-blumig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":291,"code":"No. 291","insp":"riecht wie: Addict","note":"süß-blumig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":292,"code":"No. 292","insp":"riecht wie: Blooming Bouquet","note":"blumigfrisch","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":293,"code":"No. 293","insp":"riecht wie: Hypnotic Poison","note":"süß-gourmandig","gender":"Damen","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":294,"code":"No. 294","insp":"riecht wie: J'adore","note":"süßblumig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":295,"code":"No. 295","insp":"riecht wie: Miss Dior Chérie","note":"blumig-fruchtig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":296,"code":"No. 296","insp":"riecht wie: Miss Dior","note":"süß-blumig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":297,"code":"No. 297","insp":"riecht wie: Light Blue","note":"frisch-zitrisch","gender":"Damen","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":298,"code":"No. 298","insp":"riecht wie: L'impératrice","note":"frisch-fruchtig","gender":"Damen","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":299,"code":"No. 299","insp":"riecht wie: The One","note":"süß-blumig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":300,"code":"No. 300","insp":"riecht wie: The Only One","note":"süß-blumig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":301,"code":"No. 301","insp":"riecht wie: Ambassador for Women","note":"blumig-süß","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":302,"code":"No. 302","insp":"riecht wie: Linerdit","note":"süß-blumig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":303,"code":"No. 303","insp":"riecht wie: Bloom","note":"blumig-cremig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":304,"code":"No. 304","insp":"riecht wie: Flora by Gucci","note":"süß-blumig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":305,"code":"No. 305","insp":"riecht wie: Flora Gorgeous Gardenia","note":"süß-blumig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":306,"code":"No. 306","insp":"riecht wie: Guilty","note":"süß-blumig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":307,"code":"No. 307","insp":"riecht wie: La Petite Robe Noire","note":"süß-fruchtig","gender":"Damen","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":308,"code":"No. 308","insp":"riecht wie: Mon Guerlain","note":"süßblumig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":309,"code":"No. 309","insp":"riecht wie: Shalimar","note":"würzig-orientalisch","gender":"Damen","family":"Orientalisch","occasion":"Winter","bestseller":false},{"id":310,"code":"No. 310","insp":"riecht wie: The Scent","note":"süß-fruchtig","gender":"Damen","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":311,"code":"No. 311","insp":"riecht wie: Classique","note":"süß-blumig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":312,"code":"No. 312","insp":"riecht wie: Divine","note":"blumig-süß","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":313,"code":"No. 313","insp":"riecht wie: La Belle","note":"süß-fruchtig","gender":"Damen","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":314,"code":"No. 314","insp":"riecht wie: Scandal","note":"süß-gourmandig","gender":"Damen","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":315,"code":"No. 315","insp":"riecht wie: Sander Sun","note":"süß-blumig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":316,"code":"No. 316","insp":"riecht wie: Flower","note":"blumig-pudrig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":317,"code":"No. 317","insp":"riecht wie: Idôle","note":"blumig-fruchtig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":318,"code":"No. 318","insp":"riecht wie: La Vie est Belle","note":"süß-blumig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":319,"code":"No. 319","insp":"riecht wie: Attrape-Rêves","note":"süß-blumig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":320,"code":"No. 320","insp":"riecht wie: Matière Noire","note":"holzig-blumig","gender":"Damen","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":321,"code":"No. 321","insp":"riecht wie: For Her","note":"blumig-pudrig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":322,"code":"No. 322","insp":"riecht wie: Musc Noir Rose","note":"süß-blumig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":323,"code":"No. 323","insp":"riecht wie: Narciso","note":"blumig-pudrig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":324,"code":"No. 324","insp":"riecht wie: Poudrée","note":"pudrig-blumig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":325,"code":"No. 325","insp":"riecht wie: Pure Musc","note":"blumig-cremig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":326,"code":"No. 326","insp":"riecht wie: Fame","note":"fruchtig-süß","gender":"Damen","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":327,"code":"No. 327","insp":"riecht wie: Lady Million","note":"süß-blumig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":328,"code":"No. 328","insp":"riecht wie: Olympea","note":"süß-blumig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":329,"code":"No. 329","insp":"riecht wie: Delina Exclusif","note":"süß-blumig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":330,"code":"No. 330","insp":"riecht wie: Cassili","note":"süß-fruchtig","gender":"Damen","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":331,"code":"No. 331","insp":"riecht wie: Meliora","note":"blumigfruchtig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":332,"code":"No. 332","insp":"riecht wie: Oriana","note":"süß-fruchtig","gender":"Damen","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":333,"code":"No. 333","insp":"riecht wie: Valaya","note":"synthetisch-blumig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":334,"code":"No. 334","insp":"riecht wie: Changing Constance","note":"süß-würzig","gender":"Damen","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":335,"code":"No. 335","insp":"riecht wie: Candy","note":"süß-gourmandig","gender":"Damen","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":336,"code":"No. 336","insp":"riecht wie: Infusion d'Iris","note":"pudrig-blumig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":337,"code":"No. 337","insp":"riecht wie: Paradoxe","note":"süß-blumig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":338,"code":"No. 338","insp":"riecht wie: Mugler Angel","note":"süß-gourmandig","gender":"Damen","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":339,"code":"No. 339","insp":"riecht wie: Mugler Alien","note":"süß-blumig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":340,"code":"No. 340","insp":"riecht wie: Mugler Alien Goddess","note":"süßblumig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":341,"code":"No. 341","insp":"riecht wie: Born In Roma","note":"süß-synthetisch","gender":"Damen","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":342,"code":"No. 342","insp":"riecht wie: Bright Crystal","note":"frisch-blumig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":343,"code":"No. 343","insp":"riecht wie: Crystal Noir","note":"süß-blumig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":344,"code":"No. 344","insp":"riecht wie: Flowerbomb","note":"süß-blumig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":345,"code":"No. 345","insp":"riecht wie: Dama Bianca","note":"süß-blumig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":346,"code":"No. 346","insp":"riecht wie: Black Opium","note":"süß-gourmandig","gender":"Damen","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":347,"code":"No. 347","insp":"riecht wie: Libre","note":"süßblumig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":348,"code":"No. 348","insp":"riecht wie: Libre Intense Eau de Parfum","note":"süß-blumig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":349,"code":"No. 349","insp":"riecht wie: Manifesto","note":"süß-blumig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":350,"code":"No. 350","insp":"riecht wie: Manifesto L'Elixir","note":"süß-orientalisch","gender":"Damen","family":"Orientalisch","occasion":"Winter","bestseller":false},{"id":351,"code":"No. 351","insp":"riecht wie: Opium","note":"würzig-orientalisch","gender":"Damen","family":"Orientalisch","occasion":"Winter","bestseller":false},{"id":352,"code":"No. 352","insp":"riecht wie: Supreme Bouquet","note":"süß-blumig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":353,"code":"No. 353","insp":"riecht wie: & Voltaire Girls Can Do Anything","note":"süß-blumig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":354,"code":"No. 354","insp":"riecht wie: & Voltaire This Is Her!","note":"süß-cremig","gender":"Damen","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":355,"code":"No. 355","insp":"riecht wie: Interlude Man","note":"würzig-rauchig","gender":"Herren","family":"Würzig","occasion":"Büro & Alltag","bestseller":false},{"id":356,"code":"No. 356","insp":"riecht wie: Interlude Woman","note":"würzig-blumig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":357,"code":"No. 357","insp":"riecht wie: Jubilation XXV","note":"würzig-orientalisch","gender":"Herren","family":"Orientalisch","occasion":"Winter","bestseller":false},{"id":358,"code":"No. 358","insp":"riecht wie: Jubilation 25 Woman","note":"fruchtig-orientalisch","gender":"Damen","family":"Orientalisch","occasion":"Winter","bestseller":false},{"id":359,"code":"No. 359","insp":"riecht wie: Epic Man","note":"würzig-holzig","gender":"Herren","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":360,"code":"No. 360","insp":"riecht wie: Epic Woman","note":"blumig-orientalisch","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":361,"code":"No. 361","insp":"riecht wie: Portrayal Man","note":"würzig-aromatisch","gender":"Herren","family":"Würzig","occasion":"Büro & Alltag","bestseller":false},{"id":362,"code":"No. 362","insp":"riecht wie: Lyric Man","note":"würzig-orientalisch","gender":"Herren","family":"Orientalisch","occasion":"Winter","bestseller":false},{"id":363,"code":"No. 363","insp":"riecht wie: Lyric Woman","note":"blumig-orientalisch","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":364,"code":"No. 364","insp":"riecht wie: Fate Man","note":"würzig-holzig","gender":"Herren","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":365,"code":"No. 365","insp":"riecht wie: Gold Man","note":"blumig-würzig","gender":"Herren","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":366,"code":"No. 366","insp":"riecht wie: Gold Woman","note":"blumig-orientalisch","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":367,"code":"No. 367","insp":"riecht wie: Dia Man","note":"blumig-würzig","gender":"Herren","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":368,"code":"No. 368","insp":"riecht wie: Beloved Man","note":"süß-würzig","gender":"Herren","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":369,"code":"No. 369","insp":"riecht wie: Opus X","note":"süß-würzig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":370,"code":"No. 370","insp":"riecht wie: Bracken Man","note":"würzig-holzig","gender":"Herren","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":371,"code":"No. 371","insp":"riecht wie: Enclave","note":"süß-fruchtig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":372,"code":"No. 372","insp":"riecht wie: Material","note":"holzig-würzig","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":373,"code":"No. 373","insp":"riecht wie: Guidance","note":"würzig-holzig","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":374,"code":"No. 374","insp":"riecht wie: Overture","note":"blumig-fruchtig","gender":"Unisex","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":375,"code":"No. 375","insp":"riecht wie: Interlude 53 Man","note":"würzig-rauchig","gender":"Herren","family":"Würzig","occasion":"Büro & Alltag","bestseller":false},{"id":376,"code":"No. 376","insp":"riecht wie: Enigma Pour Homme","note":"würzig-holzig","gender":"Herren","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":377,"code":"No. 377","insp":"riecht wie: Enigma Pour Femme","note":"blumig-orientalisch","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":378,"code":"No. 378","insp":"riecht wie: Diaghilev","note":"orientalisch-würzig","gender":"Unisex","family":"Orientalisch","occasion":"Winter","bestseller":false},{"id":379,"code":"No. 379","insp":"riecht wie: Danger Pour Homme","note":"würzig-orientalisch","gender":"Herren","family":"Orientalisch","occasion":"Winter","bestseller":false},{"id":380,"code":"No. 380","insp":"riecht wie: Danger Pour Femme","note":"fruchtig-orientalisch","gender":"Damen","family":"Orientalisch","occasion":"Winter","bestseller":false},{"id":381,"code":"No. 381","insp":"riecht wie: Scandal Pour Homme","note":"würzig-holzig","gender":"Herren","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":382,"code":"No. 382","insp":"riecht wie: Musk","note":"moschus-süß","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":383,"code":"No. 383","insp":"riecht wie: Nu Pour Homme","note":"würzig-frisch","gender":"Herren","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":384,"code":"No. 384","insp":"riecht wie: H Parfum Cologne","note":"frisch-holzig","gender":"Herren","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":385,"code":"No. 385","insp":"riecht wie: Reckless Pour Femme","note":"blumig-fruchtig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":386,"code":"No. 386","insp":"riecht wie: Kirke","note":"süß-fruchtig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":387,"code":"No. 387","insp":"riecht wie: Amber Gold","note":"süß-orientalisch","gender":"Unisex","family":"Orientalisch","occasion":"Winter","bestseller":false},{"id":388,"code":"No. 388","insp":"riecht wie: Nio","note":"süß-holzig","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":389,"code":"No. 389","insp":"riecht wie: Homage","note":"würzig-orientalisch","gender":"Unisex","family":"Orientalisch","occasion":"Winter","bestseller":false},{"id":390,"code":"No. 390","insp":"riecht wie: Ivory Route","note":"würzig-holzig","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":391,"code":"No. 391","insp":"riecht wie: Coffee Break","note":"süß-gourmandig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":392,"code":"No. 392","insp":"riecht wie: Aqua Universalis","note":"frisch-zitrisch","gender":"Unisex","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":393,"code":"No. 393","insp":"riecht wie: Amyris Femme","note":"blumig-holzig","gender":"Damen","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":394,"code":"No. 394","insp":"riecht wie: Amyris Homme","note":"würzig-holzig","gender":"Herren","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":395,"code":"No. 395","insp":"riecht wie: À la rose","note":"blumig-frisch","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":396,"code":"No. 396","insp":"riecht wie: Petit Matin","note":"blumig-frisch","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":397,"code":"No. 397","insp":"riecht wie: Absolue Pour le Soir","note":"süß-orientalisch","gender":"Unisex","family":"Orientalisch","occasion":"Winter","bestseller":false},{"id":398,"code":"No. 398","insp":"riecht wie: Godolphin","note":"würzig-holzig","gender":"Herren","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":399,"code":"No. 399","insp":"riecht wie: Kalan","note":"süß-würzig","gender":"Herren","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":400,"code":"No. 400","insp":"riecht wie: Nisean","note":"würzig-orientalisch","gender":"Herren","family":"Orientalisch","occasion":"Winter","bestseller":false},{"id":401,"code":"No. 401","insp":"riecht wie: Sedley","note":"süß-orientalisch","gender":"Herren","family":"Orientalisch","occasion":"Winter","bestseller":false},{"id":402,"code":"No. 402","insp":"riecht wie: Farhan","note":"süß-würzig","gender":"Herren","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":403,"code":"No. 403","insp":"riecht wie: Straight to Heaven","note":"süß-würzig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":404,"code":"No. 404","insp":"riecht wie: Sacred Wood","note":"würzig-holzig","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":405,"code":"No. 405","insp":"riecht wie: Playing With the Devil","note":"süß-fruchtig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":406,"code":"No. 406","insp":"riecht wie: Smoke for the Soul","note":"rauchig-würzig","gender":"Unisex","family":"Würzig","occasion":"Büro & Alltag","bestseller":false},{"id":407,"code":"No. 407","insp":"riecht wie: In the City of Sin","note":"süß-würzig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":408,"code":"No. 408","insp":"riecht wie: Paragon","note":"süß-würzig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":409,"code":"No. 409","insp":"riecht wie: Blessed Baraka","note":"süß-würzig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":410,"code":"No. 410","insp":"riecht wie: High Frequency","note":"süß-würzig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":411,"code":"No. 411","insp":"riecht wie: Divine Attraction","note":"süß-blumig","gender":"Unisex","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":412,"code":"No. 412","insp":"riecht wie: Psychedelic Love","note":"süß-blumig","gender":"Unisex","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":413,"code":"No. 413","insp":"riecht wie: No. 1 for Women","note":"blumig-fruchtig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":414,"code":"No. 414","insp":"riecht wie: X for Men","note":"würzig-zitrisch","gender":"Herren","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":415,"code":"No. 415","insp":"riecht wie: X for Women","note":"blumig-fruchtig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":416,"code":"No. 416","insp":"riecht wie: Town & Country","note":"würzig-blumig","gender":"Unisex","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":417,"code":"No. 417","insp":"riecht wie: Original Vintage Lavender","note":"würzig-frisch","gender":"Herren","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":418,"code":"No. 418","insp":"riecht wie: Malle Portrait of a Lady","note":"süß-würzig","gender":"Damen","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":419,"code":"No. 419","insp":"riecht wie: Malle Carnal Flower","note":"blumig-süß","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":420,"code":"No. 420","insp":"riecht wie: Malle Musc Ravageur","note":"süß-orientalisch","gender":"Unisex","family":"Orientalisch","occasion":"Winter","bestseller":false},{"id":421,"code":"No. 421","insp":"riecht wie: Malle Baie de Genièvre","note":"würzig-frisch","gender":"Unisex","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":422,"code":"No. 422","insp":"riecht wie: Malle Superstitious","note":"blumig-pudrig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":423,"code":"No. 423","insp":"riecht wie: Lutens Ambre Sultan","note":"würzig-orientalisch","gender":"Unisex","family":"Orientalisch","occasion":"Winter","bestseller":false},{"id":424,"code":"No. 424","insp":"riecht wie: Lutens Chergui","note":"süß-tabakig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":425,"code":"No. 425","insp":"riecht wie: Lutens La Fille de Berlin","note":"blumig-würzig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":426,"code":"No. 426","insp":"riecht wie: Lutens Fumerie Turque","note":"süß-tabakig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":427,"code":"No. 427","insp":"riecht wie: Lutens Un Bois Vanille","note":"süß-holzig","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":428,"code":"No. 428","insp":"riecht wie: des Garçons Wonderwood","note":"holzig-würzig","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":429,"code":"No. 429","insp":"riecht wie: des Garçons Black Pepper","note":"würzig-holzig","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":430,"code":"No. 430","insp":"riecht wie: des Garçons 2 Man","note":"würzig-frisch","gender":"Herren","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":431,"code":"No. 431","insp":"riecht wie: Philosykos","note":"grün-holzig","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":432,"code":"No. 432","insp":"riecht wie: Tam Dao","note":"holzig-würzig","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":433,"code":"No. 433","insp":"riecht wie: Eau Rose","note":"blumig-frisch","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":434,"code":"No. 434","insp":"riecht wie: Orphéon","note":"würzig-ledrig","gender":"Unisex","family":"Leder","occasion":"Winter","bestseller":false},{"id":435,"code":"No. 435","insp":"riecht wie: No. 9 New York Oud","note":"würzig-holzig","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":436,"code":"No. 436","insp":"riecht wie: No. 9 Chelsea Flowers","note":"blumig-frisch","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":437,"code":"No. 437","insp":"riecht wie: No. 9 Wall Street","note":"würzig-holzig","gender":"Herren","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":438,"code":"No. 438","insp":"riecht wie: No. 9 Saks for Men","note":"würzig-holzig","gender":"Herren","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":439,"code":"No. 439","insp":"riecht wie: the Victorious Complex","note":"süß-würzig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":440,"code":"No. 440","insp":"riecht wie: the Victorious Windsor","note":"würzig-holzig","gender":"Herren","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":441,"code":"No. 441","insp":"riecht wie: Parfums Invasion Barbare","note":"würzig-blumig","gender":"Unisex","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":442,"code":"No. 442","insp":"riecht wie: Parfums Chypre Palatin","note":"blumig-chypre","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":443,"code":"No. 443","insp":"riecht wie: Le Doré Russian Oud","note":"würzig-holzig","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":444,"code":"No. 444","insp":"riecht wie: Le Doré Malik Al Taif","note":"würzig-orientalisch","gender":"Unisex","family":"Orientalisch","occasion":"Winter","bestseller":false},{"id":445,"code":"No. 445","insp":"riecht wie: Le Doré Antiquity","note":"süß-orientalisch","gender":"Unisex","family":"Orientalisch","occasion":"Winter","bestseller":false},{"id":446,"code":"No. 446","insp":"riecht wie: Bois d'Orage","note":"würzig-holzig","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":447,"code":"No. 447","insp":"riecht wie: Silk Route","note":"süß-orientalisch","gender":"Unisex","family":"Orientalisch","occasion":"Winter","bestseller":false},{"id":448,"code":"No. 448","insp":"riecht wie: Oud Cuir d'Arabie","note":"würzig-ledrig","gender":"Unisex","family":"Leder","occasion":"Winter","bestseller":false},{"id":449,"code":"No. 449","insp":"riecht wie: Les Exclusifs Coromandel","note":"süß-orientalisch","gender":"Unisex","family":"Orientalisch","occasion":"Winter","bestseller":false},{"id":450,"code":"No. 450","insp":"riecht wie: Les Exclusifs Bois des Îles","note":"holzig-pudrig","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":451,"code":"No. 451","insp":"riecht wie: Les Exclusifs Cuir de Russie","note":"ledrig-blumig","gender":"Damen","family":"Leder","occasion":"Winter","bestseller":false},{"id":452,"code":"No. 452","insp":"riecht wie: Les Exclusifs Sycomore","note":"holzig-würzig","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":453,"code":"No. 453","insp":"riecht wie: La Collection Privée Granville","note":"blumig-frisch","gender":"Unisex","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":454,"code":"No. 454","insp":"riecht wie: La Collection Privée Mitzah","note":"würzig-orientalisch","gender":"Unisex","family":"Orientalisch","occasion":"Winter","bestseller":false},{"id":455,"code":"No. 455","insp":"riecht wie: La Collection Privée Oud Ispahan","note":"würzig-orientalisch","gender":"Unisex","family":"Orientalisch","occasion":"Winter","bestseller":false},{"id":456,"code":"No. 456","insp":"riecht wie: La Collection Privée New Look 1947","note":"blumig-fruchtig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":457,"code":"No. 457","insp":"riecht wie: L'Art et la Matière Bois d'Arménie","note":"würzig-harzig","gender":"Unisex","family":"Würzig","occasion":"Büro & Alltag","bestseller":false},{"id":458,"code":"No. 458","insp":"riecht wie: L'Art et la Matière Santal Royal","note":"holzig-süß","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":459,"code":"No. 459","insp":"riecht wie: L'Art et la Matière Ombre Éternelle","note":"würzig-holzig","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":460,"code":"No. 460","insp":"riecht wie: L'Art et la Matière Rose Nacrée du Désert","note":"blumig-süß","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":461,"code":"No. 461","insp":"riecht wie: Hermessence Vétiver Tonka","note":"holzig-würzig","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":462,"code":"No. 462","insp":"riecht wie: Hermessence Osmanthus Yunnan","note":"blumig-fruchtig","gender":"Unisex","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":463,"code":"No. 463","insp":"riecht wie: Hermessence Vanille Galante","note":"süß-vanillig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":464,"code":"No. 464","insp":"riecht wie: Hermessence Poivre Samarcande","note":"würzig-frisch","gender":"Unisex","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":465,"code":"No. 465","insp":"riecht wie: Orchidée Vanille","note":"süß-blumig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":466,"code":"No. 466","insp":"riecht wie: Féerie","note":"blumig-fruchtig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":467,"code":"No. 467","insp":"riecht wie: Precious Oud","note":"würzig-holzig","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":468,"code":"No. 468","insp":"riecht wie: Le Gemme Kobraa","note":"würzig-orientalisch","gender":"Herren","family":"Orientalisch","occasion":"Winter","bestseller":false},{"id":469,"code":"No. 469","insp":"riecht wie: Le Gemme Gyan","note":"süß-würzig","gender":"Damen","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":470,"code":"No. 470","insp":"riecht wie: Le Gemme Assamí","note":"süß-holzig","gender":"Herren","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":471,"code":"No. 471","insp":"riecht wie: Les Extraits Dune Blush","note":"süß-blumig","gender":"Unisex","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":472,"code":"No. 472","insp":"riecht wie: Les Extraits Rose des Vents","note":"blumig-fruchtig","gender":"Unisex","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":473,"code":"No. 473","insp":"riecht wie: Les Extraits Contre Moi","note":"süß-würzig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":474,"code":"No. 474","insp":"riecht wie: Hundred Silent Ways","note":"blumig-holzig","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":475,"code":"No. 475","insp":"riecht wie: Ege","note":"würzig-holzig","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":476,"code":"No. 476","insp":"riecht wie: Colognisant","note":"frisch-zitrisch","gender":"Unisex","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":477,"code":"No. 477","insp":"riecht wie: Aoud Lime","note":"würzig-zitrisch","gender":"Unisex","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":478,"code":"No. 478","insp":"riecht wie: Chocolate Greedy","note":"süß-gourmandig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":479,"code":"No. 479","insp":"riecht wie: Aoud Lemon Mint","note":"würzig-zitrisch","gender":"Unisex","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":480,"code":"No. 480","insp":"riecht wie: Roses Vanille","note":"süß-blumig","gender":"Unisex","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":481,"code":"No. 481","insp":"riecht wie: Andromeda","note":"süß-orientalisch","gender":"Unisex","family":"Orientalisch","occasion":"Winter","bestseller":false},{"id":482,"code":"No. 482","insp":"riecht wie: Orion","note":"süß-würzig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":483,"code":"No. 483","insp":"riecht wie: Marfa","note":"süß-würzig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":484,"code":"No. 484","insp":"riecht wie: Italian Leather","note":"ledrig-würzig","gender":"Unisex","family":"Leder","occasion":"Winter","bestseller":false},{"id":485,"code":"No. 485","insp":"riecht wie: Musk Nomade","note":"süß-moschus","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":486,"code":"No. 486","insp":"riecht wie: Dear Polly","note":"süß-fruchtig","gender":"Damen","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":487,"code":"No. 487","insp":"riecht wie: Djinn's Kiss","note":"süß-blumig","gender":"Unisex","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":488,"code":"No. 488","insp":"riecht wie: Libre d'Orange Rossy de Palma","note":"blumig-würzig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":489,"code":"No. 489","insp":"riecht wie: Libre d'Orange Rien","note":"würzig-ledrig","gender":"Unisex","family":"Leder","occasion":"Winter","bestseller":false},{"id":490,"code":"No. 490","insp":"riecht wie: Bat","note":"süß-fruchtig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":491,"code":"No. 491","insp":"riecht wie: Nightingale","note":"blumig-holzig","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":492,"code":"No. 492","insp":"riecht wie: & Durga Radio Bombay","note":"süß-würzig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":493,"code":"No. 493","insp":"riecht wie: & Durga Debaser","note":"würzig-blumig","gender":"Unisex","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":494,"code":"No. 494","insp":"riecht wie: of Sillage Hauts Bijoux","note":"süß-blumig","gender":"Damen","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":495,"code":"No. 495","insp":"riecht wie: Ninfa Odorata","note":"blumig-fruchtig","gender":"Unisex","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":496,"code":"No. 496","insp":"riecht wie: Black Collection I","note":"würzig-holzig","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":497,"code":"No. 497","insp":"riecht wie: Sarab","note":"süß-orientalisch","gender":"Unisex","family":"Orientalisch","occasion":"Winter","bestseller":false},{"id":498,"code":"No. 498","insp":"riecht wie: No 1 Vetiver, Cedar, Sandalwood","note":"holzig-würzig","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":499,"code":"No. 499","insp":"riecht wie: Absinthe","note":"würzig-anisig","gender":"Unisex","family":"Würzig","occasion":"Büro & Alltag","bestseller":false},{"id":500,"code":"No. 500","insp":"riecht wie: Ambre de Coco","note":"süß-cremig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false}];

const TESTIMONIALS = [
  { name: "Lea M.", text: "Hält den ganzen Tag, riecht wirklich hochwertig. Kam nach 3 Tagen an.", rating: 5 },
  { name: "Jonas K.", text: "Für den Preis unschlagbar nah am Original. Bestelle definitiv wieder.", rating: 5 },
  { name: "Sophie R.", text: "Bestellung lief unkompliziert über Instagram, super freundlicher Kontakt.", rating: 5 },
  { name: "Deniz A.", text: "No. 09 ist mein neuer Alltagsduft geworden. Sehr empfehlenswert.", rating: 5 },
];

const IG_URL = "https://instagram.com/elan.fragrances";
// Leer lassen (null) = Flakon-Illustration wird gezeigt.
// Pfad eintragen, z.B. "/images/hero.jpg" = dein eigenes Foto wird gezeigt.
const HERO_IMAGES = ["/images/hero-1.jpg", "/images/hero-video.mp4", "/images/hero-2.jpg"];
const IG_DM_URL = "https://ig.me/m/elan.fragrances";

const CATEGORIES = [
  { label: "Winter Düfte",     type: "occasion", value: "Winter",           image: "/images/duftwelt-winter.jpg" },
  { label: "Sommer Düfte",     type: "occasion", value: "Sommer",            image: "/images/duftwelt-sommer.jpg" },
  { label: "Süße Düfte",       type: "family",   value: "Honig & Gourmand",  image: "/images/duftwelt-suesse.jpg" },
  { label: "Frische Düfte",    type: "family",   value: "Frisch & Zitrus",   image: "/images/duftwelt-frische.jpg" },
  { label: "Oud & Leder",      type: "family",   value: "Leder",             image: "/images/duftwelt-oud-leder.jpg" },
  { label: "Date Night Düfte", type: "occasion", value: "Date Night",        image: "/images/duftwelt-datenight.jpg" },
];

const TICKER_ITEMS = [
  "VERSAND IN 2–4 WERKTAGEN",
  "AB 3 FLASCHEN GRATIS VERSAND + 10% RABATT",
  "SICHER BEZAHLEN: PAYPAL ODER ÜBERWEISUNG",
  "EXTRAIT DE PARFUM · 30% ÖLANTEIL",
];

const fmt = (n) => n.toFixed(2).replace(".", ",") + " €";

// Robuster externer Link-Opener: window.open kann in eingebetteten Vorschau-
// Umgebungen blockiert sein — dann greift der location.href-Fallback.
// Sobald die Seite live auf eurer eigenen Domain läuft, funktionieren beide Wege normal.
const openExternal = (url) => {
  try {
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (!win) window.location.href = url;
  } catch {
    window.location.href = url;
  }
};

function Stars({ n = 5, size = 22 }) {
  return (
    <div className="flex gap-1" style={{ color: C.gold }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} fill={i < n ? C.gold : "none"} strokeWidth={1.5} />
      ))}
    </div>
  );
}

function Bottle({ size = 1, glow = false }) {
  const W = 130, H = 176;
  return (
    <svg width={W * size} height={H * size} viewBox={`0 0 ${W} ${H}`} fill="none" style={{ overflow: "visible" }}>
      {glow && (
        <ellipse cx="65" cy="106" rx="52" ry="52" fill={C.gold} opacity="0.14">
          <animate attributeName="opacity" values="0.08;0.22;0.08" dur="4.5s" repeatCount="indefinite" />
        </ellipse>
      )}
      <ellipse cx="65" cy="14" rx="10" ry="6" fill="#5A3E27" />
      <rect x="45" y="16" width="40" height="24" rx="10" fill={C.wood} stroke="#241708" strokeWidth="1" />
      <rect x="45" y="16" width="40" height="7" rx="6" fill="#6B4A2E" />
      <rect x="57" y="38" width="16" height="10" fill="#D8C9A6" opacity="0.5" />
      <ellipse cx="65" cy="106" rx="50" ry="54" fill="url(#glassBeige)" stroke="#C9B37E" strokeWidth="1.2" />
      <clipPath id="clipRound"><ellipse cx="65" cy="106" rx="49" ry="53" /></clipPath>
      <rect x="16" y="128" width="98" height="60" fill={C.gold} opacity="0.55" clipPath="url(#clipRound)" />
      <rect x="15" y="100" width="100" height="10" fill={C.goldHi} opacity="0.55" clipPath="url(#clipRound)" />
      <text x="65" y="106" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize="13" letterSpacing="3.5" fill={C.ink} opacity="0.75">ÉLAN</text>
      <ellipse cx="44" cy="76" rx="10" ry="20" fill="#FFFFFF" opacity="0.35" />
      <defs>
        <linearGradient id="glassBeige" x1="15" y1="52" x2="115" y2="160" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FBF6EC" stopOpacity="0.9" />
          <stop offset="1" stopColor="#E7D9BB" stopOpacity="0.75" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function SizePicker({ value, onChange }) {
  return (
    <div className="flex gap-1 justify-center mt-2 flex-wrap">
      {SIZES.map((s) => (
        <button
          key={s}
          onClick={() => onChange(s)}
          className="px-1.5 py-0.5 text-[9px]"
          style={{ border: `1px solid ${value === s ? C.gold : C.line}`, color: value === s ? C.ink : C.muted, background: value === s ? C.bg : "transparent" }}
        >
          {s}ml
        </button>
      ))}
    </div>
  );
}

// Zeigt ein echtes Produktfoto, falls p.image gesetzt ist — sonst die Illustration.
// So kannst du Fotos einzeln nachrüsten, ohne am Rest des Layouts etwas zu ändern.
function ProductVisual({ p, size = 1 }) {
  if (p?.image) {
    return (
      <img
        src={p.image}
        alt={`ÉLAN ${p.code}`}
        style={{ width: 130 * size, height: 176 * size, objectFit: "cover" }}
        className="rounded-sm"
      />
    );
  }
  return <Bottle size={size} />;
}

function ProductCard({ p, onAdd, ribbon }) {
  const [size, setSize] = useState(50);
  return (
    <div className="card relative flex flex-col h-full items-center text-center p-3 sm:p-5" style={{ background: C.surface, border: `1px solid ${C.line}` }}>
      {ribbon && (
        <div className="absolute top-2 left-2 flex items-center gap-1 text-[8px] tracked uppercase px-1.5 py-0.5" style={{ background: C.ink, color: C.goldHi }}>
          <Crown size={8} /> Bestseller
        </div>
      )}
      <div className="card-bottle"><ProductVisual p={p} size={0.42} /></div>
      {p.tier === "Signature" && (
        <div className="flex items-center gap-1 text-[8px] tracked uppercase mt-2" style={{ color: C.gold }}><Sparkles size={9} /> Signature</div>
      )}
      <div className="font-display text-base sm:text-lg mt-1">ÉLAN {p.code}</div>
      <div className="text-[10px] italic mt-0.5" style={{ color: C.gold }}>{p.insp}</div>
      <div className="flex gap-1 justify-center mt-1.5 flex-wrap">
        <span className="text-[8px] uppercase tracked px-1.5 py-0.5" style={{ border: `1px solid ${C.line}`, color: C.muted }}>{p.gender}</span>
        <span className="text-[8px] uppercase tracked px-1.5 py-0.5" style={{ border: `1px solid ${C.line}`, color: C.muted }}>{p.family}</span>
      </div>
      <div className="text-[11px] mt-2" style={{ color: C.text }}>{p.note}</div>
      <div className="text-[9px] mt-0.5" style={{ color: C.muted }}>{p.accord}</div>

      {/* Preis, Größe & Button sitzen bei jeder Karte auf gleicher Höhe unten */}
      <div className="mt-auto w-full pt-2">
        <SizePicker value={size} onChange={setSize} />
        <div className="font-display text-base mt-1.5" style={{ color: C.ink }}>{fmt(PRICE[size])}</div>
        <button onClick={() => onAdd(p.id, size)} className="btn-gold mt-2 w-full py-1.5 text-[9px] tracked uppercase flex items-center justify-center gap-1">
          <Plus size={10} /> In den Warenkorb
        </button>
      </div>
    </div>
  );
}

function CategoryTile({ cat, onClick }) {
  return (
    <button
      onClick={onClick}
      className="category-tile relative aspect-square overflow-hidden flex items-end p-4 sm:p-6 text-left"
    >
      <img
        src={cat.image}
        alt={cat.label}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(36,24,9,0) 40%, rgba(36,24,9,0.75) 100%)" }} />
      <span className="font-display text-xl sm:text-3xl text-white relative z-10" style={{ lineHeight: 1.1 }}>{cat.label}</span>
    </button>
  );
}

function Ticker() {
  const content = TICKER_ITEMS.join("   ✦   ") + "   ✦   ";
  return (
    <div style={{ background: C.ink, overflow: "hidden" }}>
      <div className="ticker-track flex whitespace-nowrap py-2 text-[10px] tracked uppercase" style={{ color: C.goldHi }}>
        <span className="px-4">{content}</span>
        <span className="px-4">{content}</span>
      </div>
    </div>
  );
}

function FloatCard({ icon, title, sub }) {
  return (
    <div className="float-card flex items-start gap-3 p-5" style={{ background: C.surface, border: `1px solid ${C.line}` }}>
      <div style={{ color: C.gold }}>{icon}</div>
      <div className="text-left">
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs mt-0.5" style={{ color: C.muted }}>{sub}</div>
      </div>
    </div>
  );
}

function Quiz({ onResult, onClose }) {
  const [step, setStep] = useState(0);
  const [ans, setAns] = useState({ gender: null, occasion: null, family: null });
  const steps = [
    { key: "gender", q: "Für wen suchst du den Duft?", opts: GENDERS },
    { key: "occasion", q: "Für welchen Anlass?", opts: OCCASIONS },
    { key: "family", q: "Welche Richtung mag er/sie am liebsten?", opts: FAMILIES },
  ];
const pick = (key, val) => {
    const next = { ...ans, [key]: val };
    setAns(next);
    if (step < steps.length - 1) { setStep(step + 1); return; }
    const scored = PRODUCTS.map((p) => ({
      p,
      score: (p.gender === next.gender || next.gender === "Unisex" || p.gender === "Unisex" ? 1 : 0) +
             (p.occasion === next.occasion ? 1 : 0) + (p.family === next.family ? 1 : 0),
    }));
    const maxScore = Math.max(...scored.map((s) => s.score));
    const bestMatches = scored.filter((s) => s.score === maxScore);
    const randomPick = bestMatches[Math.floor(Math.random() * bestMatches.length)];
    onResult(randomPick.p);
  };;
  const s = steps[step];
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div className="text-xs tracked uppercase" style={{ color: C.gold }}>Frage {step + 1} / {steps.length}</div>
        <button onClick={onClose} aria-label="Schließen"><X size={18} /></button>
      </div>
      <h3 className="font-display text-2xl mb-6">{s.q}</h3>
      <div className="flex flex-col gap-3">
        {s.opts.map((o) => (
          <button key={o} onClick={() => pick(s.key, o)} className="quiz-opt flex items-center justify-between px-5 py-3 text-sm" style={{ border: `1px solid ${C.line}` }}>
            {o} <ArrowRight size={14} />
          </button>
        ))}
      </div>
      {step > 0 && <button onClick={() => setStep(step - 1)} className="flex items-center gap-1 text-xs mt-6" style={{ color: C.muted }}><ArrowLeft size={12} /> Zurück</button>}
    </div>
  );
}

export default function ElanSite() {
  const [cart, setCart] = useState({}); // key: `${id}_${size}` -> qty
  const [cartOpen, setCartOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState(null);
  const [mobileNav, setMobileNav] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizResult, setQuizResult] = useState(null);
  const [genderF, setGenderF] = useState("Alle");
  const [familyF, setFamilyF] = useState("Alle");
  const [occasionF, setOccasionF] = useState("Alle");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(20);
  const [form, setForm] = useState({ name: "", address: "", plz: "", ort: "", land: "Deutschland" });
  const [headerHidden, setHeaderHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      // Header nur ausblenden, wenn deutlich nach unten gescrollt wird —
      // beim Hochscrollen (oder ganz oben) taucht er sofort wieder auf.
      if (y > lastY.current + 4 && y > 80) setHeaderHidden(true);
      else if (y < lastY.current - 4 || y < 80) setHeaderHidden(false);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const addToCart = useCallback((id, size) => {
    const key = `${id}_${size}`;
    setCart((c) => ({ ...c, [key]: (c[key] || 0) + 1 }));
    const p = PRODUCTS.find((pr) => pr.id === id);
    setToast(`✓ ÉLAN ${p?.code} (${size}ml) hinzugefügt`);
    clearTimeout(window.__elanToastTimer);
    window.__elanToastTimer = setTimeout(() => setToast(null), 2200);
  }, []);
  const changeQty = useCallback((key, delta) => {
    setCart((c) => {
      const next = { ...c, [key]: (c[key] || 0) + delta };
      if (next[key] <= 0) delete next[key];
      return next;
    });
  }, []);

  const cartItems = useMemo(() => Object.entries(cart).map(([key, qty]) => {
    const [id, size] = key.split("_").map(Number);
    return { ...PRODUCTS.find((p) => p.id === id), size, qty, key, unitPrice: PRICE[size] };
  }), [cart]);

  const total = useMemo(() => cartItems.reduce((s, i) => s + i.unitPrice * i.qty, 0), [cartItems]);
  const count = useMemo(() => cartItems.reduce((s, i) => s + i.qty, 0), [cartItems]);
  const discount = count >= 3 ? total * 0.10 : 0;
  const shipping = count === 0 ? 0 : count >= 3 ? 0 : 6.2;
  const grandTotal = total - discount + shipping;
  const bestsellers = useMemo(() => PRODUCTS.filter((p) => p.bestseller), []);

  const filtered = PRODUCTS.filter(
    (p) => (genderF === "Alle" || p.gender === genderF) &&
           (familyF === "Alle" || p.family === familyF) &&
           (occasionF === "Alle" || p.occasion === occasionF) &&
           (search.trim() === "" ||
             p.insp.toLowerCase().includes(search.trim().toLowerCase()) ||
             p.code.toLowerCase().includes(search.trim().toLowerCase()) ||
             p.note.toLowerCase().includes(search.trim().toLowerCase()))
  );
  const visible = filtered.slice(0, visibleCount);

  // Pagination-Zähler zurücksetzen, sobald sich Filter oder Suche ändern
  useEffect(() => { setVisibleCount(20); }, [genderF, familyF, occasionF, search]);

  const formValid = form.name.trim() && form.address.trim() && form.plz.trim() && form.ort.trim() && form.land.trim();

  const sendToInstagram = () => {
    if (cartItems.length === 0 || !formValid) return;
    const lines = cartItems.map((i) => `• ÉLAN ${i.code} (${i.size}ml) — ${i.qty}x (${fmt(i.unitPrice * i.qty)})`).join("\n");
    const text = `Hallo ÉLAN! Ich möchte gerne bestellen:\n\n${lines}\n\nZwischensumme: ${fmt(total)}${discount > 0 ? `\nRabatt (-10%): -${fmt(discount)}` : ""}\nVersand: ${shipping === 0 ? "kostenlos" : fmt(shipping)}\nGesamt: ${fmt(grandTotal)}\n\nName: ${form.name}\nAdresse: ${form.address}\nPLZ / Ort: ${form.plz} ${form.ort}\nLand: ${form.land}\n\nZahlung: PayPal / Überweisung (nach Absprache)`;
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 5000);
    }).catch(() => {});
    openExternal(IG_DM_URL);
  };

  const navItems = [
    ["Bestseller", "bestseller"],
    ["Kollektion", "shop"],
    ["Geschichte", "geschichte"],
    ["Stimmen", "stimmen"],
    ["FAQ", "faq"],
  ];

  return (
    <div style={{ background: C.bg, color: C.text, minHeight: "100vh" }} className="font-body">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Jost:wght@300;400;500;600&display=swap');
        .font-display { font-family: 'Cormorant Garamond', serif; }
        .font-body { font-family: 'Jost', sans-serif; }
        .tracked { letter-spacing: 0.28em; }
        ::selection { background: ${C.gold}; color: ${C.bg}; }
        .btn-gold { background: ${C.ink}; color: ${C.goldHi}; transition: background .2s ease; cursor: pointer; }
        .btn-gold:hover { background: ${C.inkHi}; }
        .btn-gold:disabled { opacity: 0.4; cursor: not-allowed; }
        .btn-ghost { cursor: pointer; }
        .card { transition: box-shadow .3s ease, transform .3s ease; }
        .card:hover { box-shadow: 0 14px 30px -18px rgba(36,24,9,0.35); transform: translateY(-2px); }
        .card:hover .card-bottle { transform: translateY(-4px); }
        .card-bottle { transition: transform .35s ease; }
        .quiz-opt { transition: background .2s ease, border-color .2s ease; background: transparent; cursor: pointer; }
        .quiz-opt:hover { background: ${C.bg}; border-color: ${C.gold} !important; }
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .drawer { animation: slideIn .3s ease; }
        @keyframes floaty { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        .float-card { animation: floaty 5s ease-in-out infinite; transition: box-shadow .3s ease; }
        .float-card:nth-child(2) { animation-delay: .6s; }
        .float-card:nth-child(3) { animation-delay: 1.2s; }
        .float-card:hover { box-shadow: 0 16px 32px -18px rgba(36,24,9,0.4); }
        input.el-input, select.el-select { background: ${C.bg}; border: 1px solid ${C.line}; color: ${C.text}; }
        input.el-input::placeholder { color: ${C.muted}; }
        input.el-input:focus, select.el-select:focus { outline: none; border-color: ${C.gold}; }
        .quote-strip { display: flex; gap: 2rem; overflow-x: auto; scrollbar-width: none; }
        .quote-strip::-webkit-scrollbar { display: none; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .ticker-track { animation: marquee 26s linear infinite; width: max-content; }
        .category-tile { transition: transform .3s ease; cursor: pointer; border: none; }
        .category-tile:hover { transform: scale(1.02); }
        .category-tile:hover .category-icon { transform: scale(1.1); }
        .category-icon { transition: transform .3s ease; }
      `}</style>

      {/* Ticker + Header — beide fixiert, blenden gemeinsam beim Runterscrollen aus */}
      <div
        className="fixed top-0 left-0 right-0 z-40"
        style={{ transform: headerHidden ? "translateY(-100%)" : "translateY(0)", transition: "transform .3s ease" }}
      >
        <Ticker />
        <header
          className="flex items-center justify-between px-6 md:px-12 py-4"
          style={{ background: `${C.bg}EE`, backdropFilter: "blur(8px)", borderBottom: `1px solid ${C.line}` }}
        >
          <button onClick={() => scrollTo("top")} className="font-display text-2xl btn-ghost" style={{ letterSpacing: "0.35em", background: "none", border: "none", color: C.text }}>ÉLAN</button>
          <nav className="hidden md:flex gap-8 text-sm tracked uppercase" style={{ color: C.muted }}>
            {navItems.map(([label, id]) => (
              <button key={id} onClick={() => scrollTo(id)} className="btn-ghost" style={{ color: C.text, background: "none", border: "none" }}>{label}</button>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <button onClick={() => openExternal(IG_URL)} aria-label="Instagram" className="btn-ghost" style={{ color: C.muted, background: "none", border: "none" }}><Instagram size={19} /></button>
            <button onClick={() => setCartOpen(true)} className="relative flex items-center gap-2 px-3 py-2 btn-ghost" style={{ border: `1px solid ${C.line}`, background: "none" }} aria-label="Warenkorb öffnen">
              <ShoppingBag size={17} />
              {count > 0 && <span className="absolute -top-2 -right-2 text-xs w-5 h-5 flex items-center justify-center rounded-full" style={{ background: C.ink, color: C.goldHi }}>{count}</span>}
            </button>
            <button className="md:hidden btn-ghost" onClick={() => setMobileNav(true)} aria-label="Menü" style={{ background: "none", border: "none" }}><Menu size={20} /></button>
          </div>
        </header>
      </div>
      {/* Platzhalter, damit Inhalt nicht unter Ticker + Header verschwindet */}
      <div style={{ height: 104 }} />

      {/* Mobile-Menü als eigenes Vollbild-Overlay — öffnet immer direkt an Ort und
          Stelle, unabhängig von der Scroll-Position (kein Sprung mehr nach oben) */}
      {mobileNav && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col" style={{ background: C.bg }}>
          <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: `1px solid ${C.line}` }}>
            <div className="font-display text-2xl" style={{ letterSpacing: "0.35em" }}>ÉLAN</div>
            <button onClick={() => setMobileNav(false)} aria-label="Menü schließen" className="btn-ghost" style={{ background: "none", border: "none" }}><X size={22} /></button>
          </div>
          <div className="flex flex-col text-lg tracked uppercase px-6 py-8 gap-6">
            {navItems.map(([label, id]) => (
              <button key={id} onClick={() => { scrollTo(id); setMobileNav(false); }} className="text-left btn-ghost" style={{ background: "none", border: "none", color: C.text }}>{label}</button>
            ))}
          </div>
        </div>
      )}

      {/* Hero */}
<section id="top" className="relative px-6 md:px-12 pt-16 pb-12 md:pt-24 overflow-hidden">
  <div className="max-w-7xl mx-auto">
    
    {/* DESKTOP: 3 Spalten (Links Bild | Mitte Video | Rechts Bild) */}
    <div className="hidden md:grid grid-cols-3 gap-6 mb-12">
      {/* LINKS: Bild */}
      <img
        src="/images/hero-1.jpg"
        alt="ÉLAN 1"
        className="w-full rounded-lg object-cover hover:scale-105 transition-transform duration-300"
        style={{ height: 580 }}
      />
      
      {/* MITTE: Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full rounded-lg object-cover"
        style={{ height: 580, background: "#000" }}
        onCanPlayThrough={(e) => e.currentTarget.play().catch(() => {})}
      >
        <source src="/images/hero-video.mp4" type="video/mp4" />
      </video>
      
      {/* RECHTS: Bild */}
      <img
        src="/images/hero-2.jpg"
        alt="ÉLAN 2"
        className="w-full rounded-lg object-cover hover:scale-105 transition-transform duration-300"
        style={{ height: 580 }}
      />
    </div>

    {/* MOBILE: Nur Video */}
    <div className="md:hidden mb-8">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full rounded-lg object-cover h-80"
        style={{ background: "#000" }}
        onCanPlayThrough={(e) => e.currentTarget.play().catch(() => {})}
      >
        <source src="/images/hero-video.mp4" type="video/mp4" />
      </video>
    </div>

    {/* TEXT - BEIDE (MOBILE + DESKTOP) */}
    <div className="text-center">
      <div className="mb-4 text-xs tracked uppercase" style={{ color: C.gold }}>Premium Duftzwillinge</div>
      
      <h1 className="font-display text-4xl md:text-6xl mb-4 md:mb-6" style={{ lineHeight: 1.05, color: C.ink }}>
        Ikonische Düfte.<br />Neu interpretiert.
      </h1>
      
      <p className="text-xs md:text-sm mb-6 md:mb-9 max-w-2xl mx-auto" style={{ color: C.muted }}>
        Extrait de Parfum mit 30% Ölanteil. Komponiert aus erlesenen Rohstoffen aus Frankreich &amp; England.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button onClick={() => scrollTo("shop")} className="btn-gold px-8 py-3 text-sm tracked uppercase inline-flex items-center justify-center gap-2">
          Kollektion entdecken <ChevronRight size={15} />
        </button>
        <button onClick={() => { setQuizOpen(true); setQuizResult(null); }} className="px-8 py-3 text-sm tracked uppercase inline-flex items-center justify-center gap-2 btn-ghost" style={{ border: `1px solid ${C.gold}`, color: C.ink, background: "none" }}>
          <Wand2 size={15} /> Duft-Quiz
        </button>
      </div>
    </div>
  </div>
</section>

      {/* Kundenfeedback - direkt unter Hero */}
<section id="stimmen" className="px-6 md:px-12 py-16 md:py-24 max-w-6xl mx-auto">
  <div className="text-xs tracked uppercase mb-2 text-center" style={{ color: C.gold }}>Kundenfeedback</div>
  <h2 className="font-display text-4xl md:text-5xl text-center mb-16">Das sagen unsere Kunden</h2>
  
  {/* CAROUSEL - AUTO SCROLL */}
<div 
    className="overflow-hidden pb-6 carousel-mask"
    style={{ 
      WebkitOverflowScrolling: "touch"
    }}
  >
   <style>{`
   
      @keyframes autoScroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .carousel-track {
        animation: autoScroll 30s linear infinite;
      }
      .carousel-mask {
        -webkit-mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent);
        mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent);
      }
    `}</style>
    
    <div className="carousel-track flex gap-8 md:gap-12 min-w-max px-6">
      {TESTIMONIALS.map((t, i) => (
        <div key={i} className="flex-shrink-0 w-80 md:w-96 text-center">
          {/* KUNDENBILDER */}
          <img
            src={`/images/customer-${i + 1}.jpg`}
            alt={t.name}
            className="w-32 h-32 md:w-48 md:h-48 rounded-full mx-auto mb-6 object-cover border-4"
            style={{ borderColor: C.gold }}
          />

          {/* STARS */}
          <div className="flex justify-center mb-4">
            {[...Array(t.rating)].map((_, j) => (
              <Star key={j} size={20} fill={C.gold} stroke={C.gold} strokeWidth={1} />
            ))}
          </div>

          {/* TEXT */}
          <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: C.muted }}>
            "{t.text}"
          </p>

          {/* NAME */}
          <p className="font-medium text-base md:text-lg" style={{ color: C.ink }}>
            {t.name}
          </p>
        </div>
      ))}
      {/* DUPLIZIEREN FÜR LOOP */}
      {TESTIMONIALS.map((t, i) => (
        <div key={`duplicate-${i}`} className="flex-shrink-0 w-80 md:w-96 text-center">
          <img
            src={`/images/customer-${i + 1}.jpg`}
            alt={t.name}
            className="w-32 h-32 md:w-48 md:h-48 rounded-full mx-auto mb-6 object-cover border-4"
            style={{ borderColor: C.gold }}
          />
          <div className="flex justify-center mb-4">
            {[...Array(t.rating)].map((_, j) => (
              <Star key={j} size={20} fill={C.gold} stroke={C.gold} strokeWidth={1} />
            ))}
          </div>
          <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: C.muted }}>
            "{t.text}"
          </p>
          <p className="font-medium text-base md:text-lg" style={{ color: C.ink }}>
            {t.name}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Kategorie-Katalog */}
      <section className="px-6 md:px-12 pb-16 max-w-4xl mx-auto">
        <div className="text-xs tracked uppercase mb-2 text-center" style={{ color: C.gold }}>Entdecke</div>
        <h2 className="font-display text-3xl md:text-4xl text-center mb-8">Duftwelten</h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {CATEGORIES.map((cat) => (
            <CategoryTile
              key={cat.label}
              cat={cat}
              onClick={() => {
                if (cat.type === "occasion") { setOccasionF(cat.value); setFamilyF("Alle"); }
                else { setFamilyF(cat.value); setOccasionF("Alle"); }
                setGenderF("Alle");
                scrollTo("shop");
              }}
            />
          ))}
        </div>
      </section>


      {/* floating trust cards */}
      <section className="px-6 md:px-12 pb-16 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
        <FloatCard icon={<Truck size={20} />} title="Versand in 2–4 Werktagen" sub="Schneller, diskreter Versand" />
        <FloatCard icon={<Gift size={20} />} title="Ab 3 Flaschen Gratis Versand + 10% Rabatt" sub="Automatischer Mengenrabatt" />
        <FloatCard icon={<ShieldCheck size={20} />} title="Sicher bezahlen" sub="PayPal oder Banküberweisung" />
      </section>

      {/* Trust bar */}
      <section className="px-6 md:px-12 py-10" style={{ borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}`, background: C.surface }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[["30%", "Ölanteil"], ["16+ Std.", "Haltbarkeit auf der Haut"], ["98–99%", "Zielgenauigkeit zum Original"], ["FR / UK", "Erlesene Rohstoffe"]].map(([n, l]) => (
            <div key={l}>
              <div className="font-display text-3xl" style={{ color: C.gold }}>{n}</div>
              <div className="text-xs mt-1" style={{ color: C.muted }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section id="geschichte" className="px-6 md:px-12 py-20 max-w-2xl mx-auto text-center">
        <div className="text-xs tracked uppercase mb-3" style={{ color: C.gold }}>Unsere Geschichte</div>
        <h2 className="font-display text-4xl mb-6">Vom Kinderzimmer zur Marke</h2>
        <p className="text-sm leading-relaxed" style={{ color: C.muted }}>
          ÉLAN begann als Herzensprojekt in einem ganz normalen Kinderzimmer — mit einer einfachen
          Idee: großartige Düfte sollten kein Luxus für wenige sein. Aus unzähligen Testreihen und viel
          Leidenschaft für Parfümerie entstanden unsere Duftzwillinge — komponiert aus erlesenen Ölen
          aus Frankreich &amp; England, mit 30% Ölanteil für ein Erlebnis, das seinem Vorbild in nichts nachsteht.
        </p>
      </section>

      {/* Bestseller catalog */}
      <section id="bestseller" className="px-6 md:px-12 py-20 max-w-6xl mx-auto" style={{ borderTop: `1px solid ${C.line}` }}>
        <div className="flex items-center gap-3 mb-2 justify-center">
          <Crown size={16} style={{ color: C.gold }} />
          <div className="text-xs tracked uppercase" style={{ color: C.gold }}>Meistbestellt</div>
        </div>
        <h2 className="font-display text-4xl text-center mb-12">Der Bestseller-Katalog</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {bestsellers.map((p) => <ProductCard key={p.id} p={p} onAdd={addToCart} ribbon />)}
        </div>
      </section>

      {/* Shop with search, filters & pagination */}
      <section id="shop" className="px-6 md:px-12 py-20 max-w-6xl mx-auto" style={{ borderTop: `1px solid ${C.line}` }}>
        <div className="text-center mb-10">
          <div className="text-xs tracked uppercase mb-2" style={{ color: C.gold }}>Gesamte Kollektion · {PRODUCTS.length} Düfte</div>
          <h2 className="font-display text-4xl">Alle Düfte</h2>
        </div>

        <div className="max-w-md mx-auto mb-6">
          <input
            className="el-input w-full px-4 py-2.5 text-sm"
            placeholder="Duft suchen (z. B. „Aventus“, „Leder“, „No. 012“) …"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-8 justify-center items-center">
          <div className="flex gap-2 text-xs tracked uppercase">
            {["Alle", ...GENDERS].map((f) => (
              <button key={f} onClick={() => setGenderF(f)} className="px-3 py-1.5 btn-ghost" style={{ border: `1px solid ${genderF === f ? C.gold : C.line}`, color: genderF === f ? C.ink : C.muted, background: genderF === f ? C.surface : "transparent" }}>{f}</button>
            ))}
          </div>
          <select className="el-select px-3 py-2 text-sm" value={familyF} onChange={(e) => setFamilyF(e.target.value)}>
            <option value="Alle">Duftfamilie: Alle</option>
            {FAMILIES.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
          <select className="el-select px-3 py-2 text-sm" value={occasionF} onChange={(e) => setOccasionF(e.target.value)}>
            <option value="Alle">Anlass: Alle</option>
            {OCCASIONS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>

        <div className="text-center text-xs mb-8" style={{ color: C.muted }}>
          {filtered.length} {filtered.length === 1 ? "Duft gefunden" : "Düfte gefunden"}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center text-sm py-16" style={{ color: C.muted }}>Kein Duft passt zu dieser Kombination — versuch eine andere Filter- oder Sucheinstellung.</div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
              {visible.map((p) => <ProductCard key={p.id} p={p} onAdd={addToCart} ribbon={p.bestseller} />)}
            </div>
            {visibleCount < filtered.length && (
              <div className="flex flex-col items-center gap-2 mt-12">
                <div className="text-xs" style={{ color: C.muted }}>{visibleCount} von {filtered.length} angezeigt</div>
                <button onClick={() => setVisibleCount((v) => v + 20)} className="btn-gold px-8 py-3 text-xs tracked uppercase">
                  Mehr laden
                </button>
              </div>
            )}
          </>
        )}
      </section>


  



      {/* FAQ */}
      <section id="faq" className="px-6 md:px-12 py-16 max-w-3xl mx-auto text-center" style={{ borderTop: `1px solid ${C.line}` }}>
        <div className="text-xs tracked uppercase mb-3" style={{ color: C.gold }}>Bestellung</div>
        <h3 className="font-display text-3xl mb-4">Wie funktioniert die Bestellung?</h3>
        <p className="text-sm" style={{ color: C.muted }}>
          Wähle Duft &amp; Größe, öffne den Warenkorb, trage deine Adresse ein und sende die Bestellung
          per Instagram-DM. Bezahlt wird per PayPal oder Überweisung. Versand in 2–4 Werktagen — ab 3
          Flaschen Gratis Versand + 10% Rabatt.
        </p>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-10 flex flex-col gap-6 text-xs" style={{ borderTop: `1px solid ${C.line}`, color: C.muted }}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display text-lg" style={{ letterSpacing: "0.3em", color: C.text }}>ÉLAN</div>
          <div>© {new Date().getFullYear()} ÉLAN Fragrances — Premium Duftzwillinge</div>
          <button onClick={() => openExternal(IG_URL)} className="flex items-center gap-2 btn-ghost" style={{ color: C.text, background: "none", border: "none" }}><Instagram size={14} /> @elan.fragrances</button>
        </div>
        <div className="flex gap-4 justify-center md:justify-start" style={{ color: C.muted }}>
          <span>Impressum</span><span>Datenschutz</span><span>AGB</span>
        </div>
      </footer>

      {/* Quiz modal */}
      {quizOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "#241809AA" }} onClick={() => setQuizOpen(false)}>
          <div className="w-full max-w-md" style={{ background: C.bg, border: `1px solid ${C.line}` }} onClick={(e) => e.stopPropagation()}>
            {quizResult ? (
              <div className="p-8 text-center">
                <div className="text-xs tracked uppercase mb-4" style={{ color: C.gold }}>Dein perfekter Duft</div>
                <ProductVisual p={quizResult} size={0.9} />
                <div className="font-display text-2xl mt-4">ÉLAN {quizResult.code}</div>
                <div className="text-xs italic mt-1" style={{ color: C.gold }}>{quizResult.insp}</div>
                <div className="text-sm mt-3" style={{ color: C.muted }}>{quizResult.accord}</div>
                <div className="font-display text-xl mt-4">{fmt(PRICE[50])} <span className="text-xs" style={{ color: C.muted }}>(50ml)</span></div>
                <button onClick={() => { addToCart(quizResult.id, 50); setQuizOpen(false); }} className="btn-gold mt-6 w-full py-3 text-xs tracked uppercase flex items-center justify-center gap-2">
                  <Plus size={13} /> In den Warenkorb
                </button>
                <button onClick={() => setQuizOpen(false)} className="text-xs mt-4 btn-ghost" style={{ color: C.muted, background: "none", border: "none" }}>Schließen</button>
              </div>
            ) : <Quiz onResult={setQuizResult} onClose={() => setQuizOpen(false)} />}
          </div>
        </div>
      )}

      {/* Cart overlay */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end" style={{ background: "#241809AA" }} onClick={() => setCartOpen(false)}>
          <div className="drawer w-full max-w-sm h-full flex flex-col overflow-y-auto" style={{ background: C.surface, borderLeft: `1px solid ${C.line}` }} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: `1px solid ${C.line}` }}>
              <div className="font-display text-2xl">Warenkorb</div>
              <button onClick={() => setCartOpen(false)} aria-label="Schließen" className="btn-ghost" style={{ background: "none", border: "none" }}><X size={20} /></button>
            </div>

            <div className="px-6 py-4">
              {cartItems.length === 0 ? (
                <div className="text-sm mt-10 text-center" style={{ color: C.muted }}>Dein Warenkorb ist noch leer.</div>
              ) : cartItems.map((i) => (
                <div key={i.key} className="flex items-center gap-4 py-4" style={{ borderBottom: `1px solid ${C.line}` }}>
                  <div className="shrink-0"><ProductVisual p={i} size={0.45} /></div>
                  <div className="flex-1">
                    <div className="font-display text-lg">ÉLAN {i.code} <span className="text-xs" style={{ color: C.muted }}>({i.size}ml)</span></div>
                    <div className="text-xs italic" style={{ color: C.gold }}>{i.insp}</div>
                    <div className="text-sm mt-1" style={{ color: C.ink }}>{fmt(i.unitPrice)}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => changeQty(i.key, -1)} style={{ border: `1px solid ${C.line}` }} className="w-7 h-7 flex items-center justify-center btn-ghost"><Minus size={12} /></button>
                    <span className="w-5 text-center text-sm">{i.qty}</span>
                    <button onClick={() => changeQty(i.key, 1)} style={{ border: `1px solid ${C.line}` }} className="w-7 h-7 flex items-center justify-center btn-ghost"><Plus size={12} /></button>
                  </div>
                </div>
              ))}
            </div>

            {cartItems.length > 0 && (
              <div className="px-6 py-6" style={{ borderTop: `1px solid ${C.line}` }}>
                <div className="flex justify-between text-sm mb-1" style={{ color: C.muted }}><span>Zwischensumme</span><span>{fmt(total)}</span></div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm mb-1" style={{ color: C.gold }}>
                    <span className="flex items-center gap-1"><Percent size={12} /> Mengenrabatt (-10%)</span><span>-{fmt(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm mb-1" style={{ color: C.muted }}><span>Versand</span><span>{shipping === 0 ? "kostenlos" : fmt(shipping)}</span></div>
                {count > 0 && count < 3 && <div className="text-[11px] mb-3" style={{ color: C.gold }}>Noch {3 - count} Flasche(n) für Gratis Versand + 10% Rabatt!</div>}
                <div className="flex justify-between font-display text-2xl mb-5"><span>Gesamt</span><span style={{ color: C.gold }}>{fmt(grandTotal)}</span></div>

                <div className="text-xs tracked uppercase mb-3" style={{ color: C.gold }}>Lieferadresse</div>
                <div className="flex flex-col gap-2 mb-5">
                  <input className="el-input px-3 py-2 text-sm" placeholder="Vor- und Nachname" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  <input className="el-input px-3 py-2 text-sm" placeholder="Adresse (Straße, Nr.)" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                  <div className="flex gap-2">
                    <input className="el-input px-3 py-2 text-sm w-24" placeholder="PLZ" value={form.plz} onChange={(e) => setForm({ ...form, plz: e.target.value })} />
                    <input className="el-input px-3 py-2 text-sm flex-1" placeholder="Ort" value={form.ort} onChange={(e) => setForm({ ...form, ort: e.target.value })} />
                  </div>
                  <input className="el-input px-3 py-2 text-sm" placeholder="Land" value={form.land} onChange={(e) => setForm({ ...form, land: e.target.value })} />
                </div>

                <button onClick={sendToInstagram} disabled={!formValid} className="btn-gold w-full py-3 text-xs tracked uppercase flex items-center justify-center gap-2">
                  <Send size={14} /> Bestellung per Instagram senden
                </button>
                <div className="flex items-center justify-center gap-1 text-[11px] mt-3" style={{ color: C.muted }}>
                  <ShieldCheck size={12} /> Zahlung per PayPal oder Überweisung — nach Absprache im Chat
                </div>
                {!formValid && <div className="text-[11px] mt-2 text-center" style={{ color: C.gold }}>Bitte fülle alle Adressfelder aus.</div>}
                {copied && <div className="flex items-center justify-center gap-1 text-xs mt-3" style={{ color: C.gold }}><Check size={13} /> Bestellung kopiert — in Insta einfügen</div>}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Toast — kurze Bestätigung statt Warenkorb automatisch zu öffnen */}
      {toast && (
        <div
          className="fixed bottom-6 left-1/2 z-[60] px-5 py-3 text-xs tracked uppercase"
          style={{ transform: "translateX(-50%)", background: C.ink, color: C.goldHi, boxShadow: "0 10px 30px -10px rgba(36,24,9,0.5)" }}
        >
          {toast}
        </div>
      )}
    </div>
  );
}
