import React from 'react';
import '../Style/WhoIsFor.css'; // Custom CSS for additional styling

const WhoIsFor = () => {
  return (
    <section className="tldr-this-for container py-5">
      <h2 className="text-center mb-4">Who is SummarifyPro This for?</h2>
      <p className="text-center mb-5">
      SummarifyPRO is a powerful summarization tool designed for students, writers, teachers, institutions, journalists, and anyone who needs to quickly grasp the key points of lengthy content.
      </p>
      
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="use-case-item p-3 shadow-sm rounded">
            <i className="fas fa-book-open use-case-icon mb-3"></i>
            <h3>For Everyone Online</h3>
            <p>If you just need the gist of a long article, SummarifyPRO provides a quick, easy-to-read summary, saving you time.</p>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="use-case-item p-3 shadow-sm rounded">
            <i className="fas fa-book-open use-case-icon mb-3"></i>
            <h3>Students</h3>
            <p>Overwhelmed with information while studying? SummarifyPRO helps break down complex topics into concise, digestible summaries.</p>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="use-case-item p-3 shadow-sm rounded">
            <i className="fas fa-book-open use-case-icon mb-3"></i>
            <h3>Writers</h3>
            <p>Need to quickly summarize articles, blogs, or reports? SummarifyPRO makes content creation and review effortless.</p>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="use-case-item p-3 shadow-sm rounded">
            <i className="fas fa-book-open use-case-icon mb-3"></i>
            <h3>Teachers</h3>
            <p>Easily condense long chapters or documents into clear, structured summaries for students.</p>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="use-case-item p-3 shadow-sm rounded">
            <i className="fas fa-book-open use-case-icon mb-3"></i>
            <h3>Institutions</h3>
            <p>Businesses, schools, and organizations can use SummarifyPRO to distill key insights from reports, research papers, and training materials.</p>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="use-case-item p-3 shadow-sm rounded">
            <i className="fas fa-book-open use-case-icon mb-3"></i>
            <h3>Journalists</h3>
            <p> Speed up your workflow by summarizing long articles into precise, reader-friendly snippets for news or magazines.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoIsFor;
