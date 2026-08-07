import { ShieldCheck, Lock, HardDrive, EyeOff, Trash2 } from 'lucide-react';

export default function PrivacyPolicyView() {
  return (
    <div className="view-container privacy-view">
      <div className="view-header">
        <ShieldCheck size={26} className="privacy-badge-icon" />
        <div>
          <h2>Privacy & Data Policy</h2>
          <p className="muted">Zero friction. Zero tracking. 100% Client-side local storage.</p>
        </div>
      </div>

      <div className="privacy-card-grid">
        <div className="privacy-card">
          <div className="privacy-card-header">
            <Lock size={20} />
            <h4>No Account or Login Required</h4>
          </div>
          <p>FitHub operates completely without passwords, cloud user accounts, or email verifications. You are in complete control of your identity from minute one.</p>
        </div>

        <div className="privacy-card">
          <div className="privacy-card-header">
            <HardDrive size={20} />
            <h4>Where Your Data Lives</h4>
          </div>
          <p>All your health measurements (BMI/BMR/weight), exercise logs, food journals, and daily task lists are saved exclusively inside your browser's LocalStorage and Web Cache.</p>
        </div>

        <div className="privacy-card">
          <div className="privacy-card-header">
            <EyeOff size={20} />
            <h4>What We Don't Do</h4>
          </div>
          <p>We do not collect telemetry, sell personal health metrics, or transmit your records to remote servers. No third-party ad networks or analytics trackers exist in FitHub.</p>
        </div>

        <div className="privacy-card">
          <div className="privacy-card-header">
            <Trash2 size={20} />
            <h4>Complete Data Ownership & Deletion</h4>
          </div>
          <p>You own your data. Clearing your browser cache or tapping <strong>Reset App Data</strong> in Settings instantly and permanently deletes all recorded history.</p>
        </div>
      </div>
    </div>
  );
}
