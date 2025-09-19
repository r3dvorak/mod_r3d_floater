# R3D Floater

A Joomla 4 and 5 module that displays a **floating panel** on selected pages.  
The panel can contain **custom HTML** (with the Joomla editor) or **embed another module**, slides in from any screen edge, and supports **frequency control** and **delayed auto-open**.

---

## ✨ Features

- Display **custom HTML** or **embed another Joomla module**
- Works with Joomla’s **menu item assignments**
- Smooth **slide-in animation** from **left, right, top, or bottom**
- **Animation options:**
  - Customizable **speed in/out**
  - Optional **rotation** and **scale-in**
  - Adjustable **start delay**
- **Frequency control**:
  - every time
  - once per session
  - once per day
  - once per week
  - once per month
  - once only
- **Close button** support (with auto-close option planned)
- Multiple instances supported on the same site
- Fully Joomla 5.3+ and PHP 8.2+ compatible
- Languages included: English (en-GB) and German (de-DE)

---

## 🚀 Installation

1. Download the latest release:  
   `mod_r3d_floater-x.y.z.zip`

2. Install via Joomla backend:  
   **System → Install → Extensions**

3. Go to **Content → Site Modules** and create a new *R3D Floater* instance.

4. Assign it to menu items as usual, and configure:
   - **Content source** (custom HTML or existing module)
   - **Panel width & height**
   - **Slide-in direction**
   - **Animation speed & delay**
   - **Frequency control**

---

# 📜 Changelog (Excerpt)

## 5.5.0
- New: Auto-close parameter (ms).

## 5.4.4
- Fix: Frequency control via cookies.

## 5.4.0
- Added delay parameter.  
- Removed the option “Auto Open”.

## 5.3.0
- Rotation/scaling on slide-in.  
- Animation fully parameterizable.

## 5.2.x
- Stabilization of fade-in/out animations.  
- Improved parameter normalization.

## 5.0.0
- Initial release for Joomla! 5.  
- Features: Custom HTML or module, fade-in, frequency control, close button, multiple instances.


---

📜 License

GNU General Public License v3 or later.
Copyright (C) 2025 Richard Dvorak, r3d.de
