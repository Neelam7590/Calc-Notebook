import { ArrowLeft } from 'lucide-react';
import { useLocation } from 'wouter';

export function BackButton() {
  const [, navigate] = useLocation();
  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigate('/');
    }
  };
  return (
    <button type="button" className="back-button" onClick={goBack} data-testid="button-back-to-previous">
      <ArrowLeft size={16} />
      <span>Back</span>
    </button>
  );
}