package org.nhutanh.pointofsale.services;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Comparator;


public class FileUtilsService {

    private static final String DYNAMIC_DIR = "src/dynamic/products/";
    public static String saveImage(MultipartFile imageFile, String ID) throws IOException, IOException {
        if (imageFile.isEmpty()) {
            return null; // Handle as appropriate
        }

        // Get the directory path
        Path staticPath = Paths.get(DYNAMIC_DIR+ID);
        if (!Files.exists(staticPath)) {
            Files.createDirectories(staticPath);
        }

        // Generate a unique filename
        String filename = "image-"+imageFile.getOriginalFilename();
        if (filename == null){
            filename = "product-image";
        }
        // Resolve the file path
        Path filePath = staticPath.resolve(filename);

        // Copy the file to the target location
        Files.copy(imageFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return filename;
    }
    public static void deleteFolder(String productID) throws IOException {
        Path path = Paths.get(DYNAMIC_DIR+productID);
        if (Files.exists(path)) {
            Files.walk(path)
                    .sorted(Comparator.reverseOrder())
                    .forEach(p -> {
                        try {
                            Files.delete(p);
                        } catch (IOException e) {
                        }
                    });
        }
    }
}
