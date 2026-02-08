# CODEBASE.md

> **Auto-generated project context file.** Refreshed on every session start.
>
> **Purpose:** Provides Claude AI with project structure, OS info, and coding standards automatically.

---

# 📁 Project Context

**Project:** `banana-mall`
**Framework:** `flask-or-fastapi`
**Type:** `python`
**Path:** `D:\vibecode\banana-mall`
**Detected:** 2026-01-18 09:10:43

---

## 🖥️ Operating System

| Property | Value |
|----------|-------|
| **OS** | Windows |
| **Shell** | PowerShell / CMD |

---

## ⚡ Terminal Commands (Current OS)

#### 🪟 Windows Terminal Commands

##### PowerShell
```powershell
ls                    # List files
cd <path>             # Change directory
pwd                   # Current directory
mkdir <dir>            # Create directory
rm <file>             # Remove file
rm -r <dir>           # Remove directory
cat <file>            # View file
echo $env:PATH        # Show environment variables
```

##### Common Tasks
- **File Explorer**: `start .`
- **Open with default app**: `start <file>`
- **Process manager**: `taskmgr` or `Get-Process`
- **Network info**: `ipconfig` or `Get-NetIPAddress`
- **System info**: `systeminfo`

##### Package Managers
```powershell
winget install <app>     # Install application
winget search <app>      # Search for application
winget upgrade <app>     # Upgrade application
winget list              # List installed apps
```

---


## 🎯 Project Environment

| Property | Value |
|----------|-------|
| **Project Type** | PYTHON |
| **Framework** | FLASK-OR-FASTAPI |
| **Platform** | API |

---

## 📋 Quick Project Commands

#### Python
```bash
pip install -r requirements.txt    # Install dependencies
python manage.py runserver         # Django dev server
python -m pytest                   # Run tests
```


---

## 📂 Project Structure

> **Legend:** `file.ts ← A.tsx, B.tsx` = This file is **imported by** A.tsx and B.tsx.
> Changing this file will affect those files.
>
> ⚠️ **Note:** If a file has no ← annotation but you see imports in the actual code, this dependency is not yet tracked or is incomplete in CODEBASE.md.

```
CLAUDE.md
CODEBASE.md
LICENSE
README.md
TODO.md
components.json
dist/
  assets/
    index-CxbntoZ2.js
    index-DcfZ_oZQ.css
    index-DtuJ3Ivm.js
    index-pKQL0QsV.js
  index.html
index.html
package-lock.json
package.json
postcss.config.js
src/
  App.tsx ← main.tsx
  components/
    ErrorBoundary.tsx ← main.tsx
    editor/
      DesktopPreview.tsx ← index.ts
      DetailModuleCard.tsx ← index.ts
      EditorHeader.test.tsx
      EditorHeader.tsx ← EditorHeader.test.tsx, index.ts
      ImageCard.tsx ← index.ts
      ImageEditPanel.tsx ← index.ts
      MobilePreview.tsx ← index.ts
      TextEditPanel.test.tsx
      TextEditPanel.tsx ← index.ts, TextEditPanel.test.tsx
      index.ts ← app.py
    templates/
      CreateTemplateDialog.tsx ← ConfigPage.tsx, TemplatesPage.tsx
    ui/
      alert-dialog.tsx ← TemplatesPage.tsx
      badge.tsx ← TemplatesPage.tsx
      button.tsx ← App.tsx, ErrorBoundary.tsx, ConfigPage.tsx +13 more
      card.tsx ← ErrorBoundary.tsx, ConfigPage.tsx, EditorPage.tsx +9 more
      dialog.tsx ← CreateTemplateDialog.tsx
      dropdown-menu.tsx ← ConfigPage.tsx
      input.tsx ← ConfigPage.tsx, SettingsPage.tsx, TextEditPanel.tsx +1 more
      label.tsx ← ConfigPage.tsx, SettingsPage.tsx, ImageEditPanel.tsx +1 more
      progress.tsx ← GeneratingPage.tsx
      select.tsx ← ConfigPage.tsx, SettingsPage.tsx, CreateTemplateDialog.tsx
      sonner.tsx ← App.tsx
      tabs.tsx ← EditorPage.tsx
      textarea.tsx ← ImageEditPanel.tsx, TextEditPanel.tsx
  hooks/
    useTauriStore.ts ← App.tsx
    useTheme.ts ← App.tsx, sonner.tsx
  index.css
  lib/
    api-detail.ts ← GeneratingPage.tsx
    api-mock.ts ← api.ts
    api.ts ← api-detail.ts, EditorPage.tsx, GeneratingPage.tsx +1 more
    error-handler.ts
    export.ts ← EditorPage.tsx
    i18n.test.ts
    i18n.ts ← App.tsx, i18n.test.ts, ConfigPage.tsx +11 more
    image-utils.ts
    locales/
      en.ts ← i18n.ts, index.ts
      index.ts ← app.py
      types.ts ← i18n.ts, i18n.ts, en.ts +3 more
      zh-CN.ts ← i18n.ts, index.ts
      zh-TW.ts ← i18n.ts, index.ts
    utils.ts ← UploadPage.tsx, alert-dialog.tsx, badge.tsx +10 more
  main.tsx
  pages/
    ConfigPage.tsx ← App.tsx
    EditorPage.tsx ← App.tsx
    GeneratingPage.tsx ← App.tsx
    HistoryPage.tsx ← App.tsx
    SettingsPage.tsx ← App.tsx
    TemplatesPage.tsx ← App.tsx
    UploadPage.tsx ← App.tsx
  stores/
    useAppStore.ts ← App.tsx, useTauriStore.ts, useTheme.ts +16 more
  test/
    setup.ts
src-tauri/
  Cargo.toml
  build.rs
  icons/
    128x128.png
    128x128@2x.png
    32x32.png
    64x64.png
    Square107x107Logo.png
    Square142x142Logo.png
    Square150x150Logo.png
    Square284x284Logo.png
    Square30x30Logo.png
    Square310x310Logo.png
    Square44x44Logo.png
    Square71x71Logo.png
    Square89x89Logo.png
    StoreLogo.png
    android/
      mipmap-anydpi-v26/
        ic_launcher.xml
      mipmap-hdpi/
        ic_launcher.png
        ic_launcher_foreground.png
        ic_launcher_round.png
      mipmap-mdpi/
        ic_launcher.png
        ic_launcher_foreground.png
        ic_launcher_round.png
      mipmap-xhdpi/
        ic_launcher.png
        ic_launcher_foreground.png
        ic_launcher_round.png
      mipmap-xxhdpi/
        ic_launcher.png
        ic_launcher_foreground.png
        ic_launcher_round.png
      mipmap-xxxhdpi/
        ic_launcher.png
        ic_launcher_foreground.png
        ic_launcher_round.png
      values/
        ic_launcher_background.xml
    app-icon.png
    icon.icns
    icon.ico
    icon.png
    ios/
      AppIcon-20x20@1x.png
      AppIcon-20x20@2x-1.png
      AppIcon-20x20@2x.png
      AppIcon-20x20@3x.png
      AppIcon-29x29@1x.png
      AppIcon-29x29@2x-1.png
      AppIcon-29x29@2x.png
      AppIcon-29x29@3x.png
      AppIcon-40x40@1x.png
      AppIcon-40x40@2x-1.png
      AppIcon-40x40@2x.png
      AppIcon-40x40@3x.png
      AppIcon-512@2x.png
      AppIcon-60x60@2x.png
      AppIcon-60x60@3x.png
      AppIcon-76x76@1x.png
      AppIcon-76x76@2x.png
      AppIcon-83.5x83.5@2x.png
  src/
    main.rs
  tauri.conf.json
tailwind.config.js
test-app.js
tsconfig.json
tsconfig.node.json
vite.config.ts
vitest.config.ts
```


## 📊 File Dependencies

> Scanned 60 files

### High-Impact Files

*Files imported by multiple other files:*

| File | Imported by |
|------|-------------|
| `src/stores/useAppStore` | 19 files |
| `src/components/ui/button` | 16 files |
| `src/lib/i18n` | 14 files |
| `src/lib/utils` | 13 files |
| `src/components/ui/card` | 12 files |



---

*This file is auto-generated by Maestro session hooks. Do not edit manually.*
