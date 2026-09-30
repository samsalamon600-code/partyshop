# Celebration Hub Party Shop 🎈🎉
### Premium Local Party Supplies & Decoration Business Website

A modern, colorful, premium, and fully responsive website designed specifically for a local **Party Supplies & Decoration Shop**. Built with **HTML5, CSS3, and Vanilla JavaScript** — free of bloated frameworks, databases, or shopping carts.

The website is crafted to showcase products and services, display real decoration setups, provide location directions via Google Maps, and drive direct customer enquiries through **WhatsApp and phone calls**.

---

## 🌟 Key Features

1. **Direct WhatsApp Conversion Engine**:
   - Every product category, featured item, decoration service, and theme card features a smart WhatsApp enquiry button.
   - Automatically pre-fills relevant messages with item names (e.g. *"Hi, I am interested in your Balloons collection. Could you please share the available options and prices?"*).
   - Centrally configured in `js/script.js` — change the number in one place to update all buttons across the entire website.

2. **Dynamic "Open Today" & Live Store Status**:
   - Evaluates the current day of the week and local store time via JavaScript.
   - Dynamically highlights today's schedule row and displays real-time status badges (*"Open Now (until 9:00 PM)"* or *"Closed Now (Opens at 9:30 AM)"*).

3. **Curated Showcase & Interactive Lightbox Gallery**:
   - Category filtering (*All, Birthday, Wedding, Baby Shower, Kids Party, Other*).
   - Fullscreen interactive lightbox modal with image zoom, captions, previous/next controls, keyboard navigation (Escape, Left/Right arrows), and a direct WhatsApp enquiry button.

4. **100% Responsive & Mobile-First**:
   - Smooth animated mobile navigation drawer with hamburger toggle.
   - Floating WhatsApp button with pulsing animation and attention-grabbing tooltip.
   - Sticky navbar that shrinks and elevates on scroll.
   - CSS animations powered by `IntersectionObserver`.

5. **Local Business SEO & Accessibility**:
   - Semantic HTML5 structure (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
   - Open Graph & Twitter metadata.
   - Embedded `schema.org` **PartyStore** JSON-LD structured data.

---

## 📂 Project Structure

```
party-shop/
│
├── index.html                           # Main website markup & semantic sections
│
├── css/
│   └── style.css                       # Complete responsive styling & animations
│
├── js/
│   └── script.js                       # Business configuration, WhatsApp logic & UI interactions
│
├── assets/
│   ├── logo.png                        # Store brand logo
│   ├── hero.jpg                        # Hero celebration background image
│   ├── about-shop.jpg                  # Showroom / store interior photo
│   │
│   ├── products/                       # Product categories & featured essentials
│   │   ├── balloons.jpg                # Balloons category
│   │   ├── decorations.jpg             # Party decorations category
│   │   ├── party-poppers.jpg           # Party poppers category
│   │   ├── ribbons.jpg                 # Ribbons & straps category
│   │   ├── cake-items.jpg              # Cake accessories category
│   │   ├── return-gifts.jpg            # Return gifts category
│   │   ├── party-props.jpg             # Party props category
│   │   ├── accessories.jpg             # Celebration accessories category
│   │   ├── featured-metallic-balloons.jpg
│   │   ├── featured-balloon-set.jpg
│   │   ├── featured-birthday-banner.jpg
│   │   ├── featured-party-popper.jpg
│   │   ├── featured-cake-topper.jpg
│   │   ├── featured-ribbons.jpg
│   │   ├── featured-gift-packs.jpg
│   │   └── featured-props.jpg
│   │
│   ├── services/                       # Decoration service photos
│   │   ├── service-birthday.jpg        # Birthday balloon setups
│   │   ├── service-wedding.jpg         # Wedding & reception decor
│   │   ├── service-babyshower.jpg      # Baby shower setups
│   │   └── service-custom.jpg          # Custom event styling
│   │
│   ├── themes/                         # Celebration theme cards
│   │   ├── theme-birthday.jpg
│   │   ├── theme-kidsparty.jpg
│   │   ├── theme-babyshower.jpg
│   │   ├── theme-wedding.jpg
│   │   ├── theme-anniversary.jpg
│   │   ├── theme-graduation.jpg
│   │   └── theme-custom.jpg
│   │
│   ├── gallery/                        # Portfolio gallery photos
│   │   ├── birthday/                   # Birthday setups (birthday-1.jpg, birthday-2.jpg)
│   │   ├── wedding/                    # Wedding decor (wedding-1.jpg, wedding-2.jpg)
│   │   ├── baby-shower/                # Baby shower setups (babyshower-1.jpg, babyshower-2.jpg)
│   │   ├── kids-party/                 # Kids parties (kidsparty-1.jpg, kidsparty-2.jpg)
│   │   └── other/                      # Anniversaries & corporate galas (other-1.jpg, other-2.jpg)
│   │
│   └── icons/                          # Lightweight vector SVGs
│       ├── whatsapp.svg                # WhatsApp logo
│       ├── phone.svg                   # Phone icon
│       ├── location.svg                # Map pin icon
│       ├── instagram.svg               # Instagram logo
│       └── facebook.svg                # Facebook logo
│
└── README.md                           # Documentation & configuration guide
```

---

## ⚙️ How to Configure the Website for Your Shop

All key store information is centralized in **`js/script.js`** at lines 10–40.

Open **`js/script.js`** in your code editor and update the `BUSINESS` configuration object:

```javascript
const BUSINESS = {
  // 1. Business Name
  name: "YOUR PARTY SHOP NAME",
  tagline: "Your Premier Local Party Supplies & Decoration Specialists",
  
  // 2. WhatsApp Number (digits only, including country code, NO '+' or spaces)
  // E.g. USA: "15551234567", India: "919876543210", UK: "447911123456"
  whatsapp: "1234567890", 

  // 3. Phone number formatted for display
  phone: "+1 (234) 567-890",

  // 4. Physical Store Address
  address: "100 Celebration Blvd, Suite 4, Party City, PC 54321",
  landmark: "Opposite City Central Mall, Ground Floor",
  
  // 5. Google Maps Navigation link (when user clicks 'Get Directions')
  googleMapsUrl: "https://maps.google.com/?q=YOUR+STORE+NAME+ADDRESS",

  // 6. Google Maps Embed Iframe URL
  // (In Google Maps, click Share -> Embed a map -> copy src URL)
  googleMapsEmbed: "https://www.google.com/maps/embed?pb=YOUR_EMBED_CODE",

  // 7. Social Media Links (leave empty "" if you don't have one)
  instagram: "https://instagram.com/yourpartyshop",
  facebook: "https://facebook.com/yourpartyshop",

  // 8. Weekly Opening Hours (24-hour HH:MM format)
  hours: [
    { dayIndex: 0, dayName: "Sunday", open: "10:00", close: "20:00", display: "10:00 AM – 8:00 PM" },
    { dayIndex: 1, dayName: "Monday", open: "09:30", close: "21:00", display: "9:30 AM – 9:00 PM" },
    { dayIndex: 2, dayName: "Tuesday", open: "09:30", close: "21:00", display: "9:30 AM – 9:00 PM" },
    { dayIndex: 3, dayName: "Wednesday", open: "09:30", close: "21:00", display: "9:30 AM – 9:00 PM" },
    { dayIndex: 4, dayName: "Thursday", open: "09:30", close: "21:00", display: "9:30 AM – 9:00 PM" },
    { dayIndex: 5, dayName: "Friday", open: "09:30", close: "21:30", display: "9:30 AM – 9:30 PM" },
    { dayIndex: 6, dayName: "Saturday", open: "09:00", close: "21:30", display: "9:00 AM – 9:30 PM" }
  ]
};
```

---

## 📸 Replacing Placeholder Images With Real Photos

Every placeholder image file has been organized into clear, dedicated folders. Simply save your real photos using the matching filenames below:

| Section | Recommended File Path | Suggested Dimensions |
| :--- | :--- | :--- |
| **Store Logo** | `assets/logo.png` | 240 × 240 px (PNG with transparency) |
| **Hero Banner** | `assets/hero.jpg` | 1600 × 900 px |
| **Store Interior** | `assets/about-shop.jpg` | 800 × 600 px |
| **Product Categories** | `assets/products/*.jpg` | 600 × 450 px |
| **Featured Products** | `assets/products/featured-*.jpg` | 600 × 450 px |
| **Services** | `assets/services/*.jpg` | 600 × 450 px |
| **Themes** | `assets/themes/*.jpg` | 600 × 450 px |
| **Gallery Portfolio** | `assets/gallery/<category>/*.jpg` | 700 × 520 px |

---

## 🚀 How to Launch & Preview

1. Navigate to the `party-shop` folder on your desktop.
2. Double-click `index.html` to open it in Google Chrome, Microsoft Edge, Firefox, or Safari.
3. To test responsiveness, press `F12` to open Developer Tools and toggle the device toolbar (`Ctrl+Shift+M` or `Cmd+Shift+M`).

---

## 💡 Best Practices for Local Business Conversion

- **Ask for Price Pattern**: Instead of displaying static prices that frequently fluctuate, the website encourages users to click **"Ask on WhatsApp"** or **"Enquire on WhatsApp"**. This immediately establishes a 1-to-1 conversation with the prospective customer.
- **Fast Response**: Ensure your WhatsApp Business app has automated greetings enabled so customers receive immediate acknowledgment.
