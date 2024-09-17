// Components/hooks/bulkPrintAssetTags.jsx
import React from 'react';

const generateAssetContent = (asset, assetType) => {
    const assetDetails = {
        computer: `
            <h3>${asset.comp_name}</h3>
            <p><strong>Asset Tag:</strong> ${asset.comp_asset}</p>
            <p><strong>Computer ID:</strong> ${asset.CID}</p>
            <p><strong>Type:</strong> ${asset.comp_type}</p>
            <p><strong>Generation:</strong> ${asset.comp_gen}</p>
            <p><strong>MAC Address:</strong> ${asset.comp_address}</p>
            <p><strong>Serial:</strong> ${asset.comp_serial}</p>
            <p><strong>Date Purchased:</strong> ${asset.datePurchased}</p>
            <p><strong>Department:</strong> ${asset.department_comp}</p>
        `,
        serverups: `
            <h3>${asset.S_UName}</h3>
            <p><strong>Asset Tag:</strong> ${asset.S_UAsset}</p>
            <p><strong>ID:</strong> ${asset.S_UID}</p>
            <p><strong>Type:</strong> ${asset.S_UType}</p>
            <p><strong>Generation:</strong> ${asset.S_UGen}</p>
            <p><strong>MAC Address:</strong> ${asset.S_UAddress}</p>
            <p><strong>Serial:</strong> ${asset.S_USerial}</p>
            <p><strong>Date Purchased:</strong> ${asset.datePurchased}</p>
            <p><strong>Department:</strong> ${asset.department_S_U}</p>
        `,
        monitor: `
            <h3>${asset.compName}</h3>
            <p><strong>Asset Tag:</strong> ${asset.mntr_asset}</p>
            <p><strong>ID:</strong> ${asset.monitor_id}</p>
            <p><strong>Model:</strong> ${asset.mntr_model}</p>
            <p><strong>Date Purchased:</strong> ${asset.datePurchased}</p>
            <p><strong>Department:</strong> ${asset.mntr_department}</p>
        `,
        printer: `
            <h3>${asset.printer_model}</h3>
            <p><strong>Asset Tag:</strong> ${asset.printer_asset}</p>
            <p><strong>ID:</strong> ${asset.printer_id}</p>
            <p><strong>Serial:</strong> ${asset.printer_serial}</p>
            <p><strong>Date Purchased:</strong> ${asset.datePurchased}</p>
            <p><strong>Department:</strong> ${asset.printer_department}</p>
        `,
        tablet: `
            <h3>${asset.tablet_name}</h3>
            <p><strong>Asset Tag:</strong> ${asset.tablet_asset}</p>
            <p><strong>ID:</strong> ${asset.tablet_id}</p>
            <p><strong>Model:</strong> ${asset.tablet_model}</p>
            <p><strong>Serial:</strong> ${asset.tablet_serial}</p>
            <p><strong>Date Purchased:</strong> ${asset.datePurchased}</p>
            <p><strong>Department:</strong> ${asset.department_tablet}</p>
        `,
        phone: `
            <h3>${asset.phone_name}</h3>
            <p><strong>Asset Tag:</strong> ${asset.phone_asset}</p>
            <p><strong>ID:</strong> ${asset.phone_id}</p>
            <p><strong>Model:</strong> ${asset.phone_model}</p>
            <p><strong>Serial:</strong> ${asset.phone_serial}</p>
            <p><strong>IMEI:</strong> ${asset.phone_imei}</p>
            <p><strong>Date Purchased:</strong> ${asset.datePurchased}</p>
            <p><strong>Department:</strong> ${asset.department_phone}</p>
        `,
    };

    return assetDetails[assetType] || '<p>Unknown asset type.</p>';
};

const bulkPrintAssetTags = (assets, assetType) => {
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Print Asset Tags</title>');
    printWindow.document.write('<style>');
    printWindow.document.write(`
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .asset-tags {
            width: 90%;
            max-width: 800px;
            padding: 20px;
            margin: 20px auto;
        }
        .asset-tag {
            width: 100%;
            padding: 10px;
            border: 1px solid #333;
            border-radius: 8px;
            background-color: #fff;
            margin-bottom: 20px;
            text-align: center;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
        }
        .asset-tag h3 {
            margin-top: 0;
            color: #333;
            font-size: 1.5em;
        }
        .asset-tag p {
            margin: 5px 0;
            color: #555;
        }
        .asset-tag p strong {
            color: #000;
        }
    `);
    printWindow.document.write('</style></head><body>');
    printWindow.document.write('<div class="asset-tags">');

    assets.forEach(asset => {
        printWindow.document.write('<div class="asset-tag">');
        printWindow.document.write(generateAssetContent(asset, assetType));
        printWindow.document.write('</div>');
    });

    printWindow.document.write('</div>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
};

export default bulkPrintAssetTags;
