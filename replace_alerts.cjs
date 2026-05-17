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
  
  if (!content.includes("import { toast } from 'react-toastify';")) {
    const lastImportIndex = content.lastIndexOf('import ');
    if (lastImportIndex !== -1) {
      const endOfLastImport = content.indexOf('\n', lastImportIndex) + 1;
      content = content.slice(0, endOfLastImport) + "import { toast } from 'react-toastify';\n" + content.slice(endOfLastImport);
    }
  }

  content = content.replace(/alert\((.*?)\);?/g, (match, p1) => {
    let lowerContent = p1.toLowerCase();
    if (lowerContent.includes('error') || lowerContent.includes('xato')) {
      return `toast.error(${p1});`;
    } else if (lowerContent.includes('katta') || lowerContent.includes("to'ldiring") || lowerContent.includes('maksimal') || lowerContent.includes('required')) {
      return `toast.warning(${p1});`;
    } else {
      return `toast.success(${p1});`;
    }
  });

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Done replacing alerts!');
