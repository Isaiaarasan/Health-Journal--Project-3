import React from "react";
import "../CSS/CommunityAndWellnessResources.css";
const CommunityAndWellnessResources = () => {
  return (
    <div className="wellness-container">
      <h2>Community & Wellness Resources</h2>
      <div className="wellness-section">
        <h3>Recommended Health Articles</h3>
        <ul>
          <li>
            <a href="https://www.health.com/article/healthy-eating-tips" target="_blank" rel="noopener noreferrer">
              Healthy Eating Tips for a Balanced Lifestyle
            </a>
          </li>
          <li>
            <a href="https://www.webmd.com/fitness-exercise/features/7-day-workout-plan" target="_blank" rel="noopener noreferrer">
              7-Day Workout Plan to Boost Your Health
            </a>
          </li>
          <li>
            <a href="https://www.mayoclinic.org/healthy-lifestyle/stress-management/expert-answers/meditation/faq-20057741" target="_blank" rel="noopener noreferrer">
              How Meditation Can Improve Your Health
            </a>
          </li>
        </ul>
      </div>
      <div className="wellness-section">
        <h3>Guided Meditation & Exercise Videos</h3>
        <ul>
          <li>
            <a href="https://www.youtube.com/watch?v=ZToicYcHIOU" target="_blank" rel="noopener noreferrer">
              Guided Meditation for Relaxation
            </a>
          </li>
          <li>
            <a href="https://youtu.be/CD6BCdFHogg?si=qp9BTtXNqP3mxRWk" target="_blank" rel="noopener noreferrer">
              15-Minute Full Body Workout
            </a>
          </li>
          <li>
            <a href="https://youtu.be/5ARgeR1rMTo?si=PhFs0tyKayATOTws" target="_blank" rel="noopener noreferrer">
              10-Minute Yoga for Beginners
            </a>
          </li>
        </ul>
      </div>
      <div className="wellness-section">
        <h3>Emergency Contacts & Helpline Numbers</h3>
        <ul>
          <li><strong>Emergency Services:</strong> 112 (or your country's emergency number)</li>
          <li><strong>Poison Control:</strong> 1-800-222-1222 (US) or your local poison control number</li>
          <li><strong>Mental Health Helpline:</strong> 1-800-273-TALK (US) or your local mental health helpline</li>
        </ul>
      </div>
    </div>
  );
};

export default CommunityAndWellnessResources;
