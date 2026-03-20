import React from "react";
import {
  FaUniversity,
  FaHistory,
  FaAward,
  FaBullseye,
  FaEye,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

const About = () => {
  const managementTeam = [
    { name: "Dr.  Sepo Fortune", position: "Principal", department: "Administration", email: "principal@sepocollege.com.na" },
    { name: "Prof.Sepo Libangosi", position: "Dean of Academics", department: "Academic Affairs", email: "dean@sepocollege.com.na" },
    { name: "Ms. Sepo Thabo Happy", position: "Finance Director", department: "Finance", email: "finance@sepocollege.com.na" },
    { name: "Dr. Sepo Sepiso", position: "Student Affairs", department: "Student Services", email: "studentaffairs@sepocollege.com.na" },
  ];

  const milestones = [
    { year: "2010", event: "Sepo College Founded", description: "Started with 50 students and 5 staff members" },
    { year: "2012", event: "First Accreditation", description: "Accredited by Namibia Qualifications Authority" },
    { year: "2015", event: "Campus Expansion", description: "Moved to new 10-acre campus in Windhoek" },
    { year: "2018", event: "e-Learning Launch", description: "Digital learning platform introduced" },
    { year: "2020", event: "ISO Certification", description: "Received ISO 9001:2015 Certification" },
    { year: "2023", event: "New Programs", description: "Launched Automotive and Entertainment schools" },
  ];

  return (
    <div className="bg-gray-950 text-white overflow-hidden">

      {/* HERO */}
      <div className="relative py-28 text-center bg-gradient-to-br from-blue-900 via-indigo-900 to-black">

        <div className="absolute inset-0 opacity-30 blur-3xl bg-blue-500"></div>

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-6">
            About Sepo College
          </h1>

          <p className="text-blue-100 text-lg">
            Empowering the next generation of scientists, innovators,
            and technology leaders through world-class education.
          </p>
        </div>

      </div>

      {/* VISION MISSION VALUES */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 px-6 py-24">

        {/* Vision */}
        <div className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 hover:scale-105 transition duration-300">

          <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center mb-6 group-hover:rotate-12 transition">
            <FaEye className="text-2xl"/>
          </div>

          <h3 className="text-xl font-semibold mb-3">Our Vision</h3>

          <p className="text-gray-300">
            To become Southern Africa’s most respected institution in
            science and technology education.
          </p>

        </div>

        {/* Mission */}
        <div className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 hover:scale-105 transition">

          <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center mb-6 group-hover:rotate-12 transition">
            <FaBullseye className="text-2xl"/>
          </div>

          <h3 className="text-xl font-semibold mb-3">Our Mission</h3>

          <p className="text-gray-300">
            Deliver practical and innovative education that prepares
            students for high-impact careers.
          </p>

        </div>

        {/* Values */}
        <div className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 hover:scale-105 transition">

          <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center mb-6 group-hover:rotate-12 transition">
            <FaAward className="text-2xl"/>
          </div>

          <h3 className="text-xl font-semibold mb-3">Core Values</h3>

          <ul className="space-y-2 text-gray-300">
            <li>• Excellence</li>
            <li>• Innovation</li>
            <li>• Integrity</li>
            <li>• Student Success</li>
          </ul>

        </div>

      </div>

      {/* LEADERSHIP */}
      <div className="max-w-6xl mx-auto px-6 pb-24">

        <h2 className="text-4xl font-bold text-center mb-14">
          College Leadership
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          {managementTeam.map((member, index) => (

            <div
              key={index}
              className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-xl p-6 text-center hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/20 transition"
            >

              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center mx-auto mb-5 text-xl font-bold">
                {member.name.split(" ").map((n) => n[0]).join("")}
              </div>

              <h3 className="font-semibold text-lg">{member.name}</h3>

              <p className="text-blue-400 text-sm">{member.position}</p>

              <p className="text-gray-400 text-sm mb-3">{member.department}</p>

              <a
                href={`mailto:${member.email}`}
                className="text-blue-300 text-sm hover:text-white"
              >
                {member.email}
              </a>

            </div>

          ))}

        </div>

      </div>

      {/* TIMELINE */}
      <div className="max-w-4xl mx-auto px-6 pb-24">

        <h2 className="text-4xl font-bold text-center mb-14">
          Our Journey
        </h2>

        <div className="border-l-2 border-blue-500 pl-10 space-y-14">

          {milestones.map((m, i) => (

            <div key={i} className="relative">

              <div className="absolute -left-12 top-2 w-6 h-6 bg-blue-600 rounded-full border-4 border-gray-950"></div>

              <span className="text-blue-400 font-bold text-lg">{m.year}</span>

              <h4 className="text-xl font-semibold">{m.event}</h4>

              <p className="text-gray-400">{m.description}</p>

            </div>

          ))}

        </div>

      </div>

      {/* CONTACT */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 py-20">

        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">

          <div>

            <h2 className="text-3xl font-bold mb-6">
              Contact Information
            </h2>

            <div className="space-y-4 text-blue-100">

              <p className="flex items-center gap-3">
                <FaUniversity /> 123 Education Street, Windhoek
              </p>

              <p className="flex items-center gap-3">
                <FaPhone /> +264 61 123 4567
              </p>

              <p className="flex items-center gap-3">
                <FaEnvelope /> info@sepocollege.com.na
              </p>

            </div>

          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">

            <h3 className="text-xl font-semibold mb-4">
              Departments
            </h3>

            <div className="space-y-2 text-blue-100">

              <p>Admissions – admissions@sepocollege.com.na</p>
              <p>Academic Office – academics@sepocollege.com.na</p>
              <p>Finance – finance@sepocollege.com.na</p>
              <p>Student Services – studentservices@sepocollege.com.na</p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default About;