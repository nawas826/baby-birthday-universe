# 💗 A 3D Birthday Universe for Shamna (Baby's 26th Birthday)

A cinematic, romantic, immersive 3D birthday website created with love for **Shamna**, celebrating her **26th birthday**. Built using **React 18, TypeScript, Three.js, React Three Fiber, Drei, Tailwind CSS, and Framer Motion**.

---

## ✨ Features & Experiences

1. **🌌 3D Romantic Universe (Hero Section)**
   - Procedural 3D falling rose petals with organic wind sway physics.
   - 3D floating extruded hearts orbiting in space.
   - Illuminated 3D Floral Archway with roses and twinkling fairy lights.
   - Sculpted 3D illuminated **"26"** centerpiece with golden halos and pink bloom.
   - Subtle interactive camera and mouse/touch parallax.
   - Primary message: *"Happy 26th Birthday, Baby ♡"*
   - Interactive *"Open Your Surprise ♡"* button triggering floating hearts burst and audio chime.

2. **📖 Our Story (Romantic Serpentine Timeline)**
   - Heading: *"Every Love Story Has Its Magic"*
   - Animated timeline featuring the real photographs of you and Shamna:
     - The Day We Met ("When Destiny Smiled")
     - Our First Special Memory ("Unforgettable First Sparks")
     - Our Engagement ("A Promise Under The Stars" - Emerald attire photo)
     - Our Wedding ("Two Souls, One Sacred Vow" - Courtyard twirl dance photo)
     - Our Favourite Adventures ("Every Little Journey With You" - Beach romance photo)
     - Today: Celebrating Baby’s 26th Birthday ("October 14, 2026 — 26 Years of Pure Light")

3. **📸 Our Beautiful Journey (3D Polaroid Photo Gallery)**
   - Supporting at least 30 photo slots with category filters (*All, Romantic, Milestones, Celebrations, Candid Smiles*).
   - Features the real photographs provided.
   - 3D tilted Polaroid aesthetic with washi tape details and handwritten-style captions.
   - Fullscreen Lightbox with Zoom, Next/Previous controls, mobile touch swipe gestures, and heart likes.
   - **Live In-Browser Photo Uploader**: Drop or upload new photos directly from phone/laptop!
   - Easy file-based photo configuration.

4. **💌 A Letter to My Baby (Interactive 3D Envelope)**
   - 3D-styled romantic envelope in dusty rose with a golden heart wax seal.
   - Unfolds into elegant ivory parchment paper with gold filigree and calligraphy font.
   - Contains your full personal letter.

5. **💖 26 Reasons I Love My Baby**
   - Exactly **26 numbered interactive cards**, one for each year of her life.
   - Smooth 3D flip card interaction (`rotateY(180deg)`) revealing romantic quotes, personal descriptions, and icons.
   - Progress tracker (*"Discovered: X of 26 Reasons"*), plus *Reveal All* and *Reset* shortcuts.

6. **🎂 The Birthday Surprise Finale (Interactive 3D Cake)**
   - Multi-tier romantic birthday cake with velvet blush and ivory cream layers.
   - Exactly **26 glowing candles** with animated flame flickers.
   - *"Make a Birthday Wish ✨"* button:
     - Blows out candles with a magical puff.
     - Multistage confetti and floating hearts explosion.
     - Celebration chime audio.
     - Reveals your final birthday message.
     - *"Experience Again ✨"* replay button.

7. **🎶 Romantic Sound & Music System**
   - Built-in Web Audio API generative ambient synthesizer playing gentle romantic piano chords (Cmaj7, Am7, Fmaj7, G6) and chime sparkles (no external audio file required, zero broken links).
   - Custom MP3 file picker: upload or drop Baby's favorite song anytime!
   - Floating audio widget with equalizer animation.

---

## 🚀 Running Locally

```bash
# Navigate to the project directory
cd /home/nawas/.gemini/antigravity/scratch/baby-birthday-universe

# Install dependencies (already installed)
npm install

# Start Vite dev server
npm run dev

# Or build for production
npm run build
npm run preview
```

The website is running on **`http://localhost:5173/`**!

---

## 📷 How to Add & Manage Photos

### Option 1: Direct In-Browser Upload (Instant)
1. In the **Our Memories** gallery, click the **"Add Photos"** button.
2. Select any photo(s) from your device.
3. They will immediately appear at the top of the gallery and are saved locally in your browser!

### Option 2: Placing Files in the Codebase
1. Copy your photos into `public/photos/` (e.g. `public/photos/my-photo.jpg`).
2. Open `src/data/birthday.ts`.
3. Add or update items in the `BIRTHDAY_DATA.photos` array:
   ```ts
   {
     id: "photo-custom-1",
     url: "/photos/my-photo.jpg",
     title: "Our Special Evening",
     caption: "A romantic night under the moonlight.",
     date: "Summer 2026",
     category: "romantic",
     isReal: true,
   }
   ```

---

## 📝 Customizing Text & Milestones

All text, letters, milestones, and 26 reasons are located in one clean file:
👉 **[`src/data/birthday.ts`](file:///home/nawas/.gemini/antigravity/scratch/baby-birthday-universe/src/data/birthday.ts)**

- To change the letter: edit `BIRTHDAY_DATA.letter`.
- To edit any of the 26 reasons: edit `BIRTHDAY_DATA.reasons`.
- To edit the timeline: edit `BIRTHDAY_DATA.timeline`.
- To change the birthday wish: edit `BIRTHDAY_DATA.finale`.

---

**Made with all the love in the world for Shamna (Baby) on her 26th Birthday! 💗**
