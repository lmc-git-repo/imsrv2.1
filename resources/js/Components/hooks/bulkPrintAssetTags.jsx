// Components/hooks/bulkPrintAssetTags.jsx
import React from 'react';

const generateAssetContent = (asset, assetType) => {
    const formatDate = date => {
        const d = new Date(date);
        return `${('0' + (d.getMonth() + 1)).slice(-2)}/${('0' + d.getDate()).slice(-2)}/${d.getFullYear()}`;
    };
    const assetDetails = {
        computer: `
            <div class="column">
                <div class="row">
                    <div class="label">Asset Tag No:</div>
                    <div class="large-text"><strong>${asset.comp_asset || 'N/A'}</strong></div>
                </div>
                <div class="row">
                    <div class="label">Description:</div>
                    <div class="small-text">${asset.comp_model || 'N/A'}</div>
                </div>
                <div class="row">
                    <div class="label">Model No.:</div>
                    <div class="small-text">${asset.comp_model || 'N/A'}</div>
                </div>
                <div class="row">
                    <div class="label">Serial No.:</div>
                    <div class="small-text">${asset.comp_serial || 'N/A'}</div>
                </div>
            </div>
            <div class="column2">
                <div class="row">
                    <div class="label">Date Purchased:</div>
                    <div class="large-text">${formatDate(asset.datePurchased) || 'N/A'}</div>
                </div>
                <div class="row">
                    <div class="label">Department:</div>
                    <div class="small-text">${asset.department || 'N/A'}</div>
                </div>
                <div class="row">
                    <div class="label">Issued To:</div>
                    <div class="small-text">${asset.fullName || 'N/A'}</div>
                </div>
            </div>
        `,
        serverups: `
            <div class="column">
                <div class="row">
                    <div class="label">Asset Tag No:</div>
                    <div class="large-text"><strong>${asset.S_UAsset || 'N/A'}</strong></div>
                </div>
                <div class="row">
                    <div class="label">Description:</div>
                    <div class="small-text">${asset.S_UModel || 'N/A'}</div>
                </div>
                <div class="row">
                    <div class="label">Model No.:</div>
                    <div class="small-text">${asset.S_UModel || 'N/A'}</div>
                </div>
                <div class="row">
                    <div class="label">Serial No.:</div>
                    <div class="small-text">${asset.S_USerial || 'N/A'}</div>
                </div>
            </div>
            <div class="column2">
                <div class="row">
                    <div class="label">Date Purchased:</div>
                    <div class="large-text">${formatDate(asset.datePurchased) || 'N/A'}</div>
                </div>
                <div class="row">
                    <div class="label">Department:</div>
                    <div class="small-text">${asset.department_S_U || 'N/A'}</div>
                </div>
                <div class="row">
                    <div class="label">Issued To:</div>
                    <div class="small-text">${asset.S_UUser || 'N/A'}</div>
                </div>
            </div>
        `,
        monitor: `
            <div class="column">
                <div class="row">
                    <div class="label">Asset Tag No:</div>
                    <div class="large-text"><strong>${asset.mntr_asset || 'N/A'}</strong></div>
                </div>
                <div class="row">
                    <div class="label">Description:</div>
                    <div class="small-text">${asset.mntr_model || 'N/A'}</div>
                </div>
                <div class="row">
                    <div class="label">Model No.:</div>
                    <div class="small-text">${asset.mntr_model || 'N/A'}</div>
                </div>
                <div class="row">
                    <div class="label">Serial No.:</div>
                    <div class="small-text">${asset.mntr_serial || 'N/A'}</div>
                </div>
            </div>
            <div class="column2">
                <div class="row">
                    <div class="label">Date Purchased:</div>
                    <div class="large-text">${formatDate(asset.datePurchased) || 'N/A'}</div>
                </div>
                <div class="row">
                    <div class="label">Department:</div>
                    <div class="small-text">${asset.mntr_department || 'N/A'}</div>
                </div>
                <div class="row">
                    <div class="label">Issued To:</div>
                    <div class="small-text">${asset.mntr_user || 'N/A'}</div>
                </div>
            </div>
        `,
        printer: `
            <div class="column">
                <div class="row">
                    <div class="label">Asset Tag No:</div>
                    <div class="large-text"><strong>${asset.printer_asset || 'N/A'}</strong></div>
                </div>
                <div class="row">
                    <div class="label">Description:</div>
                    <div class="small-text">${asset.printer_model || 'N/A'}</div>
                </div>
                <div class="row">
                    <div class="label">Model No.:</div>
                    <div class="small-text">${asset.printer_model || 'N/A'}</div>
                </div>
                <div class="row">
                    <div class="label">Serial No.:</div>
                    <div class="small-text">${asset.printer_serial || 'N/A'}</div>
                </div>
            </div>
            <div class="column2">
                <div class="row">
                    <div class="label">Date Purchased:</div>
                    <div class="large-text">${formatDate(asset.datePurchased) || 'N/A'}</div>
                </div>
                <div class="row">
                    <div class="label">Department:</div>
                    <div class="small-text">${asset.printer_department || 'N/A'}</div>
                </div>
                <div class="row">
                    <div class="label">Issued To:</div>
                    <div class="small-text">${asset.printer_user || 'N/A'}</div>
                </div>
            </div>
        `,
        tablet: `
            <div class="column">
                <div class="row">
                    <div class="label">Asset Tag No:</div>
                    <div class="large-text"><strong>${asset.tablet_asset || 'N/A'}</strong></div>
                </div>
                <div class="row">
                    <div class="label">Description:</div>
                    <div class="small-text">${asset.tablet_model || 'N/A'}</div>
                </div>
                <div class="row">
                    <div class="label">Model No.:</div>
                    <div class="small-text">${asset.tablet_model || 'N/A'}</div>
                </div>
                <div class="row">
                    <div class="label">Serial No.:</div>
                    <div class="small-text">${asset.tablet_serial || 'N/A'}</div>
                </div>
            </div>
            <div class="column2">
                <div class="row">
                    <div class="label">Date Purchased:</div>
                    <div class="large-text">${formatDate(asset.datePurchased) || 'N/A'}</div>
                </div>
                <div class="row">
                    <div class="label">Department:</div>
                    <div class="small-text">${asset.department_tablet || 'N/A'}</div>
                </div>
                <div class="row">
                    <div class="label">Issued To:</div>
                    <div class="small-text">${asset.fullName || 'N/A'}</div>
                </div>
            </div>
        `,
        phone: `
            <div class="column">
                <div class="row">
                    <div class="label">Asset Tag No:</div>
                    <div class="large-text"><strong>${asset.phone_asset || 'N/A'}</strong></div>
                </div>
                <div class="row">
                    <div class="label">Description:</div>
                    <div class="small-text">${asset.phone_model || 'N/A'}</div>
                </div>
                <div class="row">
                    <div class="label">Model No.:</div>
                    <div class="small-text">${asset.phone_model || 'N/A'}</div>
                </div>
                <div class="row">
                    <div class="label">Serial No.:</div>
                    <div class="small-text">${asset.phone_serial || 'N/A'}</div>
                </div>
            </div>
            <div class="column2">
                <div class="row">
                    <div class="label">Date Purchased:</div>
                    <div class="large-text">${formatDate(asset.datePurchased) || 'N/A'}</div>
                </div>
                <div class="row">
                    <div class="label">Department:</div>
                    <div class="small-text">${asset.department_phone || 'N/A'}</div>
                </div>
                <div class="row">
                    <div class="label">Issued To:</div>
                    <div class="small-text">${asset.fullName || 'N/A'}</div>
                </div>
            </div>
        `,
    };

    return assetDetails[assetType] || '<p>Unknown asset type.</p>';
};

const bulkPrintAssetTags = (assets, assetType) => {
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title></title>');
    // Updated inline styles
    printWindow.document.write(`
        <style>
            body {
                font-family: Arial, sans-serif;
            }
            .asset-tag {
                width: 320px;
                border: 2px solid black;
                padding: 10px;
                /* margin: 20px auto; */
            }

            .header {
                background-color: #283593;
                color: white;
                padding: 5px 0;
                display: flex;
                /* border: 1px solid red; */
                text-align: center;
                margin-bottom: 1%;
                border: 2px solid black;
            }

            .header h1 {
                font-size: 12px;
                margin: 0;
            }
            .header .logo{
                /* border: 1px solid #fff; */
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 0 1%;
            }
            .header .lmc{
                /* border: 1px solid cyan; */
                flex-grow: 1;
            }

            .header p {
                margin: 0;
                font-size: 8px;
            }

            .footer {
                background-color: #283593;
                color: white;
                text-align: center;
                padding: 5px 0;
                font-size: 7px;
                border: 2px solid black;
            }

            .footer p {
                margin: 0;
            }
            .asset-tag-body{
                display: flex;
                justify-content: space-between;
                border: 1px solid #333;
                /* padding: 1%; */
                margin-bottom: 1%;
            }
            .column{
                flex-grow: 1;
                /* border: 1px solid #333; */
            }
            .column2{
                flex-grow: 1;
                display: flex;
                flex-direction: column;
                /* border: 1px solid #333; */
            }
            .column2 .row:last-child{
                border: 1px solid #333;
                flex-grow: 1;
            }
            .column2 .row:last-child .small-text{
                word-wrap: break-word; /* Allow long words to break */
                overflow: hidden;    /* Hide the overflowing text */
                text-overflow: ellipsis; /* Show "..." when text overflows */
                max-width: 100%;     /* Set the max width to control when the overflow happens */
            }
            .row{
                border: 1px solid #333;
                padding: 1%;
            }
            .label{
                /* border: 1px solid green; */
                font-weight: bold;
                font-size: 9px; /* Reduced font size */
            }
            .large-text{
                display: flex;
                justify-content: center;
                font-weight: bold;
                font-size: 9px; /* Reduced font size */
            }
            .small-text{
                display: flex;
                justify-content: center;
                font-weight: bold;
                font-size: 7px; /* Reduced font size */
            }
        </style>
    `);

    printWindow.document.write('</head><body>');
    
    assets.forEach(asset => {
        printWindow.document.write('<div class="asset-tag">');

        // Updated Header
        printWindow.document.write(`
            <div class="header">
                <div class="logo">
                    <img src="/imgs/LMC-Logo-Wht.png" alt="LMC Logo" height="35">
                </div>
                <div class="lmc">
                    <h1>Property of<br>Laguna Metts Corporation</h1>
                    <p>118 East Science Ave., LTI, SEPZ Biñan, Laguna, PH</p>
                </div>
            </div>
        `);

        // Generate dynamic asset content
        printWindow.document.write('<div class="asset-tag-body">');
        printWindow.document.write(generateAssetContent(asset, assetType));
        printWindow.document.write('</div>');

        // Updated Footer
        printWindow.document.write(`
            <div class="footer">
                <p>DO NOT REMOVE UNDER LMC-GCP POLICY</p>
                <p>If found, please call tel. # +63 49 541 2713</p>
            </div>
        `);
        printWindow.document.write('</div>');
    });

    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
};

export default bulkPrintAssetTags;


// bulkPrintAssetTags.js
// const bulkPrintAssetTags = (computers) => {
//     const ids = computers.map(comp => comp.CID).join(',');
//     const url = route('computers.bulkPrintAssetTags', { ids }); // Adjust to match your route
//     window.open(url, '_blank'); // Open the Excel file in a new tab
// };

// export default bulkPrintAssetTags;
