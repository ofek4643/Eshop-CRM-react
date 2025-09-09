# 🛒 Eshop CRM

מערכת CRM לניהול חנות אונליין, בנויה עם **React + TypeScript + Vite**.  
המערכת כוללת ניהול משתמשים, מוצרים, הזמנות ועוד.

---

## 🚀 טכנולוגיות עיקריות

- React 18
- Vite
- TypeScript
- React Router
- Redux Toolkit (state management)
- Axios (קריאות API)
- CSS Modules לעיצוב

---

## 📂 מבנה הפרויקט

my-eshop-crm/
├── dist/ # build אחרי הפקודה vite build
├── frontend/
│ └── src/
│ ├── api/ # קריאות ל-API
│ ├── Components/ # קומפוננטות חוזרות
│ ├── pages/ # דפי מערכת (Login, Dashboard וכו')
│ ├── store/ # Redux store
│ ├── types/ # הגדרות TypeScript
│ └── App.tsx # קומפוננטת הבסיס
│ └── main.tsx # נקודת כניסה ל־React
├── index.html # קובץ ראשי של Vite
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── README.md

---

## ⚙️ התקנה והרצה מקומית

1. שיבוט הפרויקט:

   ```bash
   git clone https://github.com/ofek4643/Eshop-CRM-react.git

   cd Eshop-CRM-react/my-eshop-crm
   npm install
   npm run dev
   ```

---

## 🌐 הגדרות API

בסביבת Render:
בקובץ frontend/src/api/api.ts השאר את baseUrl שמכוון לשרת הפרודקשן.

בסביבת Localhost:
באותו קובץ, החלף את ה־baseUrl לזה שמכוון ל־ http://localhost:5000
אפשר לעשות זאת ע"י השארת שתי שורות והערות (//) כדי להחליף ביניהן.

---

## 📊 פיצ'רים בפרויקט

✅ התחברות אדמין
✅ ניהול משתמשים
✅ ניהול מוצרים
✅ ניהול הזמנות
✅ Dashboard עם סטטיסטיקות
