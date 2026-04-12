import { BaseCircleProgressbar } from "@/app/components/base-components/BaseCircleProgressBar";
import { Button } from "@/app/components/base-components/Button";
import { LoadSpinner } from "@/app/components/loaders/LoadSpinner";
import { BackIcon, FileCloud } from "@/app/icons";
import { usePrimaryColor } from "@/app/stores/PrimaryColorProvider";
import api from "@/app/utils/auth-interceptor";
import Link from "next/link";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";

type view = "video" | "reading" | "submit";


type Project = {
  id: string;
  title: string;
  description: string;
  grading_description: string;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
  is_locked: boolean;
  module: {
    id: string;
    title: string;
    description: string;
    cover_image: {
      url: string;
      alt?: string; // optional if not always present
    };
    course: {
      id: string;
      title: string;
    };
  };
};

type ProjectResponse = {
  score: number,
  percentage_grade: number,
  feedback: string,
  project: {
    id: string;
    title: string;
    grading_description: string;
    description: string;
  };
  user_response: string;
}

export const SubmitProjectView = ({
  setView, project
}: {
  setView: Dispatch<SetStateAction<view>>;
  project: Project | null;
}) => {
  const { getShade } = usePrimaryColor();

  const [showUploadForm, setShowUploadForm] = useState(false);
  // const token = Cookies.get('token')

  const [description, setDescription] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [attachment, setAttachment] = useState<string | null>(null);
  const [uploadingFile, setUploadingFile] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [projectResponse, setProjectResponse] = useState<ProjectResponse | null>(null);

  // function to upload attachment
  const uploadAssignmentDoc = async (file: File) => {
    setUploadingFile(true);
    try {
      const res = await api.post(
        "/media/upload",
        {
          media: file,
          media_type: "photo",
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);
      
      if (res.data.success) {
        toast.success(res.data?.message);
        setAttachment(res.data?.data?.id);
      }
    } catch (error: any) {
      toast.error(error.response.data?.message);
    } finally {
      setUploadingFile(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if(file.size > 16 * 1024 * 1024) {
        toast.error("File size exceeds 16 MB limit.");
        return;
      }
      setFileName(file.name);
      uploadAssignmentDoc(file);
    }
  };


const submitProjectForAIGrading = async () => {
  const token = await fetch('/api/auth/get-token')
    .then((res) => res.json())
    .then((data) => data.token);
  console.log("Token ================= ", {
    id: project?.id,
    project: {
      id: project?.id,
      title: project?.title,
      grading_description: project?.grading_description,
      description : project?.description,
    },
    user_response: description
  });
  // return
  if(!attachment) {
    toast.error("Please upload a file before submitting.");
    return;
  }
  if (!description) {
    toast.error("Please provide a description.");
    return;
  }
  try {
    setLoading(true);
    const res = await fetch('https://backend.wificombatelearn.com/ai-agents/grade_assignment_or_projects/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        payload: {
          id: project?.id,
          project: {
            id: project?.id,
            title: project?.title,
            grading_description: project?.grading_description,
            description : project?.description,
          },
          user_response: description
        }
      })
    });
    const data = await res.json();
    console.log("AI Response data ============== ", data);
    if (data.success) {
      setProjectResponse(data.data);
      submitProject(data.data.feedback, data.data.percentage_grade);
      // toast.success("Assignment submitted successfully!");
      // setShowUploadForm(false);
      // setDescription("");
      // setFileName(null);
      // setAttachment(null);
    }
  } catch (error: any) {
    console.error("Error submitting project:", error);
    toast.error(error.response?.data?.message || "Failed to submit project.");
  } finally {
    setLoading(false);
    setDescription("");
    setFileName(null);
    setAttachment(null);
  }
}


const submitProject = async (feedback:string, percentage_grade:number) => {
  console.log("Project Response Payload", {
    project: project?.id,
    response:description,
    attachment,
    feedback: feedback,
    score: percentage_grade,
  });
  
  if(!attachment) {
    toast.error("Please upload a file before submitting.");
    return;
  }
  if (!description) {
    toast.error("Please provide a description.");
    return;
  }
  try {
    setLoading(true);
    const res = await api.post("/my-learning-dashboard/project/submit", {
      project: project?.id,
      response:description,
      attachment,
      feedback: feedback,
      score: percentage_grade,
    });
    if (res.data.success) {
      // setAssignmentResponse(res.data.data);
      toast.success("Project submitted successfully!");
      // setShowUploadForm(false);
      setDescription("");
      setFileName(null);
      setAttachment(null);
    }
  }catch (error: any) {
    console.error("Error submitting project:", error);
    toast.error(error.response?.data?.message || "Failed to submit project.");
  }finally {
    setLoading(false);
    setDescription("");
    setFileName(null);
    setAttachment(null);
  }
}

  // useEffect(() => {
  //   // Simulate fetching project response
  //   setTimeout(() => {
  //     setProjectResponse(res);
  //   }, 2000);
  // }, []);

  return (
    <div className="px-5 my-10">
      <span>
        <BackIcon onClick={() => setView("video")} />
      </span>

      <div className="w-[95%] md:w-[80%] lg:w-[75%] mx-auto">
        <div className="bg-white p-5 rounded-2xl flex flex-col">
          <h1 className="text-center font-merriweather font-bold text-lg md:text-xl lg:text-2xl">
            Upload Project
          </h1>
          <p className="text-sm md:text-base font-semibold text-gray-500 mb-6 text-center">
            Click to upload your project and give a detailed description.
          </p>

          <label
            htmlFor="file-upload"
            className="px-4 py-4 border rounded-xl"
            style={{ borderColor: getShade(400) }}
          >
            <div className="flex flex-col items-center justify-center border-2 border-dashed transition rounded-xl px-6 py-10 cursor-pointer text-center">
              <FileCloud />
              <h3 className="font-medium sm:font-bold text-base sm:text-lg">
              {fileName ? fileName : "Upload a File"}
              </h3>
              <p className="text-xs 576:text-sm sm:text-base font-semibold sm:font-bold text-gray-400 mt-1">
                Or click to browse (Max file size: 16 MB)
              </p>
              <input
                  id="file-upload"
                  type="file"
                  hidden
                  onChange={handleFileChange}
              />
            </div>
          </label>

          <div className="mt-9">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Give description on the project
            </label>
            <textarea
              id="description"
              rows={6}
              value={description}
              onChange={(e) => {setDescription(e.target.value)}}
              placeholder="Enter a description..."
              className="w-full rounded-lg border border-gray-300 focus:ring-violet-500 focus:border-violet-500 p-3 text-sm resize-none"
            />
          </div>
          <Button
            label={loading ? "Loading" : "Submit"}
            // label={"Submit"}
            className="self-center h-[56px] text-center justify-center"
            onClick={submitProjectForAIGrading}
            disabled={loading}
            icon={
              loading ? (
                <LoadSpinner className="!w-[20px] !h-[20px] !mt-1" />
              ) : (
                <></>
              )
            }
          />
        </div>

        {uploadingFile && (
          <div className="fixed inset-0 z-[999] bg-black/40 top-0 bottom-0 right-0 left-0 flex flex-col justify-center items-center">
            <div className="rounded-2xl p-4 bg-white max-w-[462px] min-w-[462px] flex flex-col items-center gap-3">
              {/* <GreenCheckmark /> */}
              <h3 className="text-center text-black-800 text-xl md:text-xl font-bold">
                File Uploading
              </h3>
              <p className="text-center text-black-600 text-base sm:text-lg font-semibold">
                File upload in progress. Please wait...
              </p>
            </div>
          </div>
        )}

        {projectResponse && (
          <div className="fixed inset-0 z-[999] bg-black/40 top-0 bottom-0 right-0 left-0 flex flex-col justify-center items-center">
            <div className="rounded-2xl p-6 bg-white max-w-[462px] min-w-[462px] flex flex-col items-center gap-3">
              {/* <GreenCheckmark /> */}
              <h3 className="text-center text-black-800 text-xl md:text-xl font-bold">
                Project Score
              </h3>
              {projectResponse && projectResponse?.percentage_grade < 50 ? (
                <div className="flex flex-col items-center gap-3 justify-center w-full">
                  <BaseCircleProgressbar
                    percentage={Number(projectResponse?.percentage_grade) || 0}
                    // percentage={0}
                    size={200}
                    strokeWidth={15}
                  />
                  <p className="text-center text-[#4B4B4E] text-base sm:text-lg font-semibold">
                    Oops 😢 , you scored {projectResponse?.percentage_grade}%.
                  </p>
                  <Link href={`/dashboard/career-path/project-feedback/${projectResponse?.project?.id}`} className="rounded-[6px] bg-gray-800 py-2 w-full text-white text-center">View Feedback</Link>
                  {/* <div
                    onClick={() => setProjectResponse(null)}
                    className="rounded-[6px] bg-gray-800 py-2 w-full text-white text-center cursor-pointer select-none"
                  >
                    View Feedback
                  </div> */}
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 justify-center w-full">
                  <BaseCircleProgressbar
                    percentage={Number(projectResponse?.percentage_grade) || 0}
                    size={200}
                    strokeWidth={15}
                  />
                  <p className="text-center text-[#4B4B4E] text-base sm:text-lg font-semibold">
                    Congratulations 🎉 , you are doing great. you scored{" "}
                    {projectResponse?.percentage_grade}%.
                  </p>
                  <div className="flex gap-3 w-full justify-between">
                    <Link href={`/dashboard/career-path/project-feedback/${projectResponse?.project?.id}`} className="rounded-[6px] bg-gray-800 py-2 w-full text-white text-center">View Feedback</Link>
                    {/* <div
                      onClick={() => setProjectResponse(null)}
                      className="rounded-[6px] bg-gray-800 py-2 w-full text-white text-center cursor-pointer select-none"
                    >
                      View Feedback
                    </div> */}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const res = {
  percentage_grade: 75,
  assignment: {
    id: "12345",
  },
  score: 75,
};
const uploadingFile = false; // This should be replaced with actual state management for file upload status
