// Components/hooks/printAssetTag.jsx
// const generateAssetContent = (asset, assetType) => {
//     const assetDetails = {
//         computer: `
//             <tr>
//                 <td class="label">Asset Tag No:</td><td><strong>${asset.comp_asset}<strong></td>
//                 <td class="label">Date Purchased:</td><td>${asset.datePurchased}</td>
//             </tr>
//             <tr>
//                 <td class="label">Description:</td><td>${asset.comp_model}</td>
//                 <td class="label">Department:</td><td>${asset.department_comp}</td>
//             </tr>
//             <tr>
//                 <td class="label">Model No:</td><td>${asset.comp_model}</td>
//                 <td class="label">Issued To:</td><td>${asset.fullName}</td>
//             </tr>
//             <tr>
//                 <td class="label">Serial No:</td><td colspan="3">${asset.comp_serial}</td>
//             </tr>
//         `,
//         serverups: `
//             <tr>
//                 <td class="label">Asset Tag No:</td><td><strong>${asset.S_UAsset}<strong></td>
//                 <td class="label">Date Purchased:</td><td>${asset.datePurchased}</td>
//             </tr>
//             <tr>
//                 <td class="label">Description:</td><td>${asset.S_UModel}</td>
//                 <td class="label">Department:</td><td>${asset.department_S_U}</td>
//             </tr>
//             <tr>
//                 <td class="label">Model No:</td><td>${asset.S_UModel}</td>
//                 <td class="label">Issued To:</td><td>${asset.S_UUser}</td>
//             </tr>
//             <tr>
//                 <td class="label">Serial No:</td><td colspan="3">${asset.S_USerial}</td>
//             </tr>
//         `,
//         monitor: `
//             <tr>
//                 <td class="label">Asset Tag No:</td><td><strong>${asset.mntr_asset}<strong></td>
//                 <td class="label">Date Purchased:</td><td>${asset.datePurchased}</td>
//             </tr>
//             <tr>
//                 <td class="label">Description:</td><td>${asset.mntr_model}</td>
//                 <td class="label">Department:</td><td>${asset.mntr_department}</td>
//             </tr>
//             <tr>
//                 <td class="label">Model No:</td><td>${asset.mntr_model}</td>
//                 <td class="label">Issued To:</td><td>${asset.mntr_user}</td>
//             </tr>
//             <tr>
//                 <td class="label">Serial No:</td><td colspan="3">${asset.mntr_serial}</td>
//             </tr>
//         `,
//         printer: `
//             <tr>
//                 <td class="label">Asset Tag No:</td><td><strong>${asset.printer_asset}<strong></td>
//                 <td class="label">Date Purchased:</td><td>${asset.datePurchased}</td>
//             </tr>
//             <tr>
//                 <td class="label">Description:</td><td>${asset.printer_model}</td>
//                 <td class="label">Department:</td><td>${asset.printer_department}</td>
//             </tr>
//             <tr>
//                 <td class="label">Model No:</td><td>${asset.printer_model}</td>
//                 <td class="label">Issued To:</td><td>${asset.printer_user}</td>
//             </tr>
//             <tr>
//                 <td class="label">Serial No:</td><td colspan="3">${asset.printer_serial}</td>
//             </tr>
//         `,
//         tablet: `
//             <tr>
//                 <td class="label">Asset Tag No:</td><td><strong>${asset.tablet_asset}<strong></td>
//                 <td class="label">Date Purchased:</td><td>${asset.datePurchased}</td>
//             </tr>
//             <tr>
//                 <td class="label">Description:</td><td>${asset.tablet_model}</td>
//                 <td class="label">Department:</td><td>${asset.department_tablet}</td>
//             </tr>
//             <tr>
//                 <td class="label">Model No:</td><td>${asset.tablet_model}</td>
//                 <td class="label">Issued To:</td><td>${asset.fullName}</td>
//             </tr>
//             <tr>
//                 <td class="label">Serial No:</td><td colspan="3">${asset.tablet_serial}</td>
//             </tr>
//         `,
//         phone: `
//             <tr>
//                 <td class="label">Asset Tag No:</td><td><strong>${asset.phone_asset}<strong></td>
//                 <td class="label">Date Purchased:</td><td>${asset.datePurchased}</td>
//             </tr>
//             <tr>
//                 <td class="label">Description:</td><td>${asset.phone_model}</td>
//                 <td class="label">Department:</td><td>${asset.department_phone}</td>
//             </tr>
//             <tr>
//                 <td class="label">Model No:</td><td>${asset.phone_model}</td>
//                 <td class="label">Issued To:</td><td>${asset.fullName}</td>
//             </tr>
//             <tr>
//                 <td class="label">Serial No:</td><td colspan="3">${asset.phone_serial}</td>
//             </tr>
//         `,
//     };

//     return assetDetails[assetType] || '<p>Unknown asset type.</p>';
// };

// export const printAssetTag = (asset, assetType) => {
//     const printWindow = window.open('', '', 'height=600,width=800');
//     printWindow.document.write('<html><head><title></title>');
//     // Inline styles from your HTML example
//     printWindow.document.write(`
//         <style>
//             body {
//                 font-family: Arial, sans-serif;
//             }
//             .asset-tag {
//                 width: 600px;
//                 border: 2px solid black;
//                 padding: 10px;
//                 margin: 20px auto;
//             }
//             .header {
//                 background-color: #283593;
//                 color: white;
//                 padding: 10px 0;
//                 display: flex;
//                 text-align: center;
//                 margin-bottom: 1%;
//                 border: 2px solid black;
//             }
//             .header h1 {
//                 font-size: 20px;
//                 margin: 0;
//             }
//             .header .logo {
//                 display: flex;
//                 justify-content: center;
//                 align-items: center;
//                 padding: 0 1%;
//             }
//             .header .lmc {
//                 flex-grow: 1;
//             }
//             .header .lmc h1, p{
//                 margin: 0;
//             }   
//             .content-table {
//                 width: 100%;
//                 border: 2px solid black;
//                 border-collapse: collapse;
//                 margin-bottom: 1%;
//             }
//             .content-table td {
//                 border: 1px solid black;
//                 padding: 5px;
//                 font-size: 14px;
//             }
//             .content-table .label {
//                 font-weight: bold;
//                 width: 150px;
//             }
//             .footer {
//                 background-color: #283593;
//                 color: white;
//                 text-align: center;
//                 font-size: 9px;
//                 border: 2px solid black;
//                 padding: 1px 0;
//             }
//             .footer p{
//                 margin: 0;
//             }
//         </style>
//     `);

//     printWindow.document.write('</head><body>');
//     printWindow.document.write('<div class="asset-tag">');

//     // Header
//     printWindow.document.write(`
//         <div class="header">
//             <div class="logo">
//                 <img src="/imgs/LMC-Logo-Wht.png" alt="LMC Logo" height="70">
//             </div>
//             <div class="lmc">
//                 <h1>Property of<br>Laguna Metts Corporation</h1>
//                 <p>118 East Science Ave., LTI, SEPZ Biñan, Laguna, PH</p>
//             </div>
//         </div>
//     `);

//     // Asset details table
//     printWindow.document.write('<table class="content-table">');
//     printWindow.document.write(generateAssetContent(asset, assetType));
//     printWindow.document.write('</table>');

//     // Footer
//     printWindow.document.write(`
//         <div class="footer">
//             <p>DO NOT REMOVE UNDER LMC-GCP POLICY</p>
//             <p>If found, please call tel. # +63 49 541 2713</p>
//         </div>
//     `);

//     printWindow.document.write('</div>');
//     printWindow.document.write('</body></html>');
//     printWindow.document.close();
//     printWindow.focus();
//     printWindow.print();
// };

// printAssetTag.jsx
export const printAssetTag = (asset, type) => {
    let url = '';

    switch (type) {
        case 'computer':
            url = route('computers.printAssetTag', { id: asset.CID });
            break;
        case 'serverups':
            url = route('serverups.printAssetTag', { id: asset.S_UID });
            break;
        case 'monitor':
            url = route('monitors.printAssetTag', { id: asset.monitor_id });
            break;
        case 'printer':
            url = route('printers.printAssetTag', { id: asset.printer_id });
            break;
        case 'tablet':
            url = route('tablets.printAssetTag', { id: asset.tablet_id });
            break;
        case 'phone':
            url = route('phones.printAssetTag', { id: asset.phone_id });
            break;
        // Add other asset types as needed
        default:
            console.error('Unknown asset type');
            return;
    }

    window.open(url, '_blank');
};
