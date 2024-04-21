import React from "react";
import "./Uploader.css";

interface Props {
  handleUploadFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Uploader = ({ handleUploadFile }: Props) => {
  return (
    <form action="">
      <label className="input-file" htmlFor="uploadBtn">
        Select
      </label>
      <input type="file" id="uploadBtn" onChange={handleUploadFile} />
    </form>
  );
};

export default Uploader;
