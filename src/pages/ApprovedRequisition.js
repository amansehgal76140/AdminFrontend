import React, { useState } from "react";
import RequisitionDetails from "../components/RequisitionDetails";
import RequisitionTable from "../components/RequisitionTable";

const ApprovedRequisition = ({ status }) => {
  const [projectDetails, setProjectDetails] = useState({
    toName: "",
    name: "",
    subject: "",
    remark: "",
    status: "",
    requisitionTime: "",
    projectId: "",
  });
  const [activeTab, setActiveTab] = useState(1);
  const [message, setMessage] = useState("");

  const handleDeleteRequisition = () => {
    const value = activeTab;
    setMessage("Requisition Deleted Successfully");
    setActiveTab(value - 1);
  };

  const previewMaterial = (projectData) => {
    setProjectDetails(projectData);
    const tab = activeTab;
    setActiveTab(tab + 1);
  };

  const backTab = () => {
    const tab = activeTab;
    setActiveTab(tab - 1);
  };

  return activeTab === 1 ? (
    <RequisitionTable
      status={status}
      message={message}
      previewMaterial={previewMaterial}
    />
  ) : (
    <RequisitionDetails
      projectDetails={projectDetails}
      handleDeleteRequisition={handleDeleteRequisition}
      backTab={backTab}
      setProjectDetails={setProjectDetails}
    />
  );
};

export default ApprovedRequisition;
