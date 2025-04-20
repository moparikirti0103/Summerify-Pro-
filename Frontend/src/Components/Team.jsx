// src/Components/Team.jsx
import React from 'react';
import '../Style/Team.css'; // Custom styles for Team section

const Team = () => {
  const teamMembers = [
    {
      name: 'Samiksha Kene',
      role: 'Team Leader',
      img: 'https://i.ibb.co/6JF3yBsb/Whats-App-Image-2025-03-06-at-05-29-16.jpg',
      description: ' samikshakene00@gmail.com',
    },
    {
      name: 'Anchal Ziparkar',
      role: 'Team Mate',
      img: 'https://i.ibb.co/svqtbH5Q/Whats-App-Image-2025-03-06-at-05-24-44.jpg',
      description: 'ziparkarachal2004@gmail.com',
    },
    {
      name: 'Atharva',
      role: 'Team Mate',
      img: 'https://i.ibb.co/V01xBJQB/Whats-App-Image-2025-03-06-at-05-24-44-1.jpg',
      description: 'andhareatharva20@gmail.com',
    },
    {
      name: 'Kirti Pravin Mopari',
      role: 'Team Mate',
      img: 'https://i.ibb.co/35L5d1NT/Whats-App-Image-2025-03-06-at-05-24-43.jpg',
      description: 'kirtimopari@gmail.com',
    },
  ];

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 section-title">Meet Our Team</h2>
      <div className="row justify-content-center">
        {teamMembers.map((member, index) => (
          <div key={index} className="col-12 col-sm-6 col-md-6 col-lg-4 text-center mb-4">
            <div className="team-card">
              <img
                src={member.img}
                alt={member.name}
                className="rounded-circle img-fluid team-img"
              />
              <h4 className="team-name mt-3">{member.name}</h4>
              <p className="team-role text-muted">{member.role}</p>
              <p className="team-description">{member.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
