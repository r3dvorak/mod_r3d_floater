# R3D Floater

A Joomla 5 module that displays a floating panel on selected pages.  
The panel can contain custom HTML or another module, slides in from any direction, and supports frequency control (once per session/day/week, or every time).

---

## ✨ Features

- Show **custom HTML** or **embed another module** by ID
- Assign to **menu items** using Joomla’s built-in module assignment
- Slide-in animation from **left, right, top, or bottom**
- **Frequency control** via sessionStorage/localStorage:
  - every time
  - once per session
  - once per day
  - once per week
- **Close button** support
- Multiple module instances possible

---

## 📂 Folder Structure
modules/mod_r3d_floater/
├─ mod_r3d_floater.php
├─ mod_r3d_floater.xml
├─ helper.php
├─ tmpl/
│ └─ default.php
├─ language/
│ ├─ en-GB/
│ │ ├─ en-GB.mod_r3d_floater.ini
│ │ └─ en-GB.mod_r3d_floater.sys.ini
│ └─ de-DE/
│ ├─ de-DE.mod_r3d_floater.ini
│ └─ de-DE.mod_r3d_floater.sys.ini
└─ media/
└─ mod_r3d_floater/
├─ css/style.css
├─ js/floater.js
└─ joomla.asset.json


---

## 🚀 Installation

1. Download the latest ZIP release (`mod_r3d_floater-x.y.z.zip`)  
2. Install it in Joomla backend via **Extensions → Manage → Install**  
3. Publish the module and assign it to desired menu items  
4. Configure content source (Custom HTML or Module), direction, size, frequency, etc.

---

## 🛠 Development

- Run `makezip.ps1` to build an installable ZIP:
  ```powershell
  ./makezip.ps1

The script reads the version from mod_r3d_floater.xml and produces
mod_r3d_floater-x.y.z.zip in the root folder.

📜 License

GNU General Public License v3 or later.
Copyright (C) 2025 Richard Dvorak, r3d.de
