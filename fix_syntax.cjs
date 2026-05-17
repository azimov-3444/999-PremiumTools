const fs = require('fs');
const path = require('path');

const files = [
  'src/components/AdminPanel.jsx',
  'src/components/ProductEditModal.jsx',
  'src/components/ProductModal.jsx',
  'src/App.jsx'
];

files.forEach(file => {
  const filePath = path.join('c:/Users/user/Desktop/999 Premium Tools', file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Fix the regex typo where it added an extra ); 
  content = content.replace(/;\);/g, ');');
  
  // Also check if any ) was stripped inside the toast.error
  // Let me just fix the exact errors:
  // toast.error(t.common.error + ": " + (error.message || t.admin.saveError);); -> toast.error(t.common.error + ": " + (error.message || t.admin.saveError));
  content = content.replace(/toast\.error\((.*?\));\);/g, "toast.error($1);");
  content = content.replace(/toast\.success\((.*?\));\);/g, "toast.success($1);");
  content = content.replace(/toast\.warning\((.*?\));\);/g, "toast.warning($1);");

  // Fix line 1606 in AdminPanel: toast.error((t.admin.errorDetails || "Xatolik tafsilotlari"); + ":\n" + errorMsg + "\n\n" + (t.admin.fullError || "To'liq xato") + ":\n" + fullError);
  // because it matched `alert((t.admin.errorDetails || "Xatolik tafsilotlari")` and replaced it, leaving the rest.
  
  // Actually, I'll just restore from git or manually replace those broken lines!
  fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Fixed syntax typos!');
