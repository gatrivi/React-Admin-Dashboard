# Integración — archivos copiados desde trufi-tmm

## Qué se copió

### Componentes (nuevos)
- `src/components/admin/AdminBranding.tsx`
- `src/components/admin/AdminDashboard.tsx`
- `src/components/admin/AdminFileManager.tsx`
- `src/components/admin/AdminImageEditor.tsx`
- `src/components/admin/AdminMenuEditor.tsx`
- `src/components/admin/AdminPanel.tsx`
- `src/components/admin/AdminSettings.tsx`
- `src/components/admin/LoginModal.tsx`

### Contextos (nuevos)
- `src/context/AdminContext.tsx`
- `src/context/MenuContext.tsx`

### Datos (nuevos)
- `src/data/menu.ts` — tipos del menú
- `src/data/magdalena.ts` — datos base de ejemplo

### Utilidades (nuevos)
- `src/utils/analyticsTracker.ts`
- `src/utils/businessHours.ts`
- `src/utils/dollarRate.ts`
- `src/utils/imageLoader.ts`
- `src/utils/palettes.ts`
- `src/utils/supabaseClient.ts`

### Páginas (nueva)
- `src/pages/AdminPage.tsx`

### i18n (nueva)
- `src/i18n/translations.ts`

---

## Dependencias necesarias (agregar a package.json)

```json
{
  "dependencies": {
    "@dnd-kit/core": "^6.3.1",
    "@dnd-kit/sortable": "^10.0.0",
    "@dnd-kit/utilities": "^3.2.2",
    "@supabase/supabase-js": "^2.105.4",
    "framer-motion": "^12.38.0",
    "js-sha256": "^0.11.1",
    "lucide-react": "^1.14.0"
  }
}
```

> Nota: `lucide-react` reemplaza los iconos de `react-icons` en los componentes copiados. Podés mantener ambos.

---

## Variables de entorno (agregar a .env)

```
REACT_APP_ADMIN_USER_HASH=
REACT_APP_ADMIN_PASS_HASH=
REACT_APP_SUPABASE_URL=
REACT_APP_SUPABASE_ANON_KEY=
REACT_APP_WHATSAPP_NUMBER=
REACT_APP_BANK_ALIAS=
```

> Nota: en CRA las variables deben empezar con `REACT_APP_`. Los archivos copiados usan `import.meta.env.VITE_*` (formato Vite), así que vas a tener que adaptar `AdminContext.tsx` y `supabaseClient.ts` para que usen `process.env.REACT_APP_*`.

---

## Adaptaciones pendientes

1. **Cambiar `import.meta.env` por `process.env`** en:
   - `src/context/AdminContext.tsx`
   - `src/utils/supabaseClient.ts`

2. **Agregar provider `AdminProvider` y `MenuProvider`** en `src/index.js` (envolver `<App />`).

3. **Agregar ruta** en `src/App.js`:
   ```jsx
   import AdminPage from "./pages/AdminPage";
   // ...
   <Route path="/admin-trufi" element={<AdminPage />} />
   ```

4. **Tailwind**: los componentes usan clases de Tailwind v4. El proyecto actual usa v3. La mayoría de las clases deberían funcionar, pero puede haber diferencias menores.

5. **React version**: los componentes copiados usan React 19. El proyecto actual usa React 17. Probablemente funcionen igual, pero testear.
