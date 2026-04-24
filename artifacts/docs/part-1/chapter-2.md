---
title: "অধ্যায় ২ — Domain-এর পেছনের দুনিয়া: Technical Basics"
---

# অধ্যায় ২
## Domain-এর পেছনের দুনিয়া: Technical Basics (ভয় নেই!)

---

### 😰 "আমি তো Technical না!"

এই কথাটা অনেকেই বলেন। কিন্তু সত্যি কথা হলো — domain flipping করতে কোডিং জানতে হয় না, server বুঝতে হয় না, এমনকি ওয়েবসাইট বানাতেও হয় না।

তবে কিছু basic concept না জানলে আপনি ঠকবেন। চলুন সেগুলো একদম সহজ করে শিখি।

::: info মেটাফর: বাড়ির উপমা
- **Domain** = বাড়ির ঠিকানা (যেমন: ধানমন্ডি ৩২ নম্বর)
- **Hosting/Server** = আসল বাড়িটা
- **Website** = বাড়ির ভেতরের আসবাবপত্র ও মানুষজন

Domain flipping-এ আপনি শুধু **ঠিকানা** কেনাবেচা করছেন। বাড়ি বানাতে হচ্ছে না।
:::

---

### 🔤 Domain কী?

Domain হলো ইন্টারনেটে একটি ওয়েবসাইটের নাম বা ঠিকানা।

উদাহরণ:
- `google.com`
- `prothomalo.com`
- `facebook.com`

এই নামগুলো কেউ না কেউ **register** করে রেখেছে — মানে কিনে রেখেছে। প্রতি বছর একটা নির্দিষ্ট ফি দিলে নামটা তার কাছে থাকে।

আপনি যখন domain flipping করছেন, তখন আপনি এই নামটাই কিনছেন এবং বেচছেন।

---

### 🌍 DNS কী? (জানলে ভালো, না জানলেও চলে)

DNS মানে **Domain Name System।**

এটা মূলত ইন্টারনেটের একটা phone book। যখন আপনি browser-এ `google.com` টাইপ করেন, DNS সেটাকে একটা সংখ্যায় (IP address) রূপান্তর করে সার্ভারে পাঠায়।

**Domain flipping-এ DNS-এর বিস্তারিত জানতে হবে না।** শুধু জানুন যে domain কিনলে আপনার কাছে এই "নামের" মালিকানা থাকে।

---

### 🏷️ TLD কী? সবচেয়ে গুরুত্বপূর্ণ concept!

TLD মানে **Top-Level Domain** — মানে domain-এর শেষের অংশ।

যেমন:
- `google**.com**` → .com হলো TLD
- `wikipedia**.org**` → .org হলো TLD
- `startupbd**.io**` → .io হলো TLD

**TLD-গুলোকে কয়েকটা ভাগে ভাগ করা যায়:**

#### ক্লাসিক ও সবচেয়ে দামী:
| TLD | ব্যবহার | Flip Value |
|-----|---------|-----------|
| .com | সব ধরনের ব্যবসা | ⭐⭐⭐⭐⭐ সর্বোচ্চ |
| .net | নেটওয়ার্ক, টেক | ⭐⭐⭐ |
| .org | অলাভজনক, সংগঠন | ⭐⭐⭐ |

#### আধুনিক ও ট্রেন্ডি:
| TLD | ব্যবহার | Flip Value |
|-----|---------|-----------|
| .io | Tech startups | ⭐⭐⭐⭐ |
| .ai | AI কোম্পানি | ⭐⭐⭐⭐⭐ (২০২৬-এ বিশেষ hot) |
| .co | ছোট ব্যবসা | ⭐⭐⭐ |

#### দেশভিত্তিক (ccTLD):
| TLD | দেশ |
|-----|-----|
| .bd | বাংলাদেশ |
| .in | ভারত |
| .uk | যুক্তরাজ্য |
| .de | জার্মানি |

::: tip নতুনদের জন্য পরামর্শ
শুরুতে শুধু **.com** নিয়ে কাজ করুন। .com সবসময় সবচেয়ে বেশি বিক্রি হয় এবং সর্বোচ্চ দাম পাওয়া যায়।
:::

---

### 🏪 Registrar vs Marketplace vs Auction — তিনটা আলাদা জায়গা

এই তিনটা জায়গার পার্থক্য না বুঝলে অনেকে গুলিয়ে ফেলেন:

**১. Domain Registrar (কেনার দোকান)**

এখান থেকে নতুন domain register করা হয় বা পুরনো domain renew করা হয়।

জনপ্রিয় registrar:
- **Namecheap** — সবচেয়ে সাশ্রয়ী, নতুনদের জন্য best
- **GoDaddy** — সবচেয়ে বড়, সব সুবিধা এক জায়গায়
- **Dynadot** — কম fee, ভালো interface
- **Porkbun** — সস্তা renewal fee

**২. Domain Marketplace (বিক্রির বাজার)**

এখানে আপনি আপনার domain list করেন বিক্রির জন্য। Buyer এখানে এসে কিনে নেয়।

জনপ্রিয় marketplace:
- **Sedo** — বিশ্বের সবচেয়ে বড় domain marketplace
- **Afternic** — GoDaddy-র সাথে যুক্ত, বিশাল নেটওয়ার্ক
- **Dan.com** — কম commission, payment plan সুবিধা
- **Flippa** — website এবং domain দুটোই বিক্রি হয়

**৩. Domain Auction (নিলাম ঘর)**

এখানে domain নিলামে ওঠে — যে সবচেয়ে বেশি দাম দেবে সে পাবে।

জনপ্রিয় auction:
- **GoDaddy Auctions** — সবচেয়ে বড় expired domain auction
- **NameJet** — premium expired domain
- **Dropcatch** — domain drop catch করার জন্য
- **Namecheap Marketplace** — Namecheap-এর auction

---

### 🔍 WHOIS কী এবং এটা কেন গুরুত্বপূর্ণ?

WHOIS হলো একটি public database — যেখানে যেকোনো domain-এর মালিকের তথ্য দেখা যায়।

যেমন:
- মালিকের নাম ও ঠিকানা
- কবে domain register হয়েছে
- কবে expire হবে
- কোন registrar-এ আছে

**Domain flipping-এ WHOIS কেন কাজে লাগে?**

১. **Expired domain খোঁজার সময়:** কবে expire হবে জানতে পারবেন
২. **Outbound selling:** আপনার domain-এর WHOIS privacy বন্ধ রাখলে potential buyer সরাসরি আপনাকে contact করতে পারবে
৩. **Domain research:** যে domain কিনতে চান তার বয়স ও ইতিহাস জানতে পারবেন

WHOIS দেখার tool: [who.is](https://who.is) বা [whois.domaintools.com](https://domaintools.com)

---

### 📊 DA, PA, Backlink — SEO ভ্যালু বোঝার ভিত্তি

Expired domain কেনার সময় এই বিষয়গুলো জানা দরকার:

**Domain Authority (DA):**
- Moz-এর তৈরি একটি score (0–100)
- DA যত বেশি, domain তত valuable
- কারণ: পুরনো domain-এ অনেক backlink থাকে, যা SEO-তে কাজে লাগে
- DA 30+ হলে ভালো মানের expired domain

**Backlink:**
- অন্য website থেকে আপনার domain-এ যত link আসছে — সেগুলোই backlink
- Forbes, Wikipedia থেকে backlink থাকলে domain অনেক valuable
- Tool: Ahrefs বা Moz দিয়ে check করুন

**Spam Score:**
- Domain কোনো spammy কাজে ব্যবহার হয়েছিল কিনা
- Spam score 0–10% হলে ভালো
- 30%+ হলে এড়িয়ে চলুন

::: tip নতুনদের জন্য টিপস
শুরুতে নতুন unregistered domain দিয়ে কাজ শুরু করুন। Expired domain-এর SEO value বোঝা একটু সময়সাপেক্ষ — সেটা অভিজ্ঞতা হলে করুন।
:::

---

### 🛒 নতুনদের জন্য সেরা Registrar: তুলনা

| Registrar | .com দাম/বছর | বিশেষত্ব | বাংলাদেশ থেকে payment |
|-----------|------------|---------|----------------------|
| Namecheap | ~$9–11 | সস্তা, সহজ UI | Card, PayPal |
| GoDaddy | ~$12–20 | সব সুবিধা এক জায়গায় | Card, PayPal |
| Dynadot | ~$9–10 | কম fee, ভালো auction | Card, PayPal |
| Porkbun | ~$8–9 | সবচেয়ে সস্তা renewal | Card |

**সুপারিশ:** Namecheap বা Porkbun দিয়ে শুরু করুন।

---

### ✅ অধ্যায় ২-এর সারসংক্ষেপ

- Domain = ইন্টারনেটের ঠিকানা, hosting = আসল বাড়ি
- TLD সবচেয়ে গুরুত্বপূর্ণ — নতুনরা শুধু .com দিয়ে শুরু করুন
- .ai এবং .io এখন tech startups-এ popular
- Registrar = কেনার দোকান, Marketplace = বিক্রির বাজার, Auction = নিলামঘর
- WHOIS দিয়ে domain-এর ইতিহাস ও মালিকানা জানা যায়
- DA, backlink, spam score — expired domain কেনার আগে চেক করুন
