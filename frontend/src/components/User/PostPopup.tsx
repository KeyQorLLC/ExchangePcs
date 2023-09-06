import React, { useState } from "react";
import { albumnMap, groupList, memberMap } from "./mapping";

interface PostPopupProps {
  onClose: () => void;
}

interface PostInfo {
  condition: string;
  group: string;
  member: string;
  album: string;
  version: string;
  description: string;
}

const PostPoptup: React.FC<PostPopupProps> = ({ onClose }) => {
  const [condition, setCondition] = useState("");
  const [group, setGroup] = useState("");
  const [member, setMember] = useState("");
  const [album, setAlbum] = useState("");
  const [version, setVersion] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          condition,
          group,
          member,
          album,
          version,
          description,
          user: sessionStorage.getItem("KeyqorUserId"),
        }),
      });

      if (response.status === 201) {
        console.log("post success");
        onClose();
      } else if (response.status === 400) {
        console.log("post failed");
      }
    } catch (error) {
      console.log("Network error:", error);
    }
  };

  return (
    <div className="bg-kpopPink p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold text-white mb-4">Post your card</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="condition" className="text-white block mb-1">
            Condition:
          </label>
          <select
            id="condition"
            className="w-full px-3 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-kpopBlue"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            required
          >
            <option value="">Select Condition</option>
            <option value="Mint">Mint</option>
            <option value="Near Mint">Near Mint</option>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Light Played">Light Played</option>
            <option value="Played">Played</option>
            <option value="Poor">Poor</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="group" className="text-white block mb-1">
            Group:
          </label>
          <select
            id="group"
            className="w-full px-3 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-kpopBlue"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            required
          >
            <option value="">Select Group</option>
            {groupList.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="member" className="text-white block mb-1">
            Member:
          </label>
          <select
            id="member"
            className="w-full px-3 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-kpopBlue"
            value={member}
            onChange={(e) => setMember(e.target.value)}
            required
          >
            <option value="">Select Member</option>
            {group &&
              memberMap[group].map((member) => (
                <option key={member} value={member}>
                  {member}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="album" className="text-white block mb-1">
            Album:
          </label>
          <select
            id="member"
            className="w-full px-3 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-kpopBlue"
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
            required
          >
            <option value="">Select Album</option>
            {group &&
              albumnMap[group].map((album) => (
                <option key={album} value={album}>
                  {album}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="verison" className="text-white block mb-1">
            Version:
          </label>
          <select
            id="version"
            className="w-full px-3 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-kpopBlue"
            value={version}
            onChange={(e) => setVersion(e.target.value)}
          ></select>
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="text-white block mb-1">
            Description:
          </label>
          <input
            type="text"
            id="description"
            className="w-full px-3 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-kpopBlue"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-kpopPink text-white rounded-md hover:bg-kpopYellow transition duration-300"
        >
          Submit
        </button>
      </form>
      <button
        className="mt-4 px-4 py-2 bg-kpopPink text-white rounded-md hover:bg-kpopYellow transition duration-300"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
};

export default PostPoptup;
