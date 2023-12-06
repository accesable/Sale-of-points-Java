package org.nhutanh.pointofsale.services;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.oned.Code128Writer;
import org.springframework.stereotype.Service;

import java.nio.file.Paths;

@Service
public class BarcodeService {

    private static final String DYNAMIC_DIR = "src/dynamic/products/";

    public static String generateBarcodeImage(String productId) throws Exception {
        String barcodeImagePath = DYNAMIC_DIR+productId + "/barcode" + ".png";

        // Logic to generate barcode
        BitMatrix bitMatrix = new Code128Writer().encode(productId, BarcodeFormat.CODE_128, 300, 150);
        MatrixToImageWriter.writeToPath(bitMatrix, "PNG", Paths.get(barcodeImagePath));

        return barcodeImagePath;
    }
}