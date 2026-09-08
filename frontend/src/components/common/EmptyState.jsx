import React from "react";

const EmptyState = ({
  message,
  ctaText,
  onCtaClick,
}) => {

  return (
    <div className="empty-state">

      <p>
        {message}
      </p>

      {ctaText && onCtaClick && (
        <button
          type="button"
          onClick={onCtaClick}
        >
          {ctaText}
        </button>
      )}

    </div>
  );
};

export default EmptyState;