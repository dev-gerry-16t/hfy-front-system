import React, { useState } from "react";

const SectionReferences = ({ dataUserType }) => {
  const [dataForm, setDataForm] = useState({});

  const formTenantUser = (
    <>
      <span>Referencias</span>
    </>
  );

  const typeFormUser = (userType) => {
    let component = <div />;
    switch (userType) {
      case "1":
      case "2":
        component = formTenantUser;
        break;
      default:
        component = <div />;

        break;
    }
    return component;
  };

  return (
    <div
      style={{
        width: 200,
        fontSize: 12,
      }}
    >
      <h1>Referencias</h1>
      {typeFormUser(dataUserType)}
    </div>
  );
};

export default SectionReferences;
