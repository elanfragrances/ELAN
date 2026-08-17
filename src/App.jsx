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

const FAMILIES = ["Würzig", "Honig & Gourmand", "Holzig", "Blumig", "Frisch & Zitrus", "Orientalisch", "Leder"];
const OCCASIONS = ["Sommer", "Winter", "Allrounder", "Date Night", "Büro & Alltag"];
const GENDERS = ["Damen", "Herren", "Unisex"];
const SIZES = [30, 50, 100];
const PRICE = { 30: 25, 50: 35, 100: 45 };

const PRODUCTS = [
{"id": 1, "code": "No. 001", "insp": "riecht wie: Aventus", "note": "nische", "gender": "Herren", "family": "W\u00fcrzig", "occasion": "Sommer", "bestseller": true},
{"id": 2, "code": "No. 002", "insp": "riecht wie: Green Irish Tweed", "note": "nische", "gender": "Damen", "family": "Honig & Gourmand", "occasion": "Winter", "bestseller": true},
{"id": 3, "code": "No. 003", "insp": "riecht wie: Silver Mountain Water", "note": "nische", "gender": "Unisex", "family": "Holzig", "occasion": "Allrounder", "bestseller": true},
{"id": 4, "code": "No. 004", "insp": "riecht wie: Mill\u00e9sime Imp\u00e9rial", "note": "nische", "gender": "Herren", "family": "Blumig", "occasion": "Date Night", "bestseller": true},
{"id": 5, "code": "No. 005", "insp": "riecht wie: Viking", "note": "nische", "gender": "Damen", "family": "Frisch & Zitrus", "occasion": "B\u00fcro & Alltag", "bestseller": true},
{"id": 6, "code": "No. 006", "insp": "riecht wie: Original Santal", "note": "nische", "gender": "Unisex", "family": "Orientalisch", "occasion": "Sommer", "bestseller": true},
{"id": 7, "code": "No. 007", "insp": "riecht wie: Original Vetiver", "note": "nische", "gender": "Herren", "family": "Leder", "occasion": "Winter", "bestseller": true},
{"id": 8, "code": "No. 008", "insp": "riecht wie: Royal Oud", "note": "nische", "gender": "Damen", "family": "W\u00fcrzig", "occasion": "Allrounder", "bestseller": true},
{"id": 9, "code": "No. 009", "insp": "riecht wie: Aventus Cologne", "note": "nische", "gender": "Unisex", "family": "Honig & Gourmand", "occasion": "Date Night", "bestseller": true},
{"id": 10, "code": "No. 010", "insp": "riecht wie: Virgin Island Water", "note": "nische", "gender": "Herren", "family": "Holzig", "occasion": "B\u00fcro & Alltag", "bestseller": true},
{"id": 11, "code": "No. 011", "insp": "riecht wie: Himalaya", "note": "nische", "gender": "Damen", "family": "Blumig", "occasion": "Sommer", "bestseller": true},
{"id": 12, "code": "No. 012", "insp": "riecht wie: Erolfa", "note": "nische", "gender": "Unisex", "family": "Frisch & Zitrus", "occasion": "Winter", "bestseller": true},
{"id": 13, "code": "No. 013", "insp": "riecht wie: Absolu Aventus", "note": "nische", "gender": "Herren", "family": "Orientalisch", "occasion": "Allrounder", "bestseller": true},
{"id": 14, "code": "No. 014", "insp": "riecht wie: Royal Mayfair", "note": "nische", "gender": "Damen", "family": "Leder", "occasion": "Date Night", "bestseller": true},
{"id": 15, "code": "No. 015", "insp": "riecht wie: Viking Cologne", "note": "nische", "gender": "Unisex", "family": "W\u00fcrzig", "occasion": "B\u00fcro & Alltag", "bestseller": true},
{"id": 16, "code": "No. 016", "insp": "riecht wie: Neroli Sauvage", "note": "nische", "gender": "Herren", "family": "Honig & Gourmand", "occasion": "Sommer", "bestseller": true},
{"id": 17, "code": "No. 017", "insp": "riecht wie: Bois du Portugal", "note": "nische", "gender": "Damen", "family": "Holzig", "occasion": "Winter", "bestseller": true},
{"id": 18, "code": "No. 018", "insp": "riecht wie: Tabarome Millesime", "note": "nische", "gender": "Unisex", "family": "Blumig", "occasion": "Allrounder", "bestseller": true},
{"id": 19, "code": "No. 019", "insp": "riecht wie: Aventus for Her", "note": "nische", "gender": "Herren", "family": "Frisch & Zitrus", "occasion": "Date Night", "bestseller": true},
{"id": 20, "code": "No. 020", "insp": "riecht wie: Wind Flowers", "note": "nische", "gender": "Damen", "family": "Orientalisch", "occasion": "B\u00fcro & Alltag", "bestseller": true},
{"id": 21, "code": "No. 021", "insp": "riecht wie: Carmina", "note": "nische", "gender": "Unisex", "family": "Leder", "occasion": "Sommer", "bestseller": true},
{"id": 22, "code": "No. 022", "insp": "riecht wie: Love in White", "note": "nische", "gender": "Herren", "family": "W\u00fcrzig", "occasion": "Winter", "bestseller": true},
{"id": 23, "code": "No. 023", "insp": "riecht wie: Love in Black", "note": "nische", "gender": "Damen", "family": "Honig & Gourmand", "occasion": "Allrounder", "bestseller": true},
{"id": 24, "code": "No. 024", "insp": "riecht wie: Fleurissimo", "note": "nische", "gender": "Unisex", "family": "Holzig", "occasion": "Date Night", "bestseller": true},
{"id": 25, "code": "No. 025", "insp": "riecht wie: Layton", "note": "nische", "gender": "Herren", "family": "Blumig", "occasion": "B\u00fcro & Alltag", "bestseller": true},
{"id": 26, "code": "No. 026", "insp": "riecht wie: Pegasus", "note": "nische", "gender": "Damen", "family": "Frisch & Zitrus", "occasion": "Sommer", "bestseller": true},
{"id": 27, "code": "No. 027", "insp": "riecht wie: Herod", "note": "nische", "gender": "Unisex", "family": "Orientalisch", "occasion": "Winter", "bestseller": true},
{"id": 28, "code": "No. 028", "insp": "riecht wie: Percival", "note": "nische", "gender": "Herren", "family": "Leder", "occasion": "Allrounder", "bestseller": true},
{"id": 29, "code": "No. 029", "insp": "riecht wie: Carlisle", "note": "nische", "gender": "Damen", "family": "W\u00fcrzig", "occasion": "Date Night", "bestseller": true},
{"id": 30, "code": "No. 030", "insp": "riecht wie: Oajan", "note": "nische", "gender": "Unisex", "family": "Honig & Gourmand", "occasion": "B\u00fcro & Alltag", "bestseller": true},
{"id": 31, "code": "No. 031", "insp": "riecht wie: Sedley", "note": "nische", "gender": "Herren", "family": "Holzig", "occasion": "Sommer", "bestseller": true},
{"id": 32, "code": "No. 032", "insp": "riecht wie: Galloway", "note": "nische", "gender": "Damen", "family": "Blumig", "occasion": "Winter", "bestseller": true},
{"id": 33, "code": "No. 033", "insp": "riecht wie: Kalan", "note": "nische", "gender": "Unisex", "family": "Frisch & Zitrus", "occasion": "Allrounder", "bestseller": true},
{"id": 34, "code": "No. 034", "insp": "riecht wie: Godolphin", "note": "nische", "gender": "Herren", "family": "Orientalisch", "occasion": "Date Night", "bestseller": true},
{"id": 35, "code": "No. 035", "insp": "riecht wie: Greenley", "note": "nische", "gender": "Damen", "family": "Leder", "occasion": "B\u00fcro & Alltag", "bestseller": true},
{"id": 36, "code": "No. 036", "insp": "riecht wie: Haltane", "note": "nische", "gender": "Unisex", "family": "W\u00fcrzig", "occasion": "Sommer", "bestseller": true},
{"id": 37, "code": "No. 037", "insp": "riecht wie: Altha\u00efr", "note": "nische", "gender": "Herren", "family": "Honig & Gourmand", "occasion": "Winter", "bestseller": true},
{"id": 38, "code": "No. 038", "insp": "riecht wie: Delina", "note": "nische", "gender": "Damen", "family": "Holzig", "occasion": "Allrounder", "bestseller": true},
{"id": 39, "code": "No. 039", "insp": "riecht wie: Delina Exclusif", "note": "nische", "gender": "Unisex", "family": "Blumig", "occasion": "Date Night", "bestseller": true},
{"id": 40, "code": "No. 040", "insp": "riecht wie: Delina La Ros\u00e9e", "note": "nische", "gender": "Herren", "family": "Frisch & Zitrus", "occasion": "B\u00fcro & Alltag", "bestseller": true},
{"id": 41, "code": "No. 041", "insp": "riecht wie: Cassili", "note": "nische", "gender": "Damen", "family": "Orientalisch", "occasion": "Sommer", "bestseller": true},
{"id": 42, "code": "No. 042", "insp": "riecht wie: Meliora", "note": "nische", "gender": "Unisex", "family": "Leder", "occasion": "Winter", "bestseller": true},
{"id": 43, "code": "No. 043", "insp": "riecht wie: Oriana", "note": "nische", "gender": "Herren", "family": "W\u00fcrzig", "occasion": "Allrounder", "bestseller": true},
{"id": 44, "code": "No. 044", "insp": "riecht wie: Valaya", "note": "nische", "gender": "Damen", "family": "Honig & Gourmand", "occasion": "Date Night", "bestseller": true},
{"id": 45, "code": "No. 045", "insp": "riecht wie: Pegasus Exclusif", "note": "nische", "gender": "Unisex", "family": "Holzig", "occasion": "B\u00fcro & Alltag", "bestseller": true},
{"id": 46, "code": "No. 046", "insp": "riecht wie: Layton Exclusif", "note": "nische", "gender": "Herren", "family": "Blumig", "occasion": "Sommer", "bestseller": true},
{"id": 47, "code": "No. 047", "insp": "riecht wie: Darley", "note": "nische", "gender": "Damen", "family": "Frisch & Zitrus", "occasion": "Winter", "bestseller": true},
{"id": 48, "code": "No. 048", "insp": "riecht wie: Habdan", "note": "nische", "gender": "Unisex", "family": "Orientalisch", "occasion": "Allrounder", "bestseller": true},
{"id": 49, "code": "No. 049", "insp": "riecht wie: Naxos", "note": "nische", "gender": "Herren", "family": "Leder", "occasion": "Date Night", "bestseller": true},
{"id": 50, "code": "No. 050", "insp": "riecht wie: Erba Pura", "note": "nische", "gender": "Damen", "family": "W\u00fcrzig", "occasion": "B\u00fcro & Alltag", "bestseller": true},
{"id": 51, "code": "No. 051", "insp": "riecht wie: Alexandria II", "note": "nische", "gender": "Unisex", "family": "Honig & Gourmand", "occasion": "Sommer", "bestseller": false},
{"id": 52, "code": "No. 052", "insp": "riecht wie: Torino21", "note": "nische", "gender": "Herren", "family": "Holzig", "occasion": "Winter", "bestseller": false},
{"id": 53, "code": "No. 053", "insp": "riecht wie: Torino22", "note": "nische", "gender": "Damen", "family": "Blumig", "occasion": "Allrounder", "bestseller": false},
{"id": 54, "code": "No. 054", "insp": "riecht wie: Accento", "note": "nische", "gender": "Unisex", "family": "Frisch & Zitrus", "occasion": "Date Night", "bestseller": false},
{"id": 55, "code": "No. 055", "insp": "riecht wie: Accento Overdose", "note": "nische", "gender": "Herren", "family": "Orientalisch", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 56, "code": "No. 056", "insp": "riecht wie: Cruz del Sur II", "note": "nische", "gender": "Damen", "family": "Leder", "occasion": "Sommer", "bestseller": false},
{"id": 57, "code": "No. 057", "insp": "riecht wie: Commandante", "note": "nische", "gender": "Unisex", "family": "W\u00fcrzig", "occasion": "Winter", "bestseller": false},
{"id": 58, "code": "No. 058", "insp": "riecht wie: More Than Words", "note": "nische", "gender": "Herren", "family": "Honig & Gourmand", "occasion": "Allrounder", "bestseller": false},
{"id": 59, "code": "No. 059", "insp": "riecht wie: 40 Knots", "note": "nische", "gender": "Damen", "family": "Holzig", "occasion": "Date Night", "bestseller": false},
{"id": 60, "code": "No. 060", "insp": "riecht wie: Ivory Route", "note": "nische", "gender": "Unisex", "family": "Blumig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 61, "code": "No. 061", "insp": "riecht wie: Renaissance", "note": "nische", "gender": "Herren", "family": "Frisch & Zitrus", "occasion": "Sommer", "bestseller": false},
{"id": 62, "code": "No. 062", "insp": "riecht wie: Zefiro", "note": "nische", "gender": "Damen", "family": "Orientalisch", "occasion": "Winter", "bestseller": false},
{"id": 63, "code": "No. 063", "insp": "riecht wie: Decas", "note": "nische", "gender": "Unisex", "family": "Leder", "occasion": "Allrounder", "bestseller": false},
{"id": 64, "code": "No. 064", "insp": "riecht wie: Richwood", "note": "nische", "gender": "Herren", "family": "W\u00fcrzig", "occasion": "Date Night", "bestseller": false},
{"id": 65, "code": "No. 065", "insp": "riecht wie: Symphony", "note": "nische", "gender": "Damen", "family": "Honig & Gourmand", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 66, "code": "No. 066", "insp": "riecht wie: Tony Iommi Monkey Special", "note": "nische", "gender": "Unisex", "family": "Holzig", "occasion": "Sommer", "bestseller": false},
{"id": 67, "code": "No. 067", "insp": "riecht wie: Uden", "note": "nische", "gender": "Herren", "family": "Blumig", "occasion": "Winter", "bestseller": false},
{"id": 68, "code": "No. 068", "insp": "riecht wie: Uden Overdose", "note": "nische", "gender": "Damen", "family": "Frisch & Zitrus", "occasion": "Allrounder", "bestseller": false},
{"id": 69, "code": "No. 069", "insp": "riecht wie: Casamorati Lira", "note": "nische", "gender": "Unisex", "family": "Orientalisch", "occasion": "Date Night", "bestseller": false},
{"id": 70, "code": "No. 070", "insp": "riecht wie: Casamorati Mefisto", "note": "nische", "gender": "Herren", "family": "Leder", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 71, "code": "No. 071", "insp": "riecht wie: Casamorati Mefisto Gentiluomo", "note": "nische", "gender": "Damen", "family": "W\u00fcrzig", "occasion": "Sommer", "bestseller": false},
{"id": 72, "code": "No. 072", "insp": "riecht wie: Casamorati Dama Bianca", "note": "nische", "gender": "Unisex", "family": "Honig & Gourmand", "occasion": "Winter", "bestseller": false},
{"id": 73, "code": "No. 073", "insp": "riecht wie: Casamorati Italica", "note": "nische", "gender": "Herren", "family": "Holzig", "occasion": "Allrounder", "bestseller": false},
{"id": 74, "code": "No. 074", "insp": "riecht wie: Casamorati Bouquet Ideale", "note": "nische", "gender": "Damen", "family": "Blumig", "occasion": "Date Night", "bestseller": false},
{"id": 75, "code": "No. 075", "insp": "riecht wie: Tobacco Vanille", "note": "nische", "gender": "Unisex", "family": "Frisch & Zitrus", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 76, "code": "No. 076", "insp": "riecht wie: Oud Wood", "note": "nische", "gender": "Herren", "family": "Orientalisch", "occasion": "Sommer", "bestseller": false},
{"id": 77, "code": "No. 077", "insp": "riecht wie: Tuscan Leather", "note": "nische", "gender": "Damen", "family": "Leder", "occasion": "Winter", "bestseller": false},
{"id": 78, "code": "No. 078", "insp": "riecht wie: Noir Extreme", "note": "nische", "gender": "Unisex", "family": "W\u00fcrzig", "occasion": "Allrounder", "bestseller": false},
{"id": 79, "code": "No. 079", "insp": "riecht wie: Fucking Fabulous", "note": "nische", "gender": "Herren", "family": "Honig & Gourmand", "occasion": "Date Night", "bestseller": false},
{"id": 80, "code": "No. 080", "insp": "riecht wie: Lost Cherry", "note": "nische", "gender": "Damen", "family": "Holzig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 81, "code": "No. 081", "insp": "riecht wie: Bitter Peach", "note": "nische", "gender": "Unisex", "family": "Blumig", "occasion": "Sommer", "bestseller": false},
{"id": 82, "code": "No. 082", "insp": "riecht wie: Soleil Blanc", "note": "nische", "gender": "Herren", "family": "Frisch & Zitrus", "occasion": "Winter", "bestseller": false},
{"id": 83, "code": "No. 083", "insp": "riecht wie: Neroli Portofino", "note": "nische", "gender": "Damen", "family": "Orientalisch", "occasion": "Allrounder", "bestseller": false},
{"id": 84, "code": "No. 084", "insp": "riecht wie: Ombr\u00e9 Leather", "note": "nische", "gender": "Unisex", "family": "Leder", "occasion": "Date Night", "bestseller": false},
{"id": 85, "code": "No. 085", "insp": "riecht wie: Ombr\u00e9 Leather Parfum", "note": "nische", "gender": "Herren", "family": "W\u00fcrzig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 86, "code": "No. 086", "insp": "riecht wie: Black Orchid", "note": "nische", "gender": "Damen", "family": "Honig & Gourmand", "occasion": "Sommer", "bestseller": false},
{"id": 87, "code": "No. 087", "insp": "riecht wie: Velvet Orchid", "note": "nische", "gender": "Unisex", "family": "Holzig", "occasion": "Winter", "bestseller": false},
{"id": 88, "code": "No. 088", "insp": "riecht wie: Costa Azzurra", "note": "nische", "gender": "Herren", "family": "Blumig", "occasion": "Allrounder", "bestseller": false},
{"id": 89, "code": "No. 089", "insp": "riecht wie: Beau de Jour", "note": "nische", "gender": "Damen", "family": "Frisch & Zitrus", "occasion": "Date Night", "bestseller": false},
{"id": 90, "code": "No. 090", "insp": "riecht wie: Plum Japonais", "note": "nische", "gender": "Unisex", "family": "Orientalisch", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 91, "code": "No. 091", "insp": "riecht wie: Tobacco Oud", "note": "nische", "gender": "Herren", "family": "Leder", "occasion": "Sommer", "bestseller": false},
{"id": 92, "code": "No. 092", "insp": "riecht wie: Caf\u00e9 Rose", "note": "nische", "gender": "Damen", "family": "W\u00fcrzig", "occasion": "Winter", "bestseller": false},
{"id": 93, "code": "No. 093", "insp": "riecht wie: Electric Cherry", "note": "nische", "gender": "Unisex", "family": "Honig & Gourmand", "occasion": "Allrounder", "bestseller": false},
{"id": 94, "code": "No. 094", "insp": "riecht wie: Cherry Smoke", "note": "nische", "gender": "Herren", "family": "Holzig", "occasion": "Date Night", "bestseller": false},
{"id": 95, "code": "No. 095", "insp": "riecht wie: Soleil de Feu", "note": "nische", "gender": "Damen", "family": "Blumig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 96, "code": "No. 096", "insp": "riecht wie: Myrrhe Myst\u00e8re", "note": "nische", "gender": "Unisex", "family": "Frisch & Zitrus", "occasion": "Sommer", "bestseller": false},
{"id": 97, "code": "No. 097", "insp": "riecht wie: Vanilla Sex", "note": "nische", "gender": "Herren", "family": "Orientalisch", "occasion": "Winter", "bestseller": false},
{"id": 98, "code": "No. 098", "insp": "riecht wie: Ebene Fume", "note": "nische", "gender": "Damen", "family": "Leder", "occasion": "Allrounder", "bestseller": false},
{"id": 99, "code": "No. 099", "insp": "riecht wie: Grey Vetiver", "note": "nische", "gender": "Unisex", "family": "W\u00fcrzig", "occasion": "Date Night", "bestseller": false},
{"id": 100, "code": "No. 100", "insp": "riecht wie: Noir de Noir", "note": "nische", "gender": "Herren", "family": "Honig & Gourmand", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 101, "code": "No. 101", "insp": "riecht wie: Baccarat Rouge 540", "note": "nische", "gender": "Damen", "family": "Holzig", "occasion": "Sommer", "bestseller": false},
{"id": 102, "code": "No. 102", "insp": "riecht wie: Baccarat Rouge 540 Extrait", "note": "nische", "gender": "Unisex", "family": "Blumig", "occasion": "Winter", "bestseller": false},
{"id": 103, "code": "No. 103", "insp": "riecht wie: Grand Soir", "note": "nische", "gender": "Herren", "family": "Frisch & Zitrus", "occasion": "Allrounder", "bestseller": false},
{"id": 104, "code": "No. 104", "insp": "riecht wie: Gentle Fluidity Gold", "note": "nische", "gender": "Damen", "family": "Orientalisch", "occasion": "Date Night", "bestseller": false},
{"id": 105, "code": "No. 105", "insp": "riecht wie: Gentle Fluidity Silver", "note": "nische", "gender": "Unisex", "family": "Leder", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 106, "code": "No. 106", "insp": "riecht wie: 724", "note": "nische", "gender": "Herren", "family": "W\u00fcrzig", "occasion": "Sommer", "bestseller": false},
{"id": 107, "code": "No. 107", "insp": "riecht wie: Aqua Universalis", "note": "nische", "gender": "Damen", "family": "Honig & Gourmand", "occasion": "Winter", "bestseller": false},
{"id": 108, "code": "No. 108", "insp": "riecht wie: Aqua Vitae", "note": "nische", "gender": "Unisex", "family": "Holzig", "occasion": "Allrounder", "bestseller": false},
{"id": 109, "code": "No. 109", "insp": "riecht wie: Aqua C\u00e9lestia", "note": "nische", "gender": "Herren", "family": "Blumig", "occasion": "Date Night", "bestseller": false},
{"id": 110, "code": "No. 110", "insp": "riecht wie: Oud Satin Mood", "note": "nische", "gender": "Damen", "family": "Frisch & Zitrus", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 111, "code": "No. 111", "insp": "riecht wie: Oud Silk Mood", "note": "nische", "gender": "Unisex", "family": "Orientalisch", "occasion": "Sommer", "bestseller": false},
{"id": 112, "code": "No. 112", "insp": "riecht wie: Amyris Homme", "note": "nische", "gender": "Herren", "family": "Leder", "occasion": "Winter", "bestseller": false},
{"id": 113, "code": "No. 113", "insp": "riecht wie: L'Homme \u00c0 la Rose", "note": "nische", "gender": "Damen", "family": "W\u00fcrzig", "occasion": "Allrounder", "bestseller": false},
{"id": 114, "code": "No. 114", "insp": "riecht wie: \u00c0 la Rose", "note": "nische", "gender": "Unisex", "family": "Honig & Gourmand", "occasion": "Date Night", "bestseller": false},
{"id": 115, "code": "No. 115", "insp": "riecht wie: Petit Matin", "note": "nische", "gender": "Herren", "family": "Holzig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 116, "code": "No. 116", "insp": "riecht wie: APOM Pour Homme", "note": "nische", "gender": "Damen", "family": "Blumig", "occasion": "Sommer", "bestseller": false},
{"id": 117, "code": "No. 117", "insp": "riecht wie: Imagination", "note": "nische", "gender": "Unisex", "family": "Frisch & Zitrus", "occasion": "Winter", "bestseller": false},
{"id": 118, "code": "No. 118", "insp": "riecht wie: L'Immensit\u00e9", "note": "nische", "gender": "Herren", "family": "Orientalisch", "occasion": "Allrounder", "bestseller": false},
{"id": 119, "code": "No. 119", "insp": "riecht wie: Ombre Nomade", "note": "nische", "gender": "Damen", "family": "Leder", "occasion": "Date Night", "bestseller": false},
{"id": 120, "code": "No. 120", "insp": "riecht wie: Afternoon Swim", "note": "nische", "gender": "Unisex", "family": "W\u00fcrzig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 121, "code": "No. 121", "insp": "riecht wie: Pacific Chill", "note": "nische", "gender": "Herren", "family": "Honig & Gourmand", "occasion": "Sommer", "bestseller": false},
{"id": 122, "code": "No. 122", "insp": "riecht wie: M\u00e9t\u00e9ore", "note": "nische", "gender": "Damen", "family": "Holzig", "occasion": "Winter", "bestseller": false},
{"id": 123, "code": "No. 123", "insp": "riecht wie: Sur la Route", "note": "nische", "gender": "Unisex", "family": "Blumig", "occasion": "Allrounder", "bestseller": false},
{"id": 124, "code": "No. 124", "insp": "riecht wie: Au Hasard", "note": "nische", "gender": "Herren", "family": "Frisch & Zitrus", "occasion": "Date Night", "bestseller": false},
{"id": 125, "code": "No. 125", "insp": "riecht wie: Nuit de Feu", "note": "nische", "gender": "Damen", "family": "Orientalisch", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 126, "code": "No. 126", "insp": "riecht wie: Les Sables Roses", "note": "nische", "gender": "Unisex", "family": "Leder", "occasion": "Sommer", "bestseller": false},
{"id": 127, "code": "No. 127", "insp": "riecht wie: Fleur du D\u00e9sert", "note": "nische", "gender": "Herren", "family": "W\u00fcrzig", "occasion": "Winter", "bestseller": false},
{"id": 128, "code": "No. 128", "insp": "riecht wie: Attrape-R\u00eaves", "note": "nische", "gender": "Damen", "family": "Honig & Gourmand", "occasion": "Allrounder", "bestseller": false},
{"id": 129, "code": "No. 129", "insp": "riecht wie: Rose des Vents", "note": "nische", "gender": "Unisex", "family": "Holzig", "occasion": "Date Night", "bestseller": false},
{"id": 130, "code": "No. 130", "insp": "riecht wie: Spell On You", "note": "nische", "gender": "Herren", "family": "Blumig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 131, "code": "No. 131", "insp": "riecht wie: Symphonie", "note": "nische", "gender": "Damen", "family": "Frisch & Zitrus", "occasion": "Sommer", "bestseller": false},
{"id": 132, "code": "No. 132", "insp": "riecht wie: Stellar Times", "note": "nische", "gender": "Unisex", "family": "Orientalisch", "occasion": "Winter", "bestseller": false},
{"id": 133, "code": "No. 133", "insp": "riecht wie: Cosmic Cloud", "note": "nische", "gender": "Herren", "family": "Leder", "occasion": "Allrounder", "bestseller": false},
{"id": 134, "code": "No. 134", "insp": "riecht wie: Sun Song", "note": "nische", "gender": "Damen", "family": "W\u00fcrzig", "occasion": "Date Night", "bestseller": false},
{"id": 135, "code": "No. 135", "insp": "riecht wie: Sauvage EDT", "note": "nische", "gender": "Unisex", "family": "Honig & Gourmand", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 136, "code": "No. 136", "insp": "riecht wie: Sauvage EDP", "note": "nische", "gender": "Herren", "family": "Holzig", "occasion": "Sommer", "bestseller": false},
{"id": 137, "code": "No. 137", "insp": "riecht wie: Sauvage Parfum", "note": "nische", "gender": "Damen", "family": "Blumig", "occasion": "Winter", "bestseller": false},
{"id": 138, "code": "No. 138", "insp": "riecht wie: Sauvage Elixir", "note": "nische", "gender": "Unisex", "family": "Frisch & Zitrus", "occasion": "Allrounder", "bestseller": false},
{"id": 139, "code": "No. 139", "insp": "riecht wie: Fahrenheit EDT", "note": "nische", "gender": "Herren", "family": "Orientalisch", "occasion": "Date Night", "bestseller": false},
{"id": 140, "code": "No. 140", "insp": "riecht wie: Fahrenheit Le Parfum", "note": "nische", "gender": "Damen", "family": "Leder", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 141, "code": "No. 141", "insp": "riecht wie: Dior Homme Intense", "note": "nische", "gender": "Unisex", "family": "W\u00fcrzig", "occasion": "Sommer", "bestseller": false},
{"id": 142, "code": "No. 142", "insp": "riecht wie: Dior Homme Sport", "note": "nische", "gender": "Herren", "family": "Honig & Gourmand", "occasion": "Winter", "bestseller": false},
{"id": 143, "code": "No. 143", "insp": "riecht wie: Dior Homme 2020", "note": "nische", "gender": "Damen", "family": "Holzig", "occasion": "Allrounder", "bestseller": false},
{"id": 144, "code": "No. 144", "insp": "riecht wie: Dior Homme Original", "note": "nische", "gender": "Unisex", "family": "Blumig", "occasion": "Date Night", "bestseller": false},
{"id": 145, "code": "No. 145", "insp": "riecht wie: Gris Dior", "note": "nische", "gender": "Herren", "family": "Frisch & Zitrus", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 146, "code": "No. 146", "insp": "riecht wie: Bois d'Argent", "note": "nische", "gender": "Damen", "family": "Orientalisch", "occasion": "Sommer", "bestseller": false},
{"id": 147, "code": "No. 147", "insp": "riecht wie: Ambre Nuit", "note": "nische", "gender": "Unisex", "family": "Leder", "occasion": "Winter", "bestseller": false},
{"id": 148, "code": "No. 148", "insp": "riecht wie: Feve Delicieuse", "note": "nische", "gender": "Herren", "family": "W\u00fcrzig", "occasion": "Allrounder", "bestseller": false},
{"id": 149, "code": "No. 149", "insp": "riecht wie: Oud Ispahan", "note": "nische", "gender": "Damen", "family": "Honig & Gourmand", "occasion": "Date Night", "bestseller": false},
{"id": 150, "code": "No. 150", "insp": "riecht wie: Tobacolor", "note": "nische", "gender": "Unisex", "family": "Holzig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 151, "code": "No. 151", "insp": "riecht wie: Eden-Roc", "note": "nische", "gender": "Herren", "family": "Blumig", "occasion": "Sommer", "bestseller": false},
{"id": 152, "code": "No. 152", "insp": "riecht wie: Purple Oud", "note": "nische", "gender": "Damen", "family": "Frisch & Zitrus", "occasion": "Winter", "bestseller": false},
{"id": 153, "code": "No. 153", "insp": "riecht wie: Vanilla Diorama", "note": "nische", "gender": "Unisex", "family": "Orientalisch", "occasion": "Allrounder", "bestseller": false},
{"id": 154, "code": "No. 154", "insp": "riecht wie: Hypnotic Poison", "note": "nische", "gender": "Herren", "family": "Leder", "occasion": "Date Night", "bestseller": false},
{"id": 155, "code": "No. 155", "insp": "riecht wie: J'adore", "note": "nische", "gender": "Damen", "family": "W\u00fcrzig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 156, "code": "No. 156", "insp": "riecht wie: Miss Dior", "note": "nische", "gender": "Unisex", "family": "Honig & Gourmand", "occasion": "Sommer", "bestseller": false},
{"id": 157, "code": "No. 157", "insp": "riecht wie: Pure Poison", "note": "nische", "gender": "Herren", "family": "Holzig", "occasion": "Winter", "bestseller": false},
{"id": 158, "code": "No. 158", "insp": "riecht wie: Dior Addict", "note": "nische", "gender": "Damen", "family": "Blumig", "occasion": "Allrounder", "bestseller": false},
{"id": 159, "code": "No. 159", "insp": "riecht wie: Bleu de Chanel EDT", "note": "nische", "gender": "Unisex", "family": "Frisch & Zitrus", "occasion": "Date Night", "bestseller": false},
{"id": 160, "code": "No. 160", "insp": "riecht wie: Bleu de Chanel EDP", "note": "nische", "gender": "Herren", "family": "Orientalisch", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 161, "code": "No. 161", "insp": "riecht wie: Bleu de Chanel Parfum", "note": "nische", "gender": "Damen", "family": "Leder", "occasion": "Sommer", "bestseller": false},
{"id": 162, "code": "No. 162", "insp": "riecht wie: Allure Homme Sport", "note": "nische", "gender": "Unisex", "family": "W\u00fcrzig", "occasion": "Winter", "bestseller": false},
{"id": 163, "code": "No. 163", "insp": "riecht wie: Allure Homme Sport Eau Extr\u00eame", "note": "nische", "gender": "Herren", "family": "Honig & Gourmand", "occasion": "Allrounder", "bestseller": false},
{"id": 164, "code": "No. 164", "insp": "riecht wie: Allure Homme Edition Blanche", "note": "nische", "gender": "Damen", "family": "Holzig", "occasion": "Date Night", "bestseller": false},
{"id": 165, "code": "No. 165", "insp": "riecht wie: \u00c9go\u00efste", "note": "nische", "gender": "Unisex", "family": "Blumig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 166, "code": "No. 166", "insp": "riecht wie: Platinum \u00c9go\u00efste", "note": "nische", "gender": "Herren", "family": "Frisch & Zitrus", "occasion": "Sommer", "bestseller": false},
{"id": 167, "code": "No. 167", "insp": "riecht wie: Coco Mademoiselle", "note": "nische", "gender": "Damen", "family": "Orientalisch", "occasion": "Winter", "bestseller": false},
{"id": 168, "code": "No. 168", "insp": "riecht wie: Chanel No. 5", "note": "nische", "gender": "Unisex", "family": "Leder", "occasion": "Allrounder", "bestseller": false},
{"id": 169, "code": "No. 169", "insp": "riecht wie: Chance Eau Tendre", "note": "nische", "gender": "Herren", "family": "W\u00fcrzig", "occasion": "Date Night", "bestseller": false},
{"id": 170, "code": "No. 170", "insp": "riecht wie: Chance Eau Fraiche", "note": "nische", "gender": "Damen", "family": "Honig & Gourmand", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 171, "code": "No. 171", "insp": "riecht wie: Coco Noir", "note": "nische", "gender": "Unisex", "family": "Holzig", "occasion": "Sommer", "bestseller": false},
{"id": 172, "code": "No. 172", "insp": "riecht wie: Gabrielle", "note": "nische", "gender": "Herren", "family": "Blumig", "occasion": "Winter", "bestseller": false},
{"id": 173, "code": "No. 173", "insp": "riecht wie: Sycomore", "note": "nische", "gender": "Damen", "family": "Frisch & Zitrus", "occasion": "Allrounder", "bestseller": false},
{"id": 174, "code": "No. 174", "insp": "riecht wie: Coromandel", "note": "nische", "gender": "Unisex", "family": "Orientalisch", "occasion": "Date Night", "bestseller": false},
{"id": 175, "code": "No. 175", "insp": "riecht wie: Le Male", "note": "nische", "gender": "Herren", "family": "Leder", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 176, "code": "No. 176", "insp": "riecht wie: Le Male Le Parfum", "note": "nische", "gender": "Damen", "family": "W\u00fcrzig", "occasion": "Sommer", "bestseller": false},
{"id": 177, "code": "No. 177", "insp": "riecht wie: Le Male Elixir", "note": "nische", "gender": "Unisex", "family": "Honig & Gourmand", "occasion": "Winter", "bestseller": false},
{"id": 178, "code": "No. 178", "insp": "riecht wie: Ultra Male", "note": "nische", "gender": "Herren", "family": "Holzig", "occasion": "Allrounder", "bestseller": false},
{"id": 179, "code": "No. 179", "insp": "riecht wie: Le Beau", "note": "nische", "gender": "Damen", "family": "Blumig", "occasion": "Date Night", "bestseller": false},
{"id": 180, "code": "No. 180", "insp": "riecht wie: Le Beau Le Parfum", "note": "nische", "gender": "Unisex", "family": "Frisch & Zitrus", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 181, "code": "No. 181", "insp": "riecht wie: Le Beau Paradise Garden", "note": "nische", "gender": "Herren", "family": "Orientalisch", "occasion": "Sommer", "bestseller": false},
{"id": 182, "code": "No. 182", "insp": "riecht wie: Scandal Pour Homme", "note": "nische", "gender": "Damen", "family": "Leder", "occasion": "Winter", "bestseller": false},
{"id": 183, "code": "No. 183", "insp": "riecht wie: Scandal Pour Homme Le Parfum", "note": "nische", "gender": "Unisex", "family": "W\u00fcrzig", "occasion": "Allrounder", "bestseller": false},
{"id": 184, "code": "No. 184", "insp": "riecht wie: Scandal Women", "note": "nische", "gender": "Herren", "family": "Honig & Gourmand", "occasion": "Date Night", "bestseller": false},
{"id": 185, "code": "No. 185", "insp": "riecht wie: Classique", "note": "nische", "gender": "Damen", "family": "Holzig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 186, "code": "No. 186", "insp": "riecht wie: La Belle", "note": "nische", "gender": "Unisex", "family": "Blumig", "occasion": "Sommer", "bestseller": false},
{"id": 187, "code": "No. 187", "insp": "riecht wie: La Belle Le Parfum", "note": "nische", "gender": "Herren", "family": "Frisch & Zitrus", "occasion": "Winter", "bestseller": false},
{"id": 188, "code": "No. 188", "insp": "riecht wie: Divine", "note": "nische", "gender": "Damen", "family": "Orientalisch", "occasion": "Allrounder", "bestseller": false},
{"id": 189, "code": "No. 189", "insp": "riecht wie: Y EDT", "note": "nische", "gender": "Unisex", "family": "Leder", "occasion": "Date Night", "bestseller": false},
{"id": 190, "code": "No. 190", "insp": "riecht wie: Y EDP", "note": "nische", "gender": "Herren", "family": "W\u00fcrzig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 191, "code": "No. 191", "insp": "riecht wie: Y Le Parfum", "note": "nische", "gender": "Damen", "family": "Honig & Gourmand", "occasion": "Sommer", "bestseller": false},
{"id": 192, "code": "No. 192", "insp": "riecht wie: Y Elixir", "note": "nische", "gender": "Unisex", "family": "Holzig", "occasion": "Winter", "bestseller": false},
{"id": 193, "code": "No. 193", "insp": "riecht wie: La Nuit de L'Homme", "note": "nische", "gender": "Herren", "family": "Blumig", "occasion": "Allrounder", "bestseller": false},
{"id": 194, "code": "No. 194", "insp": "riecht wie: L'Homme", "note": "nische", "gender": "Damen", "family": "Frisch & Zitrus", "occasion": "Date Night", "bestseller": false},
{"id": 195, "code": "No. 195", "insp": "riecht wie: La Nuit de L'Homme Bleu \u00c9lectrique", "note": "nische", "gender": "Unisex", "family": "Orientalisch", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 196, "code": "No. 196", "insp": "riecht wie: Tuxedo", "note": "nische", "gender": "Herren", "family": "Leder", "occasion": "Sommer", "bestseller": false},
{"id": 197, "code": "No. 197", "insp": "riecht wie: Babycat", "note": "nische", "gender": "Damen", "family": "W\u00fcrzig", "occasion": "Winter", "bestseller": false},
{"id": 198, "code": "No. 198", "insp": "riecht wie: Libre", "note": "nische", "gender": "Unisex", "family": "Honig & Gourmand", "occasion": "Allrounder", "bestseller": false},
{"id": 199, "code": "No. 199", "insp": "riecht wie: Libre Intense", "note": "nische", "gender": "Herren", "family": "Holzig", "occasion": "Date Night", "bestseller": false},
{"id": 200, "code": "No. 200", "insp": "riecht wie: Libre Le Parfum", "note": "nische", "gender": "Damen", "family": "Blumig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 201, "code": "No. 201", "insp": "riecht wie: Black Opium", "note": "nische", "gender": "Unisex", "family": "Frisch & Zitrus", "occasion": "Sommer", "bestseller": false},
{"id": 202, "code": "No. 202", "insp": "riecht wie: Black Opium Le Parfum", "note": "nische", "gender": "Herren", "family": "Orientalisch", "occasion": "Winter", "bestseller": false},
{"id": 203, "code": "No. 203", "insp": "riecht wie: Mon Paris", "note": "nische", "gender": "Damen", "family": "Leder", "occasion": "Allrounder", "bestseller": false},
{"id": 204, "code": "No. 204", "insp": "riecht wie: Kouros", "note": "nische", "gender": "Unisex", "family": "W\u00fcrzig", "occasion": "Date Night", "bestseller": false},
{"id": 205, "code": "No. 205", "insp": "riecht wie: Acqua di Gi\u00f2 EDT", "note": "nische", "gender": "Herren", "family": "Honig & Gourmand", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 206, "code": "No. 206", "insp": "riecht wie: Acqua di Gi\u00f2 Profumo", "note": "nische", "gender": "Damen", "family": "Holzig", "occasion": "Sommer", "bestseller": false},
{"id": 207, "code": "No. 207", "insp": "riecht wie: Acqua di Gi\u00f2 Profondo", "note": "nische", "gender": "Unisex", "family": "Blumig", "occasion": "Winter", "bestseller": false},
{"id": 208, "code": "No. 208", "insp": "riecht wie: Acqua di Gi\u00f2 Parfum", "note": "nische", "gender": "Herren", "family": "Frisch & Zitrus", "occasion": "Allrounder", "bestseller": false},
{"id": 209, "code": "No. 209", "insp": "riecht wie: Armani Code EDT", "note": "nische", "gender": "Damen", "family": "Orientalisch", "occasion": "Date Night", "bestseller": false},
{"id": 210, "code": "No. 210", "insp": "riecht wie: Armani Code Parfum", "note": "nische", "gender": "Unisex", "family": "Leder", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 211, "code": "No. 211", "insp": "riecht wie: Armani Code Absolu", "note": "nische", "gender": "Herren", "family": "W\u00fcrzig", "occasion": "Sommer", "bestseller": false},
{"id": 212, "code": "No. 212", "insp": "riecht wie: Stronger With You", "note": "nische", "gender": "Damen", "family": "Honig & Gourmand", "occasion": "Winter", "bestseller": false},
{"id": 213, "code": "No. 213", "insp": "riecht wie: Stronger With You Intensely", "note": "nische", "gender": "Unisex", "family": "Holzig", "occasion": "Allrounder", "bestseller": false},
{"id": 214, "code": "No. 214", "insp": "riecht wie: Stronger With You Absolutely", "note": "nische", "gender": "Herren", "family": "Blumig", "occasion": "Date Night", "bestseller": false},
{"id": 215, "code": "No. 215", "insp": "riecht wie: Stronger With You Amber", "note": "nische", "gender": "Damen", "family": "Frisch & Zitrus", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 216, "code": "No. 216", "insp": "riecht wie: My Way", "note": "nische", "gender": "Unisex", "family": "Orientalisch", "occasion": "Sommer", "bestseller": false},
{"id": 217, "code": "No. 217", "insp": "riecht wie: My Way Intense", "note": "nische", "gender": "Herren", "family": "Leder", "occasion": "Winter", "bestseller": false},
{"id": 218, "code": "No. 218", "insp": "riecht wie: Si", "note": "nische", "gender": "Damen", "family": "W\u00fcrzig", "occasion": "Allrounder", "bestseller": false},
{"id": 219, "code": "No. 219", "insp": "riecht wie: Si Passione", "note": "nische", "gender": "Unisex", "family": "Honig & Gourmand", "occasion": "Date Night", "bestseller": false},
{"id": 220, "code": "No. 220", "insp": "riecht wie: Rouge Malachite", "note": "nische", "gender": "Herren", "family": "Holzig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 221, "code": "No. 221", "insp": "riecht wie: Vert Malachite", "note": "nische", "gender": "Damen", "family": "Blumig", "occasion": "Sommer", "bestseller": false},
{"id": 222, "code": "No. 222", "insp": "riecht wie: Rose d'Arabie", "note": "nische", "gender": "Unisex", "family": "Frisch & Zitrus", "occasion": "Winter", "bestseller": false},
{"id": 223, "code": "No. 223", "insp": "riecht wie: Eros EDT", "note": "nische", "gender": "Herren", "family": "Orientalisch", "occasion": "Allrounder", "bestseller": false},
{"id": 224, "code": "No. 224", "insp": "riecht wie: Eros EDP", "note": "nische", "gender": "Damen", "family": "Leder", "occasion": "Date Night", "bestseller": false},
{"id": 225, "code": "No. 225", "insp": "riecht wie: Eros Parfum", "note": "nische", "gender": "Unisex", "family": "W\u00fcrzig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 226, "code": "No. 226", "insp": "riecht wie: Eros Flame", "note": "nische", "gender": "Herren", "family": "Honig & Gourmand", "occasion": "Sommer", "bestseller": false},
{"id": 227, "code": "No. 227", "insp": "riecht wie: Dylan Blue", "note": "nische", "gender": "Damen", "family": "Holzig", "occasion": "Winter", "bestseller": false},
{"id": 228, "code": "No. 228", "insp": "riecht wie: Pour Homme", "note": "nische", "gender": "Unisex", "family": "Blumig", "occasion": "Allrounder", "bestseller": false},
{"id": 229, "code": "No. 229", "insp": "riecht wie: Man Eau Fraiche", "note": "nische", "gender": "Herren", "family": "Frisch & Zitrus", "occasion": "Date Night", "bestseller": false},
{"id": 230, "code": "No. 230", "insp": "riecht wie: Bright Crystal", "note": "nische", "gender": "Damen", "family": "Orientalisch", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 231, "code": "No. 231", "insp": "riecht wie: Crystal Noir", "note": "nische", "gender": "Unisex", "family": "Leder", "occasion": "Sommer", "bestseller": false},
{"id": 232, "code": "No. 232", "insp": "riecht wie: Eros Pour Femme", "note": "nische", "gender": "Herren", "family": "W\u00fcrzig", "occasion": "Winter", "bestseller": false},
{"id": 233, "code": "No. 233", "insp": "riecht wie: 1 Million", "note": "nische", "gender": "Damen", "family": "Honig & Gourmand", "occasion": "Allrounder", "bestseller": false},
{"id": 234, "code": "No. 234", "insp": "riecht wie: 1 Million Parfum", "note": "nische", "gender": "Unisex", "family": "Holzig", "occasion": "Date Night", "bestseller": false},
{"id": 235, "code": "No. 235", "insp": "riecht wie: 1 Million Royal", "note": "nische", "gender": "Herren", "family": "Blumig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 236, "code": "No. 236", "insp": "riecht wie: 1 Million Elixir", "note": "nische", "gender": "Damen", "family": "Frisch & Zitrus", "occasion": "Sommer", "bestseller": false},
{"id": 237, "code": "No. 237", "insp": "riecht wie: Invictus", "note": "nische", "gender": "Unisex", "family": "Orientalisch", "occasion": "Winter", "bestseller": false},
{"id": 238, "code": "No. 238", "insp": "riecht wie: Invictus Victory", "note": "nische", "gender": "Herren", "family": "Leder", "occasion": "Allrounder", "bestseller": false},
{"id": 239, "code": "No. 239", "insp": "riecht wie: Invictus Victory Elixir", "note": "nische", "gender": "Damen", "family": "W\u00fcrzig", "occasion": "Date Night", "bestseller": false},
{"id": 240, "code": "No. 240", "insp": "riecht wie: Phantom", "note": "nische", "gender": "Unisex", "family": "Honig & Gourmand", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 241, "code": "No. 241", "insp": "riecht wie: Phantom Parfum", "note": "nische", "gender": "Herren", "family": "Holzig", "occasion": "Sommer", "bestseller": false},
{"id": 242, "code": "No. 242", "insp": "riecht wie: Fame", "note": "nische", "gender": "Damen", "family": "Blumig", "occasion": "Winter", "bestseller": false},
{"id": 243, "code": "No. 243", "insp": "riecht wie: Olymp\u00e9a", "note": "nische", "gender": "Unisex", "family": "Frisch & Zitrus", "occasion": "Allrounder", "bestseller": false},
{"id": 244, "code": "No. 244", "insp": "riecht wie: Pure XS", "note": "nische", "gender": "Herren", "family": "Orientalisch", "occasion": "Date Night", "bestseller": false},
{"id": 245, "code": "No. 245", "insp": "riecht wie: Boss Bottled EDT", "note": "nische", "gender": "Damen", "family": "Leder", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 246, "code": "No. 246", "insp": "riecht wie: Boss Bottled EDP", "note": "nische", "gender": "Unisex", "family": "W\u00fcrzig", "occasion": "Sommer", "bestseller": false},
{"id": 247, "code": "No. 247", "insp": "riecht wie: Boss Bottled Parfum", "note": "nische", "gender": "Herren", "family": "Honig & Gourmand", "occasion": "Winter", "bestseller": false},
{"id": 248, "code": "No. 248", "insp": "riecht wie: Boss Bottled Elixir", "note": "nische", "gender": "Damen", "family": "Holzig", "occasion": "Allrounder", "bestseller": false},
{"id": 249, "code": "No. 249", "insp": "riecht wie: Boss The Scent", "note": "nische", "gender": "Unisex", "family": "Blumig", "occasion": "Date Night", "bestseller": false},
{"id": 250, "code": "No. 250", "insp": "riecht wie: Boss The Scent Magnetic", "note": "nische", "gender": "Herren", "family": "Frisch & Zitrus", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 251, "code": "No. 251", "insp": "riecht wie: Boss Bottled Night", "note": "nische", "gender": "Damen", "family": "Orientalisch", "occasion": "Sommer", "bestseller": false},
{"id": 252, "code": "No. 252", "insp": "riecht wie: Hugo Man", "note": "nische", "gender": "Unisex", "family": "Leder", "occasion": "Winter", "bestseller": false},
{"id": 253, "code": "No. 253", "insp": "riecht wie: Prada L'Homme", "note": "nische", "gender": "Herren", "family": "W\u00fcrzig", "occasion": "Allrounder", "bestseller": false},
{"id": 254, "code": "No. 254", "insp": "riecht wie: Prada L'Homme L'Eau", "note": "nische", "gender": "Damen", "family": "Honig & Gourmand", "occasion": "Date Night", "bestseller": false},
{"id": 255, "code": "No. 255", "insp": "riecht wie: Prada L'Homme Intense", "note": "nische", "gender": "Unisex", "family": "Holzig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 256, "code": "No. 256", "insp": "riecht wie: Luna Rossa Black", "note": "nische", "gender": "Herren", "family": "Blumig", "occasion": "Sommer", "bestseller": false},
{"id": 257, "code": "No. 257", "insp": "riecht wie: Luna Rossa Ocean", "note": "nische", "gender": "Damen", "family": "Frisch & Zitrus", "occasion": "Winter", "bestseller": false},
{"id": 258, "code": "No. 258", "insp": "riecht wie: Luna Rossa Carbon", "note": "nische", "gender": "Unisex", "family": "Orientalisch", "occasion": "Allrounder", "bestseller": false},
{"id": 259, "code": "No. 259", "insp": "riecht wie: Prada Paradoxe", "note": "nische", "gender": "Herren", "family": "Leder", "occasion": "Date Night", "bestseller": false},
{"id": 260, "code": "No. 260", "insp": "riecht wie: Prada Paradoxe Intense", "note": "nische", "gender": "Damen", "family": "W\u00fcrzig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 261, "code": "No. 261", "insp": "riecht wie: Angels' Share", "note": "nische", "gender": "Unisex", "family": "Honig & Gourmand", "occasion": "Sommer", "bestseller": false},
{"id": 262, "code": "No. 262", "insp": "riecht wie: Apple Brandy on the Rocks", "note": "nische", "gender": "Herren", "family": "Holzig", "occasion": "Winter", "bestseller": false},
{"id": 263, "code": "No. 263", "insp": "riecht wie: Black Phantom", "note": "nische", "gender": "Damen", "family": "Blumig", "occasion": "Allrounder", "bestseller": false},
{"id": 264, "code": "No. 264", "insp": "riecht wie: Love Don't Be Shy", "note": "nische", "gender": "Unisex", "family": "Frisch & Zitrus", "occasion": "Date Night", "bestseller": false},
{"id": 265, "code": "No. 265", "insp": "riecht wie: Good Girl Gone Bad", "note": "nische", "gender": "Herren", "family": "Orientalisch", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 266, "code": "No. 266", "insp": "riecht wie: Straight to Heaven", "note": "nische", "gender": "Damen", "family": "Leder", "occasion": "Sommer", "bestseller": false},
{"id": 267, "code": "No. 267", "insp": "riecht wie: Intoxicated", "note": "nische", "gender": "Unisex", "family": "W\u00fcrzig", "occasion": "Winter", "bestseller": false},
{"id": 268, "code": "No. 268", "insp": "riecht wie: Vodka on the Rocks", "note": "nische", "gender": "Herren", "family": "Honig & Gourmand", "occasion": "Allrounder", "bestseller": false},
{"id": 269, "code": "No. 269", "insp": "riecht wie: Sacred Wood", "note": "nische", "gender": "Damen", "family": "Holzig", "occasion": "Date Night", "bestseller": false},
{"id": 270, "code": "No. 270", "insp": "riecht wie: Bamboo Harmony", "note": "nische", "gender": "Unisex", "family": "Blumig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 271, "code": "No. 271", "insp": "riecht wie: Moonlight in Heaven", "note": "nische", "gender": "Herren", "family": "Frisch & Zitrus", "occasion": "Sommer", "bestseller": false},
{"id": 272, "code": "No. 272", "insp": "riecht wie: Smoking Hot", "note": "nische", "gender": "Damen", "family": "Orientalisch", "occasion": "Winter", "bestseller": false},
{"id": 273, "code": "No. 273", "insp": "riecht wie: Hacivat", "note": "nische", "gender": "Unisex", "family": "Leder", "occasion": "Allrounder", "bestseller": false},
{"id": 274, "code": "No. 274", "insp": "riecht wie: Ani", "note": "nische", "gender": "Herren", "family": "W\u00fcrzig", "occasion": "Date Night", "bestseller": false},
{"id": 275, "code": "No. 275", "insp": "riecht wie: Fan Your Flames", "note": "nische", "gender": "Damen", "family": "Honig & Gourmand", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 276, "code": "No. 276", "insp": "riecht wie: Hundred Silent Ways", "note": "nische", "gender": "Unisex", "family": "Holzig", "occasion": "Sommer", "bestseller": false},
{"id": 277, "code": "No. 277", "insp": "riecht wie: Ego", "note": "nische", "gender": "Herren", "family": "Blumig", "occasion": "Winter", "bestseller": false},
{"id": 278, "code": "No. 278", "insp": "riecht wie: Nefs", "note": "nische", "gender": "Damen", "family": "Frisch & Zitrus", "occasion": "Allrounder", "bestseller": false},
{"id": 279, "code": "No. 279", "insp": "riecht wie: Wulong Cha", "note": "nische", "gender": "Unisex", "family": "Orientalisch", "occasion": "Date Night", "bestseller": false},
{"id": 280, "code": "No. 280", "insp": "riecht wie: Tuberoza", "note": "nische", "gender": "Herren", "family": "Leder", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 281, "code": "No. 281", "insp": "riecht wie: Santal 33", "note": "nische", "gender": "Damen", "family": "W\u00fcrzig", "occasion": "Sommer", "bestseller": false},
{"id": 282, "code": "No. 282", "insp": "riecht wie: Another 13", "note": "nische", "gender": "Unisex", "family": "Honig & Gourmand", "occasion": "Winter", "bestseller": false},
{"id": 283, "code": "No. 283", "insp": "riecht wie: Th\u00e9 Noir 29", "note": "nische", "gender": "Herren", "family": "Holzig", "occasion": "Allrounder", "bestseller": false},
{"id": 284, "code": "No. 284", "insp": "riecht wie: Rose 31", "note": "nische", "gender": "Damen", "family": "Blumig", "occasion": "Date Night", "bestseller": false},
{"id": 285, "code": "No. 285", "insp": "riecht wie: Bergamote 22", "note": "nische", "gender": "Unisex", "family": "Frisch & Zitrus", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 286, "code": "No. 286", "insp": "riecht wie: Matcha 26", "note": "nische", "gender": "Herren", "family": "Orientalisch", "occasion": "Sommer", "bestseller": false},
{"id": 287, "code": "No. 287", "insp": "riecht wie: Vetiver 46", "note": "nische", "gender": "Damen", "family": "Leder", "occasion": "Winter", "bestseller": false},
{"id": 288, "code": "No. 288", "insp": "riecht wie: Gaiac 10", "note": "nische", "gender": "Unisex", "family": "W\u00fcrzig", "occasion": "Allrounder", "bestseller": false},
{"id": 289, "code": "No. 289", "insp": "riecht wie: Oud for Greatness", "note": "nische", "gender": "Herren", "family": "Honig & Gourmand", "occasion": "Date Night", "bestseller": false},
{"id": 290, "code": "No. 290", "insp": "riecht wie: Side Effect", "note": "nische", "gender": "Damen", "family": "Holzig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 291, "code": "No. 291", "insp": "riecht wie: Psychedelic Love", "note": "nische", "gender": "Unisex", "family": "Blumig", "occasion": "Sommer", "bestseller": false},
{"id": 292, "code": "No. 292", "insp": "riecht wie: Absolute Aphrodisiac", "note": "nische", "gender": "Herren", "family": "Frisch & Zitrus", "occasion": "Winter", "bestseller": false},
{"id": 293, "code": "No. 293", "insp": "riecht wie: Rehab", "note": "nische", "gender": "Damen", "family": "Orientalisch", "occasion": "Allrounder", "bestseller": false},
{"id": 294, "code": "No. 294", "insp": "riecht wie: Musk Therapy", "note": "nische", "gender": "Unisex", "family": "Leder", "occasion": "Date Night", "bestseller": false},
{"id": 295, "code": "No. 295", "insp": "riecht wie: Atomic Rose", "note": "nische", "gender": "Herren", "family": "W\u00fcrzig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 296, "code": "No. 296", "insp": "riecht wie: Paragon", "note": "nische", "gender": "Damen", "family": "Honig & Gourmand", "occasion": "Sommer", "bestseller": false},
{"id": 297, "code": "No. 297", "insp": "riecht wie: Megamare", "note": "nische", "gender": "Unisex", "family": "Holzig", "occasion": "Winter", "bestseller": false},
{"id": 298, "code": "No. 298", "insp": "riecht wie: Terroni", "note": "nische", "gender": "Herren", "family": "Blumig", "occasion": "Allrounder", "bestseller": false},
{"id": 299, "code": "No. 299", "insp": "riecht wie: Bergamask", "note": "nische", "gender": "Damen", "family": "Frisch & Zitrus", "occasion": "Date Night", "bestseller": false},
{"id": 300, "code": "No. 300", "insp": "riecht wie: Boccanera", "note": "nische", "gender": "Unisex", "family": "Orientalisch", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 301, "code": "No. 301", "insp": "riecht wie: Cuoium", "note": "nische", "gender": "Herren", "family": "Leder", "occasion": "Sommer", "bestseller": false},
{"id": 302, "code": "No. 302", "insp": "riecht wie: Stercus", "note": "nische", "gender": "Damen", "family": "W\u00fcrzig", "occasion": "Winter", "bestseller": false},
{"id": 303, "code": "No. 303", "insp": "riecht wie: Black Afgano", "note": "nische", "gender": "Unisex", "family": "Honig & Gourmand", "occasion": "Allrounder", "bestseller": false},
{"id": 304, "code": "No. 304", "insp": "riecht wie: Baraonda", "note": "nische", "gender": "Herren", "family": "Holzig", "occasion": "Date Night", "bestseller": false},
{"id": 305, "code": "No. 305", "insp": "riecht wie: Pardon", "note": "nische", "gender": "Damen", "family": "Blumig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 306, "code": "No. 306", "insp": "riecht wie: Silver Musk", "note": "nische", "gender": "Unisex", "family": "Frisch & Zitrus", "occasion": "Sommer", "bestseller": false},
{"id": 307, "code": "No. 307", "insp": "riecht wie: Duro", "note": "nische", "gender": "Herren", "family": "Orientalisch", "occasion": "Winter", "bestseller": false},
{"id": 308, "code": "No. 308", "insp": "riecht wie: God of Fire", "note": "nische", "gender": "Damen", "family": "Leder", "occasion": "Allrounder", "bestseller": false},
{"id": 309, "code": "No. 309", "insp": "riecht wie: Soleil de Jeddah", "note": "nische", "gender": "Unisex", "family": "W\u00fcrzig", "occasion": "Date Night", "bestseller": false},
{"id": 310, "code": "No. 310", "insp": "riecht wie: Venom Incarnat", "note": "nische", "gender": "Herren", "family": "Honig & Gourmand", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 311, "code": "No. 311", "insp": "riecht wie: Mango Kiss", "note": "nische", "gender": "Damen", "family": "Holzig", "occasion": "Sommer", "bestseller": false},
{"id": 312, "code": "No. 312", "insp": "riecht wie: Summer Hammer", "note": "nische", "gender": "Unisex", "family": "Blumig", "occasion": "Winter", "bestseller": false},
{"id": 313, "code": "No. 313", "insp": "riecht wie: Van Py Rum", "note": "nische", "gender": "Herren", "family": "Frisch & Zitrus", "occasion": "Allrounder", "bestseller": false},
{"id": 314, "code": "No. 314", "insp": "riecht wie: Cherry Ink", "note": "nische", "gender": "Damen", "family": "Orientalisch", "occasion": "Date Night", "bestseller": false},
{"id": 315, "code": "No. 315", "insp": "riecht wie: Black Sea", "note": "nische", "gender": "Unisex", "family": "Leder", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 316, "code": "No. 316", "insp": "riecht wie: Intense Cafe", "note": "nische", "gender": "Herren", "family": "W\u00fcrzig", "occasion": "Sommer", "bestseller": false},
{"id": 317, "code": "No. 317", "insp": "riecht wie: Arabians Tonka", "note": "nische", "gender": "Damen", "family": "Honig & Gourmand", "occasion": "Winter", "bestseller": false},
{"id": 318, "code": "No. 318", "insp": "riecht wie: Honey Aoud", "note": "nische", "gender": "Unisex", "family": "Holzig", "occasion": "Allrounder", "bestseller": false},
{"id": 319, "code": "No. 319", "insp": "riecht wie: Starry Nights", "note": "nische", "gender": "Herren", "family": "Blumig", "occasion": "Date Night", "bestseller": false},
{"id": 320, "code": "No. 320", "insp": "riecht wie: Chocolate Greedy", "note": "nische", "gender": "Damen", "family": "Frisch & Zitrus", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 321, "code": "No. 321", "insp": "riecht wie: Roses Musk", "note": "nische", "gender": "Unisex", "family": "Orientalisch", "occasion": "Sommer", "bestseller": false},
{"id": 322, "code": "No. 322", "insp": "riecht wie: Black Aoud", "note": "nische", "gender": "Herren", "family": "Leder", "occasion": "Winter", "bestseller": false},
{"id": 323, "code": "No. 323", "insp": "riecht wie: Sensual Instinct", "note": "nische", "gender": "Damen", "family": "W\u00fcrzig", "occasion": "Allrounder", "bestseller": false},
{"id": 324, "code": "No. 324", "insp": "riecht wie: Cedrat Boise", "note": "nische", "gender": "Unisex", "family": "Honig & Gourmand", "occasion": "Date Night", "bestseller": false},
{"id": 325, "code": "No. 325", "insp": "riecht wie: Intense Cedrat Boise", "note": "nische", "gender": "Herren", "family": "Holzig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 326, "code": "No. 326", "insp": "riecht wie: Red Tobacco", "note": "nische", "gender": "Damen", "family": "Blumig", "occasion": "Sommer", "bestseller": false},
{"id": 327, "code": "No. 327", "insp": "riecht wie: Intense Red Tobacco", "note": "nische", "gender": "Unisex", "family": "Frisch & Zitrus", "occasion": "Winter", "bestseller": false},
{"id": 328, "code": "No. 328", "insp": "riecht wie: Instant Crush", "note": "nische", "gender": "Herren", "family": "Orientalisch", "occasion": "Allrounder", "bestseller": false},
{"id": 329, "code": "No. 329", "insp": "riecht wie: Roses Vanille", "note": "nische", "gender": "Damen", "family": "Leder", "occasion": "Date Night", "bestseller": false},
{"id": 330, "code": "No. 330", "insp": "riecht wie: Coco Vanille", "note": "nische", "gender": "Unisex", "family": "W\u00fcrzig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 331, "code": "No. 331", "insp": "riecht wie: Hindu Kush", "note": "nische", "gender": "Herren", "family": "Honig & Gourmand", "occasion": "Sommer", "bestseller": false},
{"id": 332, "code": "No. 332", "insp": "riecht wie: Tonka Cola", "note": "nische", "gender": "Damen", "family": "Holzig", "occasion": "Winter", "bestseller": false},
{"id": 333, "code": "No. 333", "insp": "riecht wie: Gypsy Water", "note": "nische", "gender": "Unisex", "family": "Blumig", "occasion": "Allrounder", "bestseller": false},
{"id": 334, "code": "No. 334", "insp": "riecht wie: Bal d'Afrique", "note": "nische", "gender": "Herren", "family": "Frisch & Zitrus", "occasion": "Date Night", "bestseller": false},
{"id": 335, "code": "No. 335", "insp": "riecht wie: Mojave Ghost", "note": "nische", "gender": "Damen", "family": "Orientalisch", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 336, "code": "No. 336", "insp": "riecht wie: Rose of No Man's Land", "note": "nische", "gender": "Unisex", "family": "Leder", "occasion": "Sommer", "bestseller": false},
{"id": 337, "code": "No. 337", "insp": "riecht wie: Blanche", "note": "nische", "gender": "Herren", "family": "W\u00fcrzig", "occasion": "Winter", "bestseller": false},
{"id": 338, "code": "No. 338", "insp": "riecht wie: Super Cedar", "note": "nische", "gender": "Damen", "family": "Honig & Gourmand", "occasion": "Allrounder", "bestseller": false},
{"id": 339, "code": "No. 339", "insp": "riecht wie: Sundazed", "note": "nische", "gender": "Unisex", "family": "Holzig", "occasion": "Date Night", "bestseller": false},
{"id": 340, "code": "No. 340", "insp": "riecht wie: Biblioth\u00e8que", "note": "nische", "gender": "Herren", "family": "Blumig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 341, "code": "No. 341", "insp": "riecht wie: Philosykos", "note": "nische", "gender": "Damen", "family": "Frisch & Zitrus", "occasion": "Sommer", "bestseller": false},
{"id": 342, "code": "No. 342", "insp": "riecht wie: Tam Dao", "note": "nische", "gender": "Unisex", "family": "Orientalisch", "occasion": "Winter", "bestseller": false},
{"id": 343, "code": "No. 343", "insp": "riecht wie: Fleur de Peau", "note": "nische", "gender": "Herren", "family": "Leder", "occasion": "Allrounder", "bestseller": false},
{"id": 344, "code": "No. 344", "insp": "riecht wie: Do Son", "note": "nische", "gender": "Damen", "family": "W\u00fcrzig", "occasion": "Date Night", "bestseller": false},
{"id": 345, "code": "No. 345", "insp": "riecht wie: Eau Duelle", "note": "nische", "gender": "Unisex", "family": "Honig & Gourmand", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 346, "code": "No. 346", "insp": "riecht wie: Orph\u00e9on", "note": "nische", "gender": "Herren", "family": "Holzig", "occasion": "Sommer", "bestseller": false},
{"id": 347, "code": "No. 347", "insp": "riecht wie: Interlude Man", "note": "nische", "gender": "Damen", "family": "Blumig", "occasion": "Winter", "bestseller": false},
{"id": 348, "code": "No. 348", "insp": "riecht wie: Interlude 53", "note": "nische", "gender": "Unisex", "family": "Frisch & Zitrus", "occasion": "Allrounder", "bestseller": false},
{"id": 349, "code": "No. 349", "insp": "riecht wie: Reflection Man", "note": "nische", "gender": "Herren", "family": "Orientalisch", "occasion": "Date Night", "bestseller": false},
{"id": 350, "code": "No. 350", "insp": "riecht wie: Reflection 45", "note": "nische", "gender": "Damen", "family": "Leder", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 351, "code": "No. 351", "insp": "riecht wie: Jubilation XXV", "note": "nische", "gender": "Unisex", "family": "W\u00fcrzig", "occasion": "Sommer", "bestseller": false},
{"id": 352, "code": "No. 352", "insp": "riecht wie: Guidance", "note": "nische", "gender": "Herren", "family": "Honig & Gourmand", "occasion": "Winter", "bestseller": false},
{"id": 353, "code": "No. 353", "insp": "riecht wie: Enclave", "note": "nische", "gender": "Damen", "family": "Holzig", "occasion": "Allrounder", "bestseller": false},
{"id": 354, "code": "No. 354", "insp": "riecht wie: Royal Tobacco", "note": "nische", "gender": "Unisex", "family": "Blumig", "occasion": "Date Night", "bestseller": false},
{"id": 355, "code": "No. 355", "insp": "riecht wie: Elysium Pour Homme", "note": "nische", "gender": "Herren", "family": "Frisch & Zitrus", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 356, "code": "No. 356", "insp": "riecht wie: Enigma Pour Homme", "note": "nische", "gender": "Damen", "family": "Orientalisch", "occasion": "Sommer", "bestseller": false},
{"id": 357, "code": "No. 357", "insp": "riecht wie: Apex", "note": "nische", "gender": "Unisex", "family": "Leder", "occasion": "Winter", "bestseller": false},
{"id": 358, "code": "No. 358", "insp": "riecht wie: Amber Aoud", "note": "nische", "gender": "Herren", "family": "W\u00fcrzig", "occasion": "Allrounder", "bestseller": false},
{"id": 359, "code": "No. 359", "insp": "riecht wie: Burlington 1819", "note": "nische", "gender": "Damen", "family": "Honig & Gourmand", "occasion": "Date Night", "bestseller": false},
{"id": 360, "code": "No. 360", "insp": "riecht wie: Bleecker Street", "note": "nische", "gender": "Unisex", "family": "Holzig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 361, "code": "No. 361", "insp": "riecht wie: Lafayette Street", "note": "nische", "gender": "Herren", "family": "Blumig", "occasion": "Sommer", "bestseller": false},
{"id": 362, "code": "No. 362", "insp": "riecht wie: New York Nights", "note": "nische", "gender": "Damen", "family": "Frisch & Zitrus", "occasion": "Winter", "bestseller": false},
{"id": 363, "code": "No. 363", "insp": "riecht wie: Chez Bond", "note": "nische", "gender": "Unisex", "family": "Orientalisch", "occasion": "Allrounder", "bestseller": false},
{"id": 364, "code": "No. 364", "insp": "riecht wie: Scent of Peace for Him", "note": "nische", "gender": "Herren", "family": "Leder", "occasion": "Date Night", "bestseller": false},
{"id": 365, "code": "No. 365", "insp": "riecht wie: Bad Boy", "note": "nische", "gender": "Damen", "family": "W\u00fcrzig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 366, "code": "No. 366", "insp": "riecht wie: Bad Boy Cobalt", "note": "nische", "gender": "Unisex", "family": "Honig & Gourmand", "occasion": "Sommer", "bestseller": false},
{"id": 367, "code": "No. 367", "insp": "riecht wie: Bad Boy Extreme", "note": "nische", "gender": "Herren", "family": "Holzig", "occasion": "Winter", "bestseller": false},
{"id": 368, "code": "No. 368", "insp": "riecht wie: Good Girl", "note": "nische", "gender": "Damen", "family": "Blumig", "occasion": "Allrounder", "bestseller": false},
{"id": 369, "code": "No. 369", "insp": "riecht wie: Very Good Girl", "note": "nische", "gender": "Unisex", "family": "Frisch & Zitrus", "occasion": "Date Night", "bestseller": false},
{"id": 370, "code": "No. 370", "insp": "riecht wie: The One For Men EDT", "note": "nische", "gender": "Herren", "family": "Orientalisch", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 371, "code": "No. 371", "insp": "riecht wie: The One For Men EDP", "note": "nische", "gender": "Damen", "family": "Leder", "occasion": "Sommer", "bestseller": false},
{"id": 372, "code": "No. 372", "insp": "riecht wie: Light Blue Pour Homme", "note": "nische", "gender": "Unisex", "family": "W\u00fcrzig", "occasion": "Winter", "bestseller": false},
{"id": 373, "code": "No. 373", "insp": "riecht wie: Light Blue Intense", "note": "nische", "gender": "Herren", "family": "Honig & Gourmand", "occasion": "Allrounder", "bestseller": false},
{"id": 374, "code": "No. 374", "insp": "riecht wie: K EDP", "note": "nische", "gender": "Damen", "family": "Holzig", "occasion": "Date Night", "bestseller": false},
{"id": 375, "code": "No. 375", "insp": "riecht wie: Devotion", "note": "nische", "gender": "Unisex", "family": "Blumig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 376, "code": "No. 376", "insp": "riecht wie: L'Homme Id\u00e9al EDT", "note": "nische", "gender": "Herren", "family": "Frisch & Zitrus", "occasion": "Sommer", "bestseller": false},
{"id": 377, "code": "No. 377", "insp": "riecht wie: L'Homme Id\u00e9al EDP", "note": "nische", "gender": "Damen", "family": "Orientalisch", "occasion": "Winter", "bestseller": false},
{"id": 378, "code": "No. 378", "insp": "riecht wie: L'Homme Id\u00e9al Extreme", "note": "nische", "gender": "Unisex", "family": "Leder", "occasion": "Allrounder", "bestseller": false},
{"id": 379, "code": "No. 379", "insp": "riecht wie: Shalimar", "note": "nische", "gender": "Herren", "family": "W\u00fcrzig", "occasion": "Date Night", "bestseller": false},
{"id": 380, "code": "No. 380", "insp": "riecht wie: Mon Guerlain", "note": "nische", "gender": "Damen", "family": "Honig & Gourmand", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 381, "code": "No. 381", "insp": "riecht wie: Tobacco Honey", "note": "nische", "gender": "Unisex", "family": "Holzig", "occasion": "Sommer", "bestseller": false},
{"id": 382, "code": "No. 382", "insp": "riecht wie: Spiriteuse Double Vanille", "note": "nische", "gender": "Herren", "family": "Blumig", "occasion": "Winter", "bestseller": false},
{"id": 383, "code": "No. 383", "insp": "riecht wie: Alien", "note": "nische", "gender": "Damen", "family": "Frisch & Zitrus", "occasion": "Allrounder", "bestseller": false},
{"id": 384, "code": "No. 384", "insp": "riecht wie: Alien Goddess", "note": "nische", "gender": "Unisex", "family": "Orientalisch", "occasion": "Date Night", "bestseller": false},
{"id": 385, "code": "No. 385", "insp": "riecht wie: Angel", "note": "nische", "gender": "Herren", "family": "Leder", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 386, "code": "No. 386", "insp": "riecht wie: A*Men", "note": "nische", "gender": "Damen", "family": "W\u00fcrzig", "occasion": "Sommer", "bestseller": false},
{"id": 387, "code": "No. 387", "insp": "riecht wie: La Vie Est Belle", "note": "nische", "gender": "Unisex", "family": "Honig & Gourmand", "occasion": "Winter", "bestseller": false},
{"id": 388, "code": "No. 388", "insp": "riecht wie: Id\u00f4le", "note": "nische", "gender": "Herren", "family": "Holzig", "occasion": "Allrounder", "bestseller": false},
{"id": 389, "code": "No. 389", "insp": "riecht wie: Tr\u00e9sor", "note": "nische", "gender": "Damen", "family": "Blumig", "occasion": "Date Night", "bestseller": false},
{"id": 390, "code": "No. 390", "insp": "riecht wie: Spicebomb", "note": "nische", "gender": "Unisex", "family": "Frisch & Zitrus", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 391, "code": "No. 391", "insp": "riecht wie: Spicebomb Extreme", "note": "nische", "gender": "Herren", "family": "Orientalisch", "occasion": "Sommer", "bestseller": false},
{"id": 392, "code": "No. 392", "insp": "riecht wie: Spicebomb Night Vision", "note": "nische", "gender": "Damen", "family": "Leder", "occasion": "Winter", "bestseller": false},
{"id": 393, "code": "No. 393", "insp": "riecht wie: Flowerbomb", "note": "nische", "gender": "Unisex", "family": "W\u00fcrzig", "occasion": "Allrounder", "bestseller": false},
{"id": 394, "code": "No. 394", "insp": "riecht wie: Wanted", "note": "nische", "gender": "Herren", "family": "Honig & Gourmand", "occasion": "Date Night", "bestseller": false},
{"id": 395, "code": "No. 395", "insp": "riecht wie: Wanted By Night", "note": "nische", "gender": "Damen", "family": "Holzig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 396, "code": "No. 396", "insp": "riecht wie: The Most Wanted", "note": "nische", "gender": "Unisex", "family": "Blumig", "occasion": "Sommer", "bestseller": false},
{"id": 397, "code": "No. 397", "insp": "riecht wie: The Most Wanted Parfum", "note": "nische", "gender": "Herren", "family": "Frisch & Zitrus", "occasion": "Winter", "bestseller": false},
{"id": 398, "code": "No. 398", "insp": "riecht wie: Hero EDT", "note": "nische", "gender": "Damen", "family": "Orientalisch", "occasion": "Allrounder", "bestseller": false},
{"id": 399, "code": "No. 399", "insp": "riecht wie: Hero EDP", "note": "nische", "gender": "Unisex", "family": "Leder", "occasion": "Date Night", "bestseller": false},
{"id": 400, "code": "No. 400", "insp": "riecht wie: Burberry Her", "note": "nische", "gender": "Herren", "family": "W\u00fcrzig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 401, "code": "No. 401", "insp": "riecht wie: Burberry Her Elixir", "note": "nische", "gender": "Damen", "family": "Honig & Gourmand", "occasion": "Sommer", "bestseller": false},
{"id": 402, "code": "No. 402", "insp": "riecht wie: Gentleman EDT", "note": "nische", "gender": "Unisex", "family": "Holzig", "occasion": "Winter", "bestseller": false},
{"id": 403, "code": "No. 403", "insp": "riecht wie: Gentleman EDP", "note": "nische", "gender": "Herren", "family": "Blumig", "occasion": "Allrounder", "bestseller": false},
{"id": 404, "code": "No. 404", "insp": "riecht wie: Gentleman Reserve Priv\u00e9e", "note": "nische", "gender": "Damen", "family": "Frisch & Zitrus", "occasion": "Date Night", "bestseller": false},
{"id": 405, "code": "No. 405", "insp": "riecht wie: L'Interdit", "note": "nische", "gender": "Unisex", "family": "Orientalisch", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 406, "code": "No. 406", "insp": "riecht wie: L'Interdit Rouge", "note": "nische", "gender": "Herren", "family": "Leder", "occasion": "Sommer", "bestseller": false},
{"id": 407, "code": "No. 407", "insp": "riecht wie: Born In Roma Coral Fantasy", "note": "nische", "gender": "Damen", "family": "W\u00fcrzig", "occasion": "Winter", "bestseller": false},
{"id": 408, "code": "No. 408", "insp": "riecht wie: Born In Roma Intense", "note": "nische", "gender": "Unisex", "family": "Honig & Gourmand", "occasion": "Allrounder", "bestseller": false},
{"id": 409, "code": "No. 409", "insp": "riecht wie: Uomo Intense", "note": "nische", "gender": "Herren", "family": "Holzig", "occasion": "Date Night", "bestseller": false},
{"id": 410, "code": "No. 410", "insp": "riecht wie: Donna Born In Roma", "note": "nische", "gender": "Damen", "family": "Blumig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 411, "code": "No. 411", "insp": "riecht wie: Jazz Club", "note": "nische", "gender": "Unisex", "family": "Frisch & Zitrus", "occasion": "Sommer", "bestseller": false},
{"id": 412, "code": "No. 412", "insp": "riecht wie: By the Fireplace", "note": "nische", "gender": "Herren", "family": "Orientalisch", "occasion": "Winter", "bestseller": false},
{"id": 413, "code": "No. 413", "insp": "riecht wie: Beach Walk", "note": "nische", "gender": "Damen", "family": "Leder", "occasion": "Allrounder", "bestseller": false},
{"id": 414, "code": "No. 414", "insp": "riecht wie: Lazy Sunday Morning", "note": "nische", "gender": "Unisex", "family": "W\u00fcrzig", "occasion": "Date Night", "bestseller": false},
{"id": 415, "code": "No. 415", "insp": "riecht wie: Sailing Day", "note": "nische", "gender": "Herren", "family": "Honig & Gourmand", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 416, "code": "No. 416", "insp": "riecht wie: Wood Sage & Sea Salt", "note": "nische", "gender": "Damen", "family": "Holzig", "occasion": "Sommer", "bestseller": false},
{"id": 417, "code": "No. 417", "insp": "riecht wie: Myrrh & Tonka", "note": "nische", "gender": "Unisex", "family": "Blumig", "occasion": "Winter", "bestseller": false},
{"id": 418, "code": "No. 418", "insp": "riecht wie: English Pear & Freesia", "note": "nische", "gender": "Herren", "family": "Frisch & Zitrus", "occasion": "Allrounder", "bestseller": false},
{"id": 419, "code": "No. 419", "insp": "riecht wie: Lime Basil & Mandarin", "note": "nische", "gender": "Damen", "family": "Orientalisch", "occasion": "Date Night", "bestseller": false},
{"id": 420, "code": "No. 420", "insp": "riecht wie: Velvet Rose & Oud", "note": "nische", "gender": "Unisex", "family": "Leder", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 421, "code": "No. 421", "insp": "riecht wie: Halfeti", "note": "nische", "gender": "Herren", "family": "W\u00fcrzig", "occasion": "Sommer", "bestseller": false},
{"id": 422, "code": "No. 422", "insp": "riecht wie: The Tragedy of Lord George", "note": "nische", "gender": "Damen", "family": "Honig & Gourmand", "occasion": "Winter", "bestseller": false},
{"id": 423, "code": "No. 423", "insp": "riecht wie: Endymion", "note": "nische", "gender": "Unisex", "family": "Holzig", "occasion": "Allrounder", "bestseller": false},
{"id": 424, "code": "No. 424", "insp": "riecht wie: Terre d'Herm\u00e8s EDT", "note": "nische", "gender": "Herren", "family": "Blumig", "occasion": "Date Night", "bestseller": false},
{"id": 425, "code": "No. 425", "insp": "riecht wie: Terre d'Herm\u00e8s Parfum", "note": "nische", "gender": "Damen", "family": "Frisch & Zitrus", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 426, "code": "No. 426", "insp": "riecht wie: Terre d'Herm\u00e8s Eau Givr\u00e9e", "note": "nische", "gender": "Unisex", "family": "Orientalisch", "occasion": "Sommer", "bestseller": false},
{"id": 427, "code": "No. 427", "insp": "riecht wie: H24", "note": "nische", "gender": "Herren", "family": "Leder", "occasion": "Winter", "bestseller": false},
{"id": 428, "code": "No. 428", "insp": "riecht wie: Man In Black", "note": "nische", "gender": "Damen", "family": "W\u00fcrzig", "occasion": "Allrounder", "bestseller": false},
{"id": 429, "code": "No. 429", "insp": "riecht wie: Tygar", "note": "nische", "gender": "Unisex", "family": "Honig & Gourmand", "occasion": "Date Night", "bestseller": false},
{"id": 430, "code": "No. 430", "insp": "riecht wie: Aqva Pour Homme", "note": "nische", "gender": "Herren", "family": "Holzig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 431, "code": "No. 431", "insp": "riecht wie: Khamrah", "note": "nische", "gender": "Damen", "family": "Blumig", "occasion": "Sommer", "bestseller": false},
{"id": 432, "code": "No. 432", "insp": "riecht wie: Khamrah Qahwa", "note": "nische", "gender": "Unisex", "family": "Frisch & Zitrus", "occasion": "Winter", "bestseller": false},
{"id": 433, "code": "No. 433", "insp": "riecht wie: Yara", "note": "nische", "gender": "Herren", "family": "Orientalisch", "occasion": "Allrounder", "bestseller": false},
{"id": 434, "code": "No. 434", "insp": "riecht wie: Asad", "note": "nische", "gender": "Damen", "family": "Leder", "occasion": "Date Night", "bestseller": false},
{"id": 435, "code": "No. 435", "insp": "riecht wie: Bade'e Al Oud Honor & Glory", "note": "nische", "gender": "Unisex", "family": "W\u00fcrzig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 436, "code": "No. 436", "insp": "riecht wie: Oud For Glory", "note": "nische", "gender": "Herren", "family": "Honig & Gourmand", "occasion": "Sommer", "bestseller": false},
{"id": 437, "code": "No. 437", "insp": "riecht wie: Nebras", "note": "nische", "gender": "Damen", "family": "Holzig", "occasion": "Winter", "bestseller": false},
{"id": 438, "code": "No. 438", "insp": "riecht wie: Eclaire", "note": "nische", "gender": "Unisex", "family": "Blumig", "occasion": "Allrounder", "bestseller": false},
{"id": 439, "code": "No. 439", "insp": "riecht wie: Fakhar Black", "note": "nische", "gender": "Herren", "family": "Frisch & Zitrus", "occasion": "Date Night", "bestseller": false},
{"id": 440, "code": "No. 440", "insp": "riecht wie: Maahir Black", "note": "nische", "gender": "Damen", "family": "Orientalisch", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 441, "code": "No. 441", "insp": "riecht wie: 9 PM", "note": "nische", "gender": "Unisex", "family": "Leder", "occasion": "Sommer", "bestseller": false},
{"id": 442, "code": "No. 442", "insp": "riecht wie: 9 AM Dive", "note": "nische", "gender": "Herren", "family": "W\u00fcrzig", "occasion": "Winter", "bestseller": false},
{"id": 443, "code": "No. 443", "insp": "riecht wie: Supremacy Not Only Intense", "note": "nische", "gender": "Damen", "family": "Honig & Gourmand", "occasion": "Allrounder", "bestseller": false},
{"id": 444, "code": "No. 444", "insp": "riecht wie: Turathi Blue", "note": "nische", "gender": "Unisex", "family": "Holzig", "occasion": "Date Night", "bestseller": false},
{"id": 445, "code": "No. 445", "insp": "riecht wie: Rare Carbon", "note": "nische", "gender": "Herren", "family": "Blumig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 446, "code": "No. 446", "insp": "riecht wie: Club de Nuit Intense Man EDT", "note": "nische", "gender": "Damen", "family": "Frisch & Zitrus", "occasion": "Sommer", "bestseller": false},
{"id": 447, "code": "No. 447", "insp": "riecht wie: Club de Nuit Intense Man Limited Edition", "note": "nische", "gender": "Unisex", "family": "Orientalisch", "occasion": "Winter", "bestseller": false},
{"id": 448, "code": "No. 448", "insp": "riecht wie: Club de Nuit Untold", "note": "nische", "gender": "Herren", "family": "Leder", "occasion": "Allrounder", "bestseller": false},
{"id": 449, "code": "No. 449", "insp": "riecht wie: Club de Nuit Sillage", "note": "nische", "gender": "Damen", "family": "W\u00fcrzig", "occasion": "Date Night", "bestseller": false},
{"id": 450, "code": "No. 450", "insp": "riecht wie: Club de Nuit Milestone", "note": "nische", "gender": "Unisex", "family": "Honig & Gourmand", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 451, "code": "No. 451", "insp": "riecht wie: Hawas for Him", "note": "nische", "gender": "Herren", "family": "Holzig", "occasion": "Sommer", "bestseller": false},
{"id": 452, "code": "No. 452", "insp": "riecht wie: Hawas Ice", "note": "nische", "gender": "Damen", "family": "Blumig", "occasion": "Winter", "bestseller": false},
{"id": 453, "code": "No. 453", "insp": "riecht wie: La Yuqawam Pour Homme", "note": "nische", "gender": "Unisex", "family": "Frisch & Zitrus", "occasion": "Allrounder", "bestseller": false},
{"id": 454, "code": "No. 454", "insp": "riecht wie: Shaghaf Oud", "note": "nische", "gender": "Herren", "family": "Orientalisch", "occasion": "Date Night", "bestseller": false},
{"id": 455, "code": "No. 455", "insp": "riecht wie: Shaghaf Oud Tonka", "note": "nische", "gender": "Damen", "family": "Leder", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 456, "code": "No. 456", "insp": "riecht wie: Amber Oud Gold Edition", "note": "nische", "gender": "Unisex", "family": "W\u00fcrzig", "occasion": "Sommer", "bestseller": false},
{"id": 457, "code": "No. 457", "insp": "riecht wie: Amber Oud Tobacco Edition", "note": "nische", "gender": "Herren", "family": "Honig & Gourmand", "occasion": "Winter", "bestseller": false},
{"id": 458, "code": "No. 458", "insp": "riecht wie: L'Aventure", "note": "nische", "gender": "Damen", "family": "Holzig", "occasion": "Allrounder", "bestseller": false},
{"id": 459, "code": "No. 459", "insp": "riecht wie: No. 1 For Men", "note": "nische", "gender": "Unisex", "family": "Blumig", "occasion": "Date Night", "bestseller": false},
{"id": 460, "code": "No. 460", "insp": "riecht wie: 1872 For Men", "note": "nische", "gender": "Herren", "family": "Frisch & Zitrus", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 461, "code": "No. 461", "insp": "riecht wie: X For Men", "note": "nische", "gender": "Damen", "family": "Orientalisch", "occasion": "Sommer", "bestseller": false},
{"id": 462, "code": "No. 462", "insp": "riecht wie: Town & Country", "note": "nische", "gender": "Unisex", "family": "Leder", "occasion": "Winter", "bestseller": false},
{"id": 463, "code": "No. 463", "insp": "riecht wie: Oud Orange Intense", "note": "nische", "gender": "Herren", "family": "W\u00fcrzig", "occasion": "Allrounder", "bestseller": false},
{"id": 464, "code": "No. 464", "insp": "riecht wie: Oud Maracuj\u00e1", "note": "nische", "gender": "Damen", "family": "Honig & Gourmand", "occasion": "Date Night", "bestseller": false},
{"id": 465, "code": "No. 465", "insp": "riecht wie: Parisian Musc", "note": "nische", "gender": "Unisex", "family": "Holzig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 466, "code": "No. 466", "insp": "riecht wie: Radical Rose", "note": "nische", "gender": "Herren", "family": "Blumig", "occasion": "Sommer", "bestseller": false},
{"id": 467, "code": "No. 467", "insp": "riecht wie: Falcon Leather", "note": "nische", "gender": "Damen", "family": "Frisch & Zitrus", "occasion": "Winter", "bestseller": false},
{"id": 468, "code": "No. 468", "insp": "riecht wie: Encens Suave", "note": "nische", "gender": "Unisex", "family": "Orientalisch", "occasion": "Allrounder", "bestseller": false},
{"id": 469, "code": "No. 469", "insp": "riecht wie: Bois Imp\u00e9rial", "note": "nische", "gender": "Herren", "family": "Leder", "occasion": "Date Night", "bestseller": false},
{"id": 470, "code": "No. 470", "insp": "riecht wie: The Musc", "note": "nische", "gender": "Damen", "family": "W\u00fcrzig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 471, "code": "No. 471", "insp": "riecht wie: Divine Vanille", "note": "nische", "gender": "Unisex", "family": "Honig & Gourmand", "occasion": "Sommer", "bestseller": false},
{"id": 472, "code": "No. 472", "insp": "riecht wie: Pacific Rock Moss", "note": "nische", "gender": "Herren", "family": "Holzig", "occasion": "Winter", "bestseller": false},
{"id": 473, "code": "No. 473", "insp": "riecht wie: Bohemian Lime", "note": "nische", "gender": "Damen", "family": "Blumig", "occasion": "Allrounder", "bestseller": false},
{"id": 474, "code": "No. 474", "insp": "riecht wie: Sunset Hour", "note": "nische", "gender": "Unisex", "family": "Frisch & Zitrus", "occasion": "Date Night", "bestseller": false},
{"id": 475, "code": "No. 475", "insp": "riecht wie: Silky Woods", "note": "nische", "gender": "Herren", "family": "Orientalisch", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 476, "code": "No. 476", "insp": "riecht wie: L'Air du D\u00e9sert Marocain", "note": "nische", "gender": "Damen", "family": "Leder", "occasion": "Sommer", "bestseller": false},
{"id": 477, "code": "No. 477", "insp": "riecht wie: Au C\u0153ur du D\u00e9sert", "note": "nische", "gender": "Unisex", "family": "W\u00fcrzig", "occasion": "Winter", "bestseller": false},
{"id": 478, "code": "No. 478", "insp": "riecht wie: Blue Sapphire", "note": "nische", "gender": "Herren", "family": "Honig & Gourmand", "occasion": "Allrounder", "bestseller": false},
{"id": 479, "code": "No. 479", "insp": "riecht wie: Complex", "note": "nische", "gender": "Damen", "family": "Holzig", "occasion": "Date Night", "bestseller": false},
{"id": 480, "code": "No. 480", "insp": "riecht wie: For Men Intense", "note": "nische", "gender": "Unisex", "family": "Blumig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 481, "code": "No. 481", "insp": "riecht wie: For Men Absolute", "note": "nische", "gender": "Herren", "family": "Frisch & Zitrus", "occasion": "Sommer", "bestseller": false},
{"id": 482, "code": "No. 482", "insp": "riecht wie: Encre Noire", "note": "nische", "gender": "Damen", "family": "Orientalisch", "occasion": "Winter", "bestseller": false},
{"id": 483, "code": "No. 483", "insp": "riecht wie: Encre Noire A L'Extreme", "note": "nische", "gender": "Unisex", "family": "Leder", "occasion": "Allrounder", "bestseller": false},
{"id": 484, "code": "No. 484", "insp": "riecht wie: This is Him!", "note": "nische", "gender": "Herren", "family": "W\u00fcrzig", "occasion": "Date Night", "bestseller": false},
{"id": 485, "code": "No. 485", "insp": "riecht wie: Declaration", "note": "nische", "gender": "Damen", "family": "Honig & Gourmand", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 486, "code": "No. 486", "insp": "riecht wie: Pasha de Cartier", "note": "nische", "gender": "Unisex", "family": "Holzig", "occasion": "Sommer", "bestseller": false},
{"id": 487, "code": "No. 487", "insp": "riecht wie: Explorer", "note": "nische", "gender": "Herren", "family": "Blumig", "occasion": "Winter", "bestseller": false},
{"id": 488, "code": "No. 488", "insp": "riecht wie: Legend", "note": "nische", "gender": "Damen", "family": "Frisch & Zitrus", "occasion": "Allrounder", "bestseller": false},
{"id": 489, "code": "No. 489", "insp": "riecht wie: L'Eau d'Issey Pour Homme", "note": "nische", "gender": "Unisex", "family": "Orientalisch", "occasion": "Date Night", "bestseller": false},
{"id": 490, "code": "No. 490", "insp": "riecht wie: Vibrant Leather", "note": "nische", "gender": "Herren", "family": "Leder", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 491, "code": "No. 491", "insp": "riecht wie: Sunrise on the Red Sand Dunes", "note": "nische", "gender": "Damen", "family": "W\u00fcrzig", "occasion": "Sommer", "bestseller": false},
{"id": 492, "code": "No. 492", "insp": "riecht wie: Tobacco Collection Rich Warm Addictive", "note": "nische", "gender": "Unisex", "family": "Honig & Gourmand", "occasion": "Winter", "bestseller": false},
{"id": 493, "code": "No. 493", "insp": "riecht wie: Homme", "note": "nische", "gender": "Herren", "family": "Holzig", "occasion": "Allrounder", "bestseller": false},
{"id": 494, "code": "No. 494", "insp": "riecht wie: CK One", "note": "nische", "gender": "Damen", "family": "Blumig", "occasion": "Date Night", "bestseller": false},
{"id": 495, "code": "No. 495", "insp": "riecht wie: Cool Water", "note": "nische", "gender": "Unisex", "family": "Frisch & Zitrus", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 496, "code": "No. 496", "insp": "riecht wie: Fuel for Life", "note": "nische", "gender": "Herren", "family": "Orientalisch", "occasion": "Sommer", "bestseller": false},
{"id": 497, "code": "No. 497", "insp": "riecht wie: Fierce", "note": "nische", "gender": "Damen", "family": "Leder", "occasion": "Winter", "bestseller": false},
{"id": 498, "code": "No. 498", "insp": "riecht wie: Voyage", "note": "nische", "gender": "Unisex", "family": "W\u00fcrzig", "occasion": "Allrounder", "bestseller": false},
{"id": 499, "code": "No. 499", "insp": "riecht wie: Classic Black", "note": "nische", "gender": "Herren", "family": "Honig & Gourmand", "occasion": "Date Night", "bestseller": false},
{"id": 500, "code": "No. 500", "insp": "riecht wie: Kalemat", "note": "nische", "gender": "Damen", "family": "Holzig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 501, "code": "No. 501", "insp": "riecht wie: Resala", "note": "nische", "gender": "Unisex", "family": "Blumig", "occasion": "Sommer", "bestseller": false},
{"id": 502, "code": "No. 502", "insp": "riecht wie: Erolfa", "note": "nische", "gender": "Herren", "family": "Frisch & Zitrus", "occasion": "Winter", "bestseller": false},
{"id": 503, "code": "No. 503", "insp": "riecht wie: Neroli Sauvage", "note": "nische", "gender": "Damen", "family": "Orientalisch", "occasion": "Allrounder", "bestseller": false},
{"id": 504, "code": "No. 504", "insp": "riecht wie: Akaster", "note": "nische", "gender": "Unisex", "family": "Leder", "occasion": "Date Night", "bestseller": false},
{"id": 505, "code": "No. 505", "insp": "riecht wie: Lippizan", "note": "nische", "gender": "Herren", "family": "W\u00fcrzig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 506, "code": "No. 506", "insp": "riecht wie: Casamorati Dolce Amalfi", "note": "nische", "gender": "Damen", "family": "Honig & Gourmand", "occasion": "Sommer", "bestseller": false},
{"id": 507, "code": "No. 507", "insp": "riecht wie: Renaissance", "note": "nische", "gender": "Unisex", "family": "Holzig", "occasion": "Winter", "bestseller": false},
{"id": 508, "code": "No. 508", "insp": "riecht wie: Sahara Noir", "note": "nische", "gender": "Herren", "family": "Blumig", "occasion": "Allrounder", "bestseller": false},
{"id": 509, "code": "No. 509", "insp": "riecht wie: Champaca Absolute", "note": "nische", "gender": "Damen", "family": "Frisch & Zitrus", "occasion": "Date Night", "bestseller": false},
{"id": 510, "code": "No. 510", "insp": "riecht wie: Cologne Pour le Soir", "note": "nische", "gender": "Unisex", "family": "Orientalisch", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 511, "code": "No. 511", "insp": "riecht wie: Les Sables Roses", "note": "nische", "gender": "Herren", "family": "Leder", "occasion": "Sommer", "bestseller": false},
{"id": 512, "code": "No. 512", "insp": "riecht wie: Eau Sauvage Parfum", "note": "nische", "gender": "Damen", "family": "W\u00fcrzig", "occasion": "Winter", "bestseller": false},
{"id": 513, "code": "No. 513", "insp": "riecht wie: Antaeus", "note": "nische", "gender": "Unisex", "family": "Honig & Gourmand", "occasion": "Allrounder", "bestseller": false},
{"id": 514, "code": "No. 514", "insp": "riecht wie: Le Male Essence de Parfum", "note": "nische", "gender": "Herren", "family": "Holzig", "occasion": "Date Night", "bestseller": false},
{"id": 515, "code": "No. 515", "insp": "riecht wie: M7 Oud Absolu", "note": "nische", "gender": "Damen", "family": "Blumig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 516, "code": "No. 516", "insp": "riecht wie: Code Ultimate", "note": "nische", "gender": "Unisex", "family": "Frisch & Zitrus", "occasion": "Sommer", "bestseller": false},
{"id": 517, "code": "No. 517", "insp": "riecht wie: Dreamer", "note": "nische", "gender": "Herren", "family": "Orientalisch", "occasion": "Winter", "bestseller": false},
{"id": 518, "code": "No. 518", "insp": "riecht wie: Ultrared", "note": "nische", "gender": "Damen", "family": "Leder", "occasion": "Allrounder", "bestseller": false},
{"id": 519, "code": "No. 519", "insp": "riecht wie: Boss Soul", "note": "nische", "gender": "Unisex", "family": "W\u00fcrzig", "occasion": "Date Night", "bestseller": false},
{"id": 520, "code": "No. 520", "insp": "riecht wie: Luna Rossa Sport", "note": "nische", "gender": "Herren", "family": "Honig & Gourmand", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 521, "code": "No. 521", "insp": "riecht wie: Dark Lord", "note": "nische", "gender": "Damen", "family": "Holzig", "occasion": "Sommer", "bestseller": false},
{"id": 522, "code": "No. 522", "insp": "riecht wie: Karagoz", "note": "nische", "gender": "Unisex", "family": "Blumig", "occasion": "Winter", "bestseller": false},
{"id": 523, "code": "No. 523", "insp": "riecht wie: Vetiver 46", "note": "nische", "gender": "Herren", "family": "Frisch & Zitrus", "occasion": "Allrounder", "bestseller": false},
{"id": 524, "code": "No. 524", "insp": "riecht wie: Blessed Baraka", "note": "nische", "gender": "Damen", "family": "Orientalisch", "occasion": "Date Night", "bestseller": false},
{"id": 525, "code": "No. 525", "insp": "riecht wie: Viride", "note": "nische", "gender": "Unisex", "family": "Leder", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 526, "code": "No. 526", "insp": "riecht wie: Fantomas", "note": "nische", "gender": "Herren", "family": "W\u00fcrzig", "occasion": "Sommer", "bestseller": false},
{"id": 527, "code": "No. 527", "insp": "riecht wie: Pink Boa", "note": "nische", "gender": "Damen", "family": "Honig & Gourmand", "occasion": "Winter", "bestseller": false},
{"id": 528, "code": "No. 528", "insp": "riecht wie: Carbonara", "note": "nische", "gender": "Unisex", "family": "Holzig", "occasion": "Allrounder", "bestseller": false},
{"id": 529, "code": "No. 529", "insp": "riecht wie: Tropical Wood", "note": "nische", "gender": "Herren", "family": "Blumig", "occasion": "Date Night", "bestseller": false},
{"id": 530, "code": "No. 530", "insp": "riecht wie: French Coffee", "note": "nische", "gender": "Damen", "family": "Frisch & Zitrus", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 531, "code": "No. 531", "insp": "riecht wie: Slow Dance", "note": "nische", "gender": "Unisex", "family": "Orientalisch", "occasion": "Sommer", "bestseller": false},
{"id": 532, "code": "No. 532", "insp": "riecht wie: Volutes", "note": "nische", "gender": "Herren", "family": "Leder", "occasion": "Winter", "bestseller": false},
{"id": 533, "code": "No. 533", "insp": "riecht wie: Purpose", "note": "nische", "gender": "Damen", "family": "W\u00fcrzig", "occasion": "Allrounder", "bestseller": false},
{"id": 534, "code": "No. 534", "insp": "riecht wie: Isola Blu", "note": "nische", "gender": "Unisex", "family": "Honig & Gourmand", "occasion": "Date Night", "bestseller": false},
{"id": 535, "code": "No. 535", "insp": "riecht wie: Wall Street", "note": "nische", "gender": "Herren", "family": "Holzig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 536, "code": "No. 536", "insp": "riecht wie: 212 VIP Men", "note": "nische", "gender": "Damen", "family": "Blumig", "occasion": "Sommer", "bestseller": false},
{"id": 537, "code": "No. 537", "insp": "riecht wie: Light Blue Forever", "note": "nische", "gender": "Unisex", "family": "Frisch & Zitrus", "occasion": "Winter", "bestseller": false},
{"id": 538, "code": "No. 538", "insp": "riecht wie: Habit Rouge", "note": "nische", "gender": "Herren", "family": "Orientalisch", "occasion": "Allrounder", "bestseller": false},
{"id": 539, "code": "No. 539", "insp": "riecht wie: A*Men Ultimate", "note": "nische", "gender": "Damen", "family": "Leder", "occasion": "Date Night", "bestseller": false},
{"id": 540, "code": "No. 540", "insp": "riecht wie: Hypn\u00f4se", "note": "nische", "gender": "Unisex", "family": "W\u00fcrzig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 541, "code": "No. 541", "insp": "riecht wie: Spicebomb Infrared", "note": "nische", "gender": "Herren", "family": "Honig & Gourmand", "occasion": "Sommer", "bestseller": false},
{"id": 542, "code": "No. 542", "insp": "riecht wie: Chrome Extreme", "note": "nische", "gender": "Damen", "family": "Holzig", "occasion": "Winter", "bestseller": false},
{"id": 543, "code": "No. 543", "insp": "riecht wie: Touch", "note": "nische", "gender": "Unisex", "family": "Blumig", "occasion": "Allrounder", "bestseller": false},
{"id": 544, "code": "No. 544", "insp": "riecht wie: Gentleman Society", "note": "nische", "gender": "Herren", "family": "Frisch & Zitrus", "occasion": "Date Night", "bestseller": false},
{"id": 545, "code": "No. 545", "insp": "riecht wie: Born In Roma Yellow Dream", "note": "nische", "gender": "Damen", "family": "Orientalisch", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 546, "code": "No. 546", "insp": "riecht wie: Whispers in the Library", "note": "nische", "gender": "Unisex", "family": "Leder", "occasion": "Sommer", "bestseller": false},
{"id": 547, "code": "No. 547", "insp": "riecht wie: Pomegranate Noir", "note": "nische", "gender": "Herren", "family": "W\u00fcrzig", "occasion": "Winter", "bestseller": false},
{"id": 548, "code": "No. 548", "insp": "riecht wie: Juniper Sling", "note": "nische", "gender": "Damen", "family": "Honig & Gourmand", "occasion": "Allrounder", "bestseller": false},
{"id": 549, "code": "No. 549", "insp": "riecht wie: Un Jardin sur le Nil", "note": "nische", "gender": "Unisex", "family": "Holzig", "occasion": "Date Night", "bestseller": false},
{"id": 550, "code": "No. 550", "insp": "riecht wie: Wood Essence", "note": "nische", "gender": "Herren", "family": "Blumig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 551, "code": "No. 551", "insp": "riecht wie: Velvet Oud", "note": "nische", "gender": "Damen", "family": "Frisch & Zitrus", "occasion": "Sommer", "bestseller": false},
{"id": 552, "code": "No. 552", "insp": "riecht wie: SNOI", "note": "nische", "gender": "Unisex", "family": "Orientalisch", "occasion": "Winter", "bestseller": false},
{"id": 553, "code": "No. 553", "insp": "riecht wie: Odyssey Mandarin Sky", "note": "nische", "gender": "Herren", "family": "Leder", "occasion": "Allrounder", "bestseller": false},
{"id": 554, "code": "No. 554", "insp": "riecht wie: Fattan", "note": "nische", "gender": "Damen", "family": "W\u00fcrzig", "occasion": "Date Night", "bestseller": false},
{"id": 555, "code": "No. 555", "insp": "riecht wie: Casablanca", "note": "nische", "gender": "Unisex", "family": "Honig & Gourmand", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 556, "code": "No. 556", "insp": "riecht wie: L'Aventure Knight", "note": "nische", "gender": "Herren", "family": "Holzig", "occasion": "Sommer", "bestseller": false},
{"id": 557, "code": "No. 557", "insp": "riecht wie: Crab Apple Blossom", "note": "nische", "gender": "Damen", "family": "Blumig", "occasion": "Winter", "bestseller": false},
{"id": 558, "code": "No. 558", "insp": "riecht wie: Sahraa", "note": "nische", "gender": "Unisex", "family": "Frisch & Zitrus", "occasion": "Allrounder", "bestseller": false},
{"id": 559, "code": "No. 559", "insp": "riecht wie: French Flower", "note": "nische", "gender": "Herren", "family": "Orientalisch", "occasion": "Date Night", "bestseller": false},
{"id": 560, "code": "No. 560", "insp": "riecht wie: Fig Infusion", "note": "nische", "gender": "Damen", "family": "Leder", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 561, "code": "No. 561", "insp": "riecht wie: Desert Rosewood", "note": "nische", "gender": "Unisex", "family": "W\u00fcrzig", "occasion": "Sommer", "bestseller": false},
{"id": 562, "code": "No. 562", "insp": "riecht wie: Sundowner", "note": "nische", "gender": "Herren", "family": "Honig & Gourmand", "occasion": "Winter", "bestseller": false},
{"id": 563, "code": "No. 563", "insp": "riecht wie: Monarch", "note": "nische", "gender": "Damen", "family": "Holzig", "occasion": "Allrounder", "bestseller": false},
{"id": 564, "code": "No. 564", "insp": "riecht wie: Silverlake", "note": "nische", "gender": "Unisex", "family": "Blumig", "occasion": "Date Night", "bestseller": false},
{"id": 565, "code": "No. 565", "insp": "riecht wie: Ombre Noire", "note": "nische", "gender": "Herren", "family": "Frisch & Zitrus", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 566, "code": "No. 566", "insp": "riecht wie: This is Really Him!", "note": "nische", "gender": "Damen", "family": "Orientalisch", "occasion": "Sommer", "bestseller": false},
{"id": 567, "code": "No. 567", "insp": "riecht wie: Roadster", "note": "nische", "gender": "Unisex", "family": "Leder", "occasion": "Winter", "bestseller": false},
{"id": 568, "code": "No. 568", "insp": "riecht wie: Explorer Ultra Blue", "note": "nische", "gender": "Herren", "family": "W\u00fcrzig", "occasion": "Allrounder", "bestseller": false},
{"id": 569, "code": "No. 569", "insp": "riecht wie: Nuit d'Issey", "note": "nische", "gender": "Damen", "family": "Honig & Gourmand", "occasion": "Date Night", "bestseller": false},
{"id": 570, "code": "No. 570", "insp": "riecht wie: Ebony Wood", "note": "nische", "gender": "Unisex", "family": "Holzig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 571, "code": "No. 571", "insp": "riecht wie: Jump", "note": "nische", "gender": "Herren", "family": "Blumig", "occasion": "Sommer", "bestseller": false},
{"id": 572, "code": "No. 572", "insp": "riecht wie: Eternity", "note": "nische", "gender": "Damen", "family": "Frisch & Zitrus", "occasion": "Winter", "bestseller": false},
{"id": 573, "code": "No. 573", "insp": "riecht wie: Cool Water Intense", "note": "nische", "gender": "Unisex", "family": "Orientalisch", "occasion": "Allrounder", "bestseller": false},
{"id": 574, "code": "No. 574", "insp": "riecht wie: Only the Brave", "note": "nische", "gender": "Herren", "family": "Leder", "occasion": "Date Night", "bestseller": false},
{"id": 575, "code": "No. 575", "insp": "riecht wie: First Instinct", "note": "nische", "gender": "Damen", "family": "W\u00fcrzig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 576, "code": "No. 576", "insp": "riecht wie: Icon", "note": "nische", "gender": "Unisex", "family": "Honig & Gourmand", "occasion": "Sommer", "bestseller": false},
{"id": 577, "code": "No. 577", "insp": "riecht wie: Icon Absolute", "note": "nische", "gender": "Herren", "family": "Holzig", "occasion": "Winter", "bestseller": false},
{"id": 578, "code": "No. 578", "insp": "riecht wie: Emir You're Drugged", "note": "nische", "gender": "Damen", "family": "Blumig", "occasion": "Allrounder", "bestseller": false},
{"id": 579, "code": "No. 579", "insp": "riecht wie: Cocktail Intense", "note": "nische", "gender": "Unisex", "family": "Frisch & Zitrus", "occasion": "Date Night", "bestseller": false},
{"id": 580, "code": "No. 580", "insp": "riecht wie: Qaed Al Fheed", "note": "nische", "gender": "Herren", "family": "Orientalisch", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 581, "code": "No. 581", "insp": "riecht wie: Royal Water", "note": "nische", "gender": "Damen", "family": "Leder", "occasion": "Sommer", "bestseller": false},
{"id": 582, "code": "No. 582", "insp": "riecht wie: Santal Imp\u00e9rial", "note": "nische", "gender": "Unisex", "family": "W\u00fcrzig", "occasion": "Winter", "bestseller": false},
{"id": 583, "code": "No. 583", "insp": "riecht wie: Shagya", "note": "nische", "gender": "Herren", "family": "Honig & Gourmand", "occasion": "Allrounder", "bestseller": false},
{"id": 584, "code": "No. 584", "insp": "riecht wie: Kobe", "note": "nische", "gender": "Damen", "family": "Holzig", "occasion": "Date Night", "bestseller": false},
{"id": 585, "code": "No. 585", "insp": "riecht wie: Mandarino di Amalfi", "note": "nische", "gender": "Unisex", "family": "Blumig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 586, "code": "No. 586", "insp": "riecht wie: Oud", "note": "nische", "gender": "Herren", "family": "Frisch & Zitrus", "occasion": "Sommer", "bestseller": false},
{"id": 587, "code": "No. 587", "insp": "riecht wie: Nuit de Feu", "note": "nische", "gender": "Damen", "family": "Orientalisch", "occasion": "Winter", "bestseller": false},
{"id": 588, "code": "No. 588", "insp": "riecht wie: Higher", "note": "nische", "gender": "Unisex", "family": "Leder", "occasion": "Allrounder", "bestseller": false},
{"id": 589, "code": "No. 589", "insp": "riecht wie: Pour Monsieur", "note": "nische", "gender": "Herren", "family": "W\u00fcrzig", "occasion": "Date Night", "bestseller": false},
{"id": 590, "code": "No. 590", "insp": "riecht wie: Fleur du M\u00e2le", "note": "nische", "gender": "Damen", "family": "Honig & Gourmand", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 591, "code": "No. 591", "insp": "riecht wie: Body Kouros", "note": "nische", "gender": "Unisex", "family": "Holzig", "occasion": "Sommer", "bestseller": false},
{"id": 592, "code": "No. 592", "insp": "riecht wie: Code Special Code", "note": "nische", "gender": "Herren", "family": "Blumig", "occasion": "Winter", "bestseller": false},
{"id": 593, "code": "No. 593", "insp": "riecht wie: Blue Jeans", "note": "nische", "gender": "Damen", "family": "Frisch & Zitrus", "occasion": "Allrounder", "bestseller": false},
{"id": 594, "code": "No. 594", "insp": "riecht wie: Black XS", "note": "nische", "gender": "Unisex", "family": "Orientalisch", "occasion": "Date Night", "bestseller": false},
{"id": 595, "code": "No. 595", "insp": "riecht wie: Boss Selection", "note": "nische", "gender": "Herren", "family": "Leder", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 596, "code": "No. 596", "insp": "riecht wie: Infusion d'Iris", "note": "nische", "gender": "Damen", "family": "W\u00fcrzig", "occasion": "Sommer", "bestseller": false},
{"id": 597, "code": "No. 597", "insp": "riecht wie: Amber Oud", "note": "nische", "gender": "Unisex", "family": "Honig & Gourmand", "occasion": "Winter", "bestseller": false},
{"id": 598, "code": "No. 598", "insp": "riecht wie: B-612", "note": "nische", "gender": "Herren", "family": "Holzig", "occasion": "Allrounder", "bestseller": false},
{"id": 599, "code": "No. 599", "insp": "riecht wie: Lys 41", "note": "nische", "gender": "Damen", "family": "Blumig", "occasion": "Date Night", "bestseller": false},
{"id": 600, "code": "No. 600", "insp": "riecht wie: Oud for Happiness", "note": "nische", "gender": "Unisex", "family": "Frisch & Zitrus", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 601, "code": "No. 601", "insp": "riecht wie: Seminalis", "note": "nische", "gender": "Herren", "family": "Orientalisch", "occasion": "Sommer", "bestseller": false},
{"id": 602, "code": "No. 602", "insp": "riecht wie: Sadonaso", "note": "nische", "gender": "Damen", "family": "Leder", "occasion": "Winter", "bestseller": false},
{"id": 603, "code": "No. 603", "insp": "riecht wie: Sand Dance", "note": "nische", "gender": "Unisex", "family": "W\u00fcrzig", "occasion": "Allrounder", "bestseller": false},
{"id": 604, "code": "No. 604", "insp": "riecht wie: Evil Angel", "note": "nische", "gender": "Herren", "family": "Honig & Gourmand", "occasion": "Date Night", "bestseller": false},
{"id": 605, "code": "No. 605", "insp": "riecht wie: Mukhallat", "note": "nische", "gender": "Damen", "family": "Holzig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 606, "code": "No. 606", "insp": "riecht wie: Tonka Cola", "note": "nische", "gender": "Unisex", "family": "Blumig", "occasion": "Sommer", "bestseller": false},
{"id": 607, "code": "No. 607", "insp": "riecht wie: Eyes Closed", "note": "nische", "gender": "Herren", "family": "Frisch & Zitrus", "occasion": "Winter", "bestseller": false},
{"id": 608, "code": "No. 608", "insp": "riecht wie: Eau Capitale", "note": "nische", "gender": "Damen", "family": "Orientalisch", "occasion": "Allrounder", "bestseller": false},
{"id": 609, "code": "No. 609", "insp": "riecht wie: Beach Hut Man", "note": "nische", "gender": "Unisex", "family": "Leder", "occasion": "Date Night", "bestseller": false},
{"id": 610, "code": "No. 610", "insp": "riecht wie: Manhattan", "note": "nische", "gender": "Herren", "family": "W\u00fcrzig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 611, "code": "No. 611", "insp": "riecht wie: TriBeCa", "note": "nische", "gender": "Damen", "family": "Honig & Gourmand", "occasion": "Sommer", "bestseller": false},
{"id": 612, "code": "No. 612", "insp": "riecht wie: 212 Men", "note": "nische", "gender": "Unisex", "family": "Holzig", "occasion": "Winter", "bestseller": false},
{"id": 613, "code": "No. 613", "insp": "riecht wie: The One Grey", "note": "nische", "gender": "Herren", "family": "Blumig", "occasion": "Allrounder", "bestseller": false},
{"id": 614, "code": "No. 614", "insp": "riecht wie: Angelique Noire", "note": "nische", "gender": "Damen", "family": "Frisch & Zitrus", "occasion": "Date Night", "bestseller": false},
{"id": 615, "code": "No. 615", "insp": "riecht wie: Angel Elixir", "note": "nische", "gender": "Unisex", "family": "Orientalisch", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 616, "code": "No. 616", "insp": "riecht wie: Id\u00f4le Aura", "note": "nische", "gender": "Herren", "family": "Leder", "occasion": "Sommer", "bestseller": false},
{"id": 617, "code": "No. 617", "insp": "riecht wie: Flowerbomb Nectar", "note": "nische", "gender": "Damen", "family": "W\u00fcrzig", "occasion": "Winter", "bestseller": false},
{"id": 618, "code": "No. 618", "insp": "riecht wie: Chrome Legend", "note": "nische", "gender": "Unisex", "family": "Honig & Gourmand", "occasion": "Allrounder", "bestseller": false},
{"id": 619, "code": "No. 619", "insp": "riecht wie: My Burberry", "note": "nische", "gender": "Herren", "family": "Holzig", "occasion": "Date Night", "bestseller": false},
{"id": 620, "code": "No. 620", "insp": "riecht wie: Bois\u00e9e", "note": "nische", "gender": "Damen", "family": "Blumig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 621, "code": "No. 621", "insp": "riecht wie: Coral Fantasy", "note": "nische", "gender": "Unisex", "family": "Frisch & Zitrus", "occasion": "Sommer", "bestseller": false},
{"id": 622, "code": "No. 622", "insp": "riecht wie: Coffee Break", "note": "nische", "gender": "Herren", "family": "Orientalisch", "occasion": "Winter", "bestseller": false},
{"id": 623, "code": "No. 623", "insp": "riecht wie: Blackberry & Bay", "note": "nische", "gender": "Damen", "family": "Leder", "occasion": "Allrounder", "bestseller": false},
{"id": 624, "code": "No. 624", "insp": "riecht wie: Mr Sam", "note": "nische", "gender": "Unisex", "family": "W\u00fcrzig", "occasion": "Date Night", "bestseller": false},
{"id": 625, "code": "No. 625", "insp": "riecht wie: Twilly d'Herm\u00e8s", "note": "nische", "gender": "Herren", "family": "Honig & Gourmand", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 626, "code": "No. 626", "insp": "riecht wie: Glacial Essence", "note": "nische", "gender": "Damen", "family": "Holzig", "occasion": "Sommer", "bestseller": false},
{"id": 627, "code": "No. 627", "insp": "riecht wie: Raghba", "note": "nische", "gender": "Unisex", "family": "Blumig", "occasion": "Winter", "bestseller": false},
{"id": 628, "code": "No. 628", "insp": "riecht wie: Modest Une", "note": "nische", "gender": "Herren", "family": "Frisch & Zitrus", "occasion": "Allrounder", "bestseller": false},
{"id": 629, "code": "No. 629", "insp": "riecht wie: Tres Nuit", "note": "nische", "gender": "Damen", "family": "Orientalisch", "occasion": "Date Night", "bestseller": false},
{"id": 630, "code": "No. 630", "insp": "riecht wie: Dareej", "note": "nische", "gender": "Unisex", "family": "Leder", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 631, "code": "No. 631", "insp": "riecht wie: Shaghaf Oud Azraq", "note": "nische", "gender": "Herren", "family": "W\u00fcrzig", "occasion": "Sommer", "bestseller": false},
{"id": 632, "code": "No. 632", "insp": "riecht wie: Amber Oud Bleu Edition", "note": "nische", "gender": "Damen", "family": "Honig & Gourmand", "occasion": "Winter", "bestseller": false},
{"id": 633, "code": "No. 633", "insp": "riecht wie: Imperium", "note": "nische", "gender": "Unisex", "family": "Holzig", "occasion": "Allrounder", "bestseller": false},
{"id": 634, "code": "No. 634", "insp": "riecht wie: Bois d'Ebene", "note": "nische", "gender": "Herren", "family": "Blumig", "occasion": "Date Night", "bestseller": false},
{"id": 635, "code": "No. 635", "insp": "riecht wie: Mon Vetiver", "note": "nische", "gender": "Damen", "family": "Frisch & Zitrus", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 636, "code": "No. 636", "insp": "riecht wie: Velvet Splendour", "note": "nische", "gender": "Unisex", "family": "Orientalisch", "occasion": "Sommer", "bestseller": false},
{"id": 637, "code": "No. 637", "insp": "riecht wie: Lonestar Memories", "note": "nische", "gender": "Herren", "family": "Leder", "occasion": "Winter", "bestseller": false},
{"id": 638, "code": "No. 638", "insp": "riecht wie: Heroine", "note": "nische", "gender": "Damen", "family": "W\u00fcrzig", "occasion": "Allrounder", "bestseller": false},
{"id": 639, "code": "No. 639", "insp": "riecht wie: For Men Black Edition", "note": "nische", "gender": "Unisex", "family": "Honig & Gourmand", "occasion": "Date Night", "bestseller": false},
{"id": 640, "code": "No. 640", "insp": "riecht wie: Pour Homme Equus", "note": "nische", "gender": "Herren", "family": "Holzig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 641, "code": "No. 641", "insp": "riecht wie: This is Her!", "note": "nische", "gender": "Damen", "family": "Blumig", "occasion": "Sommer", "bestseller": false},
{"id": 642, "code": "No. 642", "insp": "riecht wie: Declaration d'Un Soir", "note": "nische", "gender": "Unisex", "family": "Frisch & Zitrus", "occasion": "Winter", "bestseller": false},
{"id": 643, "code": "No. 643", "insp": "riecht wie: Legend Spirit", "note": "nische", "gender": "Herren", "family": "Orientalisch", "occasion": "Allrounder", "bestseller": false},
{"id": 644, "code": "No. 644", "insp": "riecht wie: L'Eau d'Issey Intense", "note": "nische", "gender": "Damen", "family": "Leder", "occasion": "Date Night", "bestseller": false},
{"id": 645, "code": "No. 645", "insp": "riecht wie: For Him Red Edition", "note": "nische", "gender": "Unisex", "family": "W\u00fcrzig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 646, "code": "No. 646", "insp": "riecht wie: Le Bain", "note": "nische", "gender": "Herren", "family": "Honig & Gourmand", "occasion": "Sommer", "bestseller": false},
{"id": 647, "code": "No. 647", "insp": "riecht wie: Obsession", "note": "nische", "gender": "Damen", "family": "Holzig", "occasion": "Winter", "bestseller": false},
{"id": 648, "code": "No. 648", "insp": "riecht wie: Zino", "note": "nische", "gender": "Unisex", "family": "Blumig", "occasion": "Allrounder", "bestseller": false},
{"id": 649, "code": "No. 649", "insp": "riecht wie: Bad", "note": "nische", "gender": "Herren", "family": "Frisch & Zitrus", "occasion": "Date Night", "bestseller": false},
{"id": 650, "code": "No. 650", "insp": "riecht wie: Desire Red", "note": "nische", "gender": "Damen", "family": "Orientalisch", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 651, "code": "No. 651", "insp": "riecht wie: Epicea", "note": "nische", "gender": "Unisex", "family": "Leder", "occasion": "Sommer", "bestseller": false},
{"id": 652, "code": "No. 652", "insp": "riecht wie: Byerley", "note": "nische", "gender": "Herren", "family": "W\u00fcrzig", "occasion": "Winter", "bestseller": false},
{"id": 653, "code": "No. 653", "insp": "riecht wie: Fiero", "note": "nische", "gender": "Damen", "family": "Honig & Gourmand", "occasion": "Allrounder", "bestseller": false},
{"id": 654, "code": "No. 654", "insp": "riecht wie: Jonquille de Nuit", "note": "nische", "gender": "Unisex", "family": "Holzig", "occasion": "Date Night", "bestseller": false},
{"id": 655, "code": "No. 655", "insp": "riecht wie: BLV Pour Homme", "note": "nische", "gender": "Herren", "family": "Blumig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 656, "code": "No. 656", "insp": "riecht wie: Spell On You", "note": "nische", "gender": "Damen", "family": "Frisch & Zitrus", "occasion": "Sommer", "bestseller": false},
{"id": 657, "code": "No. 657", "insp": "riecht wie: Mitzah", "note": "nische", "gender": "Unisex", "family": "Orientalisch", "occasion": "Winter", "bestseller": false},
{"id": 658, "code": "No. 658", "insp": "riecht wie: Cristalle", "note": "nische", "gender": "Herren", "family": "Leder", "occasion": "Allrounder", "bestseller": false},
{"id": 659, "code": "No. 659", "insp": "riecht wie: Scandal Le Parfum", "note": "nische", "gender": "Damen", "family": "W\u00fcrzig", "occasion": "Date Night", "bestseller": false},
{"id": 660, "code": "No. 660", "insp": "riecht wie: L'Homme Ultime", "note": "nische", "gender": "Unisex", "family": "Honig & Gourmand", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 661, "code": "No. 661", "insp": "riecht wie: Acqua di Gi\u00f2 Absolu", "note": "nische", "gender": "Herren", "family": "Holzig", "occasion": "Sommer", "bestseller": false},
{"id": 662, "code": "No. 662", "insp": "riecht wie: Pour Homme Oud Noir", "note": "nische", "gender": "Damen", "family": "Blumig", "occasion": "Winter", "bestseller": false},
{"id": 663, "code": "No. 663", "insp": "riecht wie: Invictus Platinum", "note": "nische", "gender": "Unisex", "family": "Frisch & Zitrus", "occasion": "Allrounder", "bestseller": false},
{"id": 664, "code": "No. 664", "insp": "riecht wie: Boss Element", "note": "nische", "gender": "Herren", "family": "Orientalisch", "occasion": "Date Night", "bestseller": false},
{"id": 665, "code": "No. 665", "insp": "riecht wie: Luna Rossa Ocean Le Parfum", "note": "nische", "gender": "Damen", "family": "Leder", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 666, "code": "No. 666", "insp": "riecht wie: Rose Oud", "note": "nische", "gender": "Unisex", "family": "W\u00fcrzig", "occasion": "Sommer", "bestseller": false},
{"id": 667, "code": "No. 667", "insp": "riecht wie: Suede et Safran", "note": "nische", "gender": "Herren", "family": "Honig & Gourmand", "occasion": "Winter", "bestseller": false},
{"id": 668, "code": "No. 668", "insp": "riecht wie: Tonka 25", "note": "nische", "gender": "Damen", "family": "Holzig", "occasion": "Allrounder", "bestseller": false},
{"id": 669, "code": "No. 669", "insp": "riecht wie: Divine Attraction", "note": "nische", "gender": "Unisex", "family": "Blumig", "occasion": "Date Night", "bestseller": false},
{"id": 670, "code": "No. 670", "insp": "riecht wie: Boccanera", "note": "nische", "gender": "Herren", "family": "Frisch & Zitrus", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 671, "code": "No. 671", "insp": "riecht wie: Nudiflorum", "note": "nische", "gender": "Damen", "family": "Orientalisch", "occasion": "Sommer", "bestseller": false},
{"id": 672, "code": "No. 672", "insp": "riecht wie: Mortal Skin", "note": "nische", "gender": "Unisex", "family": "Leder", "occasion": "Winter", "bestseller": false},
{"id": 673, "code": "No. 673", "insp": "riecht wie: Extreme Passion", "note": "nische", "gender": "Herren", "family": "W\u00fcrzig", "occasion": "Allrounder", "bestseller": false},
{"id": 674, "code": "No. 674", "insp": "riecht wie: Dark Vanilla", "note": "nische", "gender": "Damen", "family": "Honig & Gourmand", "occasion": "Date Night", "bestseller": false},
{"id": 675, "code": "No. 675", "insp": "riecht wie: Amora", "note": "nische", "gender": "Unisex", "family": "Holzig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 676, "code": "No. 676", "insp": "riecht wie: Mixed Emotions", "note": "nische", "gender": "Herren", "family": "Blumig", "occasion": "Sommer", "bestseller": false},
{"id": 677, "code": "No. 677", "insp": "riecht wie: Vetyverio", "note": "nische", "gender": "Damen", "family": "Frisch & Zitrus", "occasion": "Winter", "bestseller": false},
{"id": 678, "code": "No. 678", "insp": "riecht wie: Crimson Rocks", "note": "nische", "gender": "Unisex", "family": "Orientalisch", "occasion": "Allrounder", "bestseller": false},
{"id": 679, "code": "No. 679", "insp": "riecht wie: Oceania", "note": "nische", "gender": "Herren", "family": "Leder", "occasion": "Date Night", "bestseller": false},
{"id": 680, "code": "No. 680", "insp": "riecht wie: Fierce", "note": "nische", "gender": "Damen", "family": "W\u00fcrzig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 681, "code": "No. 681", "insp": "riecht wie: Very Good Girl Elixir", "note": "nische", "gender": "Unisex", "family": "Honig & Gourmand", "occasion": "Sommer", "bestseller": false},
{"id": 682, "code": "No. 682", "insp": "riecht wie: Pour Femme", "note": "nische", "gender": "Herren", "family": "Holzig", "occasion": "Winter", "bestseller": false},
{"id": 683, "code": "No. 683", "insp": "riecht wie: Cuir Beluga", "note": "nische", "gender": "Damen", "family": "Blumig", "occasion": "Allrounder", "bestseller": false},
{"id": 684, "code": "No. 684", "insp": "riecht wie: Alien Goddess Intense", "note": "nische", "gender": "Unisex", "family": "Frisch & Zitrus", "occasion": "Date Night", "bestseller": false},
{"id": 685, "code": "No. 685", "insp": "riecht wie: La Vie Est Belle Soleil Cristal", "note": "nische", "gender": "Herren", "family": "Orientalisch", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 686, "code": "No. 686", "insp": "riecht wie: Spicebomb Night Vision EDP", "note": "nische", "gender": "Damen", "family": "Leder", "occasion": "Sommer", "bestseller": false},
{"id": 687, "code": "No. 687", "insp": "riecht wie: Visit", "note": "nische", "gender": "Unisex", "family": "W\u00fcrzig", "occasion": "Winter", "bestseller": false},
{"id": 688, "code": "No. 688", "insp": "riecht wie: Hero Parfum", "note": "nische", "gender": "Herren", "family": "Honig & Gourmand", "occasion": "Allrounder", "bestseller": false},
{"id": 689, "code": "No. 689", "insp": "riecht wie: Gentleman Bois\u00e9e Intense", "note": "nische", "gender": "Damen", "family": "Holzig", "occasion": "Date Night", "bestseller": false},
{"id": 690, "code": "No. 690", "insp": "riecht wie: Donna Born In Roma Intense", "note": "nische", "gender": "Unisex", "family": "Blumig", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 691, "code": "No. 691", "insp": "riecht wie: Autumn Vibes", "note": "nische", "gender": "Herren", "family": "Frisch & Zitrus", "occasion": "Sommer", "bestseller": false},
{"id": 692, "code": "No. 692", "insp": "riecht wie: Oud & Bergamot", "note": "nische", "gender": "Damen", "family": "Orientalisch", "occasion": "Winter", "bestseller": false},
{"id": 693, "code": "No. 693", "insp": "riecht wie: Babylon", "note": "nische", "gender": "Unisex", "family": "Leder", "occasion": "Allrounder", "bestseller": false},
{"id": 694, "code": "No. 694", "insp": "riecht wie: Bel Ami", "note": "nische", "gender": "Herren", "family": "W\u00fcrzig", "occasion": "Date Night", "bestseller": false},
{"id": 695, "code": "No. 695", "insp": "riecht wie: Premium Duft 695", "note": "nische", "gender": "Damen", "family": "Honig & Gourmand", "occasion": "B\u00fcro & Alltag", "bestseller": false},
{"id": 696, "code": "No. 696", "insp": "riecht wie: Confessions", "note": "nische", "gender": "Unisex", "family": "Holzig", "occasion": "Sommer", "bestseller": false},
{"id": 697, "code": "No. 697", "insp": "riecht wie: Historic Olmeda", "note": "nische", "gender": "Herren", "family": "Blumig", "occasion": "Winter", "bestseller": false},
{"id": 698, "code": "No. 698", "insp": "riecht wie: Ventana", "note": "nische", "gender": "Damen", "family": "Frisch & Zitrus", "occasion": "Allrounder", "bestseller": false},
{"id": 699, "code": "No. 699", "insp": "riecht wie: Shuhrah", "note": "nische", "gender": "Unisex", "family": "Orientalisch", "occasion": "Date Night", "bestseller": false},
{"id": 700, "code": "No. 700", "insp": "riecht wie: Evoke Gold", "note": "nische", "gender": "Herren", "family": "Leder", "occasion": "B\u00fcro & Alltag", "bestseller": false}
];
const TESTIMONIALS = [
  { name: "Lea M.", text: "Hält den ganzen Tag, riecht wirklich hochwertig. Kam nach 3 Tagen an.", rating: 5 },
  { name: "Jonas K.", text: "Für den Preis unschlagbar nah am Original. Bestelle definitiv wieder.", rating: 5 },
  { name: "Sophie R.", text: "Bestellung lief unkompliziert über Instagram, super freundlicher Kontakt.", rating: 5 },
  { name: "Deniz A.", text: "No. 09 ist mein neuer Alltagsduft geworden. Sehr empfehlenswert.", rating: 5 },
];

const IG_URL = "https://instagram.com/elan.fragrances";
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
  "AB 3 FLASCHEN: 10% RABATT | AB 5 FLASCHEN: GRATIS VERSAND",
  "SICHER BEZAHLEN: PAYPAL ODER ÜBERWEISUNG",
  "EXTRAIT DE PARFUM · 30% ÖLANTEIL",
];

const fmt = (n) => n.toFixed(2).replace(".", ",") + " €";

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
  };
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
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState(null);
  const [mobileNav, setMobileNav] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizResult, setQuizResult] = useState(null);
  const [showPopup, setShowPopup] = useState(true); // NEU: Popup beim ersten Laden
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
  
  // GEÄNDERT: Rabatt ab 3, Versand ab 5
  const discount = count >= 3 ? total * 0.10 : 0;
  const shipping = count === 0 ? 0 : count >= 5 ? 0 : 6.2;
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
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .ticker-track { animation: marquee 26s linear infinite; width: max-content; }
        .category-tile { transition: transform .3s ease; cursor: pointer; border: none; }
        .category-tile:hover { transform: scale(1.02); }
        .category-icon { transition: transform .3s ease; }
      `}</style>

      {/* Ticker + Header */}
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
      <div style={{ height: 104 }} />

      {/* Mobile Menu */}
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

      {{/* POPUP - NEUKUNDEN 30% RABATT */}
{showPopup && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "#241809AA" }} onClick={() => setShowPopup(false)}>
    <div className="w-full" style={{ maxWidth: "340px", background: C.bg, border: `1px solid ${C.line}`, borderRadius: "20px", overflow: "hidden" }} onClick={(e) => e.stopPropagation()}>
      
      {/* Schließen-Button - OBEN */}
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "12px 16px" }}>
        <button
          onClick={() => setShowPopup(false)}
          aria-label="Schließen"
          style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: C.ink }}
        >
          ×
        </button>
      </div>

      {/* Bild */}
      <div style={{ width: "100%", height: "220px", background: C.gold, display: "flex", alignItems: "center", justifyContent: "center", color: C.muted, fontSize: "14px" }}>
        <img src="/images/popup-rabatt.jpg" alt="30% Rabatt" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>

      {/* Content */}
      <div style={{ padding: "30px 30px 35px" }}>
        <p style={{ margin: 0, fontSize: "14px", fontWeight: "600", letterSpacing: "0.15em", textTransform: "uppercase", color: C.gold }}>
          NEUKUNDEN
        </p>
        <h3 style={{ margin: "10px 0 5px 0", fontSize: "32px", fontWeight: "300", letterSpacing: "0.05em", color: C.ink }}>
          30% Rabatt
        </h3>
        <p style={{ margin: "0 0 25px 0", fontSize: "16px", fontWeight: "300", letterSpacing: "0.05em", color: C.muted }}>
          auf deine erste Bestellung
        </p>

        {/* Code kopieren Button */}
        <button
          onClick={() => {
            navigator.clipboard?.writeText("ELANONTOP30").then(() => {
              setToast("✓ Code kopiert: ELANONTOP30 — Jetzt einkaufen und 30% sparen!");
              setTimeout(() => setToast(null), 4000);
              setTimeout(() => setShowPopup(false), 1500);
            }).catch(() => setToast("Code: ELANONTOP30"));
          }}
          style={{
            background: C.ink,
            color: C.goldHi,
            border: "none",
            borderRadius: "30px",
            padding: "14px 30px",
            fontSize: "14px",
            fontWeight: "600",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            cursor: "pointer",
            width: "100%",
          }}
          onMouseOver={(e) => e.target.style.background = C.inkHi}
          onMouseOut={(e) => e.target.style.background = C.ink}
        >
          Code kopieren
        </button>
      </div>
    </div>
  </div>
)}

      {/* HERO SECTION */}
      <section id="top" className="relative px-6 md:px-12 pt-16 pb-12 md:pt-24 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="hidden md:grid grid-cols-3 gap-6 mb-12">
            <img
              src="/images/hero-1.jpg"
              alt="ÉLAN 1"
              className="w-full rounded-lg object-cover hover:scale-105 transition-transform duration-300"
              style={{ height: 580 }}
            />
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
            <img
              src="/images/hero-2.jpg"
              alt="ÉLAN 2"
              className="w-full rounded-lg object-cover hover:scale-105 transition-transform duration-300"
              style={{ height: 580 }}
            />
          </div>

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

      {/* TESTIMONIALS SECTION */}
      <section id="stimmen" className="px-6 md:px-12 py-16 md:py-24 max-w-6xl mx-auto">
        <div className="text-xs tracked uppercase mb-2 text-center" style={{ color: C.gold }}>Kundenfeedback</div>
        <h2 className="font-display text-4xl md:text-5xl text-center mb-16">Das sagen unsere Kunden</h2>
        
        <div className="overflow-hidden pb-6 carousel-mask" style={{ WebkitOverflowScrolling: "touch" }}>
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

      {/* CATEGORIES */}
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

      {/* TRUST CARDS */}
    <section className="px-6 md:px-12 pb-16 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-4 gap-6">
  <FloatCard icon={<Truck size={20} />} title="Versand in 2–4 Werktagen" sub="Schneller, diskreter Versand" />
  <FloatCard icon={<Gift size={20} />} title="Ab 3 Flaschen: 10% Rabatt | Ab 5: Gratis Versand" sub="Automatische Anrechnung" />
  <FloatCard icon={<ShieldCheck size={20} />} title="Sicher bezahlen" sub="PayPal oder Banküberweisung" />
  <FloatCard icon={<Percent size={20} />} title="30% Rabatt" sub="Für Neukunden auf die erste Bestellung" />
      </section>

      {/* TRUST BAR */}
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

      {/* STORY */}
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

      {/* BESTSELLER */}
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

      {/* SHOP */}
      <section id="shop" className="px-6 md:px-12 py-20 max-w-6xl mx-auto" style={{ borderTop: `1px solid ${C.line}` }}>
        <div className="text-center mb-10">
          <div className="text-xs tracked uppercase mb-2" style={{ color: C.gold }}>Gesamte Kollektion · {PRODUCTS.length} Düfte</div>
          <h2 className="font-display text-4xl">Alle Düfte</h2>
        </div>

        <div className="max-w-md mx-auto mb-6">
          <input
            className="el-input w-full px-4 py-2.5 text-sm"
            placeholder="Duft suchen (z. B. Aventus, Leder, No. 012) ..."
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
          Flaschen 10% Rabatt, ab 5 Flaschen kostenlos.
        </p>
      </section>

      {/* FOOTER */}
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

      {/* Quiz Modal */}
      {quizOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "#241809AA" }} onClick={() => setQuizOpen(false)}>
          <div className="w-full max-w-md" style={{ background: C.bg, border: `1px solid ${C.line}` }} onClick={(e) => e.stopPropagation()}>
            {quizResult ? (
              <div className="p-8 text-center">
                <div className="text-xs tracked uppercase mb-4" style={{ color: C.gold }}>Dein perfekter Duft</div>
                <ProductVisual p={quizResult} size={0.9} />
                <div className="font-display text-2xl mt-4">ÉLAN {quizResult.code}</div>
                <div className="text-xs italic mt-1" style={{ color: C.gold }}>{quizResult.insp}</div>
                <div className="text-sm mt-3" style={{ color: C.muted }}>{quizResult.note}</div>
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

      {/* Cart Drawer */}
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
                    <span className="flex items-center gap-1"><Percent size={12} /> Rabatt (-10%)</span><span>-{fmt(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm mb-1" style={{ color: C.muted }}><span>Versand</span><span>{shipping === 0 ? "kostenlos" : fmt(shipping)}</span></div>
                {count > 0 && count < 5 && <div className="text-[11px] mb-3" style={{ color: C.gold }}>Noch {5 - count} Flasche(n) für kostenlosen Versand!</div>}
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

      {/* Toast */}
      {toast && (
        <div
          className="fixed bottom-6 left-1/2 z-[60] px-5 py-3 text-xs tracked uppercase"
          style={{ transform: "translateX(-50%)", background: C.ink, color: C.goldHi, boxShadow: "0 10px 30px -10px rgba(36,24,9,0.5)" }}
        >
          {toast}
        </div>
      )}
      {/* Floating Badge - 30% Rabatt rechts unten */}
      <div
        onClick={() => {
          navigator.clipboard?.writeText("ELANONTOP30").then(() => {
            setToast("✓ Code kopiert: ELANONTOP30 — Erwähne ihn bei deiner Instagram-Bestellung!");
            setTimeout(() => setToast(null), 4000);
          }).catch(() => setToast("Code: ELANONTOP30"));
        }}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "0px",
          zIndex: 45,
          width: "60px",
          height: "60px",
          borderRadius: "50% 0 0 50%",
          background: C.gold,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "-2px 4px 12px rgba(0,0,0,0.2)",
          cursor: "pointer",
          transition: "transform 0.2s ease"
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"}
        onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
      >
        <div style={{ fontSize: "20px", fontWeight: "600", color: C.ink }}>30%</div>
        <div style={{ fontSize: "8px", color: C.ink, letterSpacing: "0.05em", marginTop: "2px" }}>CODE</div>
      </div>
      </div>
  );
}
