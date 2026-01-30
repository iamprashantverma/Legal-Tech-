const cloudinary = require('cloudinary').v2;
const stream = require('stream');

async function uploadFilesToCloudinary(files) {

  const uploadedFiles = { uploadId: [], uploadDocs: [] };
  
  async function uploadFileList(fileList, folder, targetArray) {
    for (const file of fileList) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder, resource_type: 'raw' },
          (err, res) => (err ? reject(err) : resolve(res))
        );
        const bufferStream = new stream.PassThrough();
        bufferStream.end(file.buffer);
        bufferStream.pipe(uploadStream);
      });
      targetArray.push(result.secure_url);
    }
  }
  await uploadFileList(files.uploadId, 'intake_uploads/uploadId', uploadedFiles.uploadId);
  await uploadFileList(files.uploadDocs, 'intake_uploads/uploadDocs', uploadedFiles.uploadDocs);

  return uploadedFiles;
}

module.exports = { uploadFilesToCloudinary };
