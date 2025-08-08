"use client"
import React from "react";
import Navbar from "./Navbar";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Dashboard = () => {
  const [openDialog, setOpenDialog] = React.useState(false); // ✅ Corrected
  const[jobPosition,setJobPosition]=  React.useState();
  const[jobDesc,setJobDesc]=  React.useState();
  const[jobExp,setJobExp]=  React.useState();

  const onSubmit=(e)=>{
    e.preventDefault()
console.log(jobDesc,jobPosition,jobExp)
  }
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-primary dark:text-white transition-colors duration-300">
      {/* Top Navbar */}
      <Navbar />

      {/* Main content */}
      <div className="p-8 space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-700 dark:text-gray-300">
          This is where your mock interviews and features will appear.
        </p>

        {/* Cards section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Card to trigger dialog */}
          <div
            onClick={() => setOpenDialog(true)} // ✅ open the dialog
            className="border-2 border-dashed border-primary rounded-xl p-10 bg-white dark:bg-gray-800 hover:scale-105 hover:shadow-lg transition-all cursor-pointer flex items-center justify-center"
          >
            <h2 className="font-bold text-xl text-primary dark:text-white">+ Add New</h2>
          </div>

          {/* Dialog */}
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent className="max-w-2xl">
  <DialogHeader>
    <DialogTitle className="text-2xl">Tell us more about job interviewing</DialogTitle>
    <DialogDescription>
      Add details for your new mock interview session here.
    </DialogDescription>
  </DialogHeader>

  <form onSubmit={onSubmit} className="mt-6 space-y-4">
    <div>
      <label>Job Role/Job Position</label>
      <Input
        placeholder="Ex. Full Stack Developer"
        required
        value={jobPosition}
        onChange={(event) => setJobPosition(event.target.value)}
      />
    </div>

    <div>
      <label>Job Description/Tech Stack</label>
      <Textarea
        placeholder="Ex. React , Machine Learning"
        required
        value={jobDesc}
        onChange={(event) => setJobDesc(event.target.value)}
      />
    </div>

    <div>
      <label>Years of Experience</label>
      <Input
        placeholder="Ex. 5"
        type="number"
        max={50}
        value={jobExp}
        onChange={(event) => setJobExp(event.target.value)}
      />
    </div>

    <div className="flex gap-5 justify-end">
      <button type="button" onClick={() => setOpenDialog(false)} className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700">
        Cancel
      </button>
      <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
        Start Interview
      </button>
    </div>
  </form>
</DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
