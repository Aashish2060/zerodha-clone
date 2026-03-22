import React from "react";

function Team() {
  return (
    <div className="container">
      <div className="row p-3 mt-5 border-top">
        <h1 className="text-center ">People</h1>
      </div>

      <div
        className="row p-3 text-muted"
        style={{ lineHeight: "1.8", fontSize: "1.2em" }}
      >
        <div className="col-6 p-3 text-center">
          <img
            src="media/images/My-profile.png"
            style={{ borderRadius: "100%", width: "50%" }}
          />
          <h4 className="mt-5">Aashish Pandey</h4>
          <h6>Software Developer | Full Stack Developer</h6>
        </div>
        <div className="col-6 p-3">
          <p>
            Aashish is a passionate software developer focused on building
            scalable web applications and solving complex algorithmic problems.
            He built this Zerodha Clone as a full stack project to sharpen
            his skills in React, Node.js, and MongoDB.
          </p>
          <p>
            He is an active DSA practitioner on LeetCode and enjoys learning
            new technologies to create impactful digital products.
          </p>
          <p>Solving problems on LeetCode is his zen.</p>
          <p>
            Connect on{" "}
            <a href="https://www.linkedin.com/in/aashish-pandey01/" target="_blank" rel="noreferrer">LinkedIn</a>{" /"}{" "}
            <a href="https://github.com/Aashish2060" target="_blank" rel="noreferrer">GitHub</a>{" /"}{" "}
            <a href="https://leetcode.com/u/Aashish2060/" target="_blank" rel="noreferrer">LeetCode</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;