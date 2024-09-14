// Components/hooks/printAssetTag.js
export const printAssetTag = (asset, assetType) => {
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Print Asset Tag</title>');
    printWindow.document.write('<style>');
    printWindow.document.write('body { font-family: Arial, sans-serif; }');
    printWindow.document.write('.asset-tag { width: 200px; padding: 10px; border: 1px solid #000; margin: 20px auto; text-align: center; }');
    printWindow.document.write('</style></head><body>');
    printWindow.document.write('<div class="asset-tag">');

    switch (assetType) {
        case 'computer':
            printWindow.document.write(`<h3>${asset.comp_name}</h3>`);
            printWindow.document.write(`<p><strong>Asset Tag:</strong> ${asset.comp_asset}</p>`);
            printWindow.document.write(`<p><strong>Computer ID:</strong> ${asset.CID}</p>`);
            printWindow.document.write(`<p><strong>Type:</strong> ${asset.comp_type}</p>`);
            printWindow.document.write(`<p><strong>Generation:</strong> ${asset.comp_gen}</p>`);
            printWindow.document.write(`<p><strong>MAC Address:</strong> ${asset.comp_address}</p>`);
            printWindow.document.write(`<p><strong>Serial:</strong> ${asset.comp_serial}</p>`);
            printWindow.document.write(`<p><strong>Department:</strong> ${asset.department_comp}</p>`);
            break;
        case 'serverups':
            printWindow.document.write(`<h3>${asset.S_UName}</h3>`);
            printWindow.document.write(`<p><strong>Asset Tag:</strong> ${asset.S_UAsset}</p>`);
            printWindow.document.write(`<p><strong>ID:</strong> ${asset.S_UID}</p>`);
            printWindow.document.write(`<p><strong>Type:</strong> ${asset.S_UType}</p>`);
            printWindow.document.write(`<p><strong>Generation:</strong> ${asset.S_UGen}</p>`);
            printWindow.document.write(`<p><strong>MAC Address:</strong> ${asset.S_UAddress}</p>`);
            printWindow.document.write(`<p><strong>Serial:</strong> ${asset.S_USerial}</p>`);
            printWindow.document.write(`<p><strong>Department:</strong> ${asset.department_S_U}</p>`);
            break;
        case 'monitor':
            printWindow.document.write(`<h3>${asset.compName}</h3>`);
            printWindow.document.write(`<p><strong>Asset Tag:</strong> ${asset.mntr_asset}</p>`);
            printWindow.document.write(`<p><strong>ID:</strong> ${asset.monitor_id}</p>`);
            printWindow.document.write(`<p><strong>Model:</strong> ${asset.mntr_model}</p>`);
            printWindow.document.write(`<p><strong>Department:</strong> ${asset.mntr_department}</p>`);
            break;
        case 'printer':
            printWindow.document.write(`<h3>${asset.printer_model}</h3>`);
            printWindow.document.write(`<p><strong>Asset Tag:</strong> ${asset.printer_asset}</p>`);
            printWindow.document.write(`<p><strong>ID:</strong> ${asset.printer_id}</p>`);
            printWindow.document.write(`<p><strong>Serial:</strong> ${asset.printer_serial}</p>`);
            printWindow.document.write(`<p><strong>Department:</strong> ${asset.printer_department}</p>`);
            break;
        case 'tablet':
            printWindow.document.write(`<h3>${asset.tablet_name}</h3>`);
            printWindow.document.write(`<p><strong>Asset Tag:</strong> ${asset.tablet_asset}</p>`);
            printWindow.document.write(`<p><strong>ID:</strong> ${asset.tablet_id}</p>`);
            printWindow.document.write(`<p><strong>Model:</strong> ${asset.tablet_model}</p>`);
            printWindow.document.write(`<p><strong>Serial:</strong> ${asset.tablet_serial}</p>`);
            printWindow.document.write(`<p><strong>Department:</strong> ${asset.department_tablet}</p>`);
            break;
        case 'phone':
            printWindow.document.write(`<h3>${asset.phone_name}</h3>`);
            printWindow.document.write(`<p><strong>Asset Tag:</strong> ${asset.phone_asset}</p>`);
            printWindow.document.write(`<p><strong>ID:</strong> ${asset.phone_id}</p>`);
            printWindow.document.write(`<p><strong>Model:</strong> ${asset.phone_model}</p>`);
            printWindow.document.write(`<p><strong>Serial:</strong> ${asset.phone_serial}</p>`);
            printWindow.document.write(`<p><strong>IMEI:</strong> ${asset.phone_imei}</p>`);
            printWindow.document.write(`<p><strong>Department:</strong> ${asset.department_phone}</p>`);
            break;
        default:
            printWindow.document.write('<p>Unknown asset type.</p>');
            break;
    }

    printWindow.document.write('</div>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
};

