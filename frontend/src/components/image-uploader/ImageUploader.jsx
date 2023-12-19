import React from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

registerPlugin(
  FilePondPluginFileValidateSize,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType
);

const ImageUploader = ({ files, setFiles }) => {
  return (
    <FilePond
      files={files}
      allowMultiple={false}
      maxFiles={1}
      onupdatefiles={setFiles}
      allowFileSizeValidation={true}
      maxFileSize={"5MB"}
      acceptedFileTypes={["image/*"]}
      name="files"
      labelIdle='Drag & Drop your files or <span className="filepond--label-action">Browse</span>'
    />
  );
};

export default ImageUploader;
