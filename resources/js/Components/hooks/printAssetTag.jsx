import QRCode from 'qrcode';

const formatDate = (date) => {
    if (!date) return 'N/A';

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return 'N/A';
    }

    return `${String(parsedDate.getMonth() + 1).padStart(2, '0')}/${String(
        parsedDate.getDate()
    ).padStart(2, '0')}/${parsedDate.getFullYear()}`;
};

const normalizeUnicodeText = (value) => {
    if (value === null || value === undefined) {
        return '';
    }

    return String(value).normalize('NFC');
};

const cleanQrValue = (value) => {
    if (
        value === null ||
        value === undefined ||
        String(value).trim() === ''
    ) {
        return 'N/A';
    }

    return normalizeUnicodeText(value).trim();
};

const getAssetQrText = (asset, assetType) => {
    let qrLines = [];

    switch (assetType) {
        case 'computer':
            qrLines = [
                `Asset Tag No: ${cleanQrValue(asset.comp_asset)}`,
                `Description: ${cleanQrValue(asset.comp_model)}`,
                `Model No: ${cleanQrValue(asset.comp_model)}`,
                `Serial No: ${cleanQrValue(asset.comp_serial)}`,
                `Date Purchased: ${formatDate(asset.datePurchased)}`,
                `Department: ${cleanQrValue(asset.department_comp)}`,
                `Issued To: ${cleanQrValue(
                    asset.fullName || asset.comp_user
                )}`,
                `Signature/Remarks: ${cleanQrValue(asset.remarks)}`,
            ];
            break;

        case 'serverups':
            qrLines = [
                `Asset Tag No: ${cleanQrValue(asset.S_UAsset)}`,
                `Description: ${cleanQrValue(asset.S_UModel)}`,
                `Model No: ${cleanQrValue(asset.S_UModel)}`,
                `Serial No: ${cleanQrValue(asset.S_USerial)}`,
                `Date Purchased: ${formatDate(asset.datePurchased)}`,
                `Department: ${cleanQrValue(asset.department_S_U)}`,
                `Issued To: ${cleanQrValue(asset.S_UUser)}`,
                `Signature/Remarks: ${cleanQrValue(asset.S_URemarks)}`,
            ];
            break;

        case 'monitor':
            qrLines = [
                `Asset Tag No: ${cleanQrValue(asset.mntr_asset)}`,
                `Description: ${cleanQrValue(asset.mntr_model)}`,
                `Model No: ${cleanQrValue(asset.mntr_model)}`,
                `Serial No: ${cleanQrValue(asset.mntr_serial)}`,
                `Date Purchased: ${formatDate(asset.datePurchased)}`,
                `Department: ${cleanQrValue(asset.mntr_department)}`,
                `Issued To: ${cleanQrValue(asset.mntr_user)}`,
                `Signature/Remarks: ${cleanQrValue(asset.remarks)}`,
            ];
            break;

        case 'printer':
            qrLines = [
                `Asset Tag No: ${cleanQrValue(asset.printer_asset)}`,
                `Description: ${cleanQrValue(asset.printer_model)}`,
                `Model No: ${cleanQrValue(asset.printer_model)}`,
                `Serial No: ${cleanQrValue(asset.printer_serial)}`,
                `Date Purchased: ${formatDate(asset.datePurchased)}`,
                `Department: ${cleanQrValue(
                    asset.printer_department
                )}`,
                `Issued To: ${cleanQrValue(asset.printer_user)}`,
                `Signature/Remarks: ${cleanQrValue(asset.remarks)}`,
            ];
            break;

        case 'tablet':
            qrLines = [
                `Asset Tag No: ${cleanQrValue(asset.tablet_asset)}`,
                `Description: ${cleanQrValue(asset.tablet_model)}`,
                `Model No: ${cleanQrValue(asset.tablet_model)}`,
                `Serial No: ${cleanQrValue(asset.tablet_serial)}`,
                `Date Purchased: ${formatDate(asset.datePurchased)}`,
                `Department: ${cleanQrValue(
                    asset.department_tablet
                )}`,
                `Issued To: ${cleanQrValue(
                    asset.fullName || asset.tablet_user
                )}`,
                `Signature/Remarks: ${cleanQrValue(asset.remarks)}`,
            ];
            break;

        case 'phone':
            qrLines = [
                `Asset Tag No: ${cleanQrValue(asset.phone_asset)}`,
                `Description: ${cleanQrValue(asset.phone_model)}`,
                `Model No: ${cleanQrValue(asset.phone_model)}`,
                `Serial No: ${cleanQrValue(asset.phone_serial)}`,
                `Date Purchased: ${formatDate(asset.datePurchased)}`,
                `Department: ${cleanQrValue(asset.department_phone)}`,
                `Issued To: ${cleanQrValue(
                    asset.fullName || asset.phone_user
                )}`,
                `Signature/Remarks: ${cleanQrValue(asset.remarks)}`,
            ];
            break;

        case 'tv':
            qrLines = [
                `Asset Tag No: ${cleanQrValue(asset.asset_tag)}`,
                `Description: ${cleanQrValue(asset.model)}`,
                `Model No: ${cleanQrValue(asset.model)}`,
                `Serial No: ${cleanQrValue(asset.serial_number)}`,
                `Date Purchased: ${formatDate(asset.datePurchased)}`,
                `Department: ${cleanQrValue(asset.location)}`,
                `Issued To: ${cleanQrValue(
                    asset.issued_to || asset.location
                )}`,
                `Signature/Remarks: ${cleanQrValue(asset.remarks)}`,
            ];
            break;

        default:
            return 'Asset information not available.';
    }

    return normalizeUnicodeText(qrLines.join('\r\n') + '\r\n\r\n');
};

const generateQrCode = async (asset, assetType) => {
    const qrText = getAssetQrText(asset, assetType);

    return QRCode.toDataURL(
        [
            {
                data: qrText,
                mode: 'byte',
            },
        ],
        {
            width: 180,
            margin: 1,
            errorCorrectionLevel: 'M',
        }
    );
};

const generateQrSection = (qrCodeDataUrl) => `
    <div class="qr-row">
        <div class="qr-wrapper">
            <img
                src="${qrCodeDataUrl}"
                alt="Asset QR Code"
                class="qr-code"
            />
        </div>
    </div>
`;

const generateAssetContent = (
    asset,
    assetType,
    qrCodeDataUrl
) => {
    const qrSection = generateQrSection(qrCodeDataUrl);

    const assetDetails = {
        computer: `
            <div class="column">
                <div class="row">
                    <div class="label">Asset Tag No:</div>
                    <div class="large-text">
                        <strong>${asset.comp_asset || 'N/A'}</strong>
                    </div>
                </div>

                <div class="row">
                    <div class="label">Description:</div>
                    <div class="small-text">
                        ${asset.comp_model || 'N/A'}
                    </div>
                </div>

                <div class="row">
                    <div class="label">Model No.:</div>
                    <div class="small-text">
                        ${asset.comp_model || 'N/A'}
                    </div>
                </div>

                <div class="row">
                    <div class="label">Serial No.:</div>
                    <div class="small-text">
                        ${asset.comp_serial || 'N/A'}
                    </div>
                </div>

                <div class="row">
                    <div class="label">Issued To:</div>
                    <div class="small-text">
                        ${asset.fullName || asset.comp_user || 'N/A'}
                    </div>
                </div>

                <div class="remarks-row">
                    <div class="label">Signature/Remarks:</div>
                    <div class="remarks-text">
                        ${asset.remarks || ''}
                    </div>
                </div>
            </div>

            <div class="column2">
                <div class="row">
                    <div class="label">Date Purchased:</div>
                    <div class="large-text">
                        ${formatDate(asset.datePurchased)}
                    </div>
                </div>

                <div class="row">
                    <div class="label">Department:</div>
                    <div class="large-text">
                        ${asset.department_comp || 'N/A'}
                    </div>
                </div>

                ${qrSection}
            </div>
        `,

        serverups: `
            <div class="column">
                <div class="row">
                    <div class="label">Asset Tag No:</div>
                    <div class="large-text">
                        <strong>${asset.S_UAsset || 'N/A'}</strong>
                    </div>
                </div>

                <div class="row">
                    <div class="label">Description:</div>
                    <div class="small-text">
                        ${asset.S_UModel || 'N/A'}
                    </div>
                </div>

                <div class="row">
                    <div class="label">Model No.:</div>
                    <div class="small-text">
                        ${asset.S_UModel || 'N/A'}
                    </div>
                </div>

                <div class="row">
                    <div class="label">Serial No.:</div>
                    <div class="small-text">
                        ${asset.S_USerial || 'N/A'}
                    </div>
                </div>

                <div class="row">
                    <div class="label">Issued To:</div>
                    <div class="small-text">
                        ${asset.S_UUser || 'N/A'}
                    </div>
                </div>

                <div class="remarks-row">
                    <div class="label">Signature/Remarks:</div>
                    <div class="remarks-text">
                        ${asset.S_URemarks || ''}
                    </div>
                </div>
            </div>

            <div class="column2">
                <div class="row">
                    <div class="label">Date Purchased:</div>
                    <div class="large-text">
                        ${formatDate(asset.datePurchased)}
                    </div>
                </div>

                <div class="row">
                    <div class="label">Department:</div>
                    <div class="large-text">
                        ${asset.department_S_U || 'N/A'}
                    </div>
                </div>

                ${qrSection}
            </div>
        `,

        monitor: `
            <div class="column">
                <div class="row">
                    <div class="label">Asset Tag No:</div>
                    <div class="large-text">
                        <strong>${asset.mntr_asset || 'N/A'}</strong>
                    </div>
                </div>

                <div class="row">
                    <div class="label">Description:</div>
                    <div class="small-text">
                        ${asset.mntr_model || 'N/A'}
                    </div>
                </div>

                <div class="row">
                    <div class="label">Model No.:</div>
                    <div class="small-text">
                        ${asset.mntr_model || 'N/A'}
                    </div>
                </div>

                <div class="row">
                    <div class="label">Serial No.:</div>
                    <div class="small-text">
                        ${asset.mntr_serial || 'N/A'}
                    </div>
                </div>

                <div class="row">
                    <div class="label">Issued To:</div>
                    <div class="small-text">
                        ${asset.mntr_user || 'N/A'}
                    </div>
                </div>

                <div class="remarks-row">
                    <div class="label">Signature/Remarks:</div>
                    <div class="remarks-text">
                        ${asset.remarks || ''}
                    </div>
                </div>
            </div>

            <div class="column2">
                <div class="row">
                    <div class="label">Date Purchased:</div>
                    <div class="large-text">
                        ${formatDate(asset.datePurchased)}
                    </div>
                </div>

                <div class="row">
                    <div class="label">Department:</div>
                    <div class="large-text">
                        ${asset.mntr_department || 'N/A'}
                    </div>
                </div>

                ${qrSection}
            </div>
        `,

        printer: `
            <div class="column">
                <div class="row">
                    <div class="label">Asset Tag No:</div>
                    <div class="large-text">
                        <strong>${asset.printer_asset || 'N/A'}</strong>
                    </div>
                </div>

                <div class="row">
                    <div class="label">Description:</div>
                    <div class="small-text">
                        ${asset.printer_model || 'N/A'}
                    </div>
                </div>

                <div class="row">
                    <div class="label">Model No.:</div>
                    <div class="small-text">
                        ${asset.printer_model || 'N/A'}
                    </div>
                </div>

                <div class="row">
                    <div class="label">Serial No.:</div>
                    <div class="small-text">
                        ${asset.printer_serial || 'N/A'}
                    </div>
                </div>

                <div class="row">
                    <div class="label">Issued To:</div>
                    <div class="small-text">
                        ${asset.printer_user || 'N/A'}
                    </div>
                </div>

                <div class="remarks-row">
                    <div class="label">Signature/Remarks:</div>
                    <div class="remarks-text">
                        ${asset.remarks || ''}
                    </div>
                </div>
            </div>

            <div class="column2">
                <div class="row">
                    <div class="label">Date Purchased:</div>
                    <div class="large-text">
                        ${formatDate(asset.datePurchased)}
                    </div>
                </div>

                <div class="row">
                    <div class="label">Department:</div>
                    <div class="large-text">
                        ${asset.printer_department || 'N/A'}
                    </div>
                </div>

                ${qrSection}
            </div>
        `,

        tablet: `
            <div class="column">
                <div class="row">
                    <div class="label">Asset Tag No:</div>
                    <div class="large-text">
                        <strong>${asset.tablet_asset || 'N/A'}</strong>
                    </div>
                </div>

                <div class="row">
                    <div class="label">Description:</div>
                    <div class="small-text">
                        ${asset.tablet_model || 'N/A'}
                    </div>
                </div>

                <div class="row">
                    <div class="label">Model No.:</div>
                    <div class="small-text">
                        ${asset.tablet_model || 'N/A'}
                    </div>
                </div>

                <div class="row">
                    <div class="label">Serial No.:</div>
                    <div class="small-text">
                        ${asset.tablet_serial || 'N/A'}
                    </div>
                </div>

                <div class="row">
                    <div class="label">Issued To:</div>
                    <div class="small-text">
                        ${asset.fullName || asset.tablet_user || 'N/A'}
                    </div>
                </div>

                <div class="remarks-row">
                    <div class="label">Signature/Remarks:</div>
                    <div class="remarks-text">
                        ${asset.remarks || ''}
                    </div>
                </div>
            </div>

            <div class="column2">
                <div class="row">
                    <div class="label">Date Purchased:</div>
                    <div class="large-text">
                        ${formatDate(asset.datePurchased)}
                    </div>
                </div>

                <div class="row">
                    <div class="label">Department:</div>
                    <div class="large-text">
                        ${asset.department_tablet || 'N/A'}
                    </div>
                </div>

                ${qrSection}
            </div>
        `,

        phone: `
            <div class="column">
                <div class="row">
                    <div class="label">Asset Tag No:</div>
                    <div class="large-text">
                        <strong>${asset.phone_asset || 'N/A'}</strong>
                    </div>
                </div>

                <div class="row">
                    <div class="label">Description:</div>
                    <div class="small-text">
                        ${asset.phone_model || 'N/A'}
                    </div>
                </div>

                <div class="row">
                    <div class="label">Model No.:</div>
                    <div class="small-text">
                        ${asset.phone_model || 'N/A'}
                    </div>
                </div>

                <div class="row">
                    <div class="label">Serial No.:</div>
                    <div class="small-text">
                        ${asset.phone_serial || 'N/A'}
                    </div>
                </div>

                <div class="row">
                    <div class="label">Issued To:</div>
                    <div class="small-text">
                        ${asset.fullName || asset.phone_user || 'N/A'}
                    </div>
                </div>

                <div class="remarks-row">
                    <div class="label">Signature/Remarks:</div>
                    <div class="remarks-text">
                        ${asset.remarks || ''}
                    </div>
                </div>
            </div>

            <div class="column2">
                <div class="row">
                    <div class="label">Date Purchased:</div>
                    <div class="large-text">
                        ${formatDate(asset.datePurchased)}
                    </div>
                </div>

                <div class="row">
                    <div class="label">Department:</div>
                    <div class="large-text">
                        ${asset.department_phone || 'N/A'}
                    </div>
                </div>

                ${qrSection}
            </div>
        `,

        tv: `
            <div class="column">
                <div class="row">
                    <div class="label">Asset Tag No:</div>
                    <div class="large-text">
                        <strong>${asset.asset_tag || 'N/A'}</strong>
                    </div>
                </div>

                <div class="row">
                    <div class="label">Description:</div>
                    <div class="small-text">
                        ${asset.model || 'N/A'}
                    </div>
                </div>

                <div class="row">
                    <div class="label">Model No.:</div>
                    <div class="small-text">
                        ${asset.model || 'N/A'}
                    </div>
                </div>

                <div class="row">
                    <div class="label">Serial No.:</div>
                    <div class="small-text">
                        ${asset.serial_number || 'N/A'}
                    </div>
                </div>

                <div class="row">
                    <div class="label">Issued To:</div>
                    <div class="small-text">
                        ${asset.issued_to || asset.location || 'N/A'}
                    </div>
                </div>

                <div class="remarks-row">
                    <div class="label">Signature/Remarks:</div>
                    <div class="remarks-text">
                        ${asset.remarks || ''}
                    </div>
                </div>
            </div>

            <div class="column2">
                <div class="row">
                    <div class="label">Date Purchased:</div>
                    <div class="large-text">
                        ${formatDate(asset.datePurchased)}
                    </div>
                </div>

                <div class="row">
                    <div class="label">Department:</div>
                    <div class="large-text">
                        ${asset.location || 'N/A'}
                    </div>
                </div>

                ${qrSection}
            </div>
        `,
    };

    return assetDetails[assetType] || '<p>Unknown asset type.</p>';
};

const waitForImages = (printWindow) => {
    const images = Array.from(printWindow.document.images);

    if (images.length === 0) {
        return Promise.resolve();
    }

    return Promise.all(
        images.map(
            (image) =>
                new Promise((resolve) => {
                    if (image.complete) {
                        resolve();
                        return;
                    }

                    image.onload = resolve;
                    image.onerror = resolve;
                })
        )
    );
};

export const printAssetTag = async (asset, assetType) => {
    try {
        const qrCodeDataUrl = await generateQrCode(
            asset,
            assetType
        );

        const printWindow = window.open(
            '',
            '',
            'height=600,width=800'
        );

        if (!printWindow) {
            window.alert(
                'The print window was blocked. Please allow pop-ups and try again.'
            );
            return;
        }

        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="UTF-8" />

                    <title>Asset Tag</title>

                    <style>
                        * {
                            box-sizing: border-box;
                        }

                        @page {
                            margin: 10mm;
                        }

                        body {
                            margin: 0;
                            font-family: Arial, sans-serif;
                        }

                        .asset-tag {
                            width: 390px;
                            border: 2px solid black;
                            padding: 2px;
                            background: white;
                        }

                        .header {
                            min-height: 30px;
                            background-color: #283593;
                            color: white;
                            display: flex;
                            text-align: center;
                            margin-bottom: 1px;
                            border: 1px solid black;
                        }

                        .header h1 {
                            margin: 0;
                            font-size: 10px;
                            line-height: 10px;
                        }

                        .header .logo {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            padding: 0 1%;
                        }

                        .header .logo img {
                            display: block;
                            max-width: 60px;
                            max-height: 27px;
                        }

                        .header .lmc {
                            flex-grow: 1;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                        }

                        .header p {
                            margin: 0;
                            font-size: 7px;
                            line-height: 8px;
                        }

                        .footer {
                            background-color: #283593;
                            color: white;
                            text-align: center;
                            padding: 1px 0;
                            font-size: 7px;
                            line-height: 8px;
                            font-weight: bold;
                            border: 1px solid black;
                        }

                        .footer p {
                            margin: 0;
                        }

                        .asset-tag-body {
                            display: flex;
                            border: 1px solid black;
                            margin-bottom: 1px;
                        }

                        .column,
                        .column2 {
                            width: 50%;
                            overflow: hidden;
                        }

                        .column {
                            border-right: 1px solid black;
                        }

                        .column2 {
                            display: flex;
                            flex-direction: column;
                        }

                        .column .row {
                            min-height: 18px;
                            border-bottom: 1px solid black;
                        }

                        .column2 > .row {
                            min-height: 24px;
                            border-bottom: 1px solid black;
                        }

                        .row {
                            padding: 0 3px;
                        }

                        .remarks-row {
                            min-height: 20px;
                            padding: 0 3px;
                        }

                        .remarks-text {
                            min-height: 11px;
                            overflow: hidden;
                            font-size: 7px;
                            line-height: 8px;
                        }

                        .label {
                            font-weight: bold;
                            font-size: 8px;
                            line-height: 9px;
                        }

                        .large-text {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            min-height: 11px;
                            padding: 0 2px;
                            overflow: hidden;
                            font-size: 11px;
                            font-weight: bold;
                            line-height: 11px;
                            text-align: center;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }

                        .small-text {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            min-height: 10px;
                            padding: 0 2px;
                            overflow: hidden;
                            font-size: 7px;
                            font-weight: bold;
                            line-height: 8px;
                            text-align: center;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }

                        .qr-row {
                            flex-grow: 1;
                            min-height: 60px;
                            padding: 1px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }

                        .qr-wrapper {
                            width: 100%;
                            height: 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }

                        .qr-code {
                            display: block;
                            width: 56px;
                            height: 56px;
                            object-fit: contain;
                        }

                        @media print {
                            body {
                                print-color-adjust: exact;
                                -webkit-print-color-adjust: exact;
                            }
                        }
                    </style>
                </head>

                <body>
                    <div class="asset-tag">
                        <div class="header">
                            <div class="logo">
                                <img
                                    src="/imgs/LMC-Logo-Wht.png"
                                    alt="LMC Logo"
                                />
                            </div>

                            <div class="lmc">
                                <h1>
                                    Property of<br />
                                    Laguna Metts Corporation
                                </h1>

                                <p>
                                    118 East Science Ave., LTI, SEPZ
                                    Biñan, Laguna, PH
                                </p>
                            </div>
                        </div>

                        <div class="asset-tag-body">
                            ${generateAssetContent(
                                asset,
                                assetType,
                                qrCodeDataUrl
                            )}
                        </div>

                        <div class="footer">
                            <p>
                                DO NOT REMOVE UNDER LMC-GCP POLICY
                            </p>

                            <p>
                                If found, please call tel. # +63 49
                                541 2713
                            </p>
                        </div>
                    </div>
                </body>
            </html>
        `);

        printWindow.document.close();

        await waitForImages(printWindow);

        printWindow.focus();
        printWindow.print();
    } catch (error) {
        console.error(
            'Failed to print asset tag:',
            error
        );

        window.alert(
            'Unable to generate the asset tag QR code. Please try again.'
        );
    }
};