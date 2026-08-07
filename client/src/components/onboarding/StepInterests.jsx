import { HOBBY_OPTIONS } from '../../utils/initialData';

export default function StepInterests({ selectedInterests, onToggleInterest }) {
  return (
    <div className="mini-card">
      <h4>Interests</h4>
      <p className="muted">Choose goals like strength, mindfulness, or endurance.</p>
      <div className="chip-row">
        {HOBBY_OPTIONS.map((interest) => (
          <button
            key={interest}
            type="button"
            className={`chip ${selectedInterests.includes(interest) ? 'active' : ''}`}
            onClick={() => onToggleInterest(interest)}
          >
            {interest}
          </button>
        ))}
      </div>
    </div>
  );
}
