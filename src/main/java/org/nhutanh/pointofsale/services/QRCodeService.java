package org.nhutanh.pointofsale.services;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.nio.file.Paths;

@Service
public class QRCodeService {
    private static final String DYNAMIC_DIR = "src/dynamic/products/";

    public static String generateQRCodeImage(String productId) throws Exception {

        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        String baseUrl = request.getRequestURL().toString().replace(request.getRequestURI(), request.getContextPath());

        String qrCodeImagePath = DYNAMIC_DIR+productId + "/QRcode" + ".png";
        String productUrl = baseUrl + "/product/detail/" + productId; // Adjust this endpoint as needed

        // Logic to generate QR code
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(productUrl, BarcodeFormat.QR_CODE, 300, 300);
        MatrixToImageWriter.writeToPath(bitMatrix, "PNG", Paths.get(qrCodeImagePath));

        return qrCodeImagePath;
    }
}
