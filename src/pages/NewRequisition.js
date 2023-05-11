import React, { useState } from "react";
import MaterialRequisitionForm from "../components/MaterialRequisitionForm";
import AddMaterial from "../components/AddMaterial";
import RequisitionTable from "../components/RequisitionTable";
import RequisitionDetails from "../components/RequisitionDetails";

const status = ["pending", "approved"];
function NewRequisition() {
  const [activeTab, setActiveTab] = useState(1);
  const [projectId, setProjectId] = useState("");
  const [message, setMessage] = useState("");
  const [projectDetails, setProjectDetails] = useState({
    toName: "",
    name: "",
    subject: "",
    remark: "",
    status: "",
    requisitionTime: "",
    projectId: "",
  });

  const handleTab = (value, projectId) => {
    setMessage("Requisition Added Successfully");
    setProjectId(projectId);
    setActiveTab(value);
  };

  const previewMaterial = (projectData) => {
    setProjectDetails(projectData);
    const tab = activeTab;
    setActiveTab(tab + 1);
  };

  const handleDeleteRequisition = () => {
    const value = activeTab;
    setMessage("Requisition Deleted Successfully");
    setActiveTab(value - 1);
  };

  const backTab = () => {
    const tab = activeTab;
    setActiveTab(tab - 1);
  };

  return activeTab === 1 ? (
    <MaterialRequisitionForm handleTab={handleTab} />
  ) : activeTab === 2 ? (
    <AddMaterial projectId={projectId} handleTab={handleTab} />
  ) : activeTab === 3 ? (
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
}

export default NewRequisition;
