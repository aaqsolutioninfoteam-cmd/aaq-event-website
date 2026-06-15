// Image Upload Service - Firebase Storage Integration

import { storage } from "./firebase-config.js";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

/**
 * Upload image to Firebase Storage
 * @param {File} file - Image file to upload
 * @param {string} path - Storage path (e.g., 'staff-profiles', 'event-images')
 * @param {Function} onProgress - Callback for progress updates
 * @returns {Promise} Returns download URL on success
 */
export async function uploadImage(file, path = "uploads", onProgress = null) {
    return new Promise(async (resolve, reject) => {
        try {
            // Validate file
            if (!file) {
                reject(new Error("No file selected"));
                return;
            }

            // Check file size (max 5MB)
            const maxSize = 5 * 1024 * 1024; // 5MB
            if (file.size > maxSize) {
                reject(new Error("File size exceeds 5MB limit"));
                return;
            }

            // Check file type
            const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
            if (!allowedTypes.includes(file.type)) {
                reject(new Error("Only image files are allowed"));
                return;
            }

            // Create unique filename
            const timestamp = Date.now();
            const randomId = Math.random().toString(36).substring(2, 9);
            const filename = `${timestamp}_${randomId}_${file.name}`;
            const storageRef = ref(storage, `${path}/${filename}`);

            // Create upload task
            const uploadTask = uploadBytesResumable(storageRef, file, {
                contentType: file.type
            });

            // Monitor upload progress
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload progress: ${progress}%`);
                    
                    if (onProgress) {
                        onProgress({
                            progress: progress,
                            bytesTransferred: snapshot.bytesTransferred,
                            totalBytes: snapshot.totalBytes
                        });
                    }
                },
                (error) => {
                    console.error("Upload error:", error);
                    reject(error);
                },
                async () => {
                    // Upload completed successfully
                    try {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        console.log("✅ Image uploaded:", downloadURL);
                        resolve({
                            url: downloadURL,
                            name: filename,
                            path: `${path}/${filename}`
                        });
                    } catch (error) {
                        reject(error);
                    }
                }
            );
        } catch (error) {
            reject(error);
        }
    });
}

/**
 * Delete image from Firebase Storage
 * @param {string} filePath - Full storage path of the file
 */
export async function deleteImage(filePath) {
    try {
        const fileRef = ref(storage, filePath);
        await deleteObject(fileRef);
        console.log("✅ Image deleted successfully");
        return true;
    } catch (error) {
        console.error("Error deleting image:", error);
        return false;
    }
}

/**
 * Handle image input change and preview
 * @param {Event} event - File input change event
 * @param {string} previewElementId - ID of preview image element
 */
export function handleImagePreview(event, previewElementId) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const previewElement = document.getElementById(previewElementId);
            if (previewElement) {
                previewElement.src = e.target.result;
                previewElement.style.display = 'block';
            }
        };
        reader.readAsDataURL(file);
    }
}

/**
 * Create image upload UI element
 * @param {string} inputId - ID for file input
 * @param {string} previewId - ID for preview image
 * @param {string} label - Button label
 */
export function createImageUploadUI(inputId, previewId, label = "Upload Image") {
    return `
        <div class="image-upload">
            <input 
                type="file" 
                id="${inputId}" 
                accept="image/*"
                onchange="handleImagePreview(event, '${previewId}')"
            />
            <label for="${inputId}" class="upload-label">
                <i class="fas fa-cloud-upload-alt"></i>
                ${label}
            </label>
            <img id="${previewId}" class="image-preview" style="display: none;" alt="Preview">
            <div class="upload-progress" style="display: none;">
                <div class="upload-progress-bar" style="width: 0%"></div>
            </div>
        </div>
    `;
}

/**
 * Get image upload metadata
 */
export const imageUploadConfig = {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    storagePaths: {
        staffProfiles: 'staff-profiles',
        eventImages: 'event-images',
        idCards: 'id-cards',
        reports: 'reports'
    }
};

console.log("✅ Image upload service loaded");
