const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL ?? '').trim(),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID ?? '').trim(),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID ?? '').trim(),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID ?? '').trim(),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID ?? '').trim(),
    tinymceEditorApiKey: String(import.meta.env.VITE_TINYMCE_API_KEY ?? '').trim(),
}
export default conf;