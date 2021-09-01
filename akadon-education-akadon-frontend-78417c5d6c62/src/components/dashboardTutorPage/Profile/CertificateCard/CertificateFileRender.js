import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const CertificateFileRender = ({ files, handleRemoveFile, isEdit, t }) => {
  if (!files) return <></>;

  function renderFile(file) {
    const { content_type, is_local, file_name, url } = file;
    const isNotImg =
      content_type && content_type.split("/")[0] === "application";

    if (isNotImg) {
      return (
        <a
          style={{ width: "5rem" }}
          className="text-dark cursor-pointer text-truncate d-inline-block mr-4"
          href={is_local ? url : `https://docs.google.com/viewer?url=${url}`}
          alt="certificate"
          target="blank"
        >
          {file_name}
        </a>
      );
    }
    return (
      <a href={url} target="blank">
        <img
          className="mr-4 cursor-pointer"
          height={103}
          src={url}
          alt="certificate"
        />
      </a>
    );
  }

  return (
    <>
      {files.map((file, index) => {
        return (
          <div key={index + file.url} className="position-relative mb-3">
            {renderFile(file)}
            {isEdit && (
              <FontAwesomeIcon
                onClick={() => handleRemoveFile(file)}
                style={{ right: ".45rem" }}
                className="position-absolute text-danger"
                icon={["fas", "times-circle"]}
              />
            )}
          </div>
        );
      })}
    </>
  );
};

CertificateFileRender.propTypes = {
  files: PropTypes.array,
  handleRemoveFile: PropTypes.func,
  cert: PropTypes.bool,
};

export default CertificateFileRender;
