import React from "react";

const ContactLink = ({ url, icon }: { url: string; icon: React.ReactNode }) => {
  return (
    <a href={url} target="_blank" className="flex items-center gap-1 hover:opacity-60 transition">
      <div className="w-6 aspect-square">{icon}</div>
    </a>
  );
};

export default ContactLink;
