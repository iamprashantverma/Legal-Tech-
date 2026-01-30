const path = require("path");
const fs = require("fs-extra");
const { uploadFilesToCloudinary } = require("../services/cloudinary.service");
const { nextVersion } = require("../utils/version.util");
const { generateChecksum } = require("../utils/checksum.util");


const METADATA_FILE = path.join(__dirname,"../../metadata/documents.json");
const UPLOAD_DIRECTORY = path.join(__dirname, "../../resources/uploads/documents");

const documentService = {

  readMetaData() {
    // read the document.json
    if (!fs.existsSync(METADATA_FILE)) {
      return {};
    }
    return fs.readJsonSync(METADATA_FILE);
  },

  writeMetaData(data) {
    fs.writeJsonSync(METADATA_FILE, data, { spaces: 2 });
  },

  async uploadDocumentLocally(file, author = "System") {

    const buffer = await file.toBuffer();
   
    const checksum = generateChecksum(buffer);

    const documentId = path.parse(file.filename).name;

    const metadata = this.readMetaData();

    const document = metadata[documentId] || {
      documentId,
      title: file.filename,
      author,
      status: "DRAFT",
      createdDate: new Date().toISOString(),
      modifiedDate: new Date().toISOString(),
      currentVersion: "0.0",
      versions: []
    };

    const version = nextVersion(document.currentVersion);

    const documentDir = path.join(UPLOAD_DIRECTORY, documentId);

    await fs.ensureDir(documentDir);
    const filePath = path.join(
      documentDir,
      `v${version}${path.extname(file.filename)}`
    );

    await fs.writeFile(filePath, buffer);

    document.currentVersion = version;
    document.modifiedDate = new Date().toISOString();

    document.versions.push({
      versionNumber: version,
      filePath,
      checksum,
      createdDate: new Date().toISOString(),
    });


    metadata[documentId] = document;
    this.writeMetaData(metadata);

    return {
      message: "Document uploaded successfully",
      documentId,
      version
    };
  },

  async uploadDocumentToCloudinary(file, author = "System") {
    const buffer = await file.toBuffer();
    const checksum = generateChecksum(buffer);
    const documentId = path.parse(file.filename).name;

    const metadata = this.readMetaData();

    const document = metadata[documentId] || {
      documentId,
      title: file.filename,
      author,
      status: "DRAFT",
      createdDate: new Date().toISOString(),
      modifiedDate: new Date().toISOString(),
      currentVersion: "0.0",
      storage: "CLOUDINARY",
      versions: []
    };

    const version = nextVersion(document.currentVersion);

    const cloudResult = await uploadFilesToCloudinary({
      uploadDocs: [{ buffer }],
      uploadId: []
    });

    const cloudUrl = cloudResult.uploadDocs[0];

    document.currentVersion = version;
    document.modifiedDate = new Date().toISOString();

    document.versions.push({
      versionNumber: version,
      cloudUrl,
      checksum,
      createdDate: new Date().toISOString(),
    });

    metadata[documentId] = document;
    this.writeMetaData(metadata);

    return {
      message: "Document uploaded to Cloudinary",
      documentId,
      version,
      cloudUrl
    };
  }

};

module.exports = {documentService};
