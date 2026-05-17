const fs = require('fs');

let content = fs.readFileSync('src/components/AdminPanel.jsx', 'utf8');

const target1 = `    }, [userRole]);\r
\r
\r
    return (`.replace(/\r/g, ''); // standardize line endings to handle both

const target2 = `{(() => {\r
                            const bannerFormData = editingBanner || newBanner;\r
                            const setBannerFormData = (data) => {\r
                                if (editingBanner) setEditingBanner(data);\r
                                else setNewBanner(data);\r
                            };\r
                            return null; // This IIFE just defines variables, it doesn't render anything itself\r
                        })()}`.replace(/\r/g, '');

content = content.replace(/\r/g, '');

content = content.replace(target1, `    }, [userRole]);

    const bannerFormData = editingBanner || newBanner;
    const setBannerFormData = (data) => {
        if (editingBanner) setEditingBanner(data);
        else setNewBanner(data);
    };

    return (`);

content = content.replace(target2, '');

fs.writeFileSync('src/components/AdminPanel.jsx', content, 'utf8');
console.log('Fixed bannerFormData');
